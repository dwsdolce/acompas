<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePatternStore } from 'src/stores/patterns'

const patternStore = usePatternStore()
const { selectedPattern, improvisation } = storeToRefs(patternStore)
</script>

<template lang="pug">
.text-center.q-mx-md
  p.caption Improvise
    span(v-if="selectedPattern.name !== 'simple-click'").q-ml-sm
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
          p.text-body2 If it is on, then sometimes the metronome will stop sticking to the pre-programmed pattern and play random patterns for one or more instrument(s).

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
    ) This option is disabled for this pattern.
</template>
src/stores/settings
