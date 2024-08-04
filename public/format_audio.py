import os
import sys
import subprocess
from colorama import init, Fore, Style

# Initialize colorama for cross-platform colored output
init()

basedir = "./public/audio"
extensions = ["mp3", "mp4", "ogg", "flac"]

def show_help():
    print("Usage: python format_audio.py [convert|unconvert] [directory]")
    print("Options:")
    print("  convert         Convert WAV files to other formats")
    print("  unconvert       Remove converted audio files")
    print("  directory       Specify the directory to process (optional)")
    print("  --help          Display this help message")

def convert(directory=None):
    dir_path = os.path.join(basedir, directory) if directory else basedir
    print(f"Processing directory: {dir_path}")

    for root, _, files in os.walk(dir_path):
        for file in files:
            if file.endswith(".wav"):
                file_path = os.path.join(root, file)
                print(f"{'#' * 20}")
                print(f"Processing {file_path}")
                base = os.path.splitext(file_path)[0]
                for ext in extensions:
                    output_file = f"{base}.{ext}"
                    print(f"Converting to {output_file}")
                    subprocess.run(["ffmpeg", "-i", file_path, output_file], check=True)
                    print(f"{Fore.GREEN}File {output_file} successfully converted{Style.RESET_ALL}")

    print(f"{Fore.GREEN}All files converted successfully{Style.RESET_ALL}")

def unconvert(directory=None):
    print("Starting files unconverting script")
    dir_path = os.path.join(basedir, directory) if directory else basedir
    print(f"Processing directory: {dir_path}")

    for ext in extensions:
        for root, _, files in os.walk(dir_path):
            for file in files:
                if file.endswith(f".{ext}"):
                    file_path = os.path.join(root, file)
                    os.remove(file_path)
                    print(f"Removed: {file_path}")

    print(f"{Fore.GREEN}All specified files removed successfully{Style.RESET_ALL}")

if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] == "--help":
        show_help()
        sys.exit(0)

    action = sys.argv[1]
    directory = sys.argv[2] if len(sys.argv) > 2 else None

    if action not in ["convert", "unconvert"]:
        print(f"{Fore.RED}Invalid action argument. Please specify either 'convert' or 'unconvert'.{Style.RESET_ALL}")
        sys.exit(1)

    if action == "convert":
        convert(directory)
    else:
        unconvert(directory)
