<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { usePatternStore } from 'src/stores/patterns'

const { t } = useI18n()

const patternStore = usePatternStore()

const { selectedPattern, humanization } = storeToRefs(patternStore)
</script>

<template lang="pug">
.text-center.q-mx-md
  p.caption {{ $t('doc.options.content.humanize.title') }}
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
          p.text-body2 {{ $t('doc.options.content.humanize.content') }}

  q-toggle(
    v-model="humanization",
    left-label,
    color="primary",
    keep-color
  )
</template>
