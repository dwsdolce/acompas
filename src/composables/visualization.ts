import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'

/**
 * What a slot is in the compás — the abstract pattern, identical for every
 * instrument.
 *
 *   accent — a stressed beat, listed in the pattern's `accents`
 *   beat   — a counted beat, i.e. one carrying a label
 *   pulse  — an even slot the compás does not count (siguiriya's uneven beats)
 *   sub    — an off-beat subdivision
 */
export type CompasRole = 'accent' | 'beat' | 'pulse' | 'sub'

/**
 * The encoding the dots, the counter and the clock all draw from, so that the
 * three views say the same thing in the same language.
 *
 * Two layers, on two channels that cannot be confused for one another:
 *
 *   compás — the pulse of the palo. Carried by fill colour and by size.
 *   palmas — what the instrument you are watching actually strikes. Carried by
 *            an outline, its thickness the weight of the strike.
 *
 * Across both layers, hue means one thing: this one is accented. An accented
 * compás slot is a red disc among grey ones; an accented strike is a blue ring
 * among ink ones. Everything unaccented stays neutral.
 *
 * The palmas layer used to take no hue at all, because `--q-primary` moved with
 * the context — red, orange, purple, light-blue, teal — and any second colour
 * collided with one of the five. So the strength of a strike was encoded as one,
 * two or three pixels of line weight, which is not a difference anyone can see.
 * The contexts now all share one colour, which frees the channel; if they are
 * ever given distinct colours again, this hue has to be reconsidered with them.
 *
 * Red against blue is also the pair to choose here: it survives the common forms
 * of colour blindness, where a red/green pairing would not. Thickness still
 * carries the same information underneath, so nothing depends on hue alone.
 */
export const useCompasVisual = (options: { onLightSurface?: boolean } = {}) => {
  const patternStore = usePatternStore()
  const sessionStore = useSessionStore()

  const {
    selectedData,
    beatLabels,
    visualizedSequence,
    visualizedHasEighthNotes
  } = storeToRefs(patternStore)

  const { isDarkMode } = storeToRefs(sessionStore)

  const isAccent = (i: number) => selectedData.value?.accents?.includes(i) ?? false
  const isBeat = (i: number) => (beatLabels.value?.[i] ?? null) !== null

  const roleOf = (i: number): CompasRole => {
    if (isAccent(i)) return 'accent'
    if (isBeat(i)) return 'beat'
    return i % 2 === 0 ? 'pulse' : 'sub'
  }

  /** The sample the drawn instrument strikes on this slot, or null for silence. */
  const palmasOf = (i: number): number | null => visualizedSequence.value?.[i] ?? null

  /**
   * How hard that strike is. Media 1 is the accented sound and 2 the plain one:
   * the count-in proves it, playing click[0] on every accent and click[1]
   * everywhere else. Three-sample instruments carry a third, softer voice.
   */
  const palmasWeight = (i: number): number => {
    const sample = palmasOf(i)
    return sample === 1 ? 3 : sample === 2 ? 2 : sample === 3 ? 1 : 0
  }

  // `onLightSurface` is for a view that does not follow the theme. The clock
  // face is $blue-grey-1 whether the app is light or dark, so reading the
  // theme there paints a near-white tick on a near-white dial and a #bdbdbd
  // numeral that can barely be read.
  const onDark = computed(() => (options.onLightSurface ? false : isDarkMode.value))

  const neutralColor = computed(() => (onDark.value ? '#bdbdbd' : '#616161'))
  const inkColor = computed(() => (onDark.value ? '#f5f5f5' : '#212121'))

  /** light-blue-4 on a dark ground, blue-8 on a light one. */
  const accentInkColor = computed(() => (onDark.value ? '#29b6f6' : '#1565c0'))

  const compasColor = (i: number) => (isAccent(i) ? 'var(--q-primary)' : neutralColor.value)

  /**
   * The palmas layer's colour. Only the accented strike takes the hue — the
   * softer two stay ink, so the accent is the one thing that stands out rather
   * than the whole layer turning blue.
   */
  const palmasColor = (i: number) =>
    (palmasWeight(i) === 3 ? accentInkColor.value : inkColor.value)

  const compasScale: Record<CompasRole, number> = {
    accent: 1.5,
    beat: 1,
    pulse: 0.65,
    sub: 0.4
  }

  const compasOpacity: Record<CompasRole, number> = {
    accent: 1,
    beat: 0.9,
    pulse: 0.6,
    sub: 0.4
  }

  /**
   * Off-beat slots stay reserved but unseen unless the instrument being drawn
   * is playing them, so the beat spacing never shifts. This follows the drawn
   * instrument rather than the mixer as a whole: a subdivision belongs to the
   * figure on screen, not to some other instrument that happens to be on.
   */
  const isHidden = (i: number) => roleOf(i) === 'sub' && !visualizedHasEighthNotes.value

  return {
    roleOf,
    palmasOf,
    palmasWeight,
    compasColor,
    compasScale,
    compasOpacity,
    neutralColor,
    inkColor,
    palmasColor,
    isHidden,
    showsEighthNotes: visualizedHasEighthNotes
  }
}
