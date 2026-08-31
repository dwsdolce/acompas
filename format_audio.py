#!/usr/bin/env python3
"""Convert the .wav masters in public/audio into the formats the app plays.

Only the .wav files are committed; the rest are generated and gitignored.
`yarn audio` runs this, and `yarn install` runs that, so a fresh clone gets
playable audio without a manual step. The install passes --optional, so a
missing ffmpeg warns instead of failing the whole dependency install.
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


def missing_ffmpeg(optional):
    """Report the absent converter, and say whether that is fatal.

    Returns the exit status to stop with.
    """
    label = "WARNING" if optional else "ERROR"
    print(f"{label}: ffmpeg not found, so the audio cannot be generated.")
    print("The app will not play anything without it.")
    print("Install it (macOS: brew install ffmpeg) and run `yarn install`")
    print("again, or `yarn audio` on its own.")
    return 0 if optional else 1


def convert(directory=None, optional=False):
    converted = skipped = 0
    # Looked up on the first file that actually needs converting, not on entry.
    # Everything here is generated against the .wav masters, so a tree that is
    # already up to date - a fresh clone with a warm CI cache, or a second
    # `yarn install` - needs no converter at all, and demanding one there fails
    # a build that had nothing to do.
    ffmpeg = False

    for wav in wav_files(directory):
        base = os.path.splitext(wav)[0]
        for ext in EXTENSIONS:
            out = f"{base}.{ext}"
            # Already generated and no older than its source: nothing to do.
            if os.path.exists(out) and os.path.getmtime(out) >= os.path.getmtime(wav):
                skipped += 1
                continue

            if ffmpeg is False:
                ffmpeg = shutil.which("ffmpeg")
            if ffmpeg is None:
                return missing_ffmpeg(optional)

            # A converter that is present but fails is a real error in both
            # modes: --optional forgives ffmpeg being absent, nothing else.
            subprocess.run(
                [ffmpeg, "-y", "-loglevel", "error", "-i", wav, out],
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
    print("Usage: python3 format_audio.py [convert|unconvert] [directory] [--optional]")
    print("  convert     Generate the playable formats from the .wav masters")
    print("  unconvert   Delete the generated formats")
    print("  directory   Limit to a subdirectory of public/audio (optional)")
    print("  --optional  Warn instead of failing when ffmpeg is not installed")


if __name__ == "__main__":
    flags = [arg for arg in sys.argv[1:] if arg.startswith("-")]
    words = [arg for arg in sys.argv[1:] if not arg.startswith("-")]

    action = words[0] if words else "--help"
    directory = words[1] if len(words) > 1 else None
    optional = "--optional" in flags

    if action == "convert":
        sys.exit(convert(directory, optional))
    elif action == "unconvert":
        sys.exit(unconvert(directory))
    else:
        show_help()
        sys.exit(0 if not words else 1)
