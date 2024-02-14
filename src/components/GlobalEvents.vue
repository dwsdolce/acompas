<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { Platform } from 'quasar'
import { storeToRefs } from 'pinia'
import { GlobalEvents } from 'vue-global-events'
import { usePatternStore } from 'src/stores/patterns'
import { isFocusableElement } from 'src/utils/utils'

const patternStore = usePatternStore()

const {
  selectedPattern,
} = storeToRefs(patternStore)

const {
  playStop,
  selectTempo
} = patternStore

const handleSpace = (e: KeyboardEvent) => {
  if (isFocusableElement(document.activeElement)) document.activeElement?.blur()
  if (e.code === 'Space') {
    playStop()
  }
}
</script>

<template lang="pug">
global-events(
  @keyup.prevent.space.exact="handleSpace",
  @keyup.prevent.up.exact="selectTempo(selectedPattern.tempo + 1)",
  @keyup.prevent.down.exact="selectTempo(selectedPattern.tempo - 1)",
  @keyup.prevent.shift.up.exact="selectTempo(selectedPattern.tempo + 2)",
  @keyup.prevent.shift.down.exact="selectTempo(selectedPattern.tempo - 2)",
  @keyup.prevent.alt.shift.up.exact="selectTempo(selectedPattern.tempo + 5)",
  @keyup.prevent.alt.shift.down.exact="selectTempo(selectedPattern.tempo - 5)"
)

</template>
src/stores/settings
