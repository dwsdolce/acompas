# The technology stack

A Compás is a web application wearing a native shell. Every pixel you see is a
web page: it runs in a browser tab on [acompas.org](https://acompas.org), inside
a `WKWebView` on iOS, and inside Chromium on the desktop — the same code in all
three. What changes is the container.

That shape explains the dependency list. One set of packages builds a web
application, a second wraps it in something installable, and a third never ships
at all.

Versions below are what is installed in `node_modules`, which can sit ahead of
the range declared in `package.json` — `dompurify` is declared `^3.1.6` and
installed at `3.2.6`.

---

## What you see

The interface, its language, and its motion. **Ships to users.**

### `vue` — 3.4.31
The framework everything else is built on. You describe what the screen should
look like for a given state; Vue keeps the DOM matching it.

### `quasar` — 2.17.0
A component library and design system for Vue — buttons, dialogs, drawers,
toggles, dark mode, the responsive grid. It is why the app looks consistent
without hand-written CSS for every control.

Three of its plugins are switched on in `quasar.config.js`: `Notify` (the toast
that tells you to select an instrument), `Loading`, and `Dialog`.

### `pug` — 3.0.3
An indentation-based template language used instead of HTML. Every `.vue` file
here declares `<template lang="pug">`, which is why the markup has no closing
tags. It compiles to plain HTML at build time, so it costs the user nothing.

### `vue-router` — 4.4.0
Maps URLs to screens; each palo has its own address. Uses real URLs on the web
and hash URLs (`#/flamenco/solea`) in the native builds, because there is no
server to ask for a path when the page is loaded from inside the app bundle.
See `vueRouterMode` in `quasar.config.js`.

### `vue-i18n` — 9.14.5
Translation. Text lives in per-language files under `src/i18n/` rather than in
components. Ten languages, including Arabic and Persian, which read right to
left. The dev dependency `@intlify/vite-plugin-vue-i18n` compiles those files at
build time so lookups are fast at runtime.

### `animejs` — 3.2.2
A small animation library: given a target and a property, it interpolates over
time. Used for the pulse on each dot as its beat lands — scale up, ease back
down. See `src/components/DrawDots.vue`.

### `@quasar/extras` — 1.17.0
Icon sets and fonts packaged for Quasar. Only `mdi-v7` (Material Design Icons)
is enabled; the other five are commented out so they are never downloaded.

### `vue-global-events` — 3.0.1
Lets a component listen for keyboard events on the whole window without manually
adding and removing listeners. Powers the keyboard shortcuts.

---

## What it remembers

Shared state, and the parts that survive a restart. **Ships to users.**

### `pinia` — 2.1.7
The state store. Rather than passing data down through components, everything
reads from a central place and updates flow outward. Two stores here:
`patterns` holds the selected palo, tempo, instruments and beat events;
`session` holds preferences such as dark mode and the audio/visual offset.

### `@vueuse/core` — 10.11.0
A large collection of small Vue utilities, of which this app uses essentially
one: `useStorage`, which mirrors a value into `localStorage` automatically. It
is why your tempo, language and chosen pattern are still there next time.

---

## What makes the sound

The hard part, and the reason a metronome is not just a timer. **Ships to
users.**

### `tone` — 15.0.4
A framework over the browser's Web Audio API. Its value is scheduling:
JavaScript timers drift audibly, so Tone schedules notes against the audio
hardware clock instead, looking ahead and queueing events before they are due.

In `src/composables/metronome.ts`:

| Tone concept | Role here |
| --- | --- |
| `Transport` | The clock that tempo and swing act on |
| `Sequence` | One per instrument, playing that instrument's pattern array |
| `Player` | Holds each decoded sample |
| `Channel` | Mixes quarter- and eighth-note layers |
| `Reverb` | Adds room |
| `Draw` | Schedules dot animations against the same clock, so sight and sound stay together |

---

## The written material

Help pages, palo descriptions, the changelog. **Ships to users.**

### `marked` — 14.1.0
Turns Markdown into HTML. The help text and palo documentation are authored as
Markdown inside the translation files.

### `dompurify` — 3.2.6
Strips anything dangerous out of HTML before it is inserted into the page —
standard practice whenever generated HTML is injected, and what closes off
cross-site scripting. Paired with `marked`: parse, then sanitize, then render.
Some of that text is fetched from Wikipedia, so it is not all locally authored.

---

## The native shell

What turns a web page into something you install. **Ships to users.**

### `@capacitor/core` — 7.4.3
Wraps the web app in a real native application: a Swift or Kotlin project
containing a full-screen web view, plus a bridge that lets JavaScript call
native code. The web assets are copied inside the app bundle and served through
a custom URL scheme, so the app works with no network at all.

That scheme handler is also where the iOS audio bug lived: it answers requests
for media files with a response that `fetch()` reads as a failure. See the
comment in `loadSounds()` in `src/composables/metronome.ts`.

### `@capacitor/app` · `splash-screen` · `status-bar` — 7.1.0 / 7.0.3
Small official plugins exposing native behaviour to JavaScript: lifecycle events
such as pause and resume, the launch splash, and the colour and style of the
status bar.

### `@capacitor-community/keep-awake` — 7.1.0
Stops the screen sleeping. For a metronome propped on a music stand, this is not
a nicety.

### `electron` — 31.1.0
The desktop equivalent: bundles Chromium and Node.js into a Mac or Linux
application. Heavier than Capacitor — the browser engine ships with the app
rather than being borrowed from the operating system. `@electron/remote` lets
the page reach a few main-process APIs; `electron-builder` produces the
installers.

---

## What builds it

Runs on your machine. **None of this reaches a user.**

### `@quasar/app-vite` — 1.11.0
The build system and CLI. It owns `quasar dev` and `quasar build`, wires Vue,
the router, the store and Quasar together, and knows how to target each platform
— the reason `-m capacitor -T ios` means anything.

It carries its own Vite (2.9.18 here) rather than taking it as a dependency.
Version 1 is two majors behind current, which is where most of this project's
toolchain friction comes from.

### `typescript` — 5.5.3
JavaScript with type annotations, checked at build time and then erased. The
pattern and sound data are typed (`src/utils/types.ts`), which is what makes a
malformed sequence a build error rather than silence at runtime.

### `eslint` — 8.57.1 and `prettier` — 3.3.2
ESLint catches suspect code; Prettier formats it. `eslint-config-prettier`
switches off the ESLint rules that would argue with Prettier, and
`eslint-plugin-vue` teaches ESLint about `.vue` files.

### `autoprefixer` — 10.4.21
Adds vendor prefixes to CSS for the browsers listed in the build target, so you
write the standard property once.

### `electron-builder` — 24.13.3
Packages the Electron app into a `.dmg` or Linux package, handling signing and
metadata. Selected in `quasar.config.js` via `bundler: 'builder'`.

### `@capacitor/cli` — 7.4.3
Copies built web assets into the native projects and keeps their plugin lists in
sync. Quasar calls it for you during a Capacitor build.

---

## Declared but not carrying weight

These appear in `package.json` without being imported anywhere in the source or
referenced by the config. Some are harmless; a couple are leftovers from an
older toolchain. None is urgent, and each is one line to remove.

| Package | Why it is here |
| --- | --- |
| `pug-plain-loader` | A **webpack** loader. This project builds with Vite, which handles Pug through Quasar directly. Almost certainly left from the pre-Vite era. |
| `electron-packager` | The alternative Electron bundler. The config selects `builder`, so this path is never taken. Also deprecated upstream in favour of Electron Forge. |
| `@types/dompurify` | Type definitions for DOMPurify. Version 3 ships its own types, so this stub is redundant and can conflict. |
| `@types/animejs` | Types for anime.js, which ships none of its own — so this one **is** doing real work even though nothing imports it by name. Keep it. |
| `@vue/devtools` | The standalone Vue debugging app, launched when `vueDevtools` is enabled in `quasar.config.js`. Its bundled Electron fails to install, so enabling it currently breaks `quasar dev`. |
| `@capacitor/assets` | A CLI that generates app icons and splash screens from a source image. Run by hand, if at all — this project uses Quasar's Icon Genie instead (`icongenie.sh`). |
| `@vue/language-plugin-pug` | Teaches the Vue editor tooling to understand Pug templates. It improves your editor, not the build. |

---

## Not a package

The audio samples are not a dependency. They live in `public/audio` as 321
recordings in five formats (`wav` masters plus `flac`, `mp3`, `mp4`, `ogg`
generated by `format_audio.py`), and account for roughly 99 MB of the iOS app.
