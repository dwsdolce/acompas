<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
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

const tempoInterval = ref<NodeJS.Timeout | null>(null)

const handleSpace = (e: KeyboardEvent) => {
  if (e.code === 'Space') {
    playStop()
  }
  if (isFocusableElement(document.activeElement)) document.activeElement?.blur()
}

const handleUp = (e: KeyboardEvent) => {
  if (e.code === 'ArrowUp') {
    tempo.value = tempo.value + 1
  }
  if (isFocusableElement(document.activeElement)) document.activeElement?.blur()
}

const handleDown = (e: KeyboardEvent) => {
  if (e.code === 'ArrowDown') {
    tempo.value = tempo.value - 1
  }
  if (isFocusableElement(document.activeElement)) document.activeElement?.blur()
}

</script>

<template lang="pug">
GlobalEvents(
  @keyup.space.prevent.exact="handleSpace",
  @keydown.up.prevent.exact="handleUp",
  @keydown.down.prevent.exact="handleDown",
  @keyup.prevent.shift.up.exact="tempo.value = tempo.value + 2",
  @keyup.prevent.shift.down.exact="tempo.value = tempo.value - 2",
  @keyup.prevent.alt.shift.up.exact="tempo.value = tempo.value + 5",
  @keyup.prevent.alt.shift.down.exact="tempo.value = tempo.value - 5"
)
</template>
