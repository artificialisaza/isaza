# celuloks

An online memory game for two players. Live at `https://www.isaza.xyz/celuloks/`
(once deployed to GitHub Pages).

## How to play

1. One player opens the page and presses **create session** — a 5-character
   code appears. Share it with your friend.
2. The friend opens the same page, enters the code and presses **join**.
3. Players alternate turns. On your turn, flip two cards:
   - **Match** → the pair is yours (1 point) and you play again.
   - **No match** → the cards flip back and the turn passes.
4. When all 36 pairs are found, the player with the most pairs wins.
   Press **restart** to reshuffle and start over. **exit** ends the session.

There is also a **practice on this device** mode for testing without an opponent.

## Technical notes

- Pure static files — no changes to the main site, no backend required.
- Online play uses [PeerJS](https://peerjs.com) (WebRTC data channels) loaded
  from a CDN, with its free public broker for signaling. The host (Player 1)
  holds the authoritative game state; the guest sends actions and receives
  state updates, so both boards always stay in sync.
- If you self-host a PeerJS server someday, set it in `js/game.js` via the
  `Peer` options object (see PeerJS docs) — everything else stays the same.

## Replacing the card back

The card back is `assets/back.png` (512x512). It is currently a generated
placeholder — just overwrite it with your artwork (square image recommended;
it is displayed with `object-fit: cover`). The generator script for the
placeholder is `assets/make_back_placeholder.py`.

## Files

- `index.html` — page structure and lobby UI
- `css/style.css` — layout, responsive 9×8 grid, flip animations
- `js/game.js` — game logic and WebRTC session handling
- `assets/01.png` … `36.png` — the 36 card faces (each used twice)
