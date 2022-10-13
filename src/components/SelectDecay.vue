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
    @update:model-value="selectDecay($event || palo.globalDecay)",
    track-size="10px",
    thumb-size="25px",
    :min="0.2",
    :max="1.2",
    :step="0.1",
    label,
    snap
  ).col-9
</template>
