<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import palosData from 'src/data/palosData'
import { usePaloStore } from 'src/stores/palo'
import { useSessionStore } from 'src/stores/session'
import type { numOpts } from 'src/composables/models'

const $q = useQuasar()
const route = useRoute()
const paloData = palosData.find(palo => palo.value === route.name)
const paloStore = usePaloStore(route.name as string)()
const sessionStore = useSessionStore()

const { palo } = storeToRefs(paloStore)

const {
  selectStartBeat
} = paloStore

const {
  toggleDialog
} = sessionStore

const arrayOfIndexes = computed(
  () => {
  const array = []
  if (paloData?.startBeats.length) {
    for (let index = 0; index < paloData?.startBeats.length; index++) {
      array.push(index)
    }
  }
  return array
})

const dataSelectedStartBeat = paloData?.startBeats.find((el) => el !== undefined && el.value === palo.value.selectedStartBeat.value)

const index = computed(
  (): number | null =>
    palo.value.selectedStartBeat && paloData?.startBeats.length && dataSelectedStartBeat
      ? paloData?.startBeats.indexOf(dataSelectedStartBeat) as number
      : null
)

const onSelectedStartBeat = (v: number) => {
  const obj = paloData?.startBeats.find((el) => el !== undefined && paloData?.startBeats.indexOf(el) === v)
  if (obj) selectStartBeat(obj.value)
  paloStore.stop()
}
</script>

<template lang="pug">
.text-center.q-mx-md
  .caption Start beat
  q-slider(
    :model-value="index",
    @update:model-value="onSelectedStartBeat($event)",
    :min="0",
    :max="arrayOfIndexes.length",
    :step="1",
    label,
    label-always,
    switch-label-side,
    :label-value="palo.selectedStartBeat.label",
    snap
  )
</template>
