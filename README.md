# A Compás

A flamenco metronome available in two versions :

* Web application (available at [https://acompas.org](https://acompas.org)).
* Mobile application using [Apache Cordova](http://cordova.apache.org/), [available on the Google Play marketplace](https://play.google.com/store/apps/details?id=audio.acompas.app).

It can play various flamenco rhythms (palos), and features a visual animation
and many options.

It is based on the following technologies :
 - [Quasar framework](https://quasar.dev)
 - [vue.js](https://vuejs.org)
 - [Vuex](https://vuex.vuejs.org)
 - [Tonejs](https://tonejs.github.io)

## Thanks

 - The palmas sordas and jaleo sounds are recordings of Aziz Andry.

## Automated builds status

[![pipeline status](https://gitlab.com/acompas/acompas/badges/master/pipeline.svg)](https://gitlab.com/acompas/acompas/commits/master)

## Cloning and building the source code

Before anything, you need Node.js 13.x installed on your machine. See the nodejs.org
[download page](https://nodejs.org/en/download/). If using Linux, consider
[installing Node.js via packet manager](https://nodejs.org/en/download/package-manager/).

You also need [yarn](https://classic.yarnpkg.com/en/docs/install/) installed.

``` bash
# install requirements
sudo npm install -g @quasar/cli
sudo npm install -g --unsafe-perm @quasar/icongenie

# cloning the git repository
git clone https://gitlab.com/acompas/acompas.git
cd acompas

# install dependencies
yarn install

# build the icons
./icongenie.sh

# serve with hot reload at localhost:8080
quasar dev

# build for production with minification
quasar build
```

## Automated testing

``` bash
# run the test suite in headless mode
quasar test --e2e cypress
```
It's also possible to serve the app and run Cypress with different
commands. This is helpful while writing test scenarios.

``` bash
# first terminal :
quasar dev
# second terminal (run Cypress) :
npx cypress run --config baseUrl=http://localhost:8080/
# second terminal (open Cypress with hot reload) :
npx cypress open --config baseUrl=http://localhost:8080/
```

## Android app

You must first install Oracle's Java JDK 8 and set the JAVA_HOME environment
variable in your shell.

Furthermore, you need to install Google's Android SDK (pick it from the "Command
line tools only" section [here](https://developer.android.com/studio)). You
must set the ANDROID_HOME and ANDROID_SDK_HOME environment variables in your shell.

Here is an example ~/.bashrc configuration :

``` bash
export ANDROID_HOME=/path/to/android
export ANDROID_SDK_HOME=/home/olivier
export JAVA_HOME=/path/to/jdk
export PATH=$ANDROID_HOME/tools/bin:$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$JAVA_HOME/bin:$PATH
```

Here are the commands for building / running the Android app :

``` bash
# Global cordova install
sudo npm i -g cordova

# Check cordova requirements (run this in the src-cordova/ folder)
cd ./src-cordova
cordova requirements

# Build and run android apk in debug mode
cd /path/to/acompas
quasar dev -m cordova -T android

# Build android apk in production mode
cd /path/to/acompas
quasar build -m cordova -T android
```

## iOS app

This section needs an update

``` bash
# Build app
quasar build

# Install dependencies
cd ./src-cordova
npm install

# This is one of the requirements
npm install -g ios-deploy

# Check cordova requirements (run this in the src-cordova/ folder)
cordova requirements

# If you don't have Cocoapods installed
# You may have to install ruby with either:
# $ sudo apt-get install ruby-full
# $ sudo yum install ruby
# $ sudo emerge dev-lang/ruby
# $ sudo pacman -S ruby
# $ brew install ruby
# $ pkg install runtime/ruby-18
# $ ./configure $ make $ sudo make install
# Then (use sudo if encounter permission issues):
gem update --system
gem install cocoapods
pod setup

# Build and run iOS archive in debug mode
quasar dev -m ios

# Build iOS archive for production
quasar build -m ios
```
