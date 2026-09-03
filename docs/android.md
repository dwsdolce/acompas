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

You need a **JDK 21** and the **Android SDK**. There are two ways to get the
SDK, and the right one depends on whether you want an IDE — not on which is
more "proper".

|  | [Route A — Android Studio](#route-a--android-studio) | [Route B — command-line tools only](#route-b--command-line-tools-only) |
|---|---|---|
| Download | 1.5 GB | 156 MB |
| Installs | IDE, SDK, command-line tools, its own JDK | SDK and command-line tools |
| Emulator management | Device Manager, a wizard | `avdmanager`, by hand |
| Administrator rights | possibly, for the installer; none with the `.zip` | none |
| Worth it when | you have no Android device and will live in an emulator | you build, install and test on a real device |

This is one download or the other, never both — both end with the same SDK in
the same place, and Route A puts an IDE around it.

> ⚠️ Google's download page says "Command-line tools are included in Android
> Studio". That is true of the IDE and misleading about the SDK: Studio's own
> SDK Manager is a *window*, and its first-run wizard does not install the
> `cmdline-tools` package, so there is no `android` or `avdmanager` to run
> from a terminal. Route A therefore has one extra step — tick **Android SDK
> Command-line Tools (latest)** in Studio's SDK Manager — after which both
> routes are identical.

The Android Gradle Plugin needs JDK 17 or newer, and Capacitor's Android project
compiles against Java 21. This project compiles against **API 36** —
`compileSdkVersion` and `targetSdkVersion` are both 36 in
`src-capacitor/android/variables.gradle`, with `minSdkVersion` 24. Neither route
installs API 36 by default, so
[step 4](#4-install-the-api-36-packages) matters whichever you pick.

### 1. Install a JDK

```bash
brew install openjdk@21                          # macOS
winget install EclipseAdoptium.Temurin.21.JDK    # Windows
sudo apt install openjdk-21-jdk                  # Debian/Ubuntu
```

On macOS Homebrew keeps `openjdk@21` keg-only, so it has to be named explicitly
in `JAVA_HOME` below. On Windows the winget package sets `JAVA_HOME` and puts
itself first on PATH for you.

Android Studio ships a JetBrains Runtime it can build with, so Route A can
technically skip this — but Gradle from a terminal still wants `JAVA_HOME`, so
install one anyway.

### 2. Get the SDK

Pick one route.

#### Route A — Android Studio

Download from the [Android Studio page](https://developer.android.com/studio).

> ⚠️ **On Windows, download it rather than using winget.**
> `winget install Google.AndroidStudio` fails with *"The installer could not
> request administrative privileges and must abort"* — and then prints
> "Successfully installed" regardless, which is worse than failing outright.
> winget runs installers non-interactively, so Android Studio's installer has no
> way to raise a UAC prompt and gives up.
>
> The `.exe` from the download page works: run it from Explorer and let it
> install. Depending on your UAC settings you may or may not see an elevation
> prompt; either way it installs to `C:\Program Files\Android\Android Studio`.
> The `.zip` on the same page, listed as *"No .exe installer"*, is there if you
> would rather not run an installer at all — unpack it and run
> `bin\studio64.exe`. Neither has winget's problem.

Its first-run wizard downloads an SDK for you, into
`%LOCALAPPDATA%\Android\Sdk` on Windows by default. It installs the API level
*it* considers current, not the one this project compiles against, and it does
not install the command-line tools at all. So before going further, open
**SDK Manager**. On the Welcome screen there is no menu bar: use the gear icon
at the bottom left, then *Settings → Languages & Frameworks → Android SDK*.
With a project open it is *Tools → SDK Manager*. Then:

* on the **SDK Tools** tab, tick **Android SDK Command-line Tools (latest)** —
  this is what puts `android` and `avdmanager` on disk;
* on the **SDK Platforms** tab, tick *Show Package Details* and select
  **Android API 36**.

Ticking API 36 here does the same job as
[step 4](#4-install-the-api-36-packages); either is fine, but one of them has to
happen.

What Studio is genuinely good for here: **Device Manager**, which creates and
runs emulators through a wizard and says plainly when hardware acceleration is
not working. Also a filtered Logcat viewer and an APK analyser.

What it does *not* usefully add: the Java debugger, profiler and layout
inspector. This app is a web page in a WebView — the Java under
`src-capacitor/android` is generated boilerplate you never edit, and you debug
the app itself in Chrome DevTools over `chrome://inspect`.

#### Route B — command-line tools only

Download the **"Command line tools only"** archive from the bottom of the same
page — about 156 MB, no installer.

> ⚠️ **The unpacking is the step people get wrong.** The archive contains a
> single `cmdline-tools` folder, and the tools insist on living in a
> *version* directory beneath one of its own. The result has to be:
>
> ```
> <sdk>/cmdline-tools/latest/bin/android
> ```
>
> Unpack it, then rename the extracted `cmdline-tools` folder to `latest` and
> put it inside a `cmdline-tools` directory. Get this wrong and the tools fail
> with a bare `Could not determine SDK root`, which does not hint at the layout
> at all.

`<sdk>` is wherever you want the SDK to live. The conventional locations, which
Route A also uses by default, are:

| | |
|---|---|
| macOS | `~/Library/Android/sdk` |
| Windows | `%LOCALAPPDATA%\Android\Sdk` |
| Linux | `~/Android/Sdk` |

### 3. Point JAVA_HOME and ANDROID_HOME at them

Both routes need this: `adb`, `android` and Gradle are all run from a terminal,
and Gradle reads `JAVA_HOME`.

**macOS / Linux** — in `~/.zshrc` or `~/.bashrc`:

```bash
export JAVA_HOME="/opt/homebrew/opt/openjdk@21"        # macOS
export JAVA_HOME="/usr/lib/jvm/java-21-openjdk-amd64"  # Linux
export PATH="$JAVA_HOME/bin:$PATH"

export ANDROID_HOME="$HOME/Library/Android/sdk"        # macOS
export ANDROID_HOME="$HOME/Android/Sdk"                # Linux
export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"
```

**Windows** — open *System Properties → Advanced → Environment Variables* and do
both under **User variables**:

1. **New…** — name `ANDROID_HOME`, value `%LOCALAPPDATA%\Android\Sdk`
2. Select **Path**, **Edit…**, then **New** for each of these:

   ```
   %ANDROID_HOME%\platform-tools
   %ANDROID_HOME%\emulator
   %ANDROID_HOME%\cmdline-tools\latest\bin
   ```

`JAVA_HOME` is already set if you installed Temurin with winget.

> ⚠️ Do not reach for `setx` to edit PATH. It truncates the value at 1024
> characters, and it rewrites the whole thing as a plain string — so any
> `%USERPROFILE%`-style entry already there is frozen into a literal path and
> stops following the variable. The dialog preserves both.

> ⚠️ Set these at the **Windows** level, not in a Cygwin or Git Bash profile.
> `android`, `adb` and Gradle are native Windows programs and cannot read a
> `/cygdrive/c/...` value for `ANDROID_HOME`. Setting them in Windows means
> PowerShell and your POSIX shell both inherit values that work.

Then open a **new terminal** — and on Windows inside VS Code, restart VS Code,
because a new tab inherits the old environment. See
[the Windows shell notes](setup.md#a-note-on-windows-shells).

### 4. Install the API 36 packages

Neither route gives you these by default, so this step is not optional.

In Route A you can equally tick the same entries in Studio's **SDK Manager**,
which is often quicker than typing them. The Welcome screen has no menu bar —
reach it through the gear icon at the bottom left, then *Settings → Languages &
Frameworks → Android SDK*. With a project open it is *Tools → SDK Manager*.
Tick *Show Package Details* on the **SDK Platforms** tab to see individual API
levels rather than only the newest.

The SDK is managed by `android`, the unified Android CLI that ships in
`cmdline-tools`. Package names use slashes, and installing does not prompt for
licence acceptance:

```bash
android sdk install \
  platform-tools \
  platforms/android-36 \
  emulator \
  system-images/android-36/google_apis/x86_64     # arm64-v8a on Apple Silicon
```

The **system image differs by CPU**: `arm64-v8a` on Apple Silicon, `x86_64` on
Intel and AMD — which is every Windows machine and most Linux ones. It is a
large download, around 4 GB unpacked, and along with `emulator` is only needed
if you intend to run an emulator rather than a physical device — see
[An emulator](#an-emulator). `platform-tools` provides `adb` and is always
needed.

Check it took:

```bash
adb --version
android sdk list
```

`android sdk list` reports what is installed. The others worth knowing are
`android sdk update` and `android sdk remove`.

> **`sdkmanager` is deprecated.** It still runs, and prints a notice saying the
> Android CLI will be used instead before forwarding to it, so old instructions
> keep working. Its package names used semicolons — `platforms;android-36` —
> where `android sdk` uses slashes, and it had a `--licenses` step that the new
> CLI does not need.
>
> Two practical differences on Windows. `android` is an `.exe`, so it resolves
> from Git Bash and Cygwin by its bare name; `sdkmanager` is a `.bat`, which
> those shells will not find without the suffix, because they append `.exe` and
> not `.bat` when resolving a command. And `android` only exists in
> `cmdline-tools` 23 and newer — on an older SDK, upgrade it with
> `sdkmanager --install "cmdline-tools;latest"` first. Beware that much older
> SDKs shipped an unrelated `android` tool in `tools/bin`; that one is long dead
> and is not this.

## An emulator

Only needed if you have no physical Android device. A real device is faster,
needs no virtualisation, and is the only way to judge how the metronome actually
sounds — but an emulator is enough to check the app builds, installs and runs.

> ⚠️ **Do not calibrate the audio/visual offset on an emulator.** You will see a
> noticeable lag between the dots and the click, and there is a slider in the
> settings that appears to fix it. Resist it. The app already compensates using
> `baseLatency + outputLatency` from the Web Audio context, and an emulator
> routes audio through a virtualised stack whose reported latency has little to
> do with real hardware. An offset tuned here will be wrong on a phone.

### Hardware acceleration first

An emulator without CPU virtualisation is slow enough to be useless, so confirm
it is available before creating one.

**Windows** needs the *Windows Hypervisor Platform* feature, which coexists with
Hyper-V and WSL2. Check without elevation:

```powershell
Get-CimInstance Win32_OptionalFeature -Filter "Name='HypervisorPlatform'" |
  Select-Object Name, InstallState        # InstallState 1 = enabled
```

If it is not enabled, turn on *Windows Hypervisor Platform* in **Windows
Features** — that needs administrator rights and a reboot. Note that
`Win32_Processor` reporting `VirtualizationFirmwareEnabled: False` proves
nothing when a hypervisor is already running: Windows cannot see the raw CPU
features from inside one, so check `HypervisorPresent` instead.

**macOS** uses the Hypervisor framework and needs no setup. **Linux** needs KVM
— `ls -l /dev/kvm` and membership of the `kvm` group.

### Creating one with Android Studio

From the Welcome screen, open the **More Actions** dropdown and choose **Virtual
Device Manager** — it is not under the gear icon, which opens Settings. With a
project open it is *View → Tool Windows → Device Manager*.

An empty Device Manager says *"No devices connected"* and offers **Create
virtual device…**; the **+** button in its toolbar does the same. Then:

1. Pick a **hardware profile** — Pixel 7 or anything similar. This only sets the
   screen size, density and RAM; it has no bearing on what the app can do.
2. Pick a **system image**. You want **API 36**, `google_apis`, `x86_64` — the
   one [step 4](#4-install-the-api-36-packages) installed, which should appear
   as already downloaded rather than offering a download link.

   The list offers variants of the same API level, and two of the distinctions
   matter:

   * `google_apis` rather than **`google_apis_playstore`** — the Play Store
     variant blocks `adb root`, which you may want for debugging, and adds
     nothing this app uses.
   * the plain image rather than the **16 KB page size** one. Android is moving
     from 4 KB to 16 KB memory pages, and that image exists to test whether an
     app's native `.so` libraries are aligned for it. This app is a WebView, so
     the only native code is Capacitor's and its plugins' — but Google Play does
     require 16 KB compatibility for apps targeting recent Android versions, so
     it is worth installing that image *as well* before a Play submission. It is
     a separate package, not a replacement, and another few GB.
3. Name it and finish.

Creating a device does not start it. Press the **▶** beside it in the Device
Manager, or run `emulator -avd <name>` — `emulator -list-avds` shows the names.
First boot takes a minute or two, and `adb devices` reports it as `offline`
before it becomes `device`; wait for the second.

The hardware profile you pick is worth a moment's thought. A tablet profile
gives you a large landscape layout, which is a genuine thing to test since the
app is responsive, but it is not the phone form factor most users will have.
AVDs cost only disk, so having one of each is reasonable.

### Creating one from the command line

`avdmanager create avd` takes no `--sdk-root`, and reports an unhelpful usage
error if given one:

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

`-d pixel_7` picks a device profile; `avdmanager list device` shows the rest.

Either way, `adb devices` is how you confirm the emulator is up — it should show
`emulator-5554  device`. An emulator Studio started and one started with
`emulator -avd` are the same thing to `adb` and to Gradle.

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
./gradlew assembleDebug          # .\gradlew.bat from PowerShell
```

```
src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk
```

On Windows, `./gradlew` works from Git Bash and Cygwin; `.\gradlew.bat` is the
equivalent from PowerShell or cmd.

The first Gradle run fetches the Gradle distribution and the whole dependency
tree and takes a couple of minutes; after that an incremental build is seconds.

It also installs SDK packages of its own accord. The Android Gradle Plugin pins
the build-tools version it wants — 8.11.2 asks for `build-tools;35.0.0`, not the
36 you might expect from `compileSdkVersion 36` — and downloads and licence-
accepts it mid-build without being asked. That is why
[step 4](#4-install-the-api-36-packages) does not bother installing build-tools:
Gradle fetches the right one regardless of what you guessed.

Two harmless warnings appear on the way past:

* `This version only understands SDK XML versions up to 3 but an SDK XML file of
  version 4 was encountered` — the plugin's SDK reader is older than the
  command-line tools that wrote the metadata. It has no effect on the build.
* `uses-permission#android.permission.ACTIVITY_RECOGNITION was tagged ... but no
  other declaration present`, and the same for `BODY_SENSORS`. The manifest
  removes permissions a dependency no longer contributes.

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
./gradlew bundleRelease          # .\gradlew.bat from PowerShell
```

The signed release **AAB** is written to:

```
src-capacitor/android/app/build/outputs/bundle/release/app-release.aab
```

Google Play rejects a `versionCode` that has already been published, so always
increase the version before building a release you intend to upload.

## Installing on a device or emulator

An **AAB cannot be installed directly** on a device — use an **APK** for
on-device testing. The two builds land in different places, which is easy to
trip over:

| Build | APK |
|---|---|
| `./gradlew assembleDebug` | `src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk` |
| `npx quasar build -m capacitor -T android` | `dist/capacitor/android/apk/release/app-release.apk` |

The debug one is what you want while developing: no keystore, and it installs
alongside nothing else.

```bash
# List connected devices/emulators (each with its serial)
adb devices

# Install, or reinstall keeping data. Run from the repository root.
adb install -r src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk

# If several devices are connected, target one explicitly with -s <serial>
adb -s emulator-5554 install -r src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk
```

An 88 MB APK carrying 1,605 audio files takes a few seconds to push and install;
`adb` prints `Success` when it is done.

From Cygwin or Git Bash, `adb` is a native Windows binary and will not accept a
`/cygdrive/...` argument. A relative path from the repository root works, as
above, or convert it:

```bash
adb install -r "$(cygpath -w src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk)"
```

Common issues:

- **`INSTALL_FAILED_UPDATE_INCOMPATIBLE`** — a copy signed with a different key
  (e.g. the Play Store build) is already installed. Uninstall it first (this
  wipes the app's local data), then install again:
  ```bash
  adb uninstall com.dolcesfogato.palmas
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
