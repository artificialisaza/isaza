/* Functional tests for celuloks/js/game.js — practice-mode flow with a DOM stub.
   Run with:  node celuloks/test/game.test.js                                     */
const fs = require('fs');
const path = require('path');

function makeEl(tag) {
    const el = {
        tag, children: [], className: '', textContent: '', hidden: false,
        dataset: {}, disabled: false, value: '2',
        _attrs: {}, listeners: {}, parentElement: null,
        style: { setProperty() {} },
        addEventListener(t, f) { (this.listeners[t] = this.listeners[t] || []).push(f); },
    };
    let _html = '';
    Object.defineProperty(el, 'innerHTML', {
        get() { return _html; },
        set(v) { _html = v; el.children = []; },
    });
    Object.assign(el, {
        click(t, ev) { (this.listeners[t] || []).forEach((f) => f(ev || { target: el })); },
        appendChild(c) { c.parentElement = el; el.children.push(c); return c; },
        setAttribute(k, v) { el._attrs[k] = v; },
        getAttribute(k) { return k in el._attrs ? el._attrs[k] : null; },
        querySelector(sel) {
            const pred = (w) => (c) => w.startsWith('.')
                ? String(c.className).split(' ').includes(w.slice(1))
                : c.tag === w;
            let scope = [el];
            for (const w of sel.split(' ').filter(Boolean)) {
                const match = pred(w);
                let found = null;
                const queue = [];
                scope.forEach((s) => queue.push(...s.children));
                while (queue.length) {
                    const node = queue.shift();
                    if (match(node)) { found = node; break; }
                    queue.push(...node.children);
                }
                if (!found) return null;
                scope = [found];
            }
            return scope[0];
        },
        closest(sel) {
            let n = el;
            while (n) {
                if (n.className && String(n.className).split(' ').includes(sel.slice(1))) return n;
                n = n.parentElement;
            }
            return null;
        },
        classList: { add() {}, remove() {}, toggle() {}, contains() { return false; } },
    });
    return el;
}

const byId = {};
const grid = makeEl('div');

global.document = {
    getElementById(id) {
        if (id === 'grid') return grid;
        if (!byId[id]) byId[id] = makeEl('div');
        return byId[id];
    },
    createElement(tag) { return makeEl(tag); },
    documentElement: makeEl('html'),
    addEventListener() {},
};
global.navigator = {};
global.window = global;
global.addEventListener = function () {};
global.ResizeObserver = undefined;
global.localStorage = { getItem: () => null, setItem() {} };
global.fetch = async (url) => ({
    ok: true,
    json: async () => {
        if (String(url).indexOf('decks.json') !== -1) {
            return {
                darks: { name: 'celulokos de darks' },
                random: { name: 'celulokos sin darks' },
                new_perspective: { name: 'A new perspective' },
            };
        }
        return {
            images: Array.from({ length: 40 }, (_, i) => String(i + 1).padStart(2, '0') + '.png'),
            back: 'back.png',
        };
    },
});

eval(fs.readFileSync(path.join(__dirname, '..', 'js', 'game.js'), 'utf8'));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const cardSrc = (i) => grid.children[i].querySelector('.card-front img').getAttribute('src');
const backSrc = () => grid.children[0].querySelector('.card-back img').getAttribute('src');
const flip = (i) => grid.click('click', { target: grid.children[i] });
const bannerText = () => byId['banner'].textContent;

let failures = 0;
function assert(cond, msg) {
    if (cond) console.log('  ok -', msg);
    else { failures++; console.error('  FAIL -', msg); }
}

function findMatchPair() {
    const N = grid.children.length;
    const seen = {};
    for (let i = 0; i < N; i++) {
        const cls = grid.children[i].className;
        if (cls.includes('matched') || cls.includes('up')) continue;
        const s = cardSrc(i);
        if (seen[s] !== undefined) return [seen[s], i];
        seen[s] = i;
    }
    return null;
}

