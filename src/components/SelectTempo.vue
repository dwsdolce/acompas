<script setup lang="ts">
import { ref, computed, onMounted, onUpdated } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'
import type { QBtn } from 'quasar'

const decreaseTempoBtn = ref<QBtn | null>(null)
const increaseTempoBtn = ref<QBtn | null>(null)

const $q = useQuasar()
const patternStore = usePatternStore()

const {
  selectedPattern,
  tempo
} = storeToRefs(patternStore)

const sessionStore = useSessionStore()

const {
  visualizationSize
} = storeToRefs(sessionStore)

const {
  selectTempo
} = patternStore

const decrement = () => {
  tempo.value = tempo.value - 1
}

const increment = () => {
  tempo.value = tempo.value + 1
}

onUpdated(() => {
  if (decreaseTempoBtn.value !== null) {
    decreaseTempoBtn.value.$el.querySelector('.q-focus-helper').blur()
  }
  if (increaseTempoBtn.value !== null) {
    increaseTempoBtn.value.$el.querySelector('.q-focus-helper').blur()
  }
})
</script>

<template lang="pug">
div
  p Tempo
  .row.justify-center.items-end.content-end
    q-knob(
      v-if="tempo",
      color="primary",
      track-color="grey-1",
      v-model="tempo",
      :min="selectedPattern?.minTempo",
      :max="selectedPattern?.maxTempo",
      show-value,
      :size="$q.screen.lt.md ? '130px' : '142px'",
      :thickness="0.2"
    ).text-weight-light
  .row.justify-between
    q-btn(
      id="decreaseTempoBtn",
      ref="decreaseTempoBtn",
      outline,
      round,
      color="white",
      :size="$q.screen.lt.md ? 'sm' : 'md'",
      @click="decrement"
    )
      q-icon(name="remove")
    q-btn(
      id="increaseTempoBtn",
      ref="increaseTempoBtn",
      outline,
      round,
      color="white",
      :size="$q.screen.lt.md ? 'sm' : 'md'",
      @click="increment"
    )
      q-icon(name="add")
</template>
