#!/bin/bash -x

# This script is made to automatically produce each necessary format on each sound
# from an original .wav file
# Make sure to have ffmpeg installed before running
# Don't forget to perform chmod +x format.sh too

# Run with child directory name as an argument
# ./format.sh [dirname]
# Example :
# ./format.sh clara

for file in $1/*
do
    filename=$(basename "$file")
    extension="${filename##*.}"
    filename="${filename%.*}"
    if [[ ${extension} = *wav* ]]
    then
        echo "Processing" ${filename}.wav
        ffmpeg -i ${filename}.wav -strict -2 ${filename}.mp3
        ffmpeg -i ${filename}.wav -strict -2 ${filename}.mp4
        ffmpeg -i ${filename}.wav -strict -2 ${filename}.ogg
        ffmpeg -i ${filename}.wav -strict -2 ${filename}.flac
        echo "Done"
    fi
done