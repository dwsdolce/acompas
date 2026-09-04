# Building the iOS app

> **macOS only.** Building for iOS requires Xcode, which Apple ships only for
> macOS. There is no Windows or Linux route.

iOS is a **Capacitor target**, not a Quasar mode, so it is built the same way as
Android: `-m capacitor -T ios`. There is no `-m ios` mode — passing one falls
through to Cordova and prompts for a Cordova app id, which this project does not
use.

## Contents

**Every build**

* [Building](#building) — the command, and what comes out
* [Installing on a device](#installing-on-a-device)
* [Uploading to App Store Connect](#uploading-to-app-store-connect)
* [When a build fails](#when-a-build-fails) — indexed by the error you got

**Once, ever**

* [Prerequisites](#prerequisites) — Xcode, CocoaPods, the Capacitor pods
* [The signing team](#the-signing-team)

**Reference**

* [Icons](#icons) — and the alpha channel that only fails at upload
* [Version numbering](#version-numbering)

---

## Building

Everything here runs **from the repository root**, not from `src-capacitor`.

| What you want | Command |
|---|---|
| An app to install and keep using | `npx quasar build -m capacitor -T ios --ide` |
| Live reload while working on the UI | `npx quasar dev -m capacitor -T ios --ide` |
| No IDE, just the built `.app` | `npx quasar build -m capacitor -T ios` |

`--ide` opens Xcode on `src-capacitor/ios/App/App.xcworkspace` once the web
assets are bundled and synced. Pick your device in the run destination menu and
press Run.

Without `--ide` the same build writes straight to:

```
dist/capacitor/ios/Build/Products/Release-iphoneos/App.app
```

That form needs the signing team to already be set — it is — since there is no
IDE to prompt for one.

> ⚠️ Always open the **workspace**, never `App.xcodeproj`. The bare project
> knows nothing about CocoaPods, and building it fails with `Unable to resolve
> module dependency: 'Capacitor'` plus a series of missing search paths.
> `@quasar/app-vite` 2.6.2 opened the wrong one for exactly this reason; 3.8.1
> fixed it, and `npx cap open ios` has always opened the workspace correctly.

### Which of the two to use

The `build` app is self-contained: it carries its own copy of the web assets and
all the audio, and keeps working with the Mac switched off. That is the one to
put on a phone you actually practise with.

The `dev` app does **not** bundle the web assets. It points the app's webview at
a dev server running on your Mac over the LAN (`http://<your-ip>:9500`), so
edits appear on the device instantly — but it shows a **blank screen** whenever
that server is not running, including every time you pick the phone up later
without the Mac. That is expected, not a broken build.

## Installing on a device

With `--ide`: choose the device in Xcode's run destination menu and press Run.
The first install to a given device asks you to trust the developer certificate
on the phone itself — **Settings → General → VPN & Device Management** — and the
app will refuse to launch until you do.

A free Apple ID signs an app for **7 days**; a paid Developer Program membership
for a year. When a build stops launching after about a week and nothing has
changed, that expiry is the reason: rebuild and reinstall.

## Uploading to App Store Connect

In Xcode: select **Any iOS Device** as the destination, then **Product →
Archive**, and from the Organizer window that opens, **Distribute App → App
Store Connect**.

The build number rises on its own — it is the git commit count, so every commit
produces a number Apple will accept as higher than the last. See
[Version numbering](#version-numbering). The name, subtitle and bundle
identifier the listing uses are in [store-listing.md](store-listing.md).

Run `yarn icons:all` before archiving if the artwork has changed since the last
one; see [Icons](#icons) for why that matters and how it fails if you skip it.

> This section is written from Apple's documented flow and has **not yet been
> walked end to end for this app**. Treat it as the shape of the process rather
> than a verified script, and expect App Store Connect to ask for things this
> page does not mention — a privacy questionnaire, an export-compliance answer,
> and screenshots at several device sizes.

## When a build fails

### `Unable to resolve module dependency: 'Capacitor'`

You opened `App.xcodeproj` instead of `App.xcworkspace`. Close it and open the
workspace. The project alone knows nothing about CocoaPods.

If you are already in the workspace, the pods are not installed — see
[Prerequisites](#prerequisites).

### `Sandbox: rsync(...) deny(1) file-write-unlink`

Xcode's **"Update to recommended settings"** was accepted. It sets
`ENABLE_USER_SCRIPT_SANDBOXING = YES`, which breaks the CocoaPods
"[CP] Embed Pods Frameworks" phase because that phase uses `rsync`. Set that one
setting back to `NO`; the rest of the migration is fine to keep.

### `Invalid Image - the app icon can't contain an alpha channel`

App Store Connect rejected the upload. Run `yarn icons:all` and archive again —
see [Icons](#icons). A device build installs happily with the alpha channel
present, which is why this only ever appears at upload.

### The app shows a blank screen

You installed the `dev` build and the dev server is not running. Build with
`quasar build` rather than `quasar dev` for anything you want to keep using —
see [Which of the two to use](#which-of-the-two-to-use).

### `cannot determine the build number from git`

The version phase needs a full checkout. A shallow clone
(`git clone --depth 1`) reports a commit count of 1, and a wrong
`CFBundleVersion` is not cosmetic: Apple accepts that upload and then refuses
every later one whose build number is not higher. Fetch the full history with
`git fetch --unshallow`.

### The app stops launching after about a week

The signing certificate expired. See [Installing on a device](#installing-on-a-device).

---

# Setting the machine up

Everything below is done once. Come back here only when
[Building](#building) sends you.

Do the [Getting started](../README.md#getting-started) steps first — the
prerequisites there are assumed by everything here.

## Prerequisites

* **Xcode**, from the Mac App Store.
* **CocoaPods** — check with `pod --version`. If it is missing, see the
  [CocoaPods getting started guide](https://guides.cocoapods.org/using/getting-started.html).
* **The Capacitor native dependencies.** The `Podfile` resolves each plugin out
  of `src-capacitor/node_modules`, which is a **separate** install from the root
  one:

  ```bash
  cd src-capacitor && yarn install
  ```

## The signing team

`DEVELOPMENT_TEAM` is set in
`src-capacitor/ios/App/App.xcodeproj/project.pbxproj`. With a different Apple
account, change it there, or pick the team in Xcode under the App target →
**Signing & Capabilities**.

## Icons

`yarn icons:all` regenerates the committed iOS assets and then runs
`packaging/prepare-ios-assets.mjs`, which flattens the app icon's alpha channel.
App Store Connect rejects an icon with transparency ("Invalid Image - the app
icon can't contain an alpha channel"), and a device build installs happily
either way, so the failure would otherwise surface only at upload.

Unlike the rest of this page, that step is not macOS-only: it is a Node script
and runs anywhere ffmpeg does, so the icons can be regenerated on whatever
machine is to hand. Only the Xcode build needs a Mac. It does have to be run
**on the Mac before archiving**, though, because what it fixes is checked at
upload and nowhere earlier.

## Version numbering

Two numbers, from two sources, stamped by
`src-capacitor/ios/App/set-version.sh` as an Xcode build phase:

| Key | Source | Example |
|---|---|---|
| `CFBundleShortVersionString` | `version` in the root `package.json` | `1.0.0` |
| `CFBundleVersion` | `git rev-list --count HEAD` | `874` |

Bump the version in `package.json` only. The build number looks after itself:
it rises with every commit, which is what App Store Connect requires, and it
names the commit a build came from. The app shows the pair as `1.0.0 (874)`.

This mirrors `src-capacitor/android/app/build.gradle`, so the two native targets
always report the same pair. The script rewrites the `Info.plist` inside the
*built* `.app`, never the one in the source tree, so a build never dirties git.

There is deliberately no fallback when git cannot answer — see
[the failure above](#cannot-determine-the-build-number-from-git).
