<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePatternStore } from 'src/stores/patterns'

const patternStore = usePatternStore()
const { selectedPattern, humanization } = storeToRefs(patternStore)
</script>

<template lang="pug">
.text-center.q-mx-md
  p.caption Humanize
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
          p.text-body2 If it is on, then random little time variations are applied to the sounds. The result is a bit more realistic.

  q-toggle(
    v-model="humanization",
    left-label,
    color="primary",
    keep-color
  )
</template>
