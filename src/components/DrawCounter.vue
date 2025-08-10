<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { getCssVar } from 'quasar'
import { useSessionStore } from 'src/stores/session'
import { usePatternStore } from 'src/stores/patterns'

const sessionStore = useSessionStore()
const patternStore = usePatternStore()

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
const className = ref<string>('')

const getClass = computed(() => {
  const isAccent = selectedData.value?.accents.includes((metronomeEvent.value as number) as never)
  return {
    'text-primary': !isAccent,
    'text-secondary': isAccent,
    'light-mode': !isDarkMode.value,
  }
})

watch(metronomeEvent, (v: number | null) => {
  if (v !== null && selectedPattern.value) {
    counter.value = beatLabels.value[(v as number)]
  } else {
    counter.value = null
  }
})
</script>

<template lang="pug">
.item-center.full-width
  h1(
    id="Counter",
    :class="getClass"
  ).text-center.q-ma-none
    div(v-if="metronomeEvent === null")
      q-icon(name="mdi-dots-horizontal", size="85px")
    div(v-else).text-weight-bold {{ counter }}
</template>

<style lang="scss" scoped>
#Counter {
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(255,255,255,0.6);
  &.light-mode {
    text-shadow: 1px 1px 1px rgba(0,0,0,0.6);
  }
}
</style>
