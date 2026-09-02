# A Compás

![Version](https://img.shields.io/badge/version-4.2.2-blue)
![License](https://img.shields.io/badge/license-AGPL--3.0-green)

A flamenco metronome available on multiple platforms:

* Web application (available at [https://acompas.org](https://acompas.org))
* Mobile application using [Capacitor](https://capacitorjs.com), [available on the Google Play marketplace](https://play.google.com/store/apps/details?id=audio.acompas.app)
* Desktop application (Electron)

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

---

# Getting started

## Quick start

Three steps. The setup script handles the rest — including installing Node.js if
this machine does not already have it.

**1. Clone the project.**

```bash
git clone https://github.com/dwsdolce/acompas.git
cd acompas
```

**2. Run the setup script.** Choose by **the shell you are typing into**, not by
your operating system:

```powershell
powershell -ExecutionPolicy Bypass -File .\setup.ps1
```

```bash
./setup.sh
```

**3. Start the app.**

```bash
yarn dev
```

It opens at <http://localhost:9000/>.

### Which script, and why the long Windows command

Pick by shell, because on Windows both are common:

* At a `PS>` or `C:\>` prompt — **`setup.ps1`**.
* At a `$` prompt — **`setup.sh`**. That includes Git Bash, Cygwin and WSL *on
  Windows*, and it includes those terminals inside VS Code. Running
  `./setup.ps1` there makes bash try to parse PowerShell and produces a screen
  of `command not found` and `syntax error near unexpected token`.

Both scripts do the same job; only the language differs.

The Windows command is spelled out in full because Windows refuses to run local
scripts by default, with:

```
.\setup.ps1 : File ...\setup.ps1 cannot be loaded because running scripts is
disabled on this system.
```

`-ExecutionPolicy Bypass -File` applies to that one invocation and changes
nothing about the machine. If you would rather allow local scripts generally —
read [setup.ps1](setup.ps1) first, it is short — then
`Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` lets you use the shorter
`.\setup.ps1` from then on.

### What the setup script does

You do not need to work out first whether Node.js is on the machine. The script
determines that, which is not something you could reasonably be expected to know
anyway — plenty of applications install Node without ever mentioning it.

1. **`setup.ps1` / `setup.sh`** check for a usable Node and install one if there
   is none. That is *all* they do. They exist only because the main script is
   written in Node, and so cannot be the thing that discovers Node is missing.
2. **`scripts/setup.mjs`** takes over: the Node version this project needs,
   Yarn, ffmpeg, and the project's dependencies — both of them, since
   `src-capacitor` is a second install that even the web build requires.

It changes **nothing** without asking, asks only where there is a real decision
to make, and is safe to run repeatedly — re-running it is how you resume after a
step that needs a new terminal.

To see what it would do without changing anything, add `--check`:

```powershell
powershell -ExecutionPolicy Bypass -File .\setup.ps1 --check
```

```bash
./setup.sh --check
```

### Doing it by hand

[docs/setup.md](docs/setup.md) is the same work done manually, with the
reasoning behind every step: what each prerequisite is for, the Node version
manager question, the Windows shell and PATH traps, and what `yarn install`
generates. Read it if the script fails, if you would rather not run a script
that installs things, or if you want to know what is being checked and why.

### Starting over

Everything the setup produces is gitignored, so deleting it never touches a
tracked file. To return to an earlier state:

```bash
rm -rf src-capacitor/node_modules          # redo just the Capacitor install
rm -rf node_modules .quasar                # redo the dependency install
node scripts/format-audio.mjs unconvert    # redo the audio generation
```

`rm -rf node_modules src-capacitor/node_modules .quasar dist` plus that
`unconvert` puts you back to a freshly cloned tree. Re-running the setup script
then rebuilds all of it; budget a few minutes, most of it ffmpeg converting the
audio masters. The `unconvert` command needs no dependencies, so it still works
with `node_modules` deleted.

## Run the app

```bash
yarn dev        # serve with hot reload at localhost:9000
yarn build      # build for production into dist/spa
yarn preview    # serve that production build at localhost:4173
```

`yarn preview` is how you run the *built* app. You cannot simply open
`dist/spa/index.html`: the browser blocks module scripts over `file://`, and the
app would not load. A plain file server is not enough either — the web build
uses **history** routing, so `/flamenco/solea` is a route rather than a file and
has to be answered with `index.html`. `yarn preview` does that fallback, while
still returning a real 404 for a missing asset, so a broken build still looks
broken. It is the same server the end-to-end tests and the CI smoke test use:
[scripts/serve-static.mjs](scripts/serve-static.mjs).

The Quasar CLI is a project dependency rather than a global install, so run it
through yarn as above, or with `npx quasar dev` / `npx quasar build`. A bare
`quasar` command only works if you happen to have one installed globally, which
is why every command in these docs uses `yarn` or `npx`.

> ⚠️ **On Windows, `yarn dev` in Windows PowerShell may fail** with *"cannot be
> loaded because running scripts is disabled on this system"*. That is not this
> project: npm installs a `yarn.ps1` shim, PowerShell prefers it over
> `yarn.cmd`, and `Restricted` — Microsoft's default for Windows PowerShell —
> forbids running it. Fix it once, per-user and without elevation:
>
> ```powershell
> Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
> ```
>
> Or use cmd, PowerShell 7, or any POSIX shell, none of which are affected. See
> [docs/setup.md](docs/setup.md#a-note-on-windows-shells) for the detail.

## Building for a specific platform

| Target | Build from | Command | Guide |
|---|---|---|---|
| Web (SPA) | macOS, Windows, Linux | `yarn build` | see [Run the app](#run-the-app) above |
| Desktop (Electron) | macOS, Windows, Linux | `yarn build:desktop` | [docs/desktop.md](docs/desktop.md) |
| Android | macOS, Windows, Linux | `npx quasar build -m capacitor -T android` | [docs/android.md](docs/android.md) |
| iOS | macOS only | `npx quasar build -m capacitor -T ios` | [docs/ios.md](docs/ios.md) |

Each build runs on the platform it targets — electron-builder does not
cross-compile, and the mobile toolchains are the vendors' own.
`yarn build:desktop` checks its prerequisites, picks up signing credentials if
you have any, and describes what it produced; on macOS it hands over to
`packaging/build_mac`, which also notarises.

## Tests

```bash
yarn test          # unit and component tests (Vitest), ~6s
yarn test:watch    # the same, re-running on change
yarn test:e2e      # Electron and web end-to-end tests (Playwright)
```

`yarn install` prepares the project via `quasar prepare`, so a fresh clone can
lint and test without a build; run `npx quasar prepare` by hand if you ever
delete `.quasar`.

`yarn test` runs in CI on every push. It covers four things:

- **Pattern data** - every sequence is as long as `nbBeatsInPattern`, accents
  fall inside the pattern and ascend, tempos are ordered, names are unique.
  These lock in properties that are easy to break by hand-editing the data.
- **Translations** - every locale defines exactly the interface keys `en-US`
  does, with nothing excluded. The release history is not interface text and
  lives in `src/assets/data/changelog.ts`, untranslated on purpose: six of the
  nine locales had fallen five to eight releases behind, so their readers saw a
  changelog that simply stopped. One English list beats a truncated translated
  one, and the drift cannot come back.
- **The store** - patterns load with their context, instrument lookup works,
  and selecting a pattern produces a playable instrument list.
- **Audio/visual sync** - the dots and the samples are driven from the same
  slot index, and the visual is offset from the audible event by exactly the
  output latency. See below.

`yarn test:e2e` needs a build first — `yarn build` for the web specs and
`npx quasar build -m electron` for the Electron ones. Each group skips itself
with a message if its build is missing.

The Electron specs launch the app and check that a window opens with a populated
`#q-app`, that every image loads, that a sample decodes, and that nothing logs an
error - the white-page class of failure. The web specs serve `dist/spa` with
[scripts/serve-static.mjs](scripts/serve-static.mjs) and drive the help controls
under both touch and pointer input.

### The sync tests

The metronome schedules audio at the transport time and the dots at that time
*plus* the output latency, so the visual matches the click you hear rather than
the moment the sample is queued. The compensation is `baseLatency +
outputLatency` plus the manual offset slider, which allows 500ms with no clamp
against the beat grid.

A slot is an eighth note: 231ms at 130 BPM. So an offset above ~230ms lights the
dot while the *next* slot is sounding, which looks like a strong beat shown
against a weak one. `test/metronome-sync.spec.ts` documents that with a
deliberately failing case (`it.fails`); once the offset is clamped to one slot,
turn it into a plain `it`.

## Licensing

The source code is published under the terms of the GNU [AGPL license](https://www.gnu.org/licenses/agpl-3.0.html) (see the LICENSE file at the
root of the git repository).
There is an exception to this : the drumkits. All the .wav files located in public/audio are licensed under the terms of the [CC0 license](https://creativecommons.org/publicdomain/zero/1.0).

## Contributing to the project

If you're a musician and would like to contribute, you can submit new rhythms.
A Compás is getting more generalistic and will ultimately be able to play any
kind of rhythm. See [docs/contributing.md](docs/contributing.md) for the pattern,
sequence and sound formats with worked examples. You can also contribute to the
code by submitting a merge request.

## Roadmap / To do

### Platform Support
- Package and publish the iOS app (currently implemented but not published)
- Complete Windows desktop support (Electron - see [docs/desktop.md](docs/desktop.md))
- Consider Android TV support

### Features
- Add more sound samples and drumkits
- Add more rhythmic patterns (palos)
- Add more visualization options
