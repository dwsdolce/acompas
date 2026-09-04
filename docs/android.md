# Building the Android app

Android builds work from **macOS, Windows and Linux**. Android is a Capacitor
target rather than a Quasar mode, so every build command is `-m capacitor -T
android`.

Do the [Getting started](../README.md#getting-started) steps first — this guide
assumes `yarn install` has already run.

## Contents

**Every build** — what you do each time:

- [Building](#building)
- [Generating the AAB for the Play Store](#generating-the-aab-for-the-play-store)
- [Installing on a device or emulator](#installing-on-a-device-or-emulator)
- [When a build fails](#when-a-build-fails)

**Once, ever** — machine setup. Skip it unless a build says something is
missing, or this is a new machine:

- [Prerequisites](#prerequisites) — JDK, SDK, `JAVA_HOME`, `ANDROID_HOME`
- [An emulator](#an-emulator)
- [Creating a keystore](#creating-a-keystore) — needed only to sign a release

**Reference**

- [Version numbering](#version-numbering)

## Building

Everything here runs **from the repository root**, and nothing here needs
setting up more than once. If a command fails complaining about a JDK, an SDK,
`ANDROID_HOME` or a keystore, that is [Prerequisites](#prerequisites) or
[Creating a keystore](#creating-a-keystore) — done once and then never again.

```bash
cd ~/src/palmas          # wherever you cloned it
```

| What you want | Command | Where it lands |
|---|---|---|
| Run it on an emulator, with reload | `npx quasar dev -m capacitor -T android` | — |
| A **debug APK** to install and test | see [Debug APK](#debug-apk) below | `src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk` |
| A **signed release APK** | `npx quasar build -m capacitor -T android` | `dist/capacitor/android/apk/release/app-release.apk` |
| An **AAB** for the Play Store | see [the AAB](#generating-the-aab-for-the-play-store) | `src-capacitor/android/app/build/outputs/bundle/release/app-release.aab` |

### Signed release APK

```bash
cd ~/src/palmas
npx quasar build -m capacitor -T android
```

Signing uses `src-capacitor/android/keystore.properties`. **Without that file
the build still succeeds**, but produces an unsigned APK under a different
name — `app-release-unsigned.apk` — which cannot be installed and which the
Play Store will not accept. The suffix is the quickest way to tell which you
have; Gradle adds it itself.

### Debug APK

Quicker than a release build and needs no keystore, so it is what you want while
developing:

```bash
cd ~/src/palmas
npx quasar build -m capacitor -T android --skip-pkg   # web assets + cap sync

cd ~/src/palmas/src-capacitor/android
./gradlew assembleDebug          # .\gradlew.bat from PowerShell
```

On Windows `./gradlew` works from Git Bash and Cygwin; `.\gradlew.bat` is the
equivalent from PowerShell or cmd.

### What to expect

The first Gradle run fetches the Gradle distribution and the whole dependency
tree and takes a couple of minutes; after that an incremental build is seconds.

It also installs SDK packages of its own accord. The Android Gradle Plugin pins
the build-tools version it wants — 8.11.2 asks for `build-tools;35.0.0`, not the
36 you might expect from `compileSdkVersion 36` — and downloads and licence-
accepts it mid-build without being asked. That is why
[step 4](#4-install-the-api-36-packages) does not bother installing build-tools:
Gradle fetches the right one regardless of what you guessed.

Two warnings appear on the way past and can be ignored:

* `This version only understands SDK XML versions up to 3 but an SDK XML file of
  version 4 was encountered` — the plugin's SDK reader is older than the
  command-line tools that wrote the metadata. It has no effect on the build.
* `uses-permission#android.permission.ACTIVITY_RECOGNITION was tagged ... but no
  other declaration present`, and the same for `BODY_SENSORS`. The manifest
  removes permissions a dependency no longer contributes.

## Generating the AAB for the Play Store

Google Play requires an **AAB** (Android App Bundle), not an APK. It must be
signed, so this needs [a keystore](#creating-a-keystore) first.

> ⚠️ The `--aab` flag of `quasar build` is **not honored** — still true as of
> `@quasar/app-vite` 3.8.1, whose Capacitor mode has no handling for it at all;
> it silently runs `assembleRelease` and produces an APK. Generate the bundle
> directly with Gradle instead:

```bash
# From the repository root: build the web assets and sync them into the
# Android project. This step must run from the root, not from src-capacitor.
cd ~/src/palmas
npx quasar build -m capacitor -T android

# Then, from the Android project: build the signed release bundle
cd ~/src/palmas/src-capacitor/android
./gradlew bundleRelease          # .\gradlew.bat from PowerShell
```

> ⚠️ Both `cd` lines are spelled out because the two commands run from
> *different* directories, and the second leaves you in the wrong place for the
> first. Running this block a second time from where it left you is the usual
> way to get `Command "./gradlew.bat assembleRelease" failed with exit code: 1`
> — see [When a build fails](#when-a-build-fails).

The signed release **AAB** is written to:

```
src-capacitor/android/app/build/outputs/bundle/release/app-release.aab
```

Note that this is under `src-capacitor/android/app/build/outputs`, not in
`dist/` — Quasar copies the APK out but leaves the bundle where Gradle put it,
because it never asked for a bundle in the first place.

> **The AAB is bigger than the APK, and that is not a problem.** At 1.0.0 the
> bundle is about 37 MB against the APK's 29 MB, which looks like the wrong way
> round for the format that is supposed to make downloads smaller.
>
> A bundle is not a thing anyone installs. It carries every screen density,
> language and architecture together, and Play generates a cut-down APK per
> device from it. What a user downloads is smaller than the 29 MB APK, not
> larger. The size to judge is the one Play reports after upload, not this file.

Google Play rejects a `versionCode` that has already been published. That is
handled for you: the `versionCode` is the git commit count, so any build made
from a later commit already carries a higher one, and re-uploading the same
build is the only way to trip over it. See
[Version numbering](#version-numbering).

## Installing on a device or emulator

An **AAB cannot be installed directly** on a device — use an **APK** for
on-device testing. The two builds land in different places, which is easy to
trip over:

| Build | APK |
|---|---|
| `./gradlew assembleDebug` | `src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk` |
| `npx quasar build -m capacitor -T android` | `dist/capacitor/android/apk/release/app-release.apk` |
| the same, with no `keystore.properties` | `dist/capacitor/android/apk/release/app-release-unsigned.apk` |

The debug one is what you want while developing: no keystore, and it installs
alongside nothing else. The unsigned release will not install at all — `adb
install` refuses it with `INSTALL_PARSE_FAILED_NO_CERTIFICATES`.

```bash
# List connected devices/emulators (each with its serial)
adb devices

# Install, or reinstall keeping data. Run from the repository root.
adb install -r src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk

# If several devices are connected, target one explicitly with -s <serial>
adb -s emulator-5554 install -r src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk
```

A 29 MB APK carrying 642 audio files takes a few seconds to push and install;
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

## When a build fails

Android build failures tend to name a symptom rather than a cause, and to
appear a long way from the thing that is actually wrong. Find the message here
rather than reading upward from it.

### `Command "./gradlew.bat assembleRelease" failed with exit code: 1`

On its own this says nothing — Quasar discards Gradle's output. Two lines above
it, Quasar names the directories it used:

```
Running "capacitor sync android" in /src-capacitor
Running "./gradlew.bat assembleRelease" in /src-capacitor\android
```

**If those read `in /..` and `in /`, you are not at the repository root.**
Quasar resolves everything relative to the current directory, so from
`src-capacitor/android` it looks two levels too high and runs Gradle in the
filesystem root. `cd ~/src/palmas` and run it again.

This is easy to fall into because the AAB and debug-APK steps *do* ask you to
`cd src-capacitor/android`, and leave you there.

If the directories are right, run Gradle directly to see the real error, which
Quasar is hiding:

```bash
cd ~/src/palmas/src-capacitor/android
./gradlew assembleRelease
```

### `SDK location not found … local.properties`

```
SDK location not found. Define a valid SDK location with an ANDROID_HOME
environment variable or by setting the sdk.dir path in your project's local
properties file at '…\src-capacitor\android\local.properties'
```

`ANDROID_HOME` is not reaching the build. It names `local.properties`, a file
Android Studio writes and which is not in this repository, so it sends you
looking in the wrong place.

Check what your shell actually received:

```bash
echo "$ANDROID_HOME"
```

* **Nothing** — it was never set, or was set after this shell started. See
  [step 3](#3-point-java_home-and-android_home-at-them), then restart the
  terminal, and VS Code itself if you are inside it.
* **A literal `%LOCALAPPDATA%\Android\Sdk`** — it is set under *System*
  variables instead of *User* variables, where `%LOCALAPPDATA%` cannot expand.
  The dialog and PowerShell both show the correct path even so. See the warning
  in [step 3](#3-point-java_home-and-android_home-at-them).

### `keystore password was incorrect`

```
KeytoolException: Failed to read key palmas from store "…": keystore password
was incorrect
```

Either the password is wrong, or something altered it on the way in. Check the
password against the keystore first, with no file in between:

```bash
cd ~/keys
keytool -list -keystore palmas-upload.jks
```

* **It lists the entry** — the password is right, so `keystore.properties` is
  wrong. The usual cause is a **backslash**: it is a Java properties file, so
  `\` escapes and is silently dropped from the value. See
  [Point the build at it](#point-the-build-at-it).
* **It refuses the password too** — the keystore has a different password than
  you think. Nothing is lost by generating a new keystore, provided you have not
  yet distributed anything signed with the old one.

### `Failed to read key … store "C:Usersdws…"`

The path in the message has lost its separators. That is the same backslash
rule: `storeFile=C:\Users\you\keys\palmas-upload.jks` is read as
`C:Usersyoukeyspalmas-upload.jks`. Write the path with forward slashes.

### `INSTALL_PARSE_FAILED_NO_CERTIFICATES`

You are installing `app-release-unsigned.apk`. An unsigned APK cannot be
installed. Use the debug APK for testing, or set up
[a keystore](#creating-a-keystore) to get a signed one.

### `Cannot determine the build number`

The `versionCode` is the git commit count, and the build refuses to guess. This
means git could not supply one — almost always a shallow clone (`git clone
--depth`, or `actions/checkout` without `fetch-depth: 0`), which reports `1`.
Build from a full checkout. See [Version numbering](#version-numbering).

### `keytool error: … \cygdrive\c\… (The system cannot find the path specified)`

`keytool` is a native Windows program and cannot read a Cygwin path. It fails
only at the point of writing, after prompting for everything. See
[Generate it](#generate-it).

---

# Setting the machine up

Everything below happens **once**. A machine that has built the app before needs
none of it, and neither does a new release — go back to
[Building](#building) for that.

Work through it in order the first time. The last section,
[Creating a keystore](#creating-a-keystore), is needed only when you want to
sign a release; debug builds do not use it.

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
both under **User variables**. Not *System variables*: the difference looks
cosmetic and is not — see the warning below.

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

> ⚠️ **Under *User* variables, not *System* ones** — because of
> `%LOCALAPPDATA%`. That is not a stored variable at all: Windows synthesises
> it when it builds a *user's* environment. A System variable is expanded
> against the *system* environment, which has no `LOCALAPPDATA`, so the
> placeholder is passed through untouched and `ANDROID_HOME` arrives at your
> shell as the literal text `%LOCALAPPDATA%\Android\Sdk`, naming a directory
> that does not exist.
>
> Nothing about this looks wrong. The Environment Variables dialog shows what
> you typed, and PowerShell reports the correct path — because
> `[Environment]::GetEnvironmentVariable('ANDROID_HOME','Machine')` expands in
> your logged-in context. Only a program actually using the value fails, and it
> fails somewhere else entirely. To check what your shell really received:
>
> ```bash
> echo "$ANDROID_HOME"     # a literal %LOCALAPPDATA% here means it is in the wrong scope
> ```
>
> If you would rather keep it under System variables, write the path out in
> full — `C:\Users\<you>\AppData\Local\Android\Sdk` — and accept that a
> machine-wide variable then points inside one user's profile.

Then open a **new terminal** — and on Windows inside VS Code, restart VS Code,
because a new tab inherits the old environment. See
[the Windows shell notes](setup.md#a-note-on-windows-shells).

### Check that step 3 took

Both variables fail a long way from their cause, so confirm them before going
further. Each command should print a real path and find a real file:

```bash
echo "$ANDROID_HOME"
ls "$ANDROID_HOME/platform-tools/adb.exe"     # adb, without .exe, on macOS and Linux
echo "$JAVA_HOME"
```

```powershell
$env:ANDROID_HOME
Test-Path "$env:ANDROID_HOME\platform-tools\adb.exe"
$env:JAVA_HOME
```

If `ANDROID_HOME` prints an unexpanded `%LOCALAPPDATA%`, or nothing at all, this
step has not taken effect — and a build will not tell you so until much later,
with [`SDK location not
found`](#sdk-location-not-found--localproperties), which names neither this
variable nor this step. Worth two seconds now rather than ten minutes then.

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
  -n palmas-api36 \
  -k "system-images;android-36;google_apis;x86_64" \
  -d pixel_7

emulator -avd palmas-api36 &
adb devices          # emulator-5554  device
```

On Windows the executable is `avdmanager.bat`, and there is no `&` for
backgrounding — start it in its own terminal:

```powershell
& "$env:ANDROID_HOME\cmdline-tools\latest\bin\avdmanager.bat" create avd `
  -n palmas-api36 -k "system-images;android-36;google_apis;x86_64" -d pixel_7

Start-Process emulator -ArgumentList '-avd','palmas-api36'
adb devices
```

`-d pixel_7` picks a device profile; `avdmanager list device` shows the rest.

Either way, `adb devices` is how you confirm the emulator is up — it should show
`emulator-5554  device`. An emulator Studio started and one started with
`emulator -avd` are the same thing to `adb` and to Gradle.

## Creating a keystore

Only needed to produce a *signed* build. Debug builds and unsigned release
builds need none of this, so skip the section until you are shipping something.

### What the key is, and what losing it costs

Two different keys are involved, and which one you are making decides how
frightening this is.

* **With Play App Signing** — the default for new apps — the key you create here
  is only an **upload key**. Google holds the key that actually signs what
  users install. Lose your upload key and Google can register a new one for you.
* **Distributing the APK yourself**, from a website or by hand, makes this key
  the **signing key**. Android will not install an update signed by a different
  key, so losing it means nobody who has your app can ever update it. There is
  no recovery, no appeal, and no workaround but persuading every user to
  uninstall and start again.

Either way, [back it up](#back-it-up) before you publish anything signed with
it.

### Generate it

```bash
mkdir -p ~/keys
cd ~/keys
keytool -genkeypair -v \
  -keystore palmas-upload.jks \
  -alias palmas \
  -keyalg RSA -keysize 4096 -validity 10000 \
  -storetype PKCS12
```

`keytool` ships with the JDK, so it is already on PATH from
[step 1](#1-install-a-jdk).

> ⚠️ **Change directory first, and give `-keystore` a bare filename** — as
> above. `keytool` is a native Windows program and cannot read a Cygwin path.
> Writing `-keystore ~/keys/palmas-upload.jks` from Cygwin passes it
> `/cygdrive/c/Users/you/keys/palmas-upload.jks`, which the JVM reads as a
> Windows path and cannot find:
>
> ```
> keytool error: java.io.FileNotFoundException:
>   \cygdrive\c\Users\you\keys\palmas-upload.jks (The system cannot find the path specified)
> ```
>
> It is a slow way to fail: the message arrives *after* you have entered the
> passwords and all six certificate fields, and after the key pair has been
> generated. Nothing is saved, so it all has to be typed again.
>
> A bare filename resolves against the real Windows working directory, which
> Cygwin and Git Bash both set correctly, so it works from every shell on every
> platform. If you would rather stay where you are, convert the path instead:
> `-keystore "$(cygpath -w ~/keys/palmas-upload.jks)"`.

Three of those flags are choices rather than ceremony:

* **`-alias`** names the key inside the keystore. You will repeat it in
  `keystore.properties`, and it cannot be changed later.
* **`-validity 10000`** is about 27 years. Google Play requires a certificate
  valid past 2033, and a key that expires is a key you can no longer ship
  updates with, so err long.
* **`-storetype PKCS12`** is the modern format. Without it, older JDKs write the
  proprietary JKS format and warn about migrating on every use.

### The questions it asks

First it asks you to invent a **keystore password**, twice. This is not issued
by anyone and cannot be recovered — forgetting it is the same as losing the
file.

> **The rules are not what you might guess.** `keytool` enforces exactly one:
> **at least 6 characters**. No maximum, no required mix of character types.
>
> But a second rule comes from somewhere else. The password is later read from
> `keystore.properties` by Java's `Properties.load()`, where `\` is an escape
> character — so **a backslash in the password is silently swallowed**:
>
> ```
> typed  back\slash    →  Gradle reads  backslash
> typed  two\\back     →  Gradle reads  two\back
> ```
>
> Spaces, `$`, `#`, `:`, `=` and trailing spaces all survive intact. Only the
> backslash bites, and it bites late: the build fails with *"Keystore was
> tampered with, or password was incorrect"*, which blames the keystore rather
> than the password that was altered on the way in. Avoid `\`, and avoid
> non-ASCII too — the file has no declared encoding.

Then it asks six certificate fields. **None is validated, and none is shown to
users** — the Play listing displays your developer account name, not this
certificate. They are visible to anyone who inspects the APK, and they are
permanent, so answer them honestly and move on.

| Prompt | Field | Example |
|---|---|---|
| First and last name | `CN` | `Dolce Sfogato` |
| Organizational unit | `OU` | blank, or `Development` |
| Organization | `O` | `Dolce Sfogato` |
| City or Locality | `L` | your city |
| State or Province | `ST` | your state |
| Two-letter country code | `C` | `US` |

Last it asks for a **key password**, offering to reuse the keystore password if
you press Return. Reusing it is the usual choice and what PKCS12 effectively
assumes.

### Back it up

Do this now, while the passwords are still in your head. This is the step that
is easiest to postpone and most expensive to have postponed.

**Four things, because the keystore alone is useless:**

1. `palmas-upload.jks`
2. Both passwords — or the one, if you reused it for the key
3. The alias — `palmas`
4. The certificate fingerprint

The fingerprint is the one people skip. It is how you confirm that a restored
copy is the *right* key rather than merely a valid one, and Play displays the
fingerprint it expects for your app — so if you are ever holding two candidate
files and a vague memory, this settles it:

```bash
cd ~/keys
keytool -list -v -keystore palmas-upload.jks -alias palmas | grep -A1 "SHA256:"
```

**Keep two copies, in different places, at least one off this machine.** A
password manager entry with the file attached is the tidiest arrangement: key,
passwords, alias and fingerprint together, encrypted, and already part of
something you back up. An encrypted archive in cloud storage does the job too —
though not with the passwords in plain text beside it.

Never in the repository. `*.jks`, `*.keystore` and `keystore.properties` are all
gitignored so that this cannot happen by accident.

**Write down what it is for.** In three years, a file called
`palmas-upload.jks` with nothing beside it is one you will be afraid to delete
and unable to use. A single line — *Palmas Android signing key, created
2026-09-03, alias `palmas`* — is enough.

### Point the build at it

Create `src-capacitor/android/keystore.properties`:

```properties
storeFile=C:/Users/you/keys/palmas-upload.jks
storePassword=your keystore password
keyAlias=palmas
keyPassword=your key password
```

> ⚠️ **Write the path with forward slashes, even on Windows.** This is a Java
> properties file, so `\` is an escape character and the path you would
> naturally type is quietly destroyed:
>
> ```
> storeFile=C:\Users\dws\keys\palmas-upload.jks
>   →  Gradle reads  C:Usersdwskeyspalmas-upload.jks
> ```
>
> Forward slashes work perfectly well in Java on Windows and need no escaping.
> Doubling the backslashes — `C:\\Users\\dws\\…` — also works, if you prefer.
> This is the same escaping rule that eats a backslash in the passwords above.

> ⚠️ **A relative `storeFile` resolves against `src-capacitor/android`**, not
> the repository root, because `build.gradle` reads it through
> `rootProject.file(...)` and the Gradle root project *is* that directory. A
> path that looks right from the repo root will not be found. An absolute path
> avoids the question entirely.

The file is gitignored, along with `*.jks` and `*.keystore`, so neither the
keystore nor the passwords can be committed by accident. Check that for
yourself rather than taking it on trust:

```bash
git check-ignore -v src-capacitor/android/keystore.properties
```

Note that the passwords sit in **plain text** in that file. That is the standard
Android arrangement, and it means the password protects you from someone who
obtains the keystore *without* the properties file — not from anyone with access
to your working tree.

With the file in place, `npx quasar build -m capacitor -T android` produces
`app-release.apk` rather than `app-release-unsigned.apk`. That change of name is
the quickest confirmation that signing actually happened.

## Version numbering

The two numbers come from different places, and only one of them is edited by
hand — see the top of `src-capacitor/android/app/build.gradle`:

| | value | source |
|---|---|---|
| `versionName` | `1.0.0` | the `version` field in the root `package.json` |
| `versionCode` | `868` | `git rev-list --count HEAD`, the commit count |

The commit count is the build number everywhere in this project — the header
shows `v1.0.0 (868)`, and iOS uses the same pair for
`CFBundleShortVersionString` and `CFBundleVersion`. It rises with every commit,
which is what Play requires, and it names the commit a build came from, so a
report quoting a build number identifies the exact source.

To release a new version, edit `version` in the root `package.json`. The build
number looks after itself.

> ⚠️ **The build fails rather than guessing** if git cannot supply a count. A
> shallow clone — `git clone --depth`, or `actions/checkout` without
> `fetch-depth: 0` — reports `1`, and a `versionCode` of 1 is the kind of
> mistake Play accepts happily and then holds you to: every later upload is
> refused for not being higher. Build from a full checkout.
