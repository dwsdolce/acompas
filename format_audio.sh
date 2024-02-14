#!/bin/bash

# This script is made to automatically produce each necessary format on each sound
# from an original .wav file
# Make sure to have ffmpeg installed before running
# Don't forget to perform chmod +x format_audio.sh too

# Usage:
# sh ./format_audio -a convert -d "my_folder"
# sh ./format_audio -a unconvert
# sh ./format_audio --help

basedir="./public/audio"
extensions=("mp3" "mp4" "ogg" "flac")

Color_Off='\033[0m'       # Text Reset
Green='\033[0;32m'        # Green
BGreen='\033[1;32m'       # Bold Green
Red='\033[0;31m'          # Red

while getopts a:d:h flag
do
  case "${flag}" in
    a) action=${OPTARG};;
    d) directory=${OPTARG};;
    h) help=true;;
  esac
done

if [ "$help" = true ]; then
  echo "Usage: sh ./format_audio.sh -a [convert|unconvert] -d [directory]"
  echo "Options:"
  echo "  -a, --action    Specify the action to perform: convert or unconvert"
  echo "  -d, --directory Specify the directory to process"
  echo "  -h, --help      Display this help message"
  exit 0
fi

if [ "$action" != "convert" ] && [ "$action" != "unconvert" ]; then
  echo "${Red}Invalid action argument. Please specify either 'convert' or 'unconvert'.${Color_Off}"
  exit 1
fi

convert() {
  echo "Starting files converting script"
  echo "$action $directory"
  # dir is basedir if no argument is provided and basedir/$directory if an argument is provided
  dir=${directory:+$basedir/$directory}
  dir=${dir:-$basedir}

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

  # Loop over all the extensions
  for ext in "${extensions[@]}"; do
    # Find all files with the current extension in the directory and its subdirectories and delete them
    find "$basedir" -type f -name "*.$ext" -exec rm -f {} \;
  done
}

# Add a first parameter that should be either "convert" or "unconvert"
$action
