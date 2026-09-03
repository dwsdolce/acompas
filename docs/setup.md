# Setting up by hand

The [Quick start](../README.md#quick-start) runs `setup.ps1` / `setup.sh`,
which does all of this for you and asks before changing anything. This
document is the same work done manually, with the reasoning behind each step.

Read it if the setup script fails, if you would rather not run a script that
installs things, or if you want to know what it is checking and why.

## Contents

- [Prerequisites](#prerequisites)
- [A note on Windows shells](#a-note-on-windows-shells)
- [Node.js](#nodejs)
- [Yarn](#yarn)
- [ffmpeg](#ffmpeg)
- [Clone and install](#clone-and-install)
- [Regenerating icons and audio](#regenerating-icons-and-audio)

## Prerequisites

|  | macOS | Windows | Linux (Debian/Ubuntu) |
|---|---|---|---|
| **Node.js 24** | `brew install node@24` | `winget install OpenJS.NodeJS.LTS` | [package manager](https://nodejs.org/en/download/package-manager/) |
| **Yarn 1.22.22** | `corepack enable` | `corepack enable` *(admin PowerShell)* | `corepack enable` |
| **ffmpeg** | `brew install ffmpeg` | `winget install Gyan.FFmpeg` | `sudo apt install ffmpeg` |

⚠️ The Node.js row is the **direct install**: system-wide, and it replaces any
Node already on the machine, in place and without asking. That is the right
choice when this is the only Node project here. If there are others, install
[with a version manager](#option-a--with-a-version-manager-fnm) instead so each
project keeps its own version — three steps rather than one, including a shell
hook that is easy to miss and without which the version manager does nothing at
all.

That is the whole list. There is no Python requirement, no global Quasar CLI and
no global Icon Genie: `yarn install` provides them, and `npx quasar` runs the
CLI.

### A note on Windows shells

The build works from PowerShell, from cmd, from Git Bash and from Cygwin. Four
things are worth knowing whichever you pick:

* **Windows PowerShell refuses to run scripts by default, and that breaks
  `yarn`.** `Restricted` is Microsoft's default execution policy for Windows
  PowerShell 5.1 on client Windows — nothing is misconfigured if you see it. It
  matters here because npm installs three shims for every command:

  ```
  yarn      yarn.cmd      yarn.ps1
  ```

  PowerShell prefers `yarn.ps1`, and running a `.ps1` is precisely what
  `Restricted` forbids, so `yarn dev` fails with *"cannot be loaded because
  running scripts is disabled on this system"* — as do `npx` and `.\setup.ps1`.
  One command fixes all of them, per-user and without elevation:

  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
  ```

  That is the usual developer setting rather than a meaningful loosening: it
  still blocks unsigned scripts *downloaded from the internet* and only permits
  local ones. If you would rather not change it, **cmd** picks `yarn.cmd` and is
  unaffected, PowerShell 7 (`pwsh`) already defaults to `RemoteSigned`, and any
  POSIX shell is fine too. Note that the two PowerShell editions store this
  setting in separate registry keys, so `pwsh` being permissive tells you
  nothing about `powershell`.

* **A new terminal inside VS Code is not a new environment.** Every install step
  below (fnm, Node, ffmpeg, Corepack) changes PATH, and an integrated terminal
  inherits its environment from the VS Code process as it was when VS Code
  started — so opening another terminal tab still shows the old PATH and the
  command you just installed appears to be missing. **Restart VS Code itself**,
  or reload PATH in place:

  ```powershell
  $env:PATH = [Environment]::GetEnvironmentVariable('Path','Machine') + ';' +
              [Environment]::GetEnvironmentVariable('Path','User')
  ```

  Outside an editor, a genuinely new terminal window is enough.

* **yarn runs its own scripts through `cmd.exe`**, not through the shell you
  typed the command in. Anything a lifecycle script needs — `node`, `ffmpeg` —
  has to be on the *Windows* PATH, not only on a Cygwin or MSYS one.
* **Native tools do not understand `/cygdrive/...` paths.** Cygwin sets the real
  Windows working directory, so relative paths and `node` itself are fine, but a
  Cygwin-style path passed as an *argument* to `adb`, `sdkmanager` or Gradle will
  not resolve. Convert it with `cygpath -w`, or run those steps from PowerShell.

### Node.js

This project needs **Node.js 24.x**. `@quasar/app-vite` v3 declares
`node: ^30 || ^28 || ^26 || ^24 || ^22.22.0` and yarn enforces engines strictly,
so `yarn install` refuses outright on anything outside that range — Node 20 and
earlier will not work at all. 24 is what CI builds with and what `.nvmrc` pins,
which makes it the one to match.

There are two ways to get it, and the right one depends on the machine rather
than on preference:

* **Only Node project here?** [Option B](#option-b--install-nodejs-directly) —
  a direct install. One command, no configuration.
* **Other Node projects, now or later?**
  [Option A](#option-a--with-a-version-manager-fnm) — a version manager, so each
  project keeps its own version. A direct install would replace the Node those
  other projects use.

#### Option A — with a version manager (fnm)

Worth it if this machine has, or will have, other Node projects, because it keeps
their versions apart. [fnm](https://github.com/Schniz/fnm) is the lighter of the
two common ones. It takes three steps, and **the second one is not optional**:
without the shell hook, fnm will download Node versions but never put one on your
PATH.

**1. Install fnm.** This installs the version manager, not Node.

```bash
brew install fnm                                   # macOS
winget install Schniz.fnm                          # Windows
curl -fsSL https://fnm.vercel.app/install | bash   # Linux
```

**2. Add fnm's shell hook to your profile, then open a new shell.** This is the
step that lets fnm change which `node` your PATH finds. Until it is in place,
`fnm use` refuses to run at all:

> `error: We can't find the necessary environment variables to replace the Node
> version. You should setup your shell profile to evaluate` `fnm env`

```bash
eval "$(fnm env --use-on-cd)"       # ~/.bashrc or ~/.zshrc
                                    # ~/.bash_profile on Cygwin
```

```powershell
fnm env --use-on-cd | Out-String | Invoke-Expression    # PowerShell profile
```

`--use-on-cd` adds the nicety of switching version automatically when you enter a
directory containing a `.nvmrc`. fnm emits the correct path style for whichever
shell evaluates it, so the same line works in PowerShell, Git Bash and Cygwin.

**3. Install and select Node 24.**

```bash
fnm install 24    # download it
fnm default 24    # make it the version new shells get
fnm use 24        # and this shell, right now
```

`nvm` (macOS/Linux) and `nvm-windows` do the same job:
`nvm install 24 && nvm use 24 && nvm alias default 24`.

> ⚠️ **If a system-wide Node is already installed**, check the *path*, not just
> the version number — fnm's build and the system one can be close enough to be
> indistinguishable at a glance (v24.20.0 against v24.18.0, say), so
> `node --version` alone will not tell you whether fnm took effect:
>
> ```bash
> which node                # a .../fnm_multishells/... path means fnm is in charge
> ```
> ```powershell
> (Get-Command node).Source
> ```

**What `.nvmrc` is for.** It holds a single line — `24`. It does not switch
anything on its own; it is a file that version managers know how to read. Inside
the project directory you can therefore drop the number and run just `fnm use` or
`nvm use`, the `--use-on-cd` hook above reads it on every `cd`, and CI reads the
same file (`node-version-file: .nvmrc`) so local and CI cannot drift apart.

#### Option B — install Node.js directly

One command, nothing to configure afterwards:

```bash
brew install node@24               # macOS
winget install OpenJS.NodeJS.LTS   # Windows
```

On Linux use [your package manager](https://nodejs.org/en/download/package-manager/),
and on any platform the [nodejs.org installer](https://nodejs.org/en/download/)
works too.

> ⚠️ This is a system-wide install and it **replaces any Node already present**,
> in place and without prompting — `winget install OpenJS.NodeJS.LTS` will
> quietly uninstall the version that was there. Harmless when this is the only
> Node project on the machine; disruptive when it is not.

`.nvmrc` then does nothing for you, and staying on a supported version is your
responsibility rather than the tooling's.

#### Check it worked

Either route, in a terminal that has picked up the new PATH — on Windows inside
VS Code that means one opened after restarting VS Code, not just a new tab (see
[the note above](#a-note-on-windows-shells)):

```bash
node --version    # v24.x.x
```

### Yarn

This project uses **yarn 1.22.22**, pinned in the `packageManager` field of
`package.json`. Node.js does not ship a `yarn` command, so you have to add one
before you can run `yarn install`. You only need to do this once.

Settle which Node you are using *first*. Corepack writes its shims inside the
Node installation it is run against, so if you switch afterwards — from a
system-wide Node to an fnm-managed one, or between two fnm versions — `yarn`
will not be there and you simply run `corepack enable` again for the new one.
A useful side effect: run against an fnm version, it writes into your user
profile and needs no elevation at all.

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

> ⚠️ **On Windows, run this from PowerShell, not from Cygwin or Git Bash.** The
> Node.js installer ships two shims side by side: `corepack.cmd` for Windows
> shells and an extensionless `corepack` for POSIX ones — and the POSIX one has
> CRLF line endings. A POSIX shell picks that one and chokes on the carriage
> returns:
>
> ```
> /cygdrive/c/Program Files/nodejs/corepack: line 3: $'\r': command not found
> /cygdrive/c/Program Files/nodejs/corepack: line 4: syntax error near unexpected token `$'in\r''
> ```
>
> This is how Node ships on Windows; nothing in this project causes it, and
> nothing here can fix it. Since the command needs elevation anyway, an
> administrator PowerShell solves both problems at once. Afterwards `yarn` works
> from any shell.

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
PATH.

Whichever route you take, `ffmpeg -version` has to work before `yarn install`
will find it — and `yarn install` runs its scripts through `cmd.exe`, so it sees
the Windows PATH rather than your shell's. If ffmpeg was just installed, restart
VS Code before running it (see [the note above](#a-note-on-windows-shells)).

## Clone and install

```bash
git clone https://github.com/dwsdolce/palmas.git
cd palmas
yarn install
cd src-capacitor && yarn install && cd ..
```

> ⚠️ **Both installs are required, even for the plain web build.**
> `src-capacitor` has its own `package.json` and lockfile, and
> `@quasar/app-vite` aliases every dependency listed there to
> `src-capacitor/node_modules` in *every* mode, not just Capacitor mode —
> Capacitor plugins ship web implementations, and shared code under `src/`
> imports them. Skip the second install and `yarn dev` fails with
> `Failed to resolve import "@capacitor/splash-screen"`, however complete the
> root `node_modules` looks. `scripts/setup.mjs` does both for you.

The root `yarn install` also runs three generation steps, so a fresh clone is
immediately ready to build:

1. `quasar prepare` — writes `.quasar/tsconfig.json`, which the root
   `tsconfig.json` extends. Without it, lint and tests cannot resolve types.
2. `yarn icons` — generates the web and Electron icons.
3. `yarn audio` — converts the `.wav` masters into the formats the app plays.

## Regenerating icons and audio

Both are generated by `yarn install`, so there is normally nothing to do.

### Icons

Every icon in the project is generated from **`resources/icon.png`** — a single
1024×1024 master. The splash screens additionally use `background-gradient.png`
as their ground. Those two files, named in `icongenie-profile.json`, are the
only icon sources there are; nothing else in the tree feeds the generator.

To refresh after changing either:

```bash
yarn icons      # the generated, gitignored icons (web + Electron)
yarn icons:all  # everything, including the committed Capacitor Android/iOS
                # assets — rewrites ~30 tracked files, so review the diff
```

The header logo is *not* part of this. `public/ACompas-4-logo.png` and
`public/ACompas-4-name.png` are hand-made images referenced directly from
`src/layouts/MainLayout.vue`, and regenerating icons does not touch them.

`yarn icons:all` also runs `packaging/prepare-ios-assets.mjs`, which flattens the
alpha channel out of the iOS app icon (App Store Connect rejects an icon that has
one) and copies the splash to the 1x and 2x names Xcode expects. It runs on
macOS, Windows and Linux, and needs ffmpeg — the same ffmpeg the audio uses. It
checks the result rather than trusting the exit status, because this is the step
whose failure would otherwise only surface at upload.

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
[scripts/format-audio.mjs](../scripts/format-audio.mjs) and needs nothing but Node
and ffmpeg.