function findMismatchPair() {
    const N = grid.children.length;
    for (let i = 0; i < N; i++) {
        const cls = grid.children[i].className;
        if (cls.includes('matched') || cls.includes('up')) continue;
        for (let j = i + 1; j < N; j++) {
            const cls2 = grid.children[j].className;
            if (cls2.includes('matched') || cls2.includes('up')) continue;
            if (cardSrc(i) !== cardSrc(j)) return [i, j];
        }
    }
    return null;
}

function scoreChip(p) {
    return byId['scores'].children.find((c) => String(c.dataset.p) === String(p));
}

function pts(p) {
    return String(scoreChip(p).children.find((x) => x.className === 'pts').textContent);
}

(async function run() {
    // ===== 2-player practice, darks deck =====
    document.getElementById('practiceCount'); // ensure the element exists in the stub
    byId['practiceCount'].value = '2';
    byId['practiceBtn'].click('click');
    await sleep(30);   // deck preparation is async
    assert(byId['overlay'].hidden === true, 'overlay hidden after starting practice');
    assert(grid.children.length === 72, '72 cards built (9 x 8)');
    assert(backSrc() === 'assets/darks/back.png', 'darks deck back is used by default');
    assert(bannerText().includes('Flip the first card'), 'ready state: waiting for the first flip');
    assert(byId['timer'].textContent === '0:00', 'cronometer at 0:00 before the first flip');
    assert(byId['flips'].textContent === '0 flips', 'flips counter starts at 0');
    assert(scoreChip(0) && scoreChip(1), 'two score chips rendered');

    // -- mismatch ('click' mode): turn passes immediately, pair stays face-up --
    let [a, b] = findMismatchPair();
    flip(a); await sleep(150);
    flip(b); await sleep(100);
    assert(!bannerText().includes('Flip the first card') && bannerText().includes('flip two cards'),
        'game started after the first flip');
    await sleep(1200);
    assert(byId['timer'].textContent !== '0:00', 'cronometer is running (' + byId['timer'].textContent + ')');
    assert(bannerText().includes('Player 2'), 'turn passed to Player 2 after mismatch');
    assert(pts(0) === '0', 'no points on mismatch');
    assert(byId['flips'].textContent === '1 flip', 'flips counter counts the two-card attempt');
    assert(grid.children[a].className.includes('up') && grid.children[b].className.includes('up'),
        'missed pair stays face-up');
    assert(grid.children.filter((x) => x.className.includes('up')).length === 2, 'exactly 2 cards are up');
    assert(grid.children.filter((x) => x.className === 'card').length === 70, 'third click ignored while pair is up');

    // -- zoom: clicking a face-up card enlarges it --
    flip(a);
    assert(byId['zoom'].hidden === false, 'clicking a face-up card opens the zoom view');
    assert(byId['zoomImg'].getAttribute('src') === cardSrc(a), 'zoom shows the enlarged card image');
    byId['zoom'].click('click');
    assert(byId['zoom'].hidden === true, 'clicking the zoom view closes it');

    // -- the next player's click flips the missed pair back and plays their card --
    let c = 0;
    while (grid.children[c].className !== 'card') c++;
    flip(c); await sleep(100);
    assert(grid.children[a].className === 'card' && grid.children[b].className === 'card',
        'missed pair flips back on the next player\u2019s click');
    assert(grid.children[c].className.includes('up'), 'next player flips their own card');

    // -- P2 completes the turn: match with c, then another match --
    let d = -1;
    for (let k = 0; k < 72; k++) {
        if (k !== c && grid.children[k].className === 'card' && cardSrc(k) === cardSrc(c)) { d = k; break; }
    }
    flip(d); await sleep(900);
    assert(grid.children[c].className.includes('matched') && grid.children[d].className.includes('matched'),
        'P2 matched the card they kept up');
    const [e, f] = findMatchPair();
    flip(e); await sleep(40);
    flip(f); await sleep(900);
    assert(bannerText().includes('Player 2'), 'Player 2 keeps the turn after matches');
    assert(pts(1) === '2', 'Player 2 scored 2 pairs');
    assert(byId['flips'].textContent === '3 flips', 'flips counter at 3 after two matches');
    assert(grid.children.filter((x) => x.className.includes('matched')).length === 4, '4 cards matched');

    // -- mismatch from P2 stays up and returns the turn to P1 --
    [a, b] = findMismatchPair();
    flip(a); await sleep(40);
    flip(b); await sleep(100);
    assert(bannerText().includes('Player 1'), 'turn returned to Player 1');
    assert(pts(1) === '2', 'score unchanged after P2 mismatch');
    assert(grid.children.filter((x) => x.className.includes('up')).length === 2, 'P2\u2019s missed pair also stays up');
    assert(byId['flips'].textContent === '4 flips', 'flips counter at 4 after the mismatch');

    // -- restart: back to ready, timer reset, no reveal of new positions --
    byId['restartBtn'].click('click');
    await sleep(30);   // restart re-resolves the deck asynchronously
    assert(pts(0) === '0' && pts(1) === '0', 'restart resets scores');
    assert(bannerText().includes('Flip the first card'), 'restart returns to ready state');
    assert(byId['timer'].textContent === '0:00', 'restart resets the cronometer');
    assert(byId['flips'].textContent === '0 flips', 'restart resets the flips counter');
    assert(grid.children.every((x) => x.className === 'card'), 'restart flips all cards down');


    // -- auto-play to completion (Player 1 plays alone, keeps turn on matches) --
    for (let round = 0; round < 36; round++) {
        const pair = findMatchPair();
        if (!pair) break;
        flip(pair[0]); await sleep(40);
        flip(pair[1]); await sleep(850);
    }
    const finalT = byId['timer'].textContent;
    assert(bannerText().includes('wins!') && bannerText().includes(finalT),
        'winner banner with time: "' + bannerText() + '"');
    assert(bannerText().includes('36 flips (100% efficiency)'), 'result shows flips and efficiency');
    await sleep(400);
    assert(byId['timer'].textContent === finalT, 'cronometer stopped at the final time');
    assert(parseInt(pts(0), 10) + parseInt(pts(1), 10) === 36, 'all 36 pairs found');

    // -- exit --
    byId['exitBtn'].click('click');
    assert(byId['overlay'].hidden === false, 'exit returns to the lobby');
    assert(grid.children.length === 72
        && grid.children.every((x) => x.className === 'card'), 'exit leaves a fresh, face-down board');
    assert(backSrc() === 'assets/darks/back.png', 'default board uses the darks deck back');

    // ===== 6-player practice: turn rotation =====
    byId['practiceCount'].value = '6';
    byId['practiceBtn'].click('click');
    await sleep(30);   // deck preparation is async
    assert(scoreChip(5) !== undefined, '6 score chips rendered');
    let [x, y] = findMismatchPair();
    flip(x); await sleep(40);
    flip(y); await sleep(100);
    assert(bannerText().includes('Player 2'), 'with 6 players, turn goes 1 -> 2 after mismatch');
    byId['exitBtn'].click('click');

    // ===== "celulokos sin darks": 36 random picks from its own pool =====
    byId['deckSelect'].value = 'random';
    byId['deckSelect'].click('change');
    byId['practiceCount'].value = '2';
    byId['practiceBtn'].click('click');
    await sleep(50);
    assert(byId['overlay'].hidden === true, 'sin darks: practice starts');
    assert(grid.children.length === 72, 'sin darks: 72 cards (9 x 8)');
    const srcs = grid.children.map((x) => x.querySelector('.card-front img').getAttribute('src'));
    assert(srcs.every((s) => s.startsWith('assets/random/')), 'sin darks: card faces come from assets/random/');
    assert(new Set(srcs).size === 36, 'sin darks: exactly 36 distinct images');
    assert(backSrc() === 'assets/random/back.png', 'sin darks: uses its own card back');
    let [ra, rb] = findMismatchPair();
    flip(ra); await sleep(40);
    flip(rb); await sleep(100);
    assert(byId['flips'].textContent === '1 flip', 'sin darks: flips counter works');
    assert(bannerText().includes('Player 2'), 'sin darks: turn rotation works');
    byId['restartBtn'].click('click');
    await sleep(30);
    const srcs2 = grid.children.map((x) => x.querySelector('.card-front img').getAttribute('src'));
    assert(new Set(srcs2).size === 36, 'sin darks: restart re-picks 36 images');
    byId['exitBtn'].click('click');
    assert(grid.children.length === 72
        && grid.children.every((x) => x.className === 'card'), 'exit leaves a fresh board');

    // ===== "A new perspective": same grid, its own images and back =====
    byId['deckSelect'].value = 'new_perspective';
    byId['deckSelect'].click('change');
    byId['practiceBtn'].click('click');
    await sleep(50);
    assert(byId['overlay'].hidden === true, 'new perspective: practice starts');
    assert(grid.children.length === 72, 'new perspective: 72 cards (9 x 8)');
    const srcs3 = grid.children.map((x) => x.querySelector('.card-front img').getAttribute('src'));
    assert(srcs3.every((s) => s.startsWith('assets/new_perspective/')),
        'new perspective: card faces come from its own folder');
    assert(new Set(srcs3).size === 36, 'new perspective: exactly 36 distinct images');
    assert(backSrc() === 'assets/new_perspective/back.png', 'new perspective: uses its own card back');
    byId['exitBtn'].click('click');

    // ===== mix mode: 36 images pooled from ALL decks =====
    byId['deckSelect'].value = 'mix';
    byId['deckSelect'].click('change');
    byId['practiceBtn'].click('click');
    await sleep(50);
    assert(byId['overlay'].hidden === true, 'mix mode: practice starts');
    assert(grid.children.length === 72, 'mix mode: 72 cards (9 x 8)');
    const srcs4 = grid.children.map((x) => x.querySelector('.card-front img').getAttribute('src'));
    const prefixes = new Set(srcs4.map((s) => s.split('/')[1]));
    assert(srcs4.every((s) => /^assets\/(darks|random|new_perspective)\//.test(s)),
        'mix mode: faces come from the deck folders');
    assert(prefixes.size === 3, 'mix mode: cards from all 3 decks are mixed');
    const mixBack = backSrc();
    assert(/^assets\/(darks|random|new_perspective)\/back\.png$/.test(mixBack),
        'mix mode: uses a deck card back (' + mixBack + ')');
    byId['restartBtn'].click('click');
    await sleep(50);
    const srcs5 = grid.children.map((x) => x.querySelector('.card-front img').getAttribute('src'));
    const bad5 = srcs5.filter((s) => !/^assets\/(darks|random|new_perspective)\//.test(s));
    assert(bad5.length === 0,
        'mix mode: restart re-picks from all decks' + (bad5.length ? ' \u2014 bad: ' + bad5.join(', ') : ''));

    // ===== 1s flip-back mode =====
    byId['deckSelect'].value = 'darks';
    byId['deckSelect'].click('change');
    byId['revealMode'].value = '1s';
    byId['revealMode'].click('change');
    byId['practiceCount'].value = '2';
    byId['practiceBtn'].click('click');
    await sleep(30);
    let [m1, n1] = findMismatchPair();
    flip(m1); await sleep(40);
    flip(n1); await sleep(100);
    assert(grid.children[m1].className.includes('up'), '1s mode: missed pair stays up briefly');
    await sleep(1200);
    assert(bannerText().includes('Player 2'), '1s mode: turn passes after the delay');
    assert(grid.children.every((x) => x.className === 'card'), '1s mode: missed pair flips back after 1s');
    byId['exitBtn'].click('click');

    // ===== 3s flip-back mode =====
    byId['revealMode'].value = '3s';
    byId['revealMode'].click('change');
    byId['practiceBtn'].click('click');
    await sleep(30);
    let [m, n] = findMismatchPair();
    flip(m); await sleep(40);
    flip(n); await sleep(100);
    assert(grid.children[m].className.includes('up') && grid.children[n].className.includes('up'),
        '3s mode: missed pair stays up briefly');
    await sleep(3200);
    assert(bannerText().includes('Player 2'), '3s mode: turn passes after the delay');
    assert(grid.children.every((x) => x.className === 'card'), '3s mode: missed pair flips back after 3s');

    byId['exitBtn'].click('click');

    console.log(failures === 0 ? '\nALL TESTS PASSED' : '\n' + failures + ' TEST(S) FAILED');
    process.exit(failures === 0 ? 0 : 1);
})();

