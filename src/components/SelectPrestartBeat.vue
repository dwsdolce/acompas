<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import palosData from 'src/data/palosData'
import { usePaloStore } from 'src/stores/palo'
import { useSessionStore } from 'src/stores/session'
import type { numOpts } from 'src/composables/models'

const route = useRoute()

const paloData = palosData.find(palo => palo.value === route.name)

const paloStore = usePaloStore(route.name as string)()
const sessionStore = useSessionStore()

const $q = useQuasar()

const { palo, prestartBeats } = storeToRefs(paloStore)

const {
  selectPrestartBeat
} = paloStore

const {
  toggleDialog
} = sessionStore

const arrayOfIndexes = computed(
  () => {
  const array = []
  if (paloData?.prestartBeats.length) {
    for (let index = 0; index < paloData?.prestartBeats.length; index++) {
      array.push(index)
    }
  }
  return array
})

const dataSelectedPrestartBeat = paloData?.prestartBeats.find((el) => el !== undefined && el.value === palo.value.selectedPrestartBeat.value)

const index = computed(
  (): number | null =>
    palo.value.selectedPrestartBeat && paloData?.prestartBeats.length && dataSelectedPrestartBeat
      ? paloData?.prestartBeats.indexOf(dataSelectedPrestartBeat) as number
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
    :model-value="index",
    @change="val => { selectPrestartBeat(val) }",
    :min="arrayOfIndexes[0]",
    :max="arrayOfIndexes[arrayOfIndexes.length - 1]",
    :step="1",
    snap,
    markers,
    :marker-labels="val => paloData?.prestartBeats[val].label",
    marker-labels-class="text-grey-5",
    switch-marker-labels-side
  ).q-mb-md
</template>
