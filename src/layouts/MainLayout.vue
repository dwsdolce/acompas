<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Screen, Platform } from 'quasar'
import { storeToRefs } from 'pinia'
import LeftDrawer from 'src/components/LeftDrawer.vue'
import SelectContext from 'src/components/SelectContext.vue'
import SelectSettings from 'src/components/SelectSettings.vue'
import { useSessionStore } from 'src/stores/session'
import { usePatternStore } from 'src/stores/patterns'
import type { Ref } from 'vue'
import type { Size } from 'src/utils/types'

const sessionStore = useSessionStore()
const patternStore = usePatternStore()

const { setVisualizationSize } = sessionStore
const { isDarkMode } = storeToRefs(sessionStore)
const { contexts } = storeToRefs(patternStore)

const leftDrawerOpen: Ref<boolean> = ref(Screen.gt.md)

Screen.setSizes({ sm: 500, md: 650, lg: 1000, xl: 2000 })

const appVersion = process.env.APP_VERSION?.valueOf() || '4'

const onResize = (size: Size) => {
  setVisualizationSize(size)
}

// Built at runtime rather than imported, so the bundler never sees these URLs
// and cannot rewrite them for the deployment path - the same reason the audio
// paths in src/composables/metronome.ts need BASE_URL. Without it the header
// images are fetched from the domain root and 404 anywhere but a root install.
const publicFolder = computed(() =>
  Platform.is.electron
    ? `${window.electronAPI.getPublicPath()}/`
    : import.meta.env.BASE_URL
)
</script>

<template lang="pug">
q-layout(
  view="hhh LpR lFf",
  :class="{ 'capacitor-android': Platform.is.capacitor && Platform.is.android }"
)
  q-header
    q-bar.q-electron-drag(v-if="Platform.is.electron")
    q-toolbar
      q-btn(
        id="menuBtn",
        flat,
        dense,
        round,
        @click="leftDrawerOpen = !leftDrawerOpen",
        aria-label="Menu"
      )
        q-icon(name="mdi-menu")

      q-btn(
        flat,
        to="/"
      ).row.items-center.no-wrap.q-px-sm
        q-avatar.shadow-1
          img(:src="`${publicFolder}ACompas-4-logo.png`" alt="Palmas icon", width="40")
        img(:src="`${publicFolder}ACompas-4-name.png`" alt="Palmas name title", height="30").q-mt-xs.q-ml-sm

      q-space
      SelectContext(v-if="contexts.length > 1")
      q-space

      SelectSettings
      .text-weight-regular v{{ appVersion }}

  q-drawer(
    bordered,
    v-model="leftDrawerOpen",
    content-class="bg-grey-2",
    :breakpoint="1439"
  )
    left-drawer

  q-page-container#appMain.text-info(:class="{ 'light-mode': !isDarkMode }")
    q-resize-observer(
      debounce="10",
      @resize="onResize"
    )
    router-view(v-slot="{ Component, route }")
      Transition(name="fade", mode="out-in")
        component(:is="Component", :key="route.fullPath")
</template>

<style lang="scss">
#appMain {
  background: linear-gradient(
    to bottom,
    rgb(25, 25, 25) 0%,
    rgb(35, 35, 35) 35%,
    rgb(35, 35, 35) 65%,
    rgb(25, 25, 25) 100%
  );
  &.light-mode {
    background: rgb(240, 240, 240);
  }
}
</style>
