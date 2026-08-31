import { describe, it, expect } from 'vitest'
import { readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { patternMatchesSearch, foldForSearch } from 'src/utils/utils'
import type { PatternState } from 'src/utils/types'

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/assets/data/patterns')
const patterns: PatternState[] = []
for (const file of readdirSync(dir).filter(f => f.endsWith('.ts'))) {
  const mod = await import(/* @vite-ignore */ path.join(dir, file))
  patterns.push(...((mod.default ?? []) as PatternState[]))
}

const find = (query: string) => patterns.filter(p => patternMatchesSearch(p, query))

describe('pattern search', () => {
  it('finds every pattern by its own label', () => {
    // The old filter matched only against linkedPatterns, so the seventeen
    // patterns without aliases could not be found at all.
    const unfindable = patterns.filter(p => !find(p.label).includes(p))
    expect(unfindable.map(p => p.name)).toEqual([])
  })

  it('finds every pattern by its own name', () => {
    const unfindable = patterns.filter(p => !find(p.name).includes(p))
    expect(unfindable.map(p => p.name)).toEqual([])
  })

  it('finds a pattern with no aliases at all', () => {
    const withoutAliases = patterns.find(p => !p.linkedPatterns?.length)
    expect(withoutAliases, 'expected at least one alias-less pattern').toBeDefined()
    expect(find(withoutAliases!.label)).toContain(withoutAliases)
  })

  it('ignores accents in both directions', () => {
    const alegria = patterns.find(p => p.name === 'alegria')!
    expect(patternMatchesSearch(alegria, 'alegria')).toBe(true)
    expect(patternMatchesSearch(alegria, 'Alegría')).toBe(true)
    expect(patternMatchesSearch(alegria, 'ALEGRIA')).toBe(true)
  })

  it('still finds a palo by an alias it shares a compás with', () => {
    // Soleá por bulería is an alias of alegría, not a pattern of its own.
    const byAlias = find('Soleá por bulería')
    expect(byAlias.map(p => p.name)).toContain('alegria')
  })

  it('survives characters that are regex syntax', () => {
    // `new RegExp('(')` threw and took the picker down with it.
    for (const query of ['(', '[', '*', '\\', '+?', '((((']) {
      expect(() => find(query), `query ${query}`).not.toThrow()
    }
  })

  it('gives the same answer however many times it is asked', () => {
    // The `g` flag made test() stateful: the same query alternated results.
    const first = find('bul').map(p => p.name)
    for (let i = 0; i < 5; i++) expect(find('bul').map(p => p.name)).toEqual(first)
    expect(first.length).toBeGreaterThan(0)
  })

  it('returns everything for an empty query', () => {
    expect(find('').length).toBe(patterns.length)
    expect(find('   ').length).toBe(patterns.length)
  })

  it('folds accents predictably', () => {
    expect(foldForSearch('Soleá por Bulerías')).toBe('solea por bulerias')
    expect(foldForSearch('Tangüillos')).toBe('tanguillos')
  })
})
