<script setup lang="ts">
  import { ref, watch } from 'vue'
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
span Reverb decay
q-slider(
  :model-value="palo.globalDecay",
  @update:model-value="selectDecay($event || palo.globalDecay)",
  :min="0.2",
  :max="1.2",
  :step="0.1",
  label,
  snap
)
</template>
