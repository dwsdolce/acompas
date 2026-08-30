# A Compás

![Version](https://img.shields.io/badge/version-4.2.2-blue)
![License](https://img.shields.io/badge/license-AGPL--3.0-green)

A flamenco metronome available on multiple platforms:

* Web application (available at [https://acompas.org](https://acompas.org))
* Mobile application using [Capacitor](https://capacitorjs.com), [available on the Google Play marketplace](https://play.google.com/store/apps/details?id=audio.acompas.app)
* Desktop application (Electron) for Mac and Linux

## Key Features

- 🎵 Multiple authentic flamenco rhythms (palos)
- 🎨 Visual animations with multiple display modes:
  - Dots visualization (default)
  - Counter display
  - Clock display
- 🌓 Light/Dark theme support
- 🌐 Multilingual support - Available in 10 languages:
  - English, Spanish, French, Italian, German
  - Arabic, Persian (Farsi), Japanese, Chinese (Simplified)
- 📱 Mobile-optimized with keep-awake functionality
- 📝 Built-in changelog viewer
- 🎛️ Customizable tempo, prestart beats, and swing options
- 🔊 High-quality audio samples with multiple instruments

It is based on the following technologies :
 - [Quasar framework](https://quasar.dev)
 - [vue.js](https://vuejs.org)
 - [Pinia](https://pinia.vuejs.org)
 - [Tonejs](https://tonejs.github.io)

For what every dependency is actually for, and which layer of the app it belongs
to, see [docs/stack.md](docs/stack.md).

## Team

You can [talk with the team on Slack](https://acompas-org.slack.com).

## Thanks

 - The jaleo sounds are recordings of Aziz Andry.

## Cloning and building the source code

Before anything, you need Node.js installed on your machine. **Use Node.js
24.x LTS**, which `.nvmrc` pins.

`@quasar/app-vite` v3 declares `node: ^30 || ^28 || ^26 || ^24 || ^22.22.0`,
and yarn enforces engines strictly — `yarn install` refuses outright on a
version outside that range, so Node 20 and earlier will not work at all. Node
24 is the current LTS and the version CI builds with, which makes it the one
to match.

A version manager makes this painless. With [fnm](https://github.com/Schniz/fnm)
(`brew install fnm`) plus `eval "$(fnm env --use-on-cd --shell zsh)"` in your
shell profile, entering the project directory switches to 24 automatically.
`nvm` reads the same `.nvmrc`.

See the nodejs.org [download page](https://nodejs.org/en/download/). If using Linux, consider
[installing Node.js via packet manager](https://nodejs.org/en/download/package-manager/).

This project uses **yarn 1.22.22**, pinned in the `packageManager` field of
`package.json`. Node.js does not ship a `yarn` command, so you have to add one
before you can run `yarn install`. Pick either option below — you only need to do
this once, after which `yarn` is available in your shell.

**Option A — Corepack (recommended).** Corepack is a shim that reads the
`packageManager` field and automatically runs the exact yarn version this
project expects, so you cannot end up on a mismatched one:

```bash
corepack enable
```

Node.js 16.9 through 24 bundle Corepack, so that command just works. It was
unbundled in Node.js 25, so on newer versions install it first:

```bash
npm install -g corepack
corepack enable
```

If `corepack enable` reports a permission error, it is trying to write the
shims into Node's install directory — rerun it with `sudo`, or use Option B.

**Option B — install yarn directly.** Simpler, but nothing keeps you in sync
with the pinned version:

```bash
npm install -g yarn
```

Either way, check it worked before continuing:

```bash
yarn --version   # 1.22.22
```

### Install requirements

Only one thing has to be installed by hand: **ffmpeg**, used to generate the
audio. See "Generate the audio files" below for how to install it on your
platform.

Everything else is a project dependency. The Quasar CLI and Icon Genie do not
need a global `npm install -g` — `yarn install` provides them, and `npx quasar`
runs the CLI.

### Cloning the git repository

``` bash
git clone https://gitlab.com/acompas/acompas.git
cd acompas
```

### Install dependencies

``` bash
yarn install
```

### Icons

`yarn install` generates them, so there is nothing to do. If you change
`app-icon.png` and want to refresh them:

``` bash
yarn icons      # the generated, gitignored icons (web + Electron)
yarn icons:all  # everything, including the committed Capacitor Android/iOS
                # assets — rewrites ~30 tracked files, so review the diff
```

### Generate the audio files

Only the `.wav` masters are committed; the formats the app actually plays are
generated. `yarn install` does this for you, so a fresh clone needs no manual
step — but it needs **ffmpeg**, and `yarn install` fails with a clear message
if ffmpeg is missing, because the app cannot play anything without it.

Installing ffmpeg:

``` bash
brew install ffmpeg                      # macOS
sudo apt update && sudo apt install ffmpeg   # Ubuntu/Debian
sudo yum install epel-release && sudo yum install ffmpeg   # CentOS/RHEL
```

On Windows, download a build from https://ffmpeg.org/download.html, extract it,
and add its `bin` folder to your PATH.

To regenerate the audio on its own — after adding a `.wav`, say:

``` bash
yarn audio                               # all of public/audio
python3 format_audio.py convert acompas  # or one subdirectory
python3 format_audio.py unconvert        # delete the generated formats
```

Files that already exist and are newer than their `.wav` are skipped, so
re-running is cheap.

### Run the app
Then you should be ready to launch the app:

``` bash
# Serve with hot reload at localhost:9000
quasar dev

# Build for production with minification
quasar build
```

## Mobile app

Here are a few commands that might help:

```bash
# Go to the Capacitor project folder
cd ./src-capacitor
# Install the Capacitor project's dependencies
yarn install
# Generate all icons for Capacitor
icongenie generate -m capacitor -i ./app-icon.png
```

### Android

#### Setup

You must first install Oracle's Java 17 JDK and set the JAVA_HOME environment
variable in your shell. Instructions for Ubuntu [here](https://www.rosehosting.com/blog/how-to-install-java-21-on-ubuntu-24-04/)
(read the "Install Oracle Java" section and replace version 21 with version 17).

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
# Here, replace the path with the location of your JDK in the /usr/lib/jvm folder.
export JAVA_HOME=/usr/lib/jvm/jdk-17.0.xxx-oracle-x64
export PATH=$ANDROID_SDK_ROOT/tools/bin:$ANDROID_SDK_ROOT/emulator:$ANDROID_SDK_ROOT/platform-tools:$JAVA_HOME/bin:$PATH
```

#### Building the app

Here are the commands for building / running the Android app :

``` bash
# Build and run android apk in debug mode
cd /path/to/acompas
quasar dev -m capacitor -T android

# Build android apk in production mode (signed release APK)
cd /path/to/acompas
quasar build -m capacitor -T android
```

The signed release **APK** is written to:

```
dist/capacitor/android/apk/release/app-release.apk
```

Signing uses `src-capacitor/android/keystore.properties` (keystore path,
alias and passwords). If that file is missing, the build produces an
*unsigned* APK instead.

#### Generating the AAB for the Play Store

Google Play requires an **AAB** (Android App Bundle), not an APK.

> ⚠️ The `--aab` flag of `quasar build` is **not honored** — still true as of
> `@quasar/app-vite` 3.8.1, whose Capacitor mode has no handling for it at all;
> it silently runs `assembleRelease` and produces an APK. Generate the bundle
> directly with Gradle instead:

``` bash
# First sync the freshly built web assets into the Android project
cd /path/to/acompas
quasar build -m capacitor -T android

# Then build the signed release bundle
cd src-capacitor/android
./gradlew bundleRelease
```

The signed release **AAB** is written to:

```
src-capacitor/android/app/build/outputs/bundle/release/app-release.aab
```

`versionName` and `versionCode` are derived automatically from the root
`package.json` `version` (see `src-capacitor/android/app/build.gradle`), so bump
the version there once and both platforms follow. Google Play rejects a
`versionCode` that has already been published, so always increase the version
before building a release you intend to upload.

#### Installing / testing on a device or emulator (adb)

An **AAB cannot be installed directly** on a device — use the **APK** above for
on-device testing.

``` bash
# List connected devices/emulators (each with its serial)
adb devices

# Install (or reinstall, keeping data) the release APK
adb install -r dist/capacitor/android/apk/release/app-release.apk

# If several devices are connected, target one explicitly with -s <serial>
adb -s <serial> install -r dist/capacitor/android/apk/release/app-release.apk
```

Common issues:

- **`INSTALL_FAILED_UPDATE_INCOMPATIBLE`** — a copy signed with a different key
  (e.g. the Play Store build) is already installed. Uninstall it first (this
  wipes the app's local data), then install again:
  ```bash
  adb uninstall audio.acompas.app
  ```
- **Device not listed** — enable *Developer options › USB debugging* on the
  phone, accept the "Allow USB debugging?" prompt, set the USB mode to *File
  transfer (MTP)*, and use a data-capable cable. A quick `adb kill-server &&
  adb start-server` also helps.

Alternatively, from Android Studio you can drag-and-drop the `.apk` onto a
running emulator, or open `src-capacitor/android` as a Gradle project and run it.

### iOS

iOS is a **Capacitor target**, not a Quasar mode, so it is built the same way as
Android: `-m capacitor -T ios`. There is no `-m ios` mode — passing one falls
through to Cordova and prompts for a Cordova app id, which this project does not
use.

#### Prerequisites

* Xcode and CocoaPods (`pod --version`).
* The Capacitor native dependencies. The `Podfile` resolves each plugin out of
  `src-capacitor/node_modules`, which is a **separate** install from the root
  one:

``` bash
cd src-capacitor && yarn install
```

* A signing team. `DEVELOPMENT_TEAM` is set in
  `src-capacitor/ios/App/App.xcodeproj/project.pbxproj`; with a different Apple
  account, change it there or pick the team in Xcode under the App target →
  Signing & Capabilities.

#### Building the app

**To install it on your own iPhone or iPad and actually use it**, build the
production bundle and hand the project to Xcode:

``` bash
cd /path/to/acompas
quasar build -m capacitor -T ios --ide
```

Xcode opens on `src-capacitor/ios/App/App.xcworkspace`. Pick your device in the
run destination menu and press Run. The app installed this way is
self-contained: it carries its own copy of the web assets and all the audio, and
keeps working with the Mac switched off.

> ⚠️ Always open the **workspace**, never `App.xcodeproj`. The bare project
> knows nothing about CocoaPods, and building it fails with `Unable to resolve
> module dependency: 'Capacitor'` plus a series of missing search paths.
> `@quasar/app-vite` 2.6.2 opened the wrong one for exactly this reason; 3.8.1
> fixed it, and `npx cap open ios` has always opened the workspace correctly.

**To iterate on the UI with live reload**, use `dev` instead:

``` bash
cd /path/to/acompas
quasar dev -m capacitor -T ios --ide
```

> ⚠️ The `dev` variant does *not* bundle the web assets. It points the app's
> webview at a dev server running on your Mac over the LAN
> (`http://<your-ip>:9500`), so edits appear on the device instantly — but the
> app shows a **blank screen** whenever that server is not running, including
> every time you pick the app up later without the Mac. That is expected, not a
> broken build. Use `quasar build` for anything you want to keep using.

**Without opening Xcode at all**, the same build command writes the app
straight to:

```
dist/capacitor/ios/Build/Products/Release-iphoneos/App.app
```

This form needs the signing team to already be set (it is), since there is no
IDE to prompt for one.

#### Version numbering

`CFBundleShortVersionString` and `CFBundleVersion` are stamped from the root
`package.json` by `src-capacitor/ios/App/set-version.sh`, which runs as an Xcode
build phase — the same single source of truth Android uses. Bump the version in
`package.json` only.

#### If Xcode offers "Update to recommended settings"

Accepting it sets `ENABLE_USER_SCRIPT_SANDBOXING = YES`, which breaks the
CocoaPods "[CP] Embed Pods Frameworks" phase — it uses `rsync`, and the build
fails with `Sandbox: rsync(...) deny(1) file-write-unlink`. Set that one setting
back to `NO`; the rest of the migration is fine to keep.

### Electron (Desktop)

The desktop application is fully configured and ready to build for Mac and Linux.

#### Setup

The Electron mode is already configured in this project. If you need to regenerate icons:

```bash
icongenie generate -m electron -i ./app-icon.png
```

#### Build commands

``` bash
# Build and run electron app in debug mode
quasar dev -m electron

# Build electron app for production
quasar build -m electron

# Alternative build commands
yarn build:electron        # Production build
yarn build:electron:dev    # Development build
yarn build:electron:prod   # Production build (explicit)
```

The Electron app is configured with electron-builder and supports:
- Mac (DMG installer configured)
- Linux (AppImage and other formats)
- Windows (partially configured, currently commented out)

#### Troubleshooting

In case cocoapods is missing in your environment, [go here](https://guides.cocoapods.org/using/getting-started.html).

Tip: Delete local storage in the browser after app update.


## Licensing
The source code is published under the terms of the GNU [AGPL license](https://www.gnu.org/licenses/agpl-3.0.html) (see the LICENSE file at the
root of the git repository).
There is an exception to this : the drumkits. All the .wav files located in public/audio are licensed under the terms of the [CC0 license](https://creativecommons.org/publicdomain/zero/1.0).

## Contributing to the project

### Adding a new rhythm (pattern)

If you're a musician and would like to contribute to the project, you can submit some new patterns. Ultimately, A Compas project is getting generalistic and will be able to play any kind of rhythm. You can also contribute to the code, by submitting a merge request.

To submit a new rythm, you can create a new file in the `src/assets/patterns` folder. The file should be named `your-context-name.ts`.

The file should contain an array of objects, each object representing a pattern.

A pattern object is defined by the `PatternState` interface, which is defined in the `src/utils/types.ts` file.

```typescript
export interface PatternState {
  id:                       number // Unique identifier
  name:                     string // Unique name of the pattern. Should be in lowercase and without spaces.
  label:                    string // Displayed name of the pattern. Could contain spaces and uppercase letters.
  context?:                 string // The musical context name. As 'name', it should be in lowercase and without spaces.
  linkedPatterns?:          stringOpts[] // In case this style is a variation of another style, or has other names, you can link it here.
  minTempo:                 number // Minimum absolute tempo
  maxTempo:                 number // Maximum absolute tempo
  defaultTempo:             number // Default tempo. Is the tempo that will be set when the user selects this pattern for the first time. After that, the tempo will be the last one set by the user.
  slowTempo:                number // Slow tempo. If the tempo is below this value, a message will be displayed to the user.
  fastTempo:                number // Fast tempo. If the tempo is above this value, a message will be displayed to the user.
  nbBeatsInPattern:         number // Number of beats in the pattern. It is the number of eighth notes in the pattern. For example, a 4/4 pattern has 8 beats.
  accents:                  number[] // Array of the accentuated eighth notes. Max elements and max value for each element are equal to nbBeatsInPattern. The accents are displayed in a different color.
  sequences:                InstruSeqs
  prestartBeats:            numOpts[] // Array of possible prestart beats.
  slowMessage?:             string // Message displayed to the user when the tempo is too slow.
  fastMessage?:             string // Message displayed to the user when the tempo is too fast.
  longLabel?:               string // Long label of the pattern. Could contain spaces and uppercase letters.
  doc?:                     string // Documentation of the pattern. Could contain spaces and uppercase letters.
  wikipediaUrl?:            string // Wikipedia URL of the pattern.
  places?:                  string // Places where the pattern is played. Could contain spaces and uppercase letters.
  videoExample?:            string // Video example of the pattern.
}
```

About the `InstruSeqs` type, it is defined in the `src/utils/types.ts` file as follows :

```typescript
export type InstruSeqs = {
  [instru: string]: number[] // The key is the name of the instrument, and the value is an array of numbers. Each number is the index of the beat in the pattern.
}
```

### Writing a sequence

You can think of a sequence as an instrument line pattern.

A sequence in A Compas has a key, which is the name of the instrument, and a value, which is an array of numbers or nulls.
The index of the array is the beat number, and the value is the index of the sound as shown in the 'Adding a sound' section.
Notice that there must be a link between the `nbBeatsInPattern` property, the values in `accents` and the length of the `sequences` arrays.
The array must contain the same number of elements as the `nbBeatsInPattern` property of the `PatternState` object.

For example, the following sequence :

```typescript
...
nbBeatsInPattern: 8, // 8 beats, that is 4/4
accents: [0, 2], // The first and third beats are displayed in a different color (no incidence on the sound, just a visual help for the user)
sequences: {
  // The array must contain 8 elements
  // The number 1 is the sound 1 of the cajon sounds. Null means no sound.
  cajon: [ 1,    2,    2,    null, 1,    2,    3,    2 ],
        // 0     1     2     3     4     5     6     7 // This is just a helper for the index number
        // 1     &     2     &     3     &     4     & // This is just a helper for the rhythm (like beatLabels)

  // As a convenience, we can write a bonus sequence called beatLabels.
  // It is still an array of numbers, strings or nulls, but this time the values are printed on the screen, like time labels.
  // It is useful for the user to understand the rhythm.
  beatLabels: [ 1,    null, 2,    null, 3,    null, 4,    null ],
             // 0     1     2     3     4     5     6     7
             // 1     &     2     &     3     &     4     &
}
```

This means that the app will display 4 dots, first one and third one will be of a different color. Each dot (and hole between sdots) will be associated with the corresponding value in the beatLabels sequence.
Notice that you write the whole sequence, with fourth and eighth notes. But keep in mind that the user can turn on and off the eighths notes and even the whole instrument for this pattern.
For now, it is not possible to set other note subdivisions than the fourth and eighth notes. But if you need ternary, you could try to turn on the `swing` option.

### Adding a sound

To add a sound, you must provide a clean .wav file inside the public/audio folder. Then, you must update the `src/assets/data/soundsData.ts` file. Sounds can be grouped by instrument, and each sound must have a unique identifier. Here is an example :

```typescript
  {
    name: 'myinstrument',
    label: 'My instrument',
    medias: [
      {
        src: 'somefolder/myinstrument/myinstrument_1',
        volume: -2,
      },
      {
        src: 'somefolder/myinstrument/myinstrument_2',
        volume: -2,
      },
      {
        src: 'somefolder/myinstrument/myinstrument_2',
        volume: -12,
      }
    ]
  },
```

There, we load two times the same sound with a different volume. The volume is a number in decibels. The volume is optional, and if not provided, it will be set to 0.

Don't forget to run `yarn audio` to convert the new .wav file into .mp3, .mp4, .ogg and .flac. `yarn install` does this too, but only for files that are not already converted.

Beware of the licence of the sounds you use. You must have the right to use them in a free software.

## Roadmap / To do

### Platform Support
- Package and publish the iOS app (currently implemented but not published)
- Complete Windows desktop support (Electron - partially configured)
- Consider Android TV support

### Features
- Add more sound samples and drumkits
- Add more rhythmic patterns (palos)
- Add more visualization options
