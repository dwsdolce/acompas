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

## Branches

 * The [online version](https://acompas.org) is the version 2.1 of A Compás, aka the ["master" branch](https://gitlab.com/oricordeau/acompas).
 * The [1.1 branch](https://gitlab.com/oricordeau/acompas/tree/1.1) is still maintained in order to provide the Android application for users with Android >= 4.1 to Android < 7.0.

## Automated builds status

[![pipeline status](https://gitlab.com/oricordeau/acompas/badges/master/pipeline.svg)](https://gitlab.com/oricordeau/acompas/commits/master)

## Cloning and building the source code

``` bash
# cloning the git repository
git clone https://gitlab.com/oricordeau/acompas.git
cd acompas

# install dependencies
yarn install

# serve with hot reload at localhost:8080
npx quasar dev

# build for production with minification
npx quasar build
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
npx cordova requirements

# Build and run android apk in debug mode
cd /path/to/acompas
npx quasar dev -m cordova -T android

# Build android apk in production mode
cd /path/to/acompas
npx quasar build -m cordova -T android
```

## iOS app

This section needs an update

``` bash
# Build app
npx quasar build

# Install dependencies
cd ./cordova
npm install

npx cordova platform add ios

# Check cordova requirements (run this in the cordova/ folder)
npx cordova requirements

# Fullfill the requirements
npm install -g ios-deploy
# Install ruby with either:
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
```
