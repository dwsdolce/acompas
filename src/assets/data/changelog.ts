/**
 * Release history, shown on the changelog page.
 *
 * Metadata only. The prose for each release lives in the message catalogues
 * under `doc.changelog.releases.<id>`, so it is translated like everything else
 * the app says. `id` is what joins the two, rather than `version`: vue-i18n
 * reads a dot as a path separator, so "1.0.0" would nest three levels deep.
 *
 * This history is Palmas's own and starts at 1.0.0. The file previously held
 * A Compás's, which ended at 3.2.7 in August 2024 and never covered their 4.x
 * line at all - so it was not the upstream changelog so much as a stale fragment
 * of it. Upstream's own history lives with upstream:
 * https://gitlab.com/acompas/acompas
 *
 * `build` is the git commit count at release, the same build number the header
 * shows beside the version and the same one CFBundleVersion and the Android
 * versionCode carry. It is what identifies which build a bug report came from,
 * since a version alone can cover many.
 *
 * The notes were untranslated for a while, because keeping nine locales in step
 * with a growing record had already failed once: six of them fell five to eight
 * releases behind, and their readers saw a changelog that simply stopped with no
 * sign anything was missing. What makes it hold now is that test/i18n.spec.ts
 * requires every locale to carry every key en-US has, arrays included - so a
 * release written in English and nowhere else fails the suite rather than
 * shipping silently.
 *
 * Newest first. Entries are rendered as markdown.
 */

export interface ChangelogEntry {
  /** Key into `doc.changelog.releases` in the message catalogues. */
  id: string
  version: string
  date: string
  build?: number
}

export default [
  {
    id: 'v1_0_0',
    version: '1.0.0',
    date: '2026-09-03',
    build: 868
  }
] as ChangelogEntry[]
