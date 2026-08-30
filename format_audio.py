#!/usr/bin/env python3
"""Convert the .wav masters in public/audio into the formats the app plays.

Only the .wav files are committed; the rest are generated and gitignored.
`yarn audio` runs this, and `yarn install` runs that, so a fresh clone gets
playable audio without a manual step.
"""

import os
import shutil
import subprocess
import sys

BASEDIR = "./public/audio"
EXTENSIONS = ["mp3", "mp4", "ogg", "flac"]


def wav_files(directory=None):
    root_dir = os.path.join(BASEDIR, directory) if directory else BASEDIR
    for root, _, files in os.walk(root_dir):
        for name in sorted(files):
            if name.endswith(".wav"):
                yield os.path.join(root, name)


def convert(directory=None):
    if shutil.which("ffmpeg") is None:
        print("ERROR: ffmpeg not found, so the audio cannot be generated.")
        print("The app will not play anything without it.")
        print("Install it (macOS: brew install ffmpeg) and run `yarn install`")
        print("again, or `yarn audio` on its own.")
        return 1

    converted = skipped = 0
    for wav in wav_files(directory):
        base = os.path.splitext(wav)[0]
        for ext in EXTENSIONS:
            out = f"{base}.{ext}"
            # Already generated and no older than its source: nothing to do.
            if os.path.exists(out) and os.path.getmtime(out) >= os.path.getmtime(wav):
                skipped += 1
                continue
            subprocess.run(
                ["ffmpeg", "-y", "-loglevel", "error", "-i", wav, out],
                check=True,
            )
            converted += 1

    print(f"Audio: {converted} converted, {skipped} already up to date.")
    return 0


def unconvert(directory=None):
    removed = 0
    for wav in wav_files(directory):
        base = os.path.splitext(wav)[0]
        for ext in EXTENSIONS:
            out = f"{base}.{ext}"
            if os.path.exists(out):
                os.remove(out)
                removed += 1
    print(f"Audio: removed {removed} generated files.")
    return 0


def show_help():
    print("Usage: python3 format_audio.py [convert|unconvert] [directory]")
    print("  convert     Generate the playable formats from the .wav masters")
    print("  unconvert   Delete the generated formats")
    print("  directory   Limit to a subdirectory of public/audio (optional)")


if __name__ == "__main__":
    action = sys.argv[1] if len(sys.argv) > 1 else "--help"
    directory = sys.argv[2] if len(sys.argv) > 2 else None

    if action == "convert":
        sys.exit(convert(directory))
    elif action == "unconvert":
        sys.exit(unconvert(directory))
    else:
        show_help()
        sys.exit(0 if action == "--help" else 1)
