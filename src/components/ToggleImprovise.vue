<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePatternStore } from 'src/stores/patterns'

const patternStore = usePatternStore()
const { selectedPattern, improvisation } = storeToRefs(patternStore)
</script>

<template lang="pug">
.text-center.q-mx-md
  p.caption {{ $t('doc.options.content.improvise.title') }}
    span(v-if="selectedPattern.name !== 'simple-click'").q-ml-sm
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
          p.text-body2 {{ $t('doc.options.content.improvise.content') }}

  q-toggle(
    v-model="improvisation",
    :disable="selectedPattern.name === 'simple-click'",
    left-label,
    color="primary",
    keep-color
  )
    q-tooltip(
      v-if="selectedPattern.name === 'simple-click'",
      anchor="top middle",
      self="bottom middle",
      :offset="[10, 10]"
    ) {{ $t('doc.utils.disabled') }}
</template>
