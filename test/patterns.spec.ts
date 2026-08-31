import { describe, it, expect } from 'vitest'
import { readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import type { PatternState } from 'src/utils/types'

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/assets/data/patterns')
const files = readdirSync(dir).filter(f => f.endsWith('.ts'))

const patterns: (PatternState & { __file: string })[] = []
for (const file of files) {
  const mod = await import(/* @vite-ignore */ path.join(dir, file))
  for (const p of (mod.default ?? []) as PatternState[]) {
    patterns.push({ ...p, __file: file })
  }
}

// beatLabels rides in `sequences` but is the counted-beat label row, not an
// instrument: its values are labels ('&', 2, 3) rather than sample indices.
const INSTRUMENT_SEQUENCES = (p: PatternState) =>
  Object.entries(p.sequences ?? {}).filter(
    ([name, seq]) => name !== 'beatLabels' && Array.isArray(seq)
  ) as [string, (number | null)[]][]

describe('pattern data', () => {
  it('loads every pattern file', () => {
    expect(files.length).toBeGreaterThan(0)
    expect(patterns.length).toBeGreaterThan(0)
  })

  it.each(patterns.map(p => [p.__file, p.name, p] as const))(
    '%s / %s has sequences the length of nbBeatsInPattern',
    (_file, _name, pattern) => {
      for (const [instrument, seq] of INSTRUMENT_SEQUENCES(pattern)) {
        expect(seq.length, `${pattern.name}.${instrument}`).toBe(pattern.nbBeatsInPattern)
      }
    }
  )

  it.each(patterns.map(p => [p.__file, p.name, p] as const))(
    '%s / %s has accents inside the pattern, strictly ascending',
    (_file, _name, pattern) => {
      const accents = pattern.accents ?? []
      for (const accent of accents) {
        expect(accent, `${pattern.name} accent`).toBeGreaterThanOrEqual(0)
        expect(accent, `${pattern.name} accent`).toBeLessThan(pattern.nbBeatsInPattern)
      }
      const ascending = accents.every((v, i) => i === 0 || v > accents[i - 1]!)
      expect(ascending, `${pattern.name} accents ${accents.join(',')}`).toBe(true)
    }
  )

  it.each(patterns.map(p => [p.__file, p.name, p] as const))(
    '%s / %s orders its tempos min <= slow <= default <= fast <= max',
    (_file, _name, p) => {
      expect(p.minTempo).toBeLessThanOrEqual(p.slowTempo)
      expect(p.slowTempo).toBeLessThanOrEqual(p.defaultTempo)
      expect(p.defaultTempo).toBeLessThanOrEqual(p.fastTempo)
      expect(p.fastTempo).toBeLessThanOrEqual(p.maxTempo)
    }
  )

  it('has no duplicate pattern names', () => {
    const names = patterns.map(p => p.name)
    expect(names.filter((n, i) => names.indexOf(n) !== i)).toEqual([])
  })
})
