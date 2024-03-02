<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'
import type { numOpts } from 'src/utils/types'

const $q = useQuasar()
const patternStore = usePatternStore()
const sessionStore = useSessionStore()

const {
  selectedPattern,
  selectedData,
  prestartBeat
} = storeToRefs(patternStore)

const {
  toggleDialog
} = sessionStore

const arrayOfIndexes = computed(
  () => {
  const array = []
  if (selectedData.value?.prestartBeats.length) {
    for (let index = 0; index < selectedData.value?.prestartBeats.length; index++) {
      array.push(index)
    }
  }
  return array
})

const dataSelectedPrestartBeat = selectedData.value?.prestartBeats.find((el: numOpts) => el !== undefined && el.value === prestartBeat.value)

const index = computed(
  (): number | null =>
    prestartBeat.value && selectedData.value?.prestartBeats.length && dataSelectedPrestartBeat
      ? selectedData.value?.prestartBeats.indexOf(dataSelectedPrestartBeat) as number
      : null
)
</script>

<template lang="pug">
.text-center.q-mx-md
  .caption Prestart from beat
    span.q-ml-sm
      q-btn(
        dense,
        round,
        flat,
        size="10px",
        padding="none",
        icon="help"
      )
        q-tooltip(
          anchor="top middle",
          self="bottom middle",
          :offset="[10, 10]"
        )
          p.text-body2 Optionaly define a beat from which a precount click will start before the actual loop starts.
  q-slider(
    v-model="prestartBeat",
    :min="arrayOfIndexes[0]",
    :max="arrayOfIndexes[arrayOfIndexes.length - 1]",
    :step="1",
    snap,
    markers,
    :marker-labels="val => selectedData.prestartBeats[val].label",
    marker-labels-class="text-grey-5",
    switch-marker-labels-side
  ).q-mb-md
</template>
