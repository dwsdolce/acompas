import type {
  SoundsData,
  Sounds,
  Sound,
  Seq,
  Seqs,
  SeqSubdiv,
  instruOpts,
  Players
} from 'src/composables/models'

export function forEachValue<T>(obj: SoundsData | Sounds | Sound | Seq | Seqs | SeqSubdiv | instruOpts | Players, fn: (value: T, key: string) => void) {
  Object.entries(obj).forEach(([key, value]) => fn(value, key))
}
