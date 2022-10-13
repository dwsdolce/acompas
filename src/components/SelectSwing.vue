<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import palosData from 'src/data/palosData'
import { usePaloStore } from 'src/stores/palo'

const route = useRoute()

const paloData = palosData.find(palo => palo.value === route.name)
const paloStore = usePaloStore(route.name as string)()
const { palo } = storeToRefs(paloStore)

const {
  selectSwing
} = paloStore
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
        icon="help"
      )
        q-tooltip(
          anchor="top middle",
          self="bottom middle",
          :offset="[10, 10]"
        )
          p.text-body2 If its value is 0, the eighth note is exactly half a quarter note. When it approaches to 1, a lag is applied, for a "jazz-like" rythm flavour.
  q-slider(
    :model-value="palo.swing",
    @update:model-value="selectSwing($event)",
    :min="0",
    :max="1",
    :step="0.1",
    label,
    label-always,
    switch-label-side,
    snap
  )
</template>
