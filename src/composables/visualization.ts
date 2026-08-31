import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'

/**
 * What a slot is in the compás — the theory, identical for every instrument.
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
 *   compás — the pulse of the palo. Carried by colour and by size.
 *   palmas — what the instrument you are watching actually strikes. Carried by
 *            an outline, never by a hue.
 *
 * The palmas layer takes no colour of its own on purpose. `--q-primary` is the
 * context's colour and it moves — red for flamenco, orange for Afro-Cuban,
 * purple for Afro-Brazilian, light-blue for Fundamental Global, teal for
 * Ternary African — so any second hue collides with one of them (amber against
 * the Afro-Cuban orange, to take the obvious case). An outline in the
 * foreground colour reads against all five, and against a greyscale screen or
 * a viewer who cannot separate two hues.
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

  // Grey rather than a second hue, for the same reason the palmas layer has no
  // hue: it has to sit beside all five context colours without competing.
  //
  // `onLightSurface` is for a view that does not follow the theme. The clock
  // face is $blue-grey-1 whether the app is light or dark, so reading the
  // theme there paints a near-white tick on a near-white dial and a #bdbdbd
  // numeral that can barely be read.
  const onDark = computed(() => (options.onLightSurface ? false : isDarkMode.value))

  const neutralColor = computed(() => (onDark.value ? '#bdbdbd' : '#616161'))
  const inkColor = computed(() => (onDark.value ? '#f5f5f5' : '#212121'))

  const compasColor = (i: number) => (isAccent(i) ? 'var(--q-primary)' : neutralColor.value)

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
    isHidden,
    showsEighthNotes: visualizedHasEighthNotes
  }
}
