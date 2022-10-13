<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import palosData from 'src/data/palosData'
import { usePaloStore } from 'src/stores/palo'
import { useSessionStore } from 'src/stores/session'
import { forEachValue } from 'src/composables/utils'
import type { numOpts } from 'src/composables/models'

const route = useRoute()

const paloData = palosData.find(palo => palo.value === route.name)

const paloStore = usePaloStore(route.name as string)()
const sessionStore = useSessionStore()

const $q = useQuasar()

const { palo } = storeToRefs(paloStore)

const {
  selectPreCount
} = paloStore

const {
  toggleDialog
} = sessionStore

const arrayOfIndexes = computed(
  () => {
  const array = []
  if (paloData?.preCounts.length) {
    for (let index = 0; index < paloData?.preCounts.length; index++) {
      array.push(index)
    }
  }
  return array
})

const dataSelectedPreCount = paloData?.preCounts.find((el) => el !== undefined && el.value === palo.value.selectedPreCount.value)

const index = computed(
  (): number | null =>
    palo.value.selectedPreCount && paloData?.preCounts.length && dataSelectedPreCount
      ? paloData?.preCounts.indexOf(dataSelectedPreCount) as number
      : null
)

const onSelectedPreCount = (v: number) => {
  const obj = paloData?.preCounts.find((el) => el !== undefined && paloData?.preCounts.indexOf(el) === v)
  if (obj) selectPreCount(obj.value)
  paloStore.stop()
}
</script>

<template lang="pug">
.text-center.q-mx-md
  .caption Pre-count
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
          p.text-body2 Optionaly define a number of beats to use as pre-count for the selected palo.
  q-slider(
    :model-value="index",
    @update:model-value="onSelectedPreCount($event)",
    :min="0",
    :max="arrayOfIndexes.length",
    :step="1",
    label,
    label-always,
    switch-label-side,
    :label-value="palo.selectedPreCount.label",
    snap
  )
</template>
