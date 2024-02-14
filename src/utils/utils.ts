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
