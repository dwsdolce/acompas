import { describe, it, expect } from 'vitest'
import changelog from 'src/assets/data/changelog'

// The release history left i18n, so nothing checks it by translating it any
// more. These are the properties the page relies on.
describe('changelog data', () => {
  it('has entries', () => {
    expect(changelog.length).toBeGreaterThan(0)
  })

  it.each(changelog.map(e => [e.version, e] as const))('%s is well formed', (_v, entry) => {
    expect(entry.version).toMatch(/^\d+\.\d+\.\d+$/)
    expect(Number.isNaN(Date.parse(entry.date)), `${entry.date} is not a date`).toBe(false)
    expect(entry.changes.length).toBeGreaterThan(0)
    for (const change of entry.changes) expect(change.trim()).not.toBe('')
  })

  it('lists each version once', () => {
    const versions = changelog.map(e => e.version)
    expect(versions.filter((v, i) => versions.indexOf(v) !== i)).toEqual([])
  })

  it('runs newest first', () => {
    const dates = changelog.map(e => Date.parse(e.date))
    expect(dates.every((d, i) => i === 0 || d <= dates[i - 1]!)).toBe(true)
  })
})
