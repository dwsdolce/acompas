import type {
  SoundsData,
  Sounds,
  Sound,
  Seq,
  Seqs,
  SeqSubdiv,
  instruOpts,
  Players
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
