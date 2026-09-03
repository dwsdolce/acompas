import { describe, it, expect } from 'vitest'

// Read the locales off disk rather than through src/i18n, which now bundles
// only en-US and fetches the rest on demand - importing it here would silently
// reduce this suite to checking one language against itself. A glob also picks
// up a newly added locale directory without anyone remembering to list it.
const modules = import.meta.glob('/src/i18n/*/index.ts', { eager: true }) as Record<
  string,
  { default: Record<string, unknown> }
>

const messages = Object.fromEntries(
  Object.entries(modules).map(([path, module]) => [
    path.match(/\/src\/i18n\/(.*)\/index\.ts$/)![1], // eslint-disable-line @typescript-eslint/no-non-null-assertion
    module.default
  ])
)

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

// Nothing is excluded any more: the release history moved out of i18n into
// src/assets/data/changelog.ts, so every key left here is interface text that
// every locale is expected to carry.
const uiKeys = (tree: Tree) => keysOf(tree)
const referenceKeys = uiKeys(messages[REFERENCE] as Tree)

describe('i18n', () => {
  it('ships more than one locale, with a non-trivial reference', () => {
    // Not "more than one": the app bundles only en-US now and fetches the rest
    // on demand, so a mistake in how this suite finds them would leave it
    // checking English against English and passing. Every locale directory on
    // disk has to turn up here.
    expect(locales.length).toBe(
      Object.keys(import.meta.glob('/src/i18n/*/index.ts')).length
    )
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
