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
