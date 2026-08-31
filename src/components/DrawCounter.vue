<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { getCssVar } from 'quasar'
import { useSessionStore } from 'src/stores/session'
import { usePatternStore } from 'src/stores/patterns'
import { useCompasVisual } from 'src/composables/visualization'

const sessionStore = useSessionStore()
const patternStore = usePatternStore()
const { roleOf, palmasWeight, compasColor, inkColor, showsEighthNotes } = useCompasVisual()

const {
  selectedPattern,
  selectedContext,
  selectedData,
  metronomeEvent,
  beatLabels
} = storeToRefs(patternStore)

const {
  isDarkMode
} = storeToRefs(sessionStore)

const counter = ref<string | number | null>(null)

const getClass = computed(() => ({ 'light-mode': !isDarkMode.value }))

// Colour says what the slot is in the compás, exactly as it does on the dots:
// the context's own colour for a stressed beat, neutral grey for the rest. It
// used to be primary against secondary, which are two shades of the same red
// and told these apart in name only.
const getStyle = computed(() => {
  const slot = metronomeEvent.value as number | null
  if (slot === null) return {}
  return { color: compasColor(slot), opacity: roleOf(slot) === 'accent' ? 1 : 0.9 }
})

// The palmas layer, in the same language as the dots' ring: present when the
// instrument being drawn strikes here, thicker the harder it strikes.
const palmasStyle = computed(() => {
  const slot = metronomeEvent.value as number | null
  const weight = slot === null ? 0 : palmasWeight(slot)
  return {
    height: weight ? `${weight * 2}px` : '2px',
    backgroundColor: weight ? inkColor.value : 'transparent',
    opacity: weight ? 0.9 : 0
  }
})

watch(metronomeEvent, (v: number | null) => {
  if (v !== null && selectedPattern.value) {
    const label = beatLabels.value[(v as number)]
    // An unlabelled slot is a beat the compás does not count. It shows a dot
    // rather than a number: present, but not asking to be read as a count.
    counter.value = label ?? (showsEighthNotes.value ? '·' : null)
  } else {
    counter.value = null
  }
})
</script>

<template lang="pug">
.item-center.full-width
  h1(
    id="Counter",
    :class="getClass",
    :style="getStyle"
  ).text-center.q-ma-none
    div(v-if="metronomeEvent === null")
      q-icon(name="mdi-dots-horizontal", size="85px")
    div(v-else).text-weight-bold {{ counter }}
  .palmas-bar(v-if="metronomeEvent !== null", :style="palmasStyle")
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
