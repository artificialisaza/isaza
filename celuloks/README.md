# celuloks

An online memory game for 2 to 6 players. Live at `https://www.isaza.xyz/celuloks/`
(once deployed to GitHub Pages).

## How to play

1. One player opens the page and presses **create session** — a 4-character
   code appears together with a **shareable invite link**. Send the link to
   your friends: opening it joins the session automatically (entering the
   code by hand works too).
2. Friends open the same page, enter the code and press **join**.
   (You can also go to the board alone and let people join later.)
3. The game starts — and the cronometer begins — when Player 1 flips the
   first card. From that moment no new players can join.
4. Players alternate turns. On your turn, flip two cards:
   - **Match** → the pair is yours (1 point) and you play again.
   - **No match** → the turn passes to the next player. By default the missed
     pair stays face-up until the next player clicks (so everyone gets a good
     look at it); the host can change this in the home screen to flip back
     after 1 or 3 seconds instead.
5. Click any face-up or matched card to see it enlarged (click again or press
   Esc to close).
6. When all 36 pairs are found, the cronometer stops and the player with the
   most pairs wins. The result also shows the total time, the number of flips
   (two-card attempts) and the group's efficiency (pairs found ÷ flips).
   Press **restart** to reshuffle and start over — cards snap face-down
   instantly with no animation, so new positions are never revealed.
   **exit** ends the session.

## Decks

The home screen has a deck selector (chosen by the host, remembered in the
browser). Every deck is a subfolder of `assets/` with its own card faces,
`manifest.json` and card back — plus a mix mode that pools them all:

- **celulokos de darks** (`assets/darks/`) — the original 36 images.
- **celulokos sin darks** (`assets/random/`) — 36 images picked at random
  each game from its own pool; restart picks 36 new ones.
- **A new perspective** (`assets/new_perspective/`) — the newest deck.
- **celulokos mezclados** — 36 images drawn at random from **all** the decks
  above, mixing cards from different decks; the card back is also picked at
  random. New decks you add later are included automatically.

All decks play on the same 9×8 grid (72 cards), and the board resizes itself
to fit the screen — all rows always visible, no scrolling.

There is also a **practice on this device** mode (1–6 simulated players) for
testing without an opponent.

### Adding or changing decks

Each deck has a source folder under `deck_sources/<deck-id>/`. Drop images
there (jpg, png, webp, avif, gif, bmp or tiff — any size or aspect ratio) and
regenerate:

    /opt/homebrew/bin/python3 celuloks/prepare_deck.py

The script converts everything to PNG, center-crops each image to a square,
caps it at 810×810, writes each deck's `manifest.json` and updates
`assets/decks.json` (the menu the game reads). Source images are never
modified. A file named `back.png` (or back.jpg etc.) in a deck's source
folder becomes that deck's card back. A deck needs at least 36 card faces to
start a game — until then it appears in the menu with a clear error. To add a
brand new deck: create `deck_sources/<id>/`, drop images in, run the script.

The board always resizes to fit the screen — on a 13" laptop the full 9×8 grid
is visible with no scrolling.

There is also a **practice on this device** mode (1–6 simulated players) for
testing without an opponent.

## Technical notes

- Pure static files — no changes to the main site, no backend required.
- Online play uses [PeerJS](https://peerjs.com) (WebRTC data channels) loaded
  from a CDN, with its free public broker for signaling. The host (Player 1)
  holds the authoritative game state; guests send actions and receive
  state updates, so every board always stays in sync.
- The board fits the viewport via a JS-computed `--cell` size, updated by a
  `ResizeObserver` — all 8 rows are always visible.
- The cronometer is started by the host on the first flip and broadcast with
  each state update (guests interpolate locally between updates), so it shows
  the same time for everyone.
- If a player disconnects mid-game, their turns are skipped automatically.
- If you self-host a PeerJS server someday, set it in `js/game.js` via the
  `Peer` options object (see PeerJS docs) — everything else stays the same.

## Replacing the card back

The card back is `assets/back.png` (512x512). It is currently a generated
placeholder — just overwrite it with your artwork (square image recommended;
it is displayed with `object-fit: cover`). The generator script for the
placeholder is `assets/make_back_placeholder.py`.

## Files

- `index.html` — page structure and lobby UI
- `css/style.css` — layout, responsive grid, flip animations, zoom view
- `js/game.js` — game logic and WebRTC session handling
- `prepare_deck.py` — builds every deck from `deck_sources/` (PNG squares +
  manifests + `assets/decks.json`)
- `deck_sources/<deck>/` — source images for each deck (never modified)
- `assets/<deck>/` — generated decks: card faces, `manifest.json`, `back.png`
- `assets/decks.json` — deck registry (names + ids) read by the game menu
