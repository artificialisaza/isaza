#!/usr/bin/env python3
"""Generate the temporary card-back placeholder (celuloks/assets/back.png).

Pure-stdlib PNG writer (no PIL needed). Produces a 512x512 PNG with a dark
slate background, a soft border frame and a simple diamond motif — just a
stand-in until the real card-back artwork replaces assets/back.png.
"""
import struct, zlib, os

W = H = 512
BG = (26, 30, 40)
FRAME = (90, 98, 118)
MOTIF = (232, 193, 90)   # accent gold
MARGIN = 28
LW = 6                   # frame line width

def px(x, y):
    # background
    r, g, b = BG
    d = min(abs(x - y), abs(x - (W - 1 - y)))  # distance to a diamond edge
    cx, cy = W / 2 - 0.5, H / 2 - 0.5
    dist = abs(x - cx) / (W * 0.30) + abs(y - cy) / (H * 0.30)
    if MARGIN <= x < W - MARGIN and MARGIN <= y < H - MARGIN:
        # inside the frame
        if x < MARGIN + LW or x >= W - MARGIN - LW or y < MARGIN + LW or y >= H - MARGIN - LW:
            r, g, b = FRAME
        elif dist <= 1.0 and dist >= 0.86:
            r, g, b = MOTIF          # diamond outline
        elif dist <= 0.30:
            r, g, b = MOTIF          # diamond core
    return (r, g, b)

rows = bytearray()
for y in range(H):
    rows.append(0)  # filter: none
    for x in range(W):
        rows.extend(px(x, y))

def chunk(tag, data):
    c = struct.pack('>I', len(data)) + tag + data
    return c + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)

png = b'\x89PNG\r\n\x1a\n'
png += chunk(b'IHDR', struct.pack('>IIBBBBB', W, H, 8, 2, 0, 0, 0))
png += chunk(b'IDAT', zlib.compress(bytes(rows), 9))
png += chunk(b'IEND', b'')

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'back.png')
with open(out, 'wb') as f:
    f.write(png)
print('wrote', out, len(png), 'bytes')
