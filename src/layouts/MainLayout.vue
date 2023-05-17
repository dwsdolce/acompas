<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { Screen } from 'quasar'
import { storeToRefs } from 'pinia'
import LeftDrawer from 'src/components/LeftDrawer.vue'
import GlobalEvents from 'src/components/GlobalEvents.vue'
import { useSessionStore } from 'src/stores/session'
import { useMatomo } from 'src/composables/matomo'
import type { Size } from 'src/composables/models'

const sessionStore = useSessionStore()

const {
  visualizationSize,
  trackingEnabled
} = storeToRefs(sessionStore)
const { setVisualizationSize } = sessionStore

const { init: intiMatomo, deleteScript } = useMatomo()

const leftDrawerOpen: Ref<boolean> = ref(Screen.gt.md)

Screen.setSizes({ sm: 500, md: 650, lg: 1000, xl: 2000 })

const appVersion = process.env.APP_VERSION?.valueOf() || '3'

const onResize = (size: Size) => {
  setVisualizationSize(size)
}

onMounted(() => {
  if (trackingEnabled.value) {
    intiMatomo()
  } else {
    deleteScript()
  }
})
</script>

<template lang="pug">
q-layout(view="hHh Lpr lFf")
  q-header
    q-toolbar
      q-btn(
        id="menuBtn",
        flat,
        dense,
        round,
        @click="leftDrawerOpen = !leftDrawerOpen",
        aria-label="Menu"
      )
        q-icon(name="menu")
      q-toolbar-title.flex.items-center
        img(:src="'AClogo.png'" alt="A Compás").q-mr-sm
        //- .text-subtitle2.text-weight-light.text-deep-orange-1.q-mt-xs Flamenco metronome
      q-space
      .text-weight-light v{{ appVersion }}

  q-drawer(
    bordered,
    v-model="leftDrawerOpen",
    content-class="bg-grey-2",
    :breakpoint="1439"
  )
    left-drawer(id="sideMenu")

  q-page-container.bg-dark.text-info
    #appMain
      q-resize-observer(
        debounce="10",
        @resize="onResize"
      )
      router-view(v-slot="{ Component, route }")
        Transition(name="fade", mode="out-in")
          component(:is="Component", :key="route.name")

  global-events
</template>

<style lang="sass">
.fade-enter-active,
.fade-leave-active
  transition: opacity 0.5s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0
</style>
