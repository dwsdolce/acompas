# A Compás

A flamenco metronome available in two versions :

* Web application (available at [http://acompas.audio](http://acompas.audio)).
* Mobile application using [Crosswalk](https://crosswalk-project.org/), [available on the Google Play marketplace](https://play.google.com/store/apps/details?id=audio.acompas.app).

It uses the Web Audio API to play various flamenco rhythms and features a visual animation.

## Branches

### Active branches

 * The [online version](http://acompas.audio) is the version 1 of A Compás, aka the ["master" branch](http://gitlab.acompas.audio/acompas/acompas).
 * A new version (v2) is being developed in the ["vue" branch](http://gitlab.acompas.audio/acompas/acompas/tree/vue).

### Dead Branches

 * `meteor` and `meteor-react-graphql` are dead.
 * `production` is not since April 2017. Production deployments are now made from Gitlab using the `master` branch.

## Automated builds status

`master` branch (v1) [![build status](http://gitlab.acompas.audio/acompas/acompas/badges/master/build.svg)](http://gitlab.acompas.audio/acompas/acompas/commits/master)

`production` branch (v1) [![build status](http://gitlab.acompas.audio/acompas/acompas/badges/production/build.svg)](http://gitlab.acompas.audio/acompas/acompas/commits/production)

`vue` branch (v2) [![build status](http://gitlab.acompas.audio/acompas/acompas/badges/vue/build.svg)](http://gitlab.acompas.audio/acompas/acompas/commits/vue)

## Installing the web application (the simple way)

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

## Installing the web application (the vagrant way)

Get the latest version of vagrant at `https://www.vagrantup.com/downloads.html`

Then in the project folder

```bash
# Clone the git repository in the current folder
git clone http://gitlab.acompas.audio/acompas/acompas.git
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
git clone http://gitlab.acompas.audio/acompas/acompas.git
# Go inside the folder created by the previous command
cd acompas
# Install dependencies using bower
bower install
# Synchronize assets to the web/ and crosswalk/ folders
./sync_assets.sh
# Build the app
crosswalk-pkg --targets="arm x86 arm_64 x86_64" -c stable ./crosswalk/
```

## Thanks

* The metronome's audio core is inspired by the following [code from Chris Wilson](https://github.com/cwilso/metronome).
* The palmas sordas and jaleo sounds are recordings of Aziz Andry.
