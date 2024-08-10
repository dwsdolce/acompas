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

Before anything, you need Node.js 20.x installed on your machine. See the nodejs.org
[download page](https://nodejs.org/en/download/). If using Linux, consider
[installing Node.js via packet manager](https://nodejs.org/en/download/package-manager/).

You also need to enable yarn after installing the nodejs package :
```bash
corepack enable
```

You only need to run the previous command once and the "yarn" command will
be added to your shell.

### Install requirements

``` bash
sudo npm install -g @quasar/cli
sudo npm install -g --unsafe-perm @quasar/icongenie
```

### Cloning the git repository

``` bash
git clone https://gitlab.com/acompas/acompas.git
cd acompas
```

### Install dependencies

``` bash
yarn install
```

### Build the icons
Run this command after generating the src-capacitor/android and /ios

``` bash
./icongenie.sh
```

### Generate the audio files
The script uses `ffmpeg` to convert the files, so make sure you have it installed on your machine.

1. For Windows:

  * Download the ffmpeg build from https://ffmpeg.org/download.html
  * Extract the zip file
  * Add the bin folder to your system PATH

2. For macOS (using Homebrew):

``` bash
brew install ffmpeg
```

3. For Ubuntu/Debian:

``` bash
sudo apt update
sudo apt install ffmpeg
```

4. For CentOS/RHEL:

``` bash
sudo yum install epel-release
sudo yum install ffmpeg
```

By default, the format_audio.sh script converts all wav files inside the ./public/audio folder

``` bash
bash ./format_audio.sh --help
bash ./format_audio.sh convert # Optionnaly you can specify a subdirectory to convert only a subset
```

Alternatively, you can do it with Python

To do so you also have to install some Python dependencies
``` bash
pip install colorama
```

Then, you can run the Python script :

``` bash
python3 public/format_audio.py convert
```

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

Don't forget to run the sh script `./format_audio.sh` to convert the .wav files to .mp3, .mp4, .ogg and .flac files. This is necessary for the mobile app.

Beware of the licence of the sounds you use. You must have the right to use them in a free software.

## To do

- Package the app for iOS
- Package the app for Electron
- Package the app for WindoAndroid TV
- Add more sound samples
- Add more rhythmic patterns
