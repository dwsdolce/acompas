<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { usePaloStore } from 'src/stores/palo'
import { useCoreStore } from 'src/stores/core'
import { useSessionStore } from 'src/stores/session'
import palosData from 'src/data/palosData'

const route = useRoute()

const paloData = palosData.find(palo => palo.value === route.name)

const coreStore = useCoreStore()

const {
  isPlaying
} = storeToRefs(coreStore)

const {
  play,
  stop
} = coreStore

const paloStore = usePaloStore(route.name as string)()

const { palo } = storeToRefs(paloStore)

const {
  toggleEighthNotes,
  selectVolume,
  selectInstruments,
  instrument
} = paloStore

const sessionStore = useSessionStore()

const {
  toggleDialog
} = sessionStore

const audioContextState = ref(null)
</script>

<template lang="pug">
q-btn(
  id="playBtn",
  ref="playBtn",
  round,
  size="lg",
  color="primary",
  :icon="isPlaying ? 'stop' : 'play_arrow'",
  @click="isPlaying ? stop() : play()"
)
</template>
