<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
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

const counter = ref<number | null>(null)
const className = ref<string>('')

watch(metronomeEvent, (v: number | null) => {
  if (v !== null && selectedPattern.value) {
    counter.value = beatLabels.value[(v as number)]

    if (selectedData.value?.accents.includes(((v as number) / 2) as never)) {
      className.value = 'accent'
    } else {
      className.value = ''
    }
  } else {
    counter.value = null
    className.value = ''
  }
})
</script>

<template lang="pug">
.item-center.full-width
  h1(:class="className").text-center.q-ma-none
    div(v-if="metronomeEvent === null")
      q-icon(name="more_horiz")
    div(v-else).counter {{ counter }}
</template>

<style lang="sass" scoped>
.q-icon
  height: 0.85rem
.accent
  color: firebrick
</style>
