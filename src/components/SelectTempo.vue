<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import palosData from 'src/data/palosData'
import { useCoreStore } from 'src/stores/core'
import { usePaloStore } from 'src/stores/palo'
import { useSessionStore } from 'src/stores/session'

const $q = useQuasar()
const route = useRoute()

const paloData = palosData.find(palo => palo.value === route.name)
const paloStore = usePaloStore(route.name as string)()
const { palo } = storeToRefs(paloStore)

const coreStore = useCoreStore()

const {
  visualizationSize
} = storeToRefs(coreStore)

const {
  selectTempo
} = paloStore

const decrement = () => {
  if (palo.value.tempo) selectTempo(palo.value.tempo - 1)
}

const increment = () => {
  if (palo.value.tempo) selectTempo(palo.value.tempo + 1)
}

const knobSize = computed(() => {
  if (visualizationSize.value.width && visualizationSize.value.width < 860) {
    return (visualizationSize.value.width * 25 / 100) + 'px'
  } else {
    return '148px'
  }
})
</script>

<template lang="pug">
div
  p.caption.text-center Tempo
  .row.justify-center.items-end.content-end
    q-btn(
      outline,
      round,
      color="white",
      :size="$q.screen.lt.md ? 'sm' : 'md'",
      :padding="$q.screen.lt.md ? 'xs' : 'sm'",
      @click="decrement()"
    ).self-end
      q-icon(name="remove")
    q-knob(
      v-if="palo.tempo",
      color="primary",
      track-color="grey-1",
      :model-value="palo.tempo",
      @update:model-value="selectTempo($event)",
      :min="paloData?.minTempo",
      :max="paloData?.maxTempo",
      show-value,
      :size="knobSize",
      :thickness="0.12"
    ).text-weight-light
    q-btn(
      outline,
      round,
      color="white",
      :size="$q.screen.lt.md ? 'sm' : 'md'",
      :padding="$q.screen.lt.md ? 'xs' : 'sm'",
      @click="increment()"
    ).self-end
      q-icon(name="add")
</template>

<style lang="sass" scoped>
.custom-input
  max-width: 300px
</style>
