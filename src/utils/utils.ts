import type {
  SoundsData,
  Sounds,
  Sound,
  Seq,
  Seqs,
  SeqSubdiv,
  instruOpts,
  Players,
  PatternState
} from 'src/utils/types'

export function forEachValue<T>(obj: SoundsData | Sounds | Sound | Seq | Seqs | SeqSubdiv | instruOpts | Players, fn: (value: T, key: string) => void) {
  Object.entries(obj).forEach(([key, value]) => fn(value, key))
}

export function isFocusableElement(element?: Element | null): element is HTMLElement {
  if (!element) return false
  return typeof (element as HTMLElement).blur === 'function'
}

export function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function getDefaultPatterns() {
  const patternsModules = import.meta.glob('/src/assets/data/patterns/*.ts')

  const patternsData = Object.entries(patternsModules).map(async ([path, patternsModule]) => {
    const context = path.match(/\/src\/assets\/data\/patterns\/(.*)\.ts$/)![1] // eslint-disable-line @typescript-eslint/no-non-null-assertion

    const patterns = await patternsModule()

    return patterns.default.map((pattern: PatternState) => {
      return {
        ...pattern,
        context
      }
    })
  })

  // flatten the array
  return Promise.all(patternsData).then((patterns) => patterns.flat())
}

/**
 * The audio/visual offset, in milliseconds and in beats at the tempo in play.
 *
 * Milliseconds alone say nothing about whether a value is plausible: 250ms is
 * an ordinary Bluetooth delay and also, at 190 BPM, four fifths of a beat. The
 * compensation is deliberately not clamped — when it matches the real output
 * delay it is correct however large it is, and on a slow link it genuinely can
 * exceed a beat. What goes wrong is setting it to something the hardware is not
 * doing, and a figure in beats makes that plain: a physical delay of four
 * fifths of a beat is a claim about the hardware worth doubting.
 *
 * The note glyph carries the unit, so this needs no translating.
 */
export function formatAudioOffset(ms: number, tempo: number): string {
  const offset = ms || 0
  if (!offset || !tempo) return `${offset} ms`
  const beats = offset / (60000 / tempo)
  return `${offset} ms · ${beats.toFixed(1)} ♩`
}

/**
 * Lower-cased and stripped of accents, so "solea" finds Soleá and "Soleá"
 * finds it too. Flamenco names carry accents a keyboard often will not.
 */
export function foldForSearch(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

/**
 * Everything a pattern can be found by: its own names, and the palos that
 * share its compás, which `linkedPatterns` lists as search aliases rather than
 * as references to other patterns.
 */
export function patternSearchTerms(pattern: PatternState): string[] {
  return [
    pattern.name,
    pattern.label,
    pattern.longLabel,
    ...(pattern.linkedPatterns ?? []).flatMap(alias => [alias.label, alias.value])
  ].filter((term): term is string => Boolean(term))
}

/**
 * Whether a pattern answers to what was typed. Plain substring matching,
 * deliberately.
 *
 * The picker used to build `new RegExp(query, 'g')` out of raw keystrokes and
 * test it against `linkedPatterns` alone. Three things went wrong: an unclosed
 * bracket threw, the `g` flag made `test()` stateful so matches alternated
 * between calls on the same regex, and seventeen of the thirty patterns carry
 * no aliases at all, so they vanished the moment anything was typed.
 */
export function patternMatchesSearch(pattern: PatternState, query: string): boolean {
  const needle = foldForSearch(query.trim())
  if (!needle) return true
  return patternSearchTerms(pattern).some(term => foldForSearch(term).includes(needle))
}
