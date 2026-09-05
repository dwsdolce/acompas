# TODO

Work that is known about and not done. Each entry is a line and a pointer: the
reasoning lives next to the thing it concerns — in `docs/`, in the code, or in
the commit that introduced it — and restating it here would only create a second
copy to fall out of date. If an item needs a paragraph, the paragraph belongs
where the work does.

## Release

- **iOS build and App Store submission.** Needs the Mac. [docs/ios.md](docs/ios.md)
  has the flow, but its *Uploading to App Store Connect* section is written from
  Apple's documentation and has never been walked end to end.
- **First real run of the macOS signing path.**
  [packaging/build-desktop.mjs](packaging/build-desktop.mjs) absorbed the old
  `packaging/build_mac` in `6d16ddb`; `codesign` and `notarytool` cannot be
  exercised from Windows, so that half has never executed. Worth doing on the
  same trip as the iOS build.
- **Play Store account.** $25, and a personal account must run a closed test with
  12 testers opted in for 14 continuous days before it can apply for production
  access. See [docs/store-listing.md](docs/store-listing.md).
- **Review the machine-translated text**, Spanish, Farsi and Arabic especially.
  The palo descriptions and the release notes were translated in `7d8ba0e` and
  are unreviewed; the place names in ar/fa/ja/zh were transliterated rather than
  left in Latin script, which is the choice most worth a second opinion.

## Clean-up

- **`network_security_config.xml`** ships three upstream developers' private
  addresses, plus three entries that look like private-range wildcards and match
  only those literal addresses. Replacing it with a debug-variant file
  (`app/src/debug/res/xml/`, `<base-config cleartextTrafficPermitted="true"/>`)
  would let release refuse cleartext outright and remove the per-machine list.
  See *Live reload* in [docs/android.md](docs/android.md).
- **Put the required JDK under version control.** It currently lives in the
  gitignored `src-capacitor/android/.gradle/config.properties`, so every clone
  has to be told again and Android Studio guesses its own bundled runtime until
  someone does. `gradlew updateDaemonJvm --jvm-version 21 --jvm-vendor ADOPTIUM`
  writes `gradle/gradle-daemon-jvm.properties`, which is tracked and records
  criteria rather than a path. Wants testing on more than one machine, since
  Gradle must then find a matching JDK or fail.
- **Warn that a bare `gradlew assembleRelease` can package a stale dev server.**
  `quasar dev` writes `server.url` into the Android assets'
  `capacitor.config.json`, and only a `quasar build` clears it again.
  [docs/android.md](docs/android.md) documents building a release straight from
  Gradle without mentioning that.

## Features

- User-defined patterns
- Editing existing patterns
