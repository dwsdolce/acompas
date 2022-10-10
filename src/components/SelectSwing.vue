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
