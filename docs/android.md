# Building the Android app

Android builds work from **macOS, Windows and Linux**. Android is a Capacitor
target rather than a Quasar mode, so every build command is `-m capacitor -T
android`.

Do the [Getting started](../README.md#getting-started) steps first — this guide
assumes `yarn install` has already run.

## Contents

- [Prerequisites](#prerequisites)
- [An emulator](#an-emulator)
- [Building the app](#building-the-app)
- [Generating the AAB for the Play Store](#generating-the-aab-for-the-play-store)
- [Installing on a device or emulator](#installing-on-a-device-or-emulator)
- [Version numbering](#version-numbering)

## Prerequisites

Two things: a **JDK 21** and the **Android SDK**. Budget about 6 GB for the SDK,
plus 3 GB if you also install Android Studio.

The Android Gradle Plugin needs JDK 17 or newer, and Capacitor's Android project
compiles against Java 21. A JDK that came with an older toolchain is likely too
old — and on Apple Silicon, the wrong architecture as well.

The SDK can come from Android Studio's first-run wizard, but the wizard picks its
own API level. Installing it from the command line pins the versions this project
actually needs: `compileSdkVersion` and `targetSdkVersion` are both **36** in
`src-capacitor/android/variables.gradle`.

### macOS

```bash
brew install openjdk@21
brew install --cask android-studio
brew install --cask android-commandlinetools

export JAVA_HOME=/opt/homebrew/opt/openjdk@21
export ANDROID_HOME="$HOME/Library/Android/sdk"
```

Homebrew keeps `openjdk@21` keg-only, so it does not disturb any other JDK on the
machine and has to be named explicitly.

Then make it permanent in `~/.zshrc` (or `~/.bashrc`):

```bash
export JAVA_HOME="/opt/homebrew/opt/openjdk@21"
export PATH="$JAVA_HOME/bin:$PATH"

export ANDROID_HOME="$HOME/Library/Android/sdk"
export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH"
```

### Linux

```bash
sudo apt install openjdk-21-jdk
```

Install Android Studio from [developer.android.com](https://developer.android.com/studio),
or unpack the command-line tools on their own. Then in `~/.bashrc`:

```bash
export JAVA_HOME="/usr/lib/jvm/java-21-openjdk-amd64"
export PATH="$JAVA_HOME/bin:$PATH"

export ANDROID_HOME="$HOME/Android/Sdk"
export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH"
```

`quasar.config.js` points `linuxAndroidStudio` at
`/usr/local/android-studio/bin/studio.sh`, which only matters if you use the
`--ide` flag. Unlike Windows and macOS, Quasar has no fallback search on Linux,
so either edit that setting or make the path true with a symlink:

```bash
sudo ln -s /path/to/your/android-studio /usr/local/android-studio
```

### Windows

```powershell
winget install EclipseAdoptium.Temurin.21.JDK
winget install Google.AndroidStudio
```

Chocolatey works too (`choco install temurin21 androidstudio`). Android Studio
bundles its own JDK, but a standalone Temurin is easier to point `JAVA_HOME` at.

If you use the `--ide` flag, Quasar finds Android Studio on its own: it checks
`C:\Program Files\Android\Android Studio\bin\studio64.exe` and then the
`HKLM\SOFTWARE\Android Studio` registry key. Only a non-default install location
needs `bin.windowsAndroidStudio` set in `quasar.config.js`.

The SDK lands in `%LOCALAPPDATA%\Android\Sdk` by default. Set the environment
variables through **System Properties → Advanced → Environment Variables**, or:

```powershell
setx JAVA_HOME "C:\Program Files\Eclipse Adoptium\jdk-21.0.5.11-hotspot"
setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk"
```

Then add these to PATH using the GUI editor — `setx PATH` truncates PATH at 1024
characters and will silently destroy it:

```
%JAVA_HOME%\bin
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\emulator
```

Open a new terminal afterwards; `setx` does not affect the shell you ran it in.

> ⚠️ **Check what `java` actually resolves to.** Windows machines very often
> carry an old Oracle Java 8 shim in
> `C:\Program Files (x86)\Common Files\Oracle\Java\javapath`, which appears
> ahead of everything else on PATH. Gradle uses `JAVA_HOME` when it is set, so
> this is usually harmless — but `java -version` reporting `1.8.0` is not a sign
> that your setup is broken, and a *missing* `JAVA_HOME` with that shim present
> fails with a confusing "Unsupported class file major version" error.

> ⚠️ **Set these in Windows, not in your Cygwin or Git Bash profile.**
> `sdkmanager`, `adb` and Gradle are native Windows programs and cannot read a
> `/cygdrive/c/...` value for `ANDROID_HOME`. Setting them at the Windows level
> means both PowerShell and your POSIX shell inherit values that work.

### Installing the SDK packages

Same command everywhere once `ANDROID_HOME` is set. On Windows use
`sdkmanager.bat`; note the **system image differs by CPU** — `arm64-v8a` on Apple
Silicon, `x86_64` on Intel/AMD (which is every Windows machine and most Linux
ones):

```bash
# Accepts Google's SDK licences.
yes | sdkmanager --sdk_root="$ANDROID_HOME" --licenses

sdkmanager --sdk_root="$ANDROID_HOME" \
  "cmdline-tools;latest" \
  "platform-tools" \
  "platforms;android-36" \
  "build-tools;36.0.0" \
  "emulator" \
  "system-images;android-36;google_apis;x86_64"     # arm64-v8a on Apple Silicon
```

On Windows, from PowerShell:

```powershell
& "$env:ANDROID_HOME\cmdline-tools\latest\bin\sdkmanager.bat" --licenses
& "$env:ANDROID_HOME\cmdline-tools\latest\bin\sdkmanager.bat" `
  "cmdline-tools;latest" "platform-tools" "platforms;android-36" `
  "build-tools;36.0.0" "emulator" "system-images;android-36;google_apis;x86_64"
```

Install `cmdline-tools;latest` **into the SDK** as above and use that copy:
`avdmanager` works out its SDK root from its own location rather than from
`ANDROID_HOME`, so a copy installed elsewhere (by Homebrew, say) cannot see any
of the system images.

## An emulator

Android Studio's *Device Manager* is the comfortable way on every platform.

From the command line, note that `avdmanager create avd` takes no `--sdk-root`,
unlike `sdkmanager`, and reports an unhelpful usage error if given one:

```bash
$ANDROID_HOME/cmdline-tools/latest/bin/avdmanager create avd \
  -n acompas-api36 \
  -k "system-images;android-36;google_apis;x86_64" \
  -d pixel_7

emulator -avd acompas-api36 &
adb devices          # emulator-5554  device
```

On Windows the executable is `avdmanager.bat`, and there is no `&` for
backgrounding — start it in its own terminal:

```powershell
& "$env:ANDROID_HOME\cmdline-tools\latest\bin\avdmanager.bat" create avd `
  -n acompas-api36 -k "system-images;android-36;google_apis;x86_64" -d pixel_7

Start-Process emulator -ArgumentList '-avd','acompas-api36'
adb devices
```

## Building the app

```bash
# Build and run the Android APK in debug mode
npx quasar dev -m capacitor -T android

# Build the APK in production mode (signed release APK)
npx quasar build -m capacitor -T android
```

The signed release **APK** is written to:

```
dist/capacitor/android/apk/release/app-release.apk
```

Signing uses `src-capacitor/android/keystore.properties` (keystore path, alias
and passwords). If that file is missing, the build produces an *unsigned* APK
instead.

For testing on an emulator, a debug build straight through Gradle is quicker and
needs no keystore:

```bash
npx quasar build -m capacitor -T android --skip-pkg   # web assets + cap sync
cd src-capacitor/android
./gradlew assembleDebug          # gradlew.bat on Windows
```

```
src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk
```

> **On Windows, run Gradle from PowerShell** using `.\gradlew.bat`. The POSIX
> `gradlew` script works under Cygwin and Git Bash more often than not, but it
> computes classpaths for a *Windows* JVM from a POSIX shell, and the failures
> when it goes wrong are opaque. `gradlew.bat` sidesteps the whole question.

The first Gradle run fetches the Gradle distribution and the whole dependency
tree and takes several minutes; after that an incremental build is seconds.

## Generating the AAB for the Play Store

Google Play requires an **AAB** (Android App Bundle), not an APK.

> ⚠️ The `--aab` flag of `quasar build` is **not honored** — still true as of
> `@quasar/app-vite` 3.8.1, whose Capacitor mode has no handling for it at all;
> it silently runs `assembleRelease` and produces an APK. Generate the bundle
> directly with Gradle instead:

```bash
# First sync the freshly built web assets into the Android project
npx quasar build -m capacitor -T android

# Then build the signed release bundle
cd src-capacitor/android
./gradlew bundleRelease          # .\gradlew.bat bundleRelease on Windows
```

The signed release **AAB** is written to:

```
src-capacitor/android/app/build/outputs/bundle/release/app-release.aab
```

Google Play rejects a `versionCode` that has already been published, so always
increase the version before building a release you intend to upload.

## Installing on a device or emulator

An **AAB cannot be installed directly** on a device — use the **APK** for
on-device testing.

```bash
# List connected devices/emulators (each with its serial)
adb devices

# Install (or reinstall, keeping data) the release APK
adb install -r dist/capacitor/android/apk/release/app-release.apk

# If several devices are connected, target one explicitly with -s <serial>
adb -s <serial> install -r dist/capacitor/android/apk/release/app-release.apk
```

From Cygwin or Git Bash, `adb` is a native Windows binary and will not accept a
`/cygdrive/...` argument. A relative path from the repository root works, or
convert it:

```bash
adb install -r "$(cygpath -w dist/capacitor/android/apk/release/app-release.apk)"
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
  adb start-server` also helps. On Windows you may additionally need the OEM USB
  driver for your handset.

Alternatively, from Android Studio you can drag-and-drop the `.apk` onto a
running emulator, or open `src-capacitor/android` as a Gradle project and run it.

## Version numbering

`versionCode` and `versionName` come from the root `package.json` — see the
`JsonSlurper` block at the top of `src-capacitor/android/app/build.gradle` — so
4.2.5 becomes versionName `4.2.5` and versionCode `701040205`. iOS reads the same
file, so bump the version there once and both platforms follow.
