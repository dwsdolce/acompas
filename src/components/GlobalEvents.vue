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
  tempo
} = storeToRefs(patternStore)

const {
  playStop
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
  @keyup.prevent.up.exact="tempo.value = tempo.value + 1",
  @keyup.prevent.down.exact="tempo.value = tempo.value - 1",
  @keyup.prevent.shift.up.exact="tempo.value = tempo.value + 2",
  @keyup.prevent.shift.down.exact="tempo.value = tempo.value - 2",
  @keyup.prevent.alt.shift.up.exact="tempo.value = tempo.value + 5",
  @keyup.prevent.alt.shift.down.exact="tempo.value = tempo.value - 5"
)
</template>
