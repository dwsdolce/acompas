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

## Team

You can [talk with the team on Slack](https://acompas-org.slack.com)

## Thanks

 - The palmas sordas and jaleo sounds are recordings of Aziz Andry.

## Automated builds status

[![pipeline status](https://gitlab.com/acompas/acompas/badges/master/pipeline.svg)](https://gitlab.com/acompas/acompas/commits/master)

## Cloning and building the source code

Before anything, you need Node.js 12.x installed on your machine. See the nodejs.org
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
yarn run test:e2e:CI
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

Furthermore, you need to install Google's Android Studio (get it
[here](https://developer.android.com/studio)). Install the SDK from Android
Studio. You must set the ANDROID_SDK_ROOT and ANDROID_SDK_HOME environment
variables in your shell and extend the your PATH environment variable.

- Remark : if you open the app as a an Android Studio project by selecting
"src-cordova/platforms/android" as a project folder, the IDE will propose
you to update the Android Gradle plugin. The
[Quasar documentation](https://quasar.dev/quasar-cli/developing-cordova-apps/preparation#4.-Start-Developing)
says : don't do this proposed upgrade !

- Remark 2 : you don't need to create an Android Studio project, but you can use
Android Studio as a tool to install the SDK (From the menu : Tools > SDK
Manager) and manage your AVDs (Tools > AVD Manager).

Here is an example ~/.bashrc configuration :

``` bash
export ANDROID_SDK_ROOT=/path/to/android-sdk
export ANDROID_SDK_HOME=/home/username
export JAVA_HOME=/path/to/jdk
export PATH=$ANDROID_SDK_ROOT/tools/bin:$ANDROID_SDK_ROOT/emulator:$ANDROID_SDK_ROOT/platform-tools:$JAVA_HOME/bin:$PATH
```

Here are the commands for building / running the Android app :

``` bash
# Global cordova install
sudo npm i -g cordova

# Build and run android apk in debug mode
cd /path/to/acompas
quasar dev -m cordova -T android

# Build android apk in production mode
cd /path/to/acompas
quasar build -m cordova -T android
```

### Troubleshooting

Here are a few commands that might help :

```bash
# Go to the Cordova project folder
cd ./src-cordova
# Install npm dependencies
npm install
# Check cordova requirements
cordova requirements
# Prepare project
cordova prepare
```

## iOS app
### Setup
``` bash
# This is one of cordova's commonly missing requirements
npm install -g ios-deploy

# Build and run iOS archive in debug mode
quasar dev -m ios

# Build iOS archive for production
quasar build -m ios
```

### Troubleshooting
```
# In case you have any build issue, go to src-cordova
cd ./src-cordova

# Let's make as if this directory is a valid cordova workspace
mkdir www

# Install dependencies
npm install

# Cordova may not be aware of the iOS platform if you don't execute this
cordova platform add ios

# Check cordova requirements: this command should give you leads to complete your setup
cordova requirements

# In case cocoapods is missing in your environment, install it
# https://guides.cocoapods.org/using/getting-started.html
```
