<script setup lang="ts">
import { ref, computed, onMounted, onUpdated } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import palosData from 'src/data/palosData'
import { usePaloStore } from 'src/stores/palo'
import { useSessionStore } from 'src/stores/session'
import type { QBtn } from 'quasar'

const decreaseTempoBtn = ref<QBtn | null>(null)
const increaseTempoBtn = ref<QBtn | null>(null)

const $q = useQuasar()
const route = useRoute()
const paloData = palosData.find(palo => palo.value === route.name)
const paloStore = usePaloStore(route.name as string)()
const { palo } = storeToRefs(paloStore)
const sessionStore = useSessionStore()

const {
  visualizationSize
} = storeToRefs(sessionStore)

const {
  selectTempo
} = paloStore

const decrement = () => {
  if (palo.value.tempo) selectTempo(palo.value.tempo - 1)
}

const increment = () => {
  if (palo.value.tempo) selectTempo(palo.value.tempo + 1)
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
      v-if="palo.tempo",
      color="primary",
      track-color="grey-1",
      :model-value="palo.tempo",
      @update:model-value="selectTempo($event)",
      :min="paloData?.minTempo",
      :max="paloData?.maxTempo",
      show-value,
      :size="$q.screen.lt.md ? '106px' : '148px'",
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
