import type { SoundsData, Seq, Seqs, SeqSubdiv, instruOpts } from 'src/composables/models'

export function forEachValue<T>(obj: SoundsData | Seq | Seqs | SeqSubdiv | instruOpts, fn: (value: T, key: string) => void) {
  Object.entries(obj).forEach(([key, value]) => fn(value, key))
}
