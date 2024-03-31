<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePatternStore } from 'src/stores/patterns'

const patternStore = usePatternStore()
const { selectedPattern, swing } = storeToRefs(patternStore)
</script>

<template lang="pug">
.text-center.q-mx-md
  p.caption Swing
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
          p.text-body2 If its value is 0, the eighth note is exactly half a quarter note. When it approaches to 1, a lag is applied, for a "jazz-like" rythm flavour.
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
