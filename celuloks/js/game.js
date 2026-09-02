/* ============================================================
   celuloks — online memory game for 2 to 6 players
   Host-authoritative state over PeerJS (WebRTC data channels).
   Host = Player 1. No backend required.
   ============================================================ */

(function () {
    'use strict';

    // ---------- constants ----------
    const DECKS = {
        celuloks: { pairs: 36, cols: 9, rows: 8 },   // 72 cards, 9 x 8
        random:   { pairs: 36, cols: 9, rows: 8 },   // 72 cards, 9 x 8
    };
    const REVEAL_DELAYS = { '1s': 1000, '3s': 3000 };
    const MAX_PLAYERS = 6;
    const MATCH_MS = 700;                // pause before matched cards settle
    const ROOM_PREFIX = 'celuloks-mg-';  // namespace on the public PeerJS broker
    const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    const PLAYER_NAMES = ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6'];

    // ---------- dom ----------
    const $ = (id) => document.getElementById(id);
    const grid = $('grid');
    const boardWrap = $('boardWrap');
    const overlay = $('overlay');
    const setupHome = $('setupHome');
    const setupWaiting = $('setupWaiting');
    const setupError = $('setupError');
    const roomCodeEl = $('roomCode');
    const playerCountEl = $('playerCount');
    const banner = $('banner');
    const timerEl = $('timer');
    const flipsEl = $('flips');
    const scoresEl = $('scores');
    const restartBtn = $('restartBtn');
    const exitBtn = $('exitBtn');

    // ---------- state ----------
    let mode = null;          // 'host' | 'guest' | 'practice'
    let peer = null;          // PeerJS Peer
    let conns = [];           // host: guest connections; conns[i] is Player i+1
    let conn = null;          // guest: connection to host
    let state = null;         // authoritative on host, mirror on guest
    let myIndex = 0;          // which player "me" is (guest: assigned by host)
    let revealTimer = null;   // pending mismatch/match timeout (host)
    let restartToken = 0;     // cancels pending timers after a restart
    let ticker = null;        // 100 ms cronometer display updater
    let sync = { elapsed: 0, at: 0 }; // guest: last cronometer sync from host
    let revealMode = 'click'; // 'click': missed pair stays up until the next click; '1s'/'3s': timed flip-back
    let deckMode = 'celuloks'; // 'celuloks' | 'random' — chosen by the host on the home screen
    let manifest = null;       // cached contents of assets/random/manifest.json

    // ---------- helpers ----------
    function randomCode(len) {
        let out = '';
        for (let i = 0; i < len; i++) {
            out += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
        }
        return out;
    }

    function shuffledDeck(pairs) {
        const deck = [];
        for (let p = 1; p <= pairs; p++) deck.push(p, p);
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    function newState(deck, files, playerCount) {
        const d = DECKS[deck] || DECKS.celuloks;
        return {
            deck: deck,                     // 'celuloks' | 'random'
            files: files || null,           // image filenames when deck is 'random'
            pairs: d.pairs,
            cols: d.cols,
            rows: d.rows,
            flips: 0,                       // two-card attempts made so far
            cards: shuffledDeck(d.pairs).map((p) => ({ p: p, s: 'down' })), // s: down | up | matched
            flipped: [],                    // indices currently face-up
            current: 0,                     // whose turn (0-based)
            scores: new Array(playerCount || 1).fill(0),
            playerCount: playerCount || 1,
            status: 'ready',                // ready | playing | ended
            pending: null,                  // indices of a missed pair kept face-up ('click' mode)
            revealMode: revealMode,         // host's flip-back setting, broadcast to guests
            startedAt: null,                // host epoch ms of the first flip
            elapsed: 0,                     // ms at the time of the last broadcast
            finalTime: null,                // ms, set when the last pair is made
        };
    }

    function cardSrcFor(c) {
        if (state.deck === 'random') return 'assets/random/' + state.files[c.p - 1];
        return 'assets/' + String(c.p).padStart(2, '0') + '.png';
    }

    function myPlayerIndex() {
        return mode === 'guest' ? myIndex : 0;
    }

    function isConnected(p) {
        if (mode === 'practice' || p === 0) return true;
        return !!(conns[p - 1] && !conns[p - 1].left);
    }

    function isMyTurn() {
        if (!state || state.status === 'ended') return false;
        if (mode === 'practice') return true;   // one person plays all hands
        if (state.status === 'ready') return myPlayerIndex() === 0; // Player 1 starts the game
        return state.current === myPlayerIndex();
    }

    function fmtTime(ms) {
        const s = Math.floor(ms / 1000);
        return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
    }

    function currentElapsed() {
        if (!state) return 0;
        if (state.status === 'ended') return state.finalTime || 0;
        if (mode === 'guest') {
            return state.startedAt ? sync.elapsed + (Date.now() - sync.at) : 0;
        }
        return state.startedAt ? Date.now() - state.startedAt : 0;
    }

    function startTicker() {
        if (ticker) return;
        ticker = setInterval(updateTimerDisplay, 100);
    }

    function stopTicker() {
        if (ticker) { clearInterval(ticker); ticker = null; }
    }

    function updateTimerDisplay() {
        timerEl.textContent = fmtTime(currentElapsed());
    }

    function cleanupConnection() {
        if (revealTimer) { clearTimeout(revealTimer); revealTimer = null; }
        stopTicker();
        conns.forEach((c) => { if (c) { try { c.close(); } catch (e) { /* ignore */ } } });
        conns = [];
        if (conn) { try { conn.close(); } catch (e) { /* ignore */ } conn = null; }
        if (peer) { try { peer.destroy(); } catch (e) { /* ignore */ } peer = null; }
    }

    // ---------- responsive board sizing (always fits, no scrolling) ----------
    function gridDims() {
        return state ? { cols: state.cols, rows: state.rows } : { cols: 9, rows: 8 };
    }

    function resizeBoard() {
        const cw = boardWrap.clientWidth;
        const ch = boardWrap.clientHeight;
        if (cw <= 0 || ch <= 0) return;
        const dims = gridDims();
        let gap = Math.round(Math.min(8, Math.max(2, cw * 0.006)));
        let cell = Math.floor(Math.min((cw - (dims.cols - 1) * gap) / dims.cols,
            (ch - (dims.rows - 1) * gap) / dims.rows));
        gap = Math.round(Math.min(10, Math.max(2, cell * 0.08))); // refine gap for the final cell size
        cell = Math.floor(Math.min((cw - (dims.cols - 1) * gap) / dims.cols,
            (ch - (dims.rows - 1) * gap) / dims.rows));
        const root = document.documentElement.style;
        root.setProperty('--cell', Math.max(cell, 16) + 'px');
        root.setProperty('--gap', gap + 'px');
        root.setProperty('--cols', String(dims.cols));
    }

    // rebuild the board if the session's grid dimensions changed
    function ensureBoard() {
        const dims = gridDims();
        if (grid.children.length !== dims.cols * dims.rows) buildCards(dims.cols, dims.rows);
        document.documentElement.style.setProperty('--cols', String(dims.cols));
    }

    // ---------- board rendering ----------
    function buildCards(cols, rows) {
        grid.innerHTML = '';
        for (let i = 0; i < cols * rows; i++) {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.i = i;

            const inner = document.createElement('div');
            inner.className = 'card-inner';

            const back = document.createElement('div');
            back.className = 'card-face card-back';
            const backImg = document.createElement('img');
            backImg.src = 'assets/back.png';
            backImg.alt = 'card back';
            backImg.draggable = false;
            back.appendChild(backImg);

            const front = document.createElement('div');
            front.className = 'card-face card-front';
            const frontImg = document.createElement('img');
            frontImg.alt = 'card';
            frontImg.draggable = false;
            front.appendChild(frontImg);

            inner.appendChild(back);
            inner.appendChild(front);
            card.appendChild(inner);
            grid.appendChild(card);
        }
    }

    function render() {
        if (!state) return;
        for (let i = 0; i < state.cols * state.rows; i++) {
            const card = grid.children[i];
            const c = state.cards[i];
            const cls = 'card' + (c.s === 'down' ? '' : ' ' + c.s);
            if (card.className !== cls) card.className = cls;
            const img = card.querySelector('.card-front img');
            const src = cardSrcFor(c);
            if (img.getAttribute('src') !== src) img.setAttribute('src', src);
        }
        renderHud();
    }

    function playerName(p) {
        let name = PLAYER_NAMES[p] || 'Player ' + (p + 1);
        if (mode !== 'practice' && p === myPlayerIndex()) name += ' (you)';
        return name;
    }

    function renderHud() {
        // score chips (one per player)
        scoresEl.innerHTML = '';
        for (let p = 0; p < state.playerCount; p++) {
            const chip = document.createElement('div');
            chip.className = 'score' + (state.status === 'playing' && state.current === p ? ' active' : '');
            chip.dataset.p = p;
            const name = document.createElement('span');
            name.className = 'name';
            name.textContent = playerName(p);
            const pts = document.createElement('span');
            pts.className = 'pts';
            pts.textContent = state.scores[p];
            chip.appendChild(name);
            chip.appendChild(pts);
            scoresEl.appendChild(chip);
        }

        restartBtn.disabled = mode === null;
        flipsEl.textContent = state.flips + (state.flips === 1 ? ' flip' : ' flips');

        // status banner
        banner.classList.remove('win');
        if (state.status === 'ended') {
            const max = Math.max.apply(null, state.scores);
            const winners = [];
            for (let p = 0; p < state.playerCount; p++) {
                if (state.scores[p] === max) winners.push(playerName(p));
            }
            const totalPairs = state.scores.reduce(function (a, b) { return a + b; }, 0);
            const eff = state.flips ? Math.round(100 * totalPairs / state.flips) : 0;
            const stats = ' \u2014 ' + fmtTime(state.finalTime || 0) + ' \u2014 '
                + state.flips + ' flips (' + eff + '% efficiency)';
            let msg;
            if (winners.length === 1) {
                msg = winners[0] + ' wins! ' + state.scores.join(' \u2013 ') + stats;
            } else {
                msg = 'It\u2019s a tie between ' + winners.join(' & ') + ' at ' + max + stats;
            }
            showBanner(msg + ' \u2014 press restart to play again', true);
            updateTimerDisplay();
        } else if (state.status === 'ready') {
            if (mode === 'guest') {
                showBanner('Waiting for Player 1 to flip the first card\u2026', false);
            } else {
                showBanner('Flip the first card to start the cronometer \u2014 friends can still join', false);
            }
        } else if (mode === 'practice') {
            showBanner(PLAYER_NAMES[state.current] + '\u2019s turn \u2014 flip two cards', false);
        } else if (isMyTurn()) {
            showBanner('Your turn \u2014 flip two cards', false);
        } else {
            showBanner(playerName(state.current) + '\u2019s turn\u2026', false);
        }
        updateTimerDisplay();
    }

    function showBanner(text, win) {
        banner.textContent = text || '\u00a0';
        banner.classList.toggle('win', !!win);
    }


    // ---------- host game logic ----------
    function hostFlip(i, player) {
        if (!state || state.status === 'ended') return;
        if (state.flipped.length >= 2) return;               // busy resolving
        if (state.cards[i].s !== 'down') return;
        if (state.current !== player) return;                // not this player's turn

        // 'click' mode: the previous player's missed pair flips back now
        if (state.pending) {
            state.pending.forEach(function (k) { state.cards[k].s = 'down'; });
            state.pending = null;
        }

        // the very first flip starts the game and the cronometer
        if (state.status === 'ready') {
            state.status = 'playing';
            state.startedAt = Date.now();
            startTicker();
        }

        state.cards[i].s = 'up';
        state.flipped.push(i);
        broadcast();

        if (state.flipped.length === 2) {
            state.flips += 1;   // one two-card attempt counted
            const a = state.flipped[0], b = state.flipped[1];
            const token = ++restartToken;
            if (state.cards[a].p === state.cards[b].p) {
                // match: current player scores and plays again
                revealTimer = setTimeout(function () {
                    if (token !== restartToken) return;
                    state.cards[a].s = 'matched';
                    state.cards[b].s = 'matched';
                    state.scores[player] += 1;
                    state.flipped = [];
                    const allMatched = state.cards.every(function (c) { return c.s === 'matched'; });
                    if (allMatched) {
                        state.status = 'ended';
                        state.finalTime = Date.now() - state.startedAt;
                        state.elapsed = state.finalTime;
                        stopTicker();
                    }
                    revealTimer = null;
                    broadcast();
                }, MATCH_MS);
            } else if (revealMode !== 'click') {
                // mismatch: reveal for a moment, then flip back and pass the turn
                revealTimer = setTimeout(function () {
                    if (token !== restartToken) return;
                    state.cards[a].s = 'down';
                    state.cards[b].s = 'down';
                    state.flipped = [];
                    state.current = nextPlayer(player);
                    revealTimer = null;
                    broadcast();
                }, REVEAL_DELAYS[revealMode] || 3000);
            } else {
                // mismatch: the pair stays face-up until the next player clicks
                state.flipped = [];
                state.pending = [a, b];
                state.current = nextPlayer(player);
                broadcast();
            }
        }
    }

    function nextPlayer(from) {
        const n = state.playerCount;
        let next = from;
        for (let k = 0; k < n; k++) {
            next = (next + 1) % n;
            if (isConnected(next)) return next;   // skip disconnected players
        }
        return from;
    }

    function hostRestart() {
        if (!state) return;
        restartToken++;
        if (revealTimer) { clearTimeout(revealTimer); revealTimer = null; }
        // a random deck re-picks its 32 images for every new game
        const files = state.deck === 'random' && manifest ? pickRandomFiles() : state.files;
        state = newState(state.deck, files, state.playerCount);
        ensureBoard();
        broadcast();
    }

    function pickRandomFiles() {
        const pool = (manifest.images || []).slice();
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        return pool.slice(0, DECKS.random.pairs);
    }

    // resolve the selected deck, loading the random deck's manifest if needed
    async function prepareDeck() {
        if (deckMode !== 'random') return { deck: 'celuloks', files: null };
        if (!manifest) {
            const res = await fetch('assets/random/manifest.json');
            if (!res.ok) throw new Error('manifest');
            manifest = await res.json();
        }
        if (!manifest.images || manifest.images.length < DECKS.random.pairs) {
            throw new Error('not enough images');
        }
        return { deck: 'random', files: pickRandomFiles() };
    }

    function broadcast() {
        if (mode !== 'host') { render(); return; }
        if (state.status === 'playing') state.elapsed = Date.now() - state.startedAt;
        conns.forEach(function (c) {
            if (c && !c.left && c.open) c.send({ t: 'state', s: state });
        });
        render();
    }


    // ---------- networking (PeerJS) ----------
    function startHost(deck, files) {
        mode = 'host';
        myIndex = 0;
        showPanelWaiting();
        const code = randomCode(5);
        peer = new Peer(ROOM_PREFIX + code, { debug: 1 });

        peer.on('open', function () {
            showPanelWaiting();
            roomCodeEl.textContent = code;
            state = state || newState(deck, files, 1);
            updateLobbyCount();
            ensureBoard();
            resizeBoard();
            render();
        });

        peer.on('connection', function (c) {
            c.on('open', function () {
                // joins are only allowed before the game starts
                if (!state || state.status !== 'ready' || conns.length >= MAX_PLAYERS) {
                    c.send({ t: 'reject', reason: state && state.status !== 'ready'
                        ? 'The game has already started.' : 'This session is full (6 players max).' });
                    setTimeout(function () { try { c.close(); } catch (e) { /* ignore */ } }, 500);
                    return;
                }
                conns.push(c);
                const idx = conns.length;             // player number (1-based)
                while (state.scores.length < idx + 1) state.scores.push(0);
                state.playerCount = idx + 1;
                c.send({ t: 'welcome', idx: idx });
                c.send({ t: 'state', s: state });
                updateLobbyCount();
                broadcast();
            });
            c.on('data', function (msg) { onHostData(msg, c); });
            c.on('close', function () { onGuestLeft(c); });
            c.on('error', function () { onGuestLeft(c); });
        });

        peer.on('error', function (err) {
            if (err.type === 'unavailable-id') { startHost(); return; } // code collision: retry
            showSetupError('Connection error (' + err.type + '). Check your network and try again.');
            cleanupConnection();
            mode = null;
            showPanelHome();
        });
    }

    function onGuestLeft(c) {
        const i = conns.indexOf(c);
        if (i === -1 || c.left) return;
        c.left = true;
        if (state && state.status === 'ready') {
            // before the game starts: shrink back to the remaining players
            conns.splice(i, 1);
            state.scores.splice(i + 1, 1);
            state.playerCount = conns.length + 1;
            updateLobbyCount();
        } else {
            showBanner(playerName(i + 1) + ' disconnected \u2014 their turns will be skipped', false);
        }
        broadcast();
    }

    function onHostData(msg, c) {
        if (!msg) return;
        const player = conns.indexOf(c) + 1;
        if (msg.t === 'flip' && typeof msg.i === 'number') hostFlip(msg.i, player);
        else if (msg.t === 'restart') hostRestart();
    }

    function joinGame(code) {
        mode = 'guest';
        showPanelWaiting();
        playerCountEl.textContent = 'connecting\u2026';
        roomCodeEl.textContent = code;
        peer = new Peer({ debug: 1 });

        peer.on('open', function () {
            conn = peer.connect(ROOM_PREFIX + code, { reliable: true });
            conn.on('data', onGuestData);
            conn.on('close', onHostLeft);
            conn.on('error', onHostLeft);
        });

        peer.on('error', function (err) {
            showSetupError(
                err.type === 'peer-unavailable'
                    ? 'Session "' + code + '" not found. Check the code and try again.'
                    : 'Connection error (' + err.type + '). Check your network and try again.'
            );
            cleanupConnection();
            mode = null;
            showPanelHome();
        });
    }

    function onGuestData(msg) {
        if (!msg) return;
        if (msg.t === 'welcome' && typeof msg.idx === 'number') {
            myIndex = msg.idx;
            overlay.hidden = true;
            resizeBoard();
        } else if (msg.t === 'reject') {
            showSetupError(msg.reason || 'Could not join this session.');
            cleanupConnection();
            mode = null;
            showPanelHome();
        } else if (msg.t === 'state' && msg.s) {
            state = msg.s;
            sync = { elapsed: state.elapsed || 0, at: Date.now() };
            ensureBoard();
            resizeBoard();
            if (state.status === 'playing' || state.status === 'ended') startTicker();
            render();
        }
    }

    function onHostLeft() {
        if (mode !== 'guest') return;
        cleanupConnection();
        mode = null;
        state = null;
        showSetupError('The host ended the session.');
        showPanelHome();
        overlay.hidden = false;
    }

    function startPractice(deck, files) {
        mode = 'practice';
        myIndex = 0;
        const n = Math.min(MAX_PLAYERS, Math.max(1, parseInt($('practiceCount').value, 10) || 2));
        state = newState(deck, files, n);
        ensureBoard();
        overlay.hidden = true;
        resizeBoard();
        render();
    }

    function exitSession() {
        restartToken++;
        cleanupConnection();
        mode = null;
        state = null;
        myIndex = 0;
        buildCards(9, 8);   // fresh default board for the next session
        document.documentElement.style.setProperty('--cols', '9');
        overlay.hidden = false;
        showPanelHome();
        banner.textContent = '\u00a0';
        banner.classList.remove('win');
        timerEl.textContent = '0:00';
        scoresEl.innerHTML = '';
        restartBtn.disabled = true;
    }


    // ---------- enlarged card view ----------
    function openZoom(i) {
        if (!state) return;
        $('zoomImg').setAttribute('src', cardSrcFor(state.cards[i]));
        $('zoom').hidden = false;
    }

    function closeZoom() {
        $('zoom').hidden = true;
    }

    // ---------- lobby panel helpers ----------
    function showPanelHome() {
        setupHome.hidden = false;
        setupWaiting.hidden = true;
        setupError.hidden = true;
    }

    function showPanelWaiting() {
        setupHome.hidden = true;
        setupWaiting.hidden = false;
        setupError.hidden = true;
        roomCodeEl.textContent = '\u00b7\u00b7\u00b7\u00b7\u00b7';
    }

    function showSetupError(text) {
        setupHome.hidden = false;
        setupWaiting.hidden = true;
        setupError.hidden = false;
        setupError.textContent = text;
    }

    function updateLobbyCount() {
        if (!state) return;
        const n = state.playerCount;
        playerCountEl.textContent = n === 1
            ? 'waiting for players to join\u2026'
            : n + ' player' + (n > 1 ? 's' : '') + ' joined';
    }

    // ---------- input ----------
    grid.addEventListener('click', function (ev) {
        if (!overlay.hidden) return;
        const cardEl = ev.target.closest('.card');
        if (!cardEl || !state) return;
        const i = parseInt(cardEl.dataset.i, 10);
        const c = state.cards[i];
        // clicking a face-up card opens the enlarged view instead of flipping
        if (c.s === 'up' || c.s === 'matched') { openZoom(i); return; }
        if (!isMyTurn() || c.s !== 'down' || state.flipped.length >= 2) return;
        if (mode === 'guest') {
            if (conn && conn.open) conn.send({ t: 'flip', i: i });
        } else {
            hostFlip(i, state.current);   // host / practice: play for the current player
        }
    });

    $('zoom').addEventListener('click', closeZoom);
    document.addEventListener('keydown', function (ev) {
        if (ev.key === 'Escape') closeZoom();
    });

    restartBtn.addEventListener('click', function () {
        if (mode === 'guest') {
            if (conn && conn.open) conn.send({ t: 'restart' });
        } else if (mode) {
            hostRestart();
        }
    });

    exitBtn.addEventListener('click', exitSession);

    $('createBtn').addEventListener('click', async function () {
        if (typeof Peer === 'undefined') {
            showSetupError('Could not load the networking library. Check your internet connection and reload.');
            return;
        }
        cleanupConnection();
        try {
            const sel = await prepareDeck();
            startHost(sel.deck, sel.files);
        } catch (e) {
            showSetupError(e.message === 'not enough images'
                ? 'The random deck needs at least ' + DECKS.random.pairs
                    + ' images \u2014 add more to random_images/ and run prepare_deck.py.'
                : 'Could not load the random deck (assets/random/manifest.json).');
        }
    });

    $('joinBtn').addEventListener('click', function () {
        const code = $('joinCode').value.trim().toUpperCase();
        if (code.length < 4) { showSetupError('Enter the 5-character session code.'); return; }
        if (typeof Peer === 'undefined') {
            showSetupError('Could not load the networking library. Check your internet connection and reload.');
            return;
        }
        cleanupConnection();
        joinGame(code);
    });

    $('joinCode').addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter') $('joinBtn').click();
    });

    $('practiceBtn').addEventListener('click', async function () {
        cleanupConnection();
        try {
            const sel = await prepareDeck();
            startPractice(sel.deck, sel.files);
        } catch (e) {
            showSetupError(e.message === 'not enough images'
                ? 'The random deck needs at least ' + DECKS.random.pairs
                    + ' images \u2014 add more to random_images/ and run prepare_deck.py.'
                : 'Could not load the random deck (assets/random/manifest.json).');
        }
    });

    $('closeLobbyBtn').addEventListener('click', function () {
        overlay.hidden = true;
        resizeBoard();
    });

    roomCodeEl.addEventListener('click', function () {
        const code = roomCodeEl.textContent;
        if (code && code.indexOf('\u00b7') === -1 && navigator.clipboard) {
            navigator.clipboard.writeText(code);
            const prev = playerCountEl.textContent;
            playerCountEl.textContent = 'code copied to clipboard!';
            setTimeout(function () {
                if (playerCountEl.textContent === 'code copied to clipboard!') {
                    playerCountEl.textContent = prev;
                }
            }, 1500);
        }
    });

    // ---------- init ----------
    try {
        const savedReveal = localStorage.getItem('celuloks-reveal');
        if (savedReveal === 'click' || savedReveal === '1s' || savedReveal === '3s') revealMode = savedReveal;
        const savedDeck = localStorage.getItem('celuloks-deck');
        if (savedDeck === 'celuloks' || savedDeck === 'random') deckMode = savedDeck;
    } catch (e) { /* localStorage unavailable */ }
    $('revealMode').value = revealMode;
    $('revealMode').addEventListener('change', function () {
        revealMode = $('revealMode').value;
        try { localStorage.setItem('celuloks-reveal', revealMode); } catch (e) { /* ignore */ }
    });
    $('deckSelect').value = deckMode;
    $('deckSelect').addEventListener('change', function () {
        deckMode = $('deckSelect').value;
        try { localStorage.setItem('celuloks-deck', deckMode); } catch (e) { /* ignore */ }
    });

    showPanelHome();
    ensureBoard();
    restartBtn.disabled = true;
    timerEl.textContent = '0:00';
    flipsEl.textContent = '0 flips';
    resizeBoard();
    if (typeof ResizeObserver !== 'undefined') {
        new ResizeObserver(resizeBoard).observe(boardWrap);
    } else {
        window.addEventListener('resize', resizeBoard);
    }
})();

