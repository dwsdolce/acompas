/**
 * Release history, shown on the changelog page.
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
  changes: string[]
}

export default [
  {
    version: '3.2.7',
    date: '2024-08-23',
    changes: [
      'Added context store and selector with color views',
      'Added pattern search filter functionality',
      'Added helper dialog for pattern search',
      'Added keep awake functionality for desktop',
      'Updated Quasar packages',
      'Fixed SaSS warnings',
      'Updated to Node 20',
      'Preparing for Android 34 compatibility'
    ]
  },
  {
    version: '3.2.5',
    date: '2023-07-15',
    changes: [
      'Added and updated sitemap.xml',
      'Fixed Matomo events',
      'Fixed idle clock position',
      'Updated Quasar packages',
      'Performance improvements and bug fixes'
    ]
  },
  {
    version: '3.2.4',
    date: '2023-07-06',
    changes: [
      'Bug fixes and stability improvements',
      'Minor UI enhancements'
    ]
  },
  {
    version: '3.2.3',
    date: '2023-07-03',
    changes: [
      'Performance optimizations',
      'Bug fixes'
    ]
  },
  {
    version: '3.2.2',
    date: '2023-07-03',
    changes: [
      'Quick fixes and improvements'
    ]
  },
  {
    version: '3.2.1',
    date: '2023-06-30',
    changes: [
      'Bug fixes and maintenance updates'
    ]
  },
  {
    version: '2.3.0',
    date: '2021-01-23',
    changes: [
      'New features and improvements',
      'Enhanced user interface'
    ]
  },
  {
    version: '2.2.0',
    date: '2020-06-25',
    changes: [
      'Major feature updates',
      'Improved performance'
    ]
  },
  {
    version: '2.1.4',
    date: '2019-09-13',
    changes: [
      'Bug fixes and stability improvements'
    ]
  },
  {
    version: '2.0.0',
    date: '2018-01-04',
    changes: [
      'Complete application rewrite',
      'New modern interface design',
      'Improved metronome engine',
      'Added more flamenco patterns'
    ]
  }
] as ChangelogEntry[]
