# A Compás

A flamenco metronome available in two versions :

* Web application (available at [http://acompas.audio](http://acompas.audio)).
* Mobile application using [Apache Cordova](http://cordova.apache.org/), [available on the Google Play marketplace](https://play.google.com/store/apps/details?id=audio.acompas.app).

It uses the Web Audio API to play various flamenco rhythms and features a visual animation.

## Branches

 * The [online version](http://acompas.audio) is the version 1 of A Compás, aka the ["master" branch](http://gitlab.acompas.audio/acompas/acompas).
 * A new version (v2) is being developed in the ["vue" branch](http://gitlab.acompas.audio/acompas/acompas/tree/vue).

## Automated builds status

[![pipeline status](https://gitlab.com/oricordeau/acompas/badges/master/pipeline.svg)](https://gitlab.com/oricordeau/acompas/commits/master)

## Installing the web application

```bash
# Clone the git repository in the current folder
git clone http://gitlab.acompas.audio/acompas/acompas.git
# Go inside the folder created by the previous command
cd acompas
# Install dependencies using bower
bower install
# Synchronize assets to the web/ and crosswalk/ folders
./sync_assets.sh
# Run a basic web server on port 8000
./server.sh
```

Then, open your favorite web browser and go to [http://localhost:8000](http://localhost:8000)

## Building the mobile app for Android

```bash
# Clone the git repository in the current folder
git clone http://gitlab.acompas.audio/acompas/acompas.git
# Go inside the folder created by the previous command
cd acompas
# Install dependencies using bower
bower install
# Synchronize assets to the web/ and crosswalk/ folders
./sync_assets.sh
# Build the app
cordova build android --debug
```

## Thanks

* The metronome's audio core is inspired by the following [code from Chris Wilson](https://github.com/cwilso/metronome).
* The palmas sordas and jaleo sounds are recordings of Aziz Andry.
