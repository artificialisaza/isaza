"""Prepare all celuloks decks.

For every subfolder of deck_sources/ (e.g. deck_sources/random/) this script
converts every image found there (jpg, png, webp, avif, gif, bmp, tiff - any
size or aspect ratio) into a standardized square PNG (center-crop, max
810x810) and writes it to assets/<deck-id>/NN.png, plus:

  - assets/<deck-id>/manifest.json  (list of image files + the deck's back)
  - assets/decks.json               (registry of all decks, read by the game)

A file named back.* inside a deck's source folder is used as that deck's
card back (assets/<deck-id>/back.png) and is not counted as a card face.
If a deck has no back file, whatever back.png already exists in the output
folder is kept untouched.

The source images themselves are never modified - run this script again any
time you add, remove or replace images in a deck's source folder:

    /opt/homebrew/bin/python3 celuloks/prepare_deck.py
"""
from PIL import Image
import glob
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
SOURCES = os.path.join(HERE, 'deck_sources')
OUT = os.path.join(HERE, 'assets')
MAX_SIDE = 810
EXTS = ('.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif', '.bmp', '.tif', '.tiff')

# pretty names for the deck menu; unknown decks get their id prettified
DECK_NAMES = {
    'darks': 'celulokos de darks',
    'random': 'celulokos sin darks',
    'new_perspective': 'A new perspective',
}


def prettify(deck_id):
    return deck_id.replace('_', ' ').replace('-', ' ').strip().capitalize()


def load_image(path):
    im = Image.open(path)
    im.load()
    if im.mode in ('RGBA', 'LA', 'P', 'PA'):
        im = im.convert('RGBA')
        bg = Image.new('RGB', im.size, (255, 255, 255))
        bg.paste(im, mask=im.split()[-1])
        return bg
    if im.mode != 'RGB':
        return im.convert('RGB')
    return im


def process(path):
    """Center-crop to a square and cap the resolution."""
    im = load_image(path)
    w, h = im.size
    side = min(w, h)
    left, top = (w - side) // 2, (h - side) // 2
    im = im.crop((left, top, left + side, top + side))
    if side > MAX_SIDE:
        im = im.resize((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
    return im, (w, h)


def build_deck(deck_id, src_dir, out_dir):
    os.makedirs(out_dir, exist_ok=True)
    # remove previously generated card faces (backs are kept)
    for old in glob.glob(os.path.join(out_dir, '[0-9]*.png')):
        os.remove(old)

    files = sorted(f for f in glob.glob(os.path.join(src_dir, '*'))
                   if os.path.isfile(f) and f.lower().endswith(EXTS))
    images, skipped, back_name = [], [], None
    for f in files:
        name = os.path.basename(f)
        is_back = re.match(r'^back\.', name.lower()) is not None
        try:
            im, orig = process(f)
        except Exception as e:
            skipped.append((name, str(e)))
            continue
        if is_back:
            im.save(os.path.join(out_dir, 'back.png'), 'PNG', optimize=True)
            back_name = 'back.png'
            print('  back: %s -> back.png %s' % (name, '%dx%d' % im.size))
            continue
        out_name = str(len(images) + 1).zfill(2) + '.png'
        im.save(os.path.join(out_dir, out_name), 'PNG', optimize=True)
        images.append(out_name)
        print('  %-60s %s -> %s' % (name, '%dx%d' % orig, out_name))

    if back_name is None and not os.path.isfile(os.path.join(out_dir, 'back.png')):
        print('  WARNING: deck "%s" has no back.png (source or previous)' % deck_id)

    source_faces = sum(1 for f in files if re.match(r'^back\.', os.path.basename(f).lower()) is None)
    with open(os.path.join(out_dir, 'manifest.json'), 'w') as fh:
        json.dump({'images': images, 'back': 'back.png'}, fh, indent=1)
    print('  %d of %d source images processed -> %d card faces, back=%s'
          % (len(images), source_faces, len(images),
             'yes' if os.path.isfile(os.path.join(out_dir, 'back.png')) else 'MISSING'))
    for name, err in skipped:
        print('  SKIPPED %s (%s)' % (name, err))
    return len(images)


def main():
    decks = {}
    for src_dir in sorted(glob.glob(os.path.join(SOURCES, '*'))):
        if not os.path.isdir(src_dir):
            continue
        deck_id = os.path.basename(src_dir)
        print('deck "%s":' % deck_id)
        n = build_deck(deck_id, src_dir, os.path.join(OUT, deck_id))
        decks[deck_id] = {'name': DECK_NAMES.get(deck_id, prettify(deck_id))}
        if n < 36:
            print('  WARNING: deck "%s" has only %d card faces '
                  '(the game needs 36) - it will appear in the menu but '
                  'cannot start until you add more images' % (deck_id, n))

    with open(os.path.join(OUT, 'decks.json'), 'w') as fh:
        json.dump(decks, fh, indent=1)
    print('\nregistered decks: %s' % ', '.join(decks))


if __name__ == '__main__':
    main()
