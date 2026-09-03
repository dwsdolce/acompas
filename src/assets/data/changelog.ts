/**
 * Release history, shown on the changelog page.
 *
 * This is Palmas's own history, and it starts at 1.0.0. The file previously
 * held A Compás's, which ended at 3.2.7 in August 2024 and never covered their
 * 4.x line at all — so it was not the upstream changelog so much as a stale
 * fragment of it. Upstream's own history lives with upstream:
 * https://gitlab.com/acompas/acompas
 *
 * `build` is the git commit count at release, the same build number the header
 * shows beside the version and the same one CFBundleVersion and the Android
 * versionCode carry. It is what identifies which build a bug report came from,
 * since a version alone can cover many.
 *
 * Deliberately not translated. This is a record that grows with every release,
 * and keeping nine locales in step with it was never going to hold: six of them
 * had already fallen behind by between five and eight releases, so readers in
 * those languages saw a changelog that simply stopped, with no indication that
 * anything was missing. One English list everyone can read beats a truncated
 * translated one. The page title and description are still translated.
 *
 * Newest first. `changes` entries are rendered as markdown.
 */

export interface ChangelogEntry {
  version: string
  date: string
  build?: number
  changes: string[]
}

export default [
  {
    version: '1.0.0',
    date: '2026-09-03',
    build: 868,
    changes: [
      '**Palmas is a new app**, derived from [A Compás](https://gitlab.com/acompas/acompas) 4.2.4 by Olivier Ricordeau and Jérémie Sieffert, under the same AGPL-3.0 licence. It carries its own name, its own application identifiers and its own version numbering, because the changes here are not theirs to answer for. Report anything about Palmas [on its own repository](https://github.com/dwsdolce/palmas/issues).',
      'New identity: a script **P** inside a ring of twelve dots — the compás the app draws — and a wordmark set in Playball, the face A Compás itself used through its 2.x releases.',
      '**The visualization now says which strikes are accented.** Colour means accent in both layers: a red disc for an accented beat of the compás, a blue ring for an accented strike by the instrument being drawn. The strength of a strike used to be one, two or three pixels of line weight, which nobody could see.',
      'The five rhythm contexts now share one colour. Repainting the whole app per context spent the only free colour channel on a mode the interface already names twice.',
      'New help covering what the display is showing, the eighth-note column, choosing which instrument is drawn, and the audio/visual delay setting — translated into all nine languages.',
      '**Content Security Policy** on every production build, which turned up two real defects: vue-i18n compiled translations with `Function()`, and Tone.js loads its audio worklet from a blob URL.',
      '**All analytics removed.** No accounts, no tracking, no cookies. The one request the app makes to anyone else is a Wikipedia lookup when you open the help for a palo, and the privacy policy now says so.',
      'The web build runs from any subfolder, so it can be hosted anywhere rather than only at a domain root.',
      'Nine languages are reachable again: Arabic, Persian, Japanese and Chinese were present but never offered. Locales load on demand, which took the main bundle from 230 KB to 190 KB gzipped.',
      '**Python is no longer needed to build.** The audio pipeline, the setup and the desktop packaging are Node scripts that run on macOS, Windows and Linux alike; the iOS asset step no longer needs a Mac either.',
      'Setup is two small scripts — `setup.ps1` and `setup.sh` — that check for Node, install it if missing, and hand over to a shared Node script that does the rest, asking before it changes anything.',
      'Documentation rewritten around build targets rather than host operating systems, and verified step by step on a machine with no toolchain installed.'
    ]
  }
] as ChangelogEntry[]
