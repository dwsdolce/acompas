<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { Platform } from 'quasar'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { GlobalEvents } from 'vue-global-events'
import { KeepAwake } from '@capacitor-community/keep-awake'
import { usePaloStore } from 'src/stores/palo'
import { useSessionStore } from 'src/stores/session'
import { useMatomo } from 'src/composables/matomo'

const route = useRoute()
const sessionStore = useSessionStore()

const {
  trackingEnabled
} = storeToRefs(sessionStore)

const paloStore = usePaloStore(route.name as string)()

const {
  isPlaying
} = storeToRefs(paloStore)

const {
  palo,
  playStop,
  selectTempo
} = paloStore

const { init: intiMatomo, deleteScript } = useMatomo()

const isSupported = async () => {
  const result = await KeepAwake.isSupported()
  return result.isSupported
}

const isKeptAwake = async () => {
  const result = await KeepAwake.isKeptAwake()
  return result.isKeptAwake
}

onMounted(async () => {
  if (Platform.is.capacitor && await isSupported()) {
    await KeepAwake.allowSleep()
  }
  if (trackingEnabled.value) {
    intiMatomo()
  } else {
    deleteScript()
  }
})

watch(isPlaying, async (value) => {
  if (Platform.is.capacitor && await isSupported()) {
    if (value) {
      await KeepAwake.keepAwake()
    } else {
      await KeepAwake.allowSleep()
    }
  }
})
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
