# A Compás

A flamenco metronome available in two versions :

* Web application (available at [https://acompas.org](https://acompas.org)).
* Mobile application using [Capacitor](https://capacitorjs.com), [available on the Google Play marketplace](https://play.google.com/store/apps/details?id=audio.acompas.app).

It can play various flamenco rhythms (palos), and features a visual animation
and many options.

It is based on the following technologies :
 - [Quasar framework](https://quasar.dev)
 - [vue.js](https://vuejs.org)
 - [Pinia](https://pinia.vuejs.org)
 - [Tonejs](https://tonejs.github.io)

## Team

You can [talk with the team on Slack](https://acompas-org.slack.com).

## Thanks

 - The jaleo sounds are recordings of Aziz Andry.

## Cloning and building the source code

Before anything, you need Node.js 18.x installed on your machine. See the nodejs.org
[download page](https://nodejs.org/en/download/). If using Linux, consider
[installing Node.js via packet manager](https://nodejs.org/en/download/package-manager/).

You also need [yarn](https://classic.yarnpkg.com/en/docs/install/) installed.

``` bash
cd /path/to/acompas
# Install requirements
sudo npm install -g @quasar/cli yarn
sudo npm install -g --unsafe-perm @quasar/icongenie

# Cloning the git repository
git clone https://gitlab.com/acompas/acompas.git
cd acompas

# Install dependencies
yarn install

# Build the icons
./icongenie.sh

# Serve with hot reload at localhost:9000
quasar dev

# Build for production with minification
quasar build
```

## Mobile app

Here are a few commands that might help :

```bash
# Go to the Capacitor project folder
cd ./src-capacitor
# Install the Capacitor project's dependencies
yarn install
```

### Android

#### Setup

You must first install Oracle's Java JDK 8 and set the JAVA_HOME environment
variable in your shell.

Furthermore, you need to install Google's Android Studio (get it
[here](https://developer.android.com/studio)). Install the SDK from Android
Studio. You must set the ANDROID_SDK_ROOT and ANDROID_SDK_HOME environment
variables in your shell and extend the your PATH environment variable.

- Remark : if the Android Studio IDE asks you to update the Android Gradle
plugin. The
[Quasar documentation](https://quasar.dev/quasar-cli-webpack/developing-capacitor-apps/preparation#3-start-developing)
says : don't do this proposed upgrade !

- Remark 2 : in the Android Studio IDE, you can install SDK's by cliking
Tools > SDK Manager and manage your AVDs in Tools > AVD Manager.

Here is an example ~/.bashrc configuration :

``` bash
export ANDROID_SDK_ROOT=/path/to/android-sdk
export ANDROID_SDK_HOME=/home/username
export JAVA_HOME=/path/to/jdk
export PATH=$ANDROID_SDK_ROOT/tools/bin:$ANDROID_SDK_ROOT/emulator:$ANDROID_SDK_ROOT/platform-tools:$JAVA_HOME/bin:$PATH
```

Here are the commands for building / running the Android app :

``` bash
# Build and run android apk in debug mode
cd /path/to/acompas
quasar dev -m capacitor -T android

# Build android apk in production mode
cd /path/to/acompas
quasar build -m capacitor -T android
```

### iOS
#### Setup
``` bash
cd /path/to/acompas
# Build and run iOS archive in debug mode
quasar dev -m ios

# Build iOS archive for production
quasar build -m ios
```

#### Troubleshooting

In case cocoapods is missing in your environment, [go here](https://guides.cocoapods.org/using/getting-started.html).
