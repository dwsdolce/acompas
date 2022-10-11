<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { usePaloStore } from 'src/stores/palo'
import { GlobalEvents } from 'vue-global-events'

const route = useRoute()
const paloStore = usePaloStore(route.name as string)()

const {
  isPlaying
} = storeToRefs(paloStore)

const {
  palo,
  playStop,
  selectTempo
} = paloStore
</script>

<template lang="pug">
global-events(
  @keyup.prevent.space.exact="playStop",
  @keyup.prevent.up.exact="selectTempo(palo.tempo + 1)",
  @keyup.prevent.down.exact="selectTempo(palo.tempo - 1)",
  @keyup.prevent.shift.up.exact="selectTempo(palo.tempo + 2)",
  @keyup.prevent.shift.down.exact="selectTempo(palo.tempo - 2)",
  @keyup.prevent.alt.shift.up.exact="selectTempo(palo.tempo + 5)",
  @keyup.prevent.alt.shift.down.exact="selectTempo(palo.tempo - 5)"
)

</template>
