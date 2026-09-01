<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useSessionStore } from 'src/stores/session'
import { usePatternStore } from 'src/stores/patterns'
import { formatAudioOffset } from 'src/utils/utils'
import HelpTooltip from 'src/components/HelpTooltip.vue'

const { t } = useI18n()

const sessionStore = useSessionStore()
const { audioVisualOffset } = storeToRefs(sessionStore)

const patternStore = usePatternStore()
const { tempo } = storeToRefs(patternStore)

const offsetLabel = computed(() =>
  formatAudioOffset(audioVisualOffset.value, tempo.value)
)
</script>

<template lang="pug">
.text-center.q-mx-md
  p.caption {{ $t('sync.title') }}
    span.q-ml-sm
      help-tooltip(:text="$t('sync.caption')")
  q-slider(
    v-model="audioVisualOffset",
    :min="0",
    :max="500",
    :step="10",
    snap,
    label,
    label-always,
    switch-label-side,
    :label-value="offsetLabel",
    markers,
    :marker-labels="[{ value: 0, label: '0' }, { value: 250, label: '250' }, { value: 500, label: '500' }]",
    marker-labels-class="text-grey-5",
    switch-marker-labels-side
  ).q-mb-md
</template>
