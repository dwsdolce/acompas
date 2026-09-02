# Building the iOS app

> **macOS only.** Building for iOS requires Xcode, which Apple ships only for
> macOS. There is no Windows or Linux route.

iOS is a **Capacitor target**, not a Quasar mode, so it is built the same way as
Android: `-m capacitor -T ios`. There is no `-m ios` mode — passing one falls
through to Cordova and prompts for a Cordova app id, which this project does not
use.

Do the [Getting started](../README.md#getting-started) steps first.

## Prerequisites

* **Xcode** and **CocoaPods** (check with `pod --version`). If CocoaPods is
  missing, see the [CocoaPods getting started guide](https://guides.cocoapods.org/using/getting-started.html).
* **The Capacitor native dependencies.** The `Podfile` resolves each plugin out
  of `src-capacitor/node_modules`, which is a **separate** install from the root
  one:

  ```bash
  cd src-capacitor && yarn install
  ```

* **A signing team.** `DEVELOPMENT_TEAM` is set in
  `src-capacitor/ios/App/App.xcodeproj/project.pbxproj`; with a different Apple
  account, change it there or pick the team in Xcode under the App target →
  Signing & Capabilities.

## Building the app

**To install it on your own iPhone or iPad and actually use it**, build the
production bundle and hand the project to Xcode:

```bash
npx quasar build -m capacitor -T ios --ide
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

```bash
npx quasar dev -m capacitor -T ios --ide
```

> ⚠️ The `dev` variant does *not* bundle the web assets. It points the app's
> webview at a dev server running on your Mac over the LAN
> (`http://<your-ip>:9500`), so edits appear on the device instantly — but the
> app shows a **blank screen** whenever that server is not running, including
> every time you pick the app up later without the Mac. That is expected, not a
> broken build. Use `quasar build` for anything you want to keep using.

**Without opening Xcode at all**, the same build command writes the app straight
to:

```
dist/capacitor/ios/Build/Products/Release-iphoneos/App.app
```

This form needs the signing team to already be set (it is), since there is no IDE
to prompt for one.

## Version numbering

`CFBundleShortVersionString` and `CFBundleVersion` are stamped from the root
`package.json` by `src-capacitor/ios/App/set-version.sh`, which runs as an Xcode
build phase — the same single source of truth Android uses. Bump the version in
`package.json` only.

## Icons

`yarn icons:all` regenerates the committed iOS assets and then runs
`packaging/prepare_ios_assets`, which flattens the app icon's alpha channel.
App Store Connect rejects an icon with transparency ("Invalid Image - the app
icon can't contain an alpha channel"), and a device build installs happily
either way, so the failure would otherwise surface only at upload.

## If Xcode offers "Update to recommended settings"

Accepting it sets `ENABLE_USER_SCRIPT_SANDBOXING = YES`, which breaks the
CocoaPods "[CP] Embed Pods Frameworks" phase — it uses `rsync`, and the build
fails with `Sandbox: rsync(...) deny(1) file-write-unlink`. Set that one setting
back to `NO`; the rest of the migration is fine to keep.
