<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { usePaloStore } from 'src/stores/palo'

const route = useRoute()
const paloStore = usePaloStore(route.name as string)()

const {
  palo
} = storeToRefs(paloStore)

const {
  selectDecay
} = paloStore
</script>

<template lang="pug">
.row.items-center
  .col-3 Reverb decay
    span.q-ml-sm
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
          p.text-body2 Set a decay for sounds reverb
  q-slider(
    :model-value="palo.globalDecay",
    @change="val => selectDecay(val || palo.globalDecay)",
    :min="0.1",
    :max="1.2",
    :step="0.1",
    snap,
    label,
    label-always,
    switch-label-side,
    markers,
    :marker-labels="val => Math.round(val * 10) / 10",
    marker-labels-class="text-grey-5",
    switch-marker-labels-side
  ).col-9.q-mb-md
</template>
