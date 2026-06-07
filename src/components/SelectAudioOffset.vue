<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useSessionStore } from 'src/stores/session'

const { t } = useI18n()

const sessionStore = useSessionStore()
const { audioVisualOffset } = storeToRefs(sessionStore)
</script>

<template lang="pug">
.text-center.q-mx-md
  p.caption {{ $t('sync.title') }}
    span.q-ml-sm
      q-btn(
        dense,
        round,
        flat,
        size="10px",
        padding="none",
        icon="mdi-help-circle"
      )
        q-tooltip(
          anchor="top middle",
          self="bottom middle",
          :offset="[10, 10]"
        )
          p.text-body2 {{ $t('sync.caption') }}
  q-slider(
    v-model="audioVisualOffset",
    :min="0",
    :max="500",
    :step="10",
    snap,
    label,
    label-always,
    switch-label-side,
    :label-value="audioVisualOffset + ' ms'",
    markers,
    :marker-labels="[{ value: 0, label: '0' }, { value: 250, label: '250' }, { value: 500, label: '500' }]",
    marker-labels-class="text-grey-5",
    switch-marker-labels-side
  ).q-mb-md
</template>
