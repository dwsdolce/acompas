# A Compás

A flamenco metronome available in two versions :

* Web application (available at [http://acompas.org](http://acompas.org)).
* Mobile application using [Apache Cordova](http://cordova.apache.org/), [available on the Google Play marketplace](https://play.google.com/store/apps/details?id=audio.acompas.app).

It can play various flamenco rhythms (palos), and features a visual animation
and many options.

It is based on the following technologies :
 - [Quasar framework](http://quasar-framework.org)
 - [vue.js](https://vuejs.org)
 - [Vuex](https://vuex.vuejs.org)
 - [Tonejs](https://tonejs.github.io)
 - [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).

## Automated builds status

[![pipeline status](https://gitlab.com/oricordeau/acompas/badges/vue/pipeline.svg)](https://gitlab.com/oricordeau/acompas/commits/vue)

## Cloning and building the source code

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ npx quasar dev

# build for production with minification
$ npx quasar build

# lint code
$ npx quasar lint
```

## Android app build

``` bash
# Build app
npx quasar build

# Install dependencies
cd ./cordova
npm install

# Check cordova requirements (run this in the cordova/ folder)
npx cordova requirements

# Copy files to the cordova/platforms/android/app/src/main/assets/www subfolder (run this in the cordova/ folder)
# No idea why using a script for this is required
./prepare.sh

# Run android apk (run this in the cordova/ folder)
npx cordova run android --debug
```

## iOS app build

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
