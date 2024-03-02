<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { getCssVar } from 'quasar'
import { useSessionStore } from 'src/stores/session'
import { usePatternStore } from 'src/stores/patterns'

const sessionStore = useSessionStore()
const patternStore = usePatternStore()

const {
  selectedPattern,
  selectedData,
  metronomeEvent,
  beatLabels
} = storeToRefs(patternStore)

const counter = ref<string | number | null>(null)
const className = ref<string>('')

const getStyle = () => {
  if (!counter.value || !selectedData.value?.accents.includes(((metronomeEvent.value as number) / 2) as never)) {
    return { color: getCssVar('primary') }
  } else {
    return { color: getCssVar('secondary') }
  }
}

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
  h1(:style="getStyle()").text-center.q-ma-none
    div(v-if="metronomeEvent === null")
      q-icon(name="more_horiz", size="85px")
    div(v-else).counter {{ counter }}
</template>
