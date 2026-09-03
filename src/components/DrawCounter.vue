<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { getCssVar } from 'quasar'
import { useSessionStore } from 'src/stores/session'
import { usePatternStore } from 'src/stores/patterns'
import { useCompasVisual } from 'src/composables/visualization'

const sessionStore = useSessionStore()
const patternStore = usePatternStore()
const { roleOf, palmasWeight, compasColor, palmasColor, showsEighthNotes } = useCompasVisual()

const {
  selectedPattern,
  selectedContext,
  selectedData,
  metronomeEvent,
  metronomeSubEvent,
  beatLabels
} = storeToRefs(patternStore)

const {
  isDarkMode
} = storeToRefs(sessionStore)

const counter = ref<string | number | null>(null)

// The slot on screen. Counted beats arrive on metronomeEvent and off-beats on
// metronomeSubEvent, and the counter has to follow both: watching only the
// first meant an eighth-note pattern looked identical to a straight one here,
// while the dots showed every subdivision.
const currentSlot = ref<number | null>(null)

const getClass = computed(() => ({ 'light-mode': !isDarkMode.value }))

// Colour says what the slot is in the compás, exactly as it does on the dots:
// the context's own colour for a stressed beat, neutral grey for the rest. It
// used to be primary against secondary, which are two shades of the same red
// and told these apart in name only.
const getStyle = computed(() => {
  const slot = currentSlot.value
  if (slot === null) return {}
  return { color: compasColor(slot), opacity: roleOf(slot) === 'accent' ? 1 : 0.9 }
})

// The palmas layer, in the same language as the dots' ring: present when the
// instrument being drawn strikes here, thicker the harder it strikes, and
// coloured when that strike is the accented one.
const palmasStyle = computed(() => {
  const slot = currentSlot.value
  const weight = slot === null ? 0 : palmasWeight(slot)
  return {
    height: weight ? `${weight * 2}px` : '2px',
    // slot is re-tested rather than leaning on weight: a zero weight implies a
    // null slot, but only to a reader, not to the type checker.
    backgroundColor: slot !== null && weight ? palmasColor(slot) : 'transparent',
    opacity: weight ? 0.9 : 0
  }
})

const show = (v: number | null) => {
  if (v === null || !selectedPattern.value) {
    currentSlot.value = null
    counter.value = null
    return
  }
  currentSlot.value = v
  // An unlabelled slot is one the compás does not count. It reads as a dot
  // rather than a number: present, but not asking to be counted.
  counter.value = beatLabels.value[v] ?? '·'
}

watch(metronomeEvent, show)

// Off-beats only when the instrument being drawn is playing them, so the
// counter never counts a subdivision nothing is sounding.
watch(metronomeSubEvent, (v: number | null) => {
  if (v !== null && !showsEighthNotes.value) return
  show(v)
})
</script>

<template lang="pug">
.item-center.full-width
  h1(
    id="Counter",
    :class="getClass",
    :style="getStyle"
  ).text-center.q-ma-none
    div(v-if="currentSlot === null")
      q-icon(name="mdi-dots-horizontal", size="85px")
    div(v-else).text-weight-bold {{ counter }}
  .palmas-bar(v-if="currentSlot !== null", :style="palmasStyle")
</template>

<style lang="scss" scoped>
.palmas-bar {
  width: 72px;
  margin: 4px auto 0;
  border-radius: 3px;
  transition: height 0.08s ease, opacity 0.08s ease;
}
#Counter {
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(255,255,255,0.6);
  &.light-mode {
    text-shadow: 1px 1px 1px rgba(0,0,0,0.6);
  }
}
</style>
