import { describe, it, expect } from 'vitest'
import messages from 'src/i18n'

type Tree = { [key: string]: string | Tree }

/** Every leaf path in a message tree, dotted, sorted. */
const keysOf = (tree: Tree, prefix = ''): string[] =>
  Object.entries(tree)
    .flatMap(([key, value]) => {
      const dotted = prefix ? `${prefix}.${key}` : key
      return typeof value === 'object' && value !== null
        ? keysOf(value as Tree, dotted)
        : [dotted]
    })
    .sort()

const locales = Object.keys(messages) as (keyof typeof messages)[]
// en-US is the source locale: it is the one the app falls back to.
const REFERENCE = 'en-US'

// Release-note history, not interface text. Older entries are written in
// English and translated when someone gets to them, so holding every locale to
// the full changelog would fail permanently and say nothing about the UI.
const IGNORED = (key: string) => key.startsWith('doc.changelog.')

const uiKeys = (tree: Tree) => keysOf(tree).filter(k => !IGNORED(k))
const referenceKeys = uiKeys(messages[REFERENCE] as Tree)

describe('i18n', () => {
  it('ships more than one locale, with a non-trivial reference', () => {
    expect(locales.length).toBeGreaterThan(1)
    expect(referenceKeys.length).toBeGreaterThan(50)
  })

  it.each(locales.filter(l => l !== REFERENCE))(
    '%s defines no interface key the reference lacks',
    locale => {
      const extra = uiKeys(messages[locale] as Tree).filter(k => !referenceKeys.includes(k))
      expect(extra, `${locale} defines keys absent from ${REFERENCE}`).toEqual([])
    }
  )

  it.each(locales.filter(l => l !== REFERENCE))(
    '%s translates every interface key',
    locale => {
      const own = uiKeys(messages[locale] as Tree)
      const missing = referenceKeys.filter(k => !own.includes(k))
      expect(missing, `${locale} is missing translations`).toEqual([])
    }
  )
})
