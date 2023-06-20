<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { Platform } from 'quasar'
import { storeToRefs } from 'pinia'
import { GlobalEvents } from 'vue-global-events'
import { KeepAwake } from '@capacitor-community/keep-awake'
import { usePatternStore } from 'src/stores/patterns'
import { useSessionStore } from 'src/stores/session'
import { useMatomo } from 'src/composables/matomo'
import { isFocusableElement } from 'src/utils/utils'

const sessionStore = useSessionStore()

const {
  trackingEnabled
} = storeToRefs(sessionStore)

// const { playStop } = sessionStore

const patternStore = usePatternStore()

const {
  isPlaying,
  selectedPattern,
  tempo
} = storeToRefs(patternStore)

const {
  playStop,
  selectTempo
} = patternStore

const { init: intiMatomo, deleteScript } = useMatomo()

const isSupported = async () => {
  const result = await KeepAwake.isSupported()
  return result.isSupported
}

const isKeptAwake = async () => {
  const result = await KeepAwake.isKeptAwake()
  return result.isKeptAwake
}



const handleSpace = (e: KeyboardEvent) => {
  if (isFocusableElement(document.activeElement)) document.activeElement?.blur()
  if (e.code === 'Space') {
    playStop()
  }
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
  @keyup.prevent.space.exact="handleSpace",
  @keyup.prevent.up.exact="selectTempo(selectedPattern.tempo + 1)",
  @keyup.prevent.down.exact="selectTempo(selectedPattern.tempo - 1)",
  @keyup.prevent.shift.up.exact="selectTempo(selectedPattern.tempo + 2)",
  @keyup.prevent.shift.down.exact="selectTempo(selectedPattern.tempo - 2)",
  @keyup.prevent.alt.shift.up.exact="selectTempo(selectedPattern.tempo + 5)",
  @keyup.prevent.alt.shift.down.exact="selectTempo(selectedPattern.tempo - 5)"
)

</template>
