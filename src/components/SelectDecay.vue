<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { usePatternStore } from 'src/stores/patterns'
import HelpTooltip from 'src/components/HelpTooltip.vue'

const { t } = useI18n()
const patternStore = usePatternStore()

const {
  selectedPattern,
  globalDecay
} = storeToRefs(patternStore)

const decaySteps = {
  0.1: '0.1',
  0.5: '0.5',
  1: '1',
  1.5: '1.5',
  2: '2',
  2.5: '2.5',
  3: '3'
}
</script>

<template lang="pug">
.row.items-center
  .col-3 {{ $t('doc.reverb.title') }}
    span.q-ml-sm
      help-tooltip(:text="$t('doc.reverb.content')")
  q-slider(
    v-model="globalDecay",
    :min="0.1",
    :max="3",
    :step="0.1",
    snap,
    label,
    label-always,
    switch-label-side,
    markers,
    :marker-labels="decaySteps",
    marker-labels-class="text-grey-5",
    switch-marker-labels-side
  ).col-9.q-mb-md
</template>
