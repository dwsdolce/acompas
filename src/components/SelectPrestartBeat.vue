<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { usePatternStore } from 'src/stores/patterns'
import type { numOpts } from 'src/utils/types'
import HelpTooltip from 'src/components/HelpTooltip.vue'

const $q = useQuasar()
const { t } = useI18n()
const patternStore = usePatternStore()

const {
  selectedPattern,
  selectedData,
  prestartBeat
} = storeToRefs(patternStore)

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
  .caption {{ $t('doc.prestart.title') }}
    span.q-ml-sm
      help-tooltip(:text="$t('doc.prestart.content')")
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
