<script setup lang="ts">
import { ref, computed, watch, onMounted, onUpdated } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'
import type { QBtn } from 'quasar'

const decreaseTempoBtn = ref<QBtn | null>(null)
const increaseTempoBtn = ref<QBtn | null>(null)

const $q = useQuasar()
const { t } = useI18n()

const patternStore = usePatternStore()
const sessionStore = useSessionStore()

const {
  selectedPattern,
  selectedData,
  tempo
} = storeToRefs(patternStore)

const {
  visualizationSize
} = storeToRefs(sessionStore)

const decrement = () => {
  tempo.value = tempo.value - 1
}

const increment = () => {
  tempo.value = tempo.value + 1
}

const handleTempoChange = (newTempo: number) => {
  tempo.value = newTempo
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
  p {{ $t('doc.tempo.title') }}
  .row.justify-center.items-end.content-end
    q-knob(
      color="primary",
      track-color="grey-8",
      :model-value="tempo",
      @update:model-value="handleTempoChange($event)",
      :min="selectedData?.minTempo",
      :max="selectedData?.maxTempo",
      show-value,
      :size="$q.screen.lt.md ? '130px' : '142px'",
      :thickness="0.2"
    )
      .text-weight-regular {{ tempo }}
        .text-subtitle2 {{ $t('doc.tempo.bpm') }}
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
      q-icon(name="mdi-minus")
    q-btn(
      id="increaseTempoBtn",
      ref="increaseTempoBtn",
      outline,
      round,
      color="white",
      :size="$q.screen.lt.md ? 'sm' : 'md'",
      @click="increment"
    )
      q-icon(name="mdi-plus")
</template>
