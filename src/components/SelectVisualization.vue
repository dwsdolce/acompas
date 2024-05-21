<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'

const { t } = useI18n()

const patternStore = usePatternStore()
const sessionStore = useSessionStore()

const {
  visualizationModes,
  visualizationMode
} = storeToRefs(sessionStore)

const {
  toggleDialog
} = sessionStore
</script>

<template lang="pug">
.text-center.q-mx-md
  .caption {{ $t('doc.options.content.viewMode.title') }}
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
          p.text-body2 {{ $t('doc.options.content.viewMode.content') }}
  q-option-group(
    inline,
    left-label,
    type="radio",
    color="primary",
    v-model="visualizationMode",
    :options="visualizationModes"
  ).q-mb-lg
</template>
