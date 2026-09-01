<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { usePatternStore } from 'src/stores/patterns'
import HelpTooltip from 'src/components/HelpTooltip.vue'

const { t } = useI18n()

const patternStore = usePatternStore()
const { selectedPattern, swing } = storeToRefs(patternStore)
</script>

<template lang="pug">
.text-center.q-mx-md
  p.caption {{ $t('doc.swing.title') }}
    span.q-ml-sm
      help-tooltip(:text="$t('doc.swing.caption')")
  q-slider(
    v-model="swing",
    :min="0",
    :max="1",
    :step="0.1",
    snap,
    label,
    label-always,
    switch-label-side,
    markers,
    :marker-labels="val => Math.round(val * 10) / 10",
    marker-labels-class="text-grey-5",
    switch-marker-labels-side
  ).q-mb-md
</template>
