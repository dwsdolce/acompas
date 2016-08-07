# A Compás

A flamenco metronome available in two versions :

* Web application (available at [http://acompas.audio](http://acompas.audio)).
* Mobile application using [Crosswalk](https://crosswalk-project.org/), [available on the Google Play marketplace](https://play.google.com/store/apps/details?id=audio.acompas.app).

It makes use of Web Audio API to play various flamenco rhythms and features a visual animation.

## Version 2.0 development

The [online version](http://acompas.audio) is the version 1 of A Compás.
A new version is being developed since August 2015, a complete rewrite based on the [Meteor framework](https://www.meteor.com).

[Browse the "meteor" branch](http://gitlab.acompas.audio/oricordeau/acompas/tree/meteor) on gitlab.acompas.audio

## Installing the web application (the simple way)

```bash
# Clone the git repository in the current folder
git clone http://gitlab.acompas.audio/oricordeau/acompas.git
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

## Installing the web application (the vagrant way)

Get the latest version of vagrant at `https://www.vagrantup.com/downloads.html`

Then in the project folder

```bash
# Clone the git repository in the current folder
git clone http://gitlab.acompas.audio/oricordeau/acompas.git
# Go inside the folder created by the previous command
cd acompas
# Create and provision the vm
vagrant up --provision
# ssh into the vm
vagrant ssh
# Go inside mounted project folder
cd /vagrant
# Setup dependendencies
bower install
# Synchronize assets to the web/ and crosswalk/ folders
./sync_assets.sh
# Run a basic web server on port 8000
./server.sh
```

Then, in the host operating system (not inside the virtual machine), open your favorite web browser and go to [http://192.168.50.2:8000](http://192.168.50.2:8000)

## Building the mobile app for Android

```bash
# Clone the git repository in the current folder
git clone http://gitlab.acompas.audio/oricordeau/acompas.git
# Go inside the folder created by the previous command
cd acompas
# Install dependencies using bower
bower install
# Synchronize assets to the web/ and crosswalk/ folders
./sync_assets.sh
# Build the app
python /path/to/crosswalk/make_apk.py --package=audio.acompas.app --manifest=crosswalk/manifest.json --enable-remote-debugging --compressor=js --compressor=css
```

## Credits

* The metronome's audio core is inspired by the following [code from Chris Wilson](https://github.com/cwilso/metronome).
* The palmas sordas and jaleo sounds are recordings of Aziz Andry.
