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

Everything in this section is the same on macOS, Windows and Linux. Only the
three prerequisites differ, and only in how you install them.

## Prerequisites

|  | macOS | Windows | Linux (Debian/Ubuntu) |
|---|---|---|---|
| **Node.js 24** | `brew install fnm` | `winget install Schniz.fnm` | [nodesource / fnm](https://nodejs.org/en/download/package-manager/) |
| **Yarn 1.22.22** | `corepack enable` | `corepack enable` *(admin terminal)* | `corepack enable` |
| **ffmpeg** | `brew install ffmpeg` | `winget install Gyan.FFmpeg` | `sudo apt install ffmpeg` |

That is the whole list. There is no Python requirement, no global Quasar CLI and
no global Icon Genie: `yarn install` provides them, and `npx quasar` runs the
CLI.

### Node.js

**Use Node.js 24.x LTS**, which `.nvmrc` pins. `@quasar/app-vite` v3 declares
`node: ^30 || ^28 || ^26 || ^24 || ^22.22.0`, and yarn enforces engines
strictly — `yarn install` refuses outright on a version outside that range, so
Node 20 and earlier will not work at all. Node 24 is the current LTS and the
version CI builds with, which makes it the one to match.

A version manager makes this painless, and both of the common ones read
`.nvmrc`:

* **fnm** — add its shell hook to your profile (`fnm env --use-on-cd --shell
  zsh` for zsh, `--shell bash` for bash, `--shell power-shell` for PowerShell).
  Entering the project directory then switches to 24 automatically.
* **nvm** on macOS/Linux, or **nvm-windows** — `nvm use` in the project
  directory.

Otherwise see the nodejs.org [download page](https://nodejs.org/en/download/).
On Linux, consider [installing Node.js via package manager](https://nodejs.org/en/download/package-manager/).

### Yarn

This project uses **yarn 1.22.22**, pinned in the `packageManager` field of
`package.json`. Node.js does not ship a `yarn` command, so you have to add one
before you can run `yarn install`. You only need to do this once.

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

`corepack enable` writes its shims into Node's own install directory, so a
permission error means it cannot write there:

* **macOS / Linux** — rerun it with `sudo`.
* **Windows** — Node lives under `C:\Program Files\nodejs`, so run it from a
  terminal started with *Run as administrator*. There is no `sudo`.

**Option B — install yarn directly.** Simpler, but nothing keeps you in sync
with the pinned version:

```bash
npm install -g yarn
```

Either way, check it worked before continuing:

```bash
yarn --version   # 1.22.22
```

### ffmpeg

ffmpeg is the one thing that is not a project dependency. It generates the audio
the app plays, and `yarn install` warns clearly if it is missing, because the app
cannot play anything without it.

```bash
brew install ffmpeg                                        # macOS
winget install Gyan.FFmpeg                                 # Windows
sudo apt update && sudo apt install ffmpeg                 # Ubuntu/Debian
sudo yum install epel-release && sudo yum install ffmpeg   # CentOS/RHEL
```

On Windows you can also use `choco install ffmpeg`, or download a build from
<https://ffmpeg.org/download.html>, extract it, and add its `bin` folder to your
PATH. Whichever route you take, `ffmpeg -version` has to work in a **new**
terminal before `yarn install` will find it.

### A note on Windows shells

The build works from PowerShell, from Git Bash and from Cygwin. Two things are
worth knowing whichever you pick:

* **yarn runs its own scripts through `cmd.exe`**, not through the shell you
  typed the command in. Anything a lifecycle script needs — `node`, `ffmpeg` —
  has to be on the *Windows* PATH, not only on a Cygwin or MSYS one.
* **Native tools do not understand `/cygdrive/...` paths.** Cygwin sets the real
  Windows working directory, so relative paths and `node` itself are fine, but a
  Cygwin-style path passed as an *argument* to `adb`, `sdkmanager` or Gradle will
  not resolve. Convert it with `cygpath -w`, or run those steps from PowerShell.

## Clone and install

```bash
git clone https://gitlab.com/acompas/acompas.git
cd acompas
yarn install
```

`yarn install` also runs three generation steps for you, so a fresh clone is
immediately ready to build:

1. `quasar prepare` — writes `.quasar/tsconfig.json`, which the root
   `tsconfig.json` extends. Without it, lint and tests cannot resolve types.
2. `yarn icons` — generates the web and Electron icons.
3. `yarn audio` — converts the `.wav` masters into the formats the app plays.

## Run the app

```bash
yarn dev      # serve with hot reload at localhost:9000
yarn build    # build for production with minification
```

The Quasar CLI is a project dependency rather than a global install, so run it
through yarn as above, or with `npx quasar dev` / `npx quasar build`. A bare
`quasar` command only works if you happen to have one installed globally, which
is why every command in these docs uses `yarn` or `npx`.

## Building for a specific platform

| Target | Build from | Guide |
|---|---|---|
| Web (SPA) | macOS, Windows, Linux | `yarn build` — see above |
| Desktop (Electron) | macOS, Windows, Linux | [docs/desktop.md](docs/desktop.md) |
| Android | macOS, Windows, Linux | [docs/android.md](docs/android.md) |
| iOS | macOS only | [docs/ios.md](docs/ios.md) |

## Regenerating icons and audio

Both are generated by `yarn install`, so there is normally nothing to do.

### Icons

If you change `app-icon.png` and want to refresh them:

```bash
yarn icons      # the generated, gitignored icons (web + Electron)
yarn icons:all  # everything, including the committed Capacitor Android/iOS
                # assets — rewrites ~30 tracked files, so review the diff
```

`yarn icons:all` also runs `packaging/prepare_ios_assets`, which is a zsh script
and **macOS only**.

### Audio

Only the `.wav` masters are committed; the formats the app actually plays
(`.mp3`, `.mp4`, `.ogg`, `.flac`) are generated and gitignored.

```bash
yarn audio                                      # all of public/audio
yarn audio:clean                                # delete the generated formats
node scripts/format-audio.mjs convert acompas   # or just one subdirectory
```

Files that already exist and are newer than their `.wav` are skipped, so
re-running is cheap. The converter is
[scripts/format-audio.mjs](scripts/format-audio.mjs) and needs nothing but Node
and ffmpeg.

## Tests

```bash
yarn test          # unit and component tests (Vitest), ~1s
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
