#!/bin/bash

# This script is made to automatically produce each necessary format on each sound
# from an original .wav file
# Make sure to have ffmpeg installed before running
# Don't forget to perform chmod +x format_audio.sh too

# Usage:
# sh ./format_audio.sh convert [directory]
# sh ./format_audio.sh unconvert [directory]
# sh ./format_audio.sh --help

basedir="./public/audio"
extensions=("mp3" "mp4" "ogg" "flac")

Color_Off='\033[0m'       # Text Reset
Green='\033[0;32m'        # Green
BGreen='\033[1;32m'       # Bold Green
Red='\033[0;31m'          # Red

show_help() {
  echo "Usage: sh ./format_audio.sh [convert|unconvert] [directory]"
  echo "Options:"
  echo "  convert         Convert WAV files to other formats"
  echo "  unconvert       Remove converted audio files"
  echo "  directory       Specify the directory to process (optional)"
  echo "  --help          Display this help message"
}

if [ "$1" = "--help" ] || [ $# -eq 0 ]; then
  show_help
  exit 0
fi

action="$1"
directory="$2"

if [ "$action" != "convert" ] && [ "$action" != "unconvert" ]; then
  echo "${Red}Invalid action argument. Please specify either 'convert' or 'unconvert'.${Color_Off}"
  exit 1
fi

convert() {
  dir="$basedir"
  if [ -n "$1" ]; then
    dir="$basedir/$1"
  fi

  echo "Processing directory: $dir"

  # Loop inside public/audio folder
  echo "Looping into $dir"
  find "$dir" -type f -name "*.wav" | while IFS= read -r file; do
    echo "##################"
    echo "Processing $file"
    # Get the base name of the file (without extension)
    base="${file%.*}"
    # Loop over all the extensions
    for ext in "${extensions[@]}"; do
      echo "Converting to $base.$ext"
      ffmpeg -i "$file" "$base.$ext" & wait $!
      echo "${Green}File $base.$ext successfully converted${Color_Off}"
    done
  done
  echo "${Green}All files converted successfully${Color_Off}"
}

unconvert() {
  echo "Starting files unconverting script"

  dir="$basedir"
  if [ -n "$1" ]; then
    dir="$basedir/$1"
  fi

  echo "Processing directory: $dir"

  # Loop over all the extensions
  for ext in "${extensions[@]}"; do
    # Find all files with the current extension in the directory and its subdirectories and delete them
    find "$dir" -type f -name "*.$ext" -exec rm -f {} \;
  done
}

# Execute the specified action
$action "$directory"
