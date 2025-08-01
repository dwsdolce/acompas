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
import { StatusBar, Style } from '@capacitor/status-bar'
import { Capacitor } from '@capacitor/core'
import { SplashScreen } from '@capacitor/splash-screen'

const sessionStore = useSessionStore()
const patternStore = usePatternStore()

const { setVisualizationSize } = sessionStore
const { contexts } = storeToRefs(patternStore)

const leftDrawerOpen: Ref<boolean> = ref(Screen.gt.md)

Screen.setSizes({ sm: 500, md: 650, lg: 1000, xl: 2000 })

const appVersion = process.env.APP_VERSION?.valueOf() || '4'

const onResize = (size: Size) => {
  setVisualizationSize(size)
}

const publicFolder = computed(() => Platform.is.electron ? window.electronAPI.getPublicPath() : '')

onMounted(async () => {
  if (Capacitor.getPlatform() === 'android') {
    document.body.classList.add('capacitor-android')
  }

  if (Capacitor.isNativePlatform()) {
    try {
      await StatusBar.setOverlaysWebView({ overlay: false })
      await StatusBar.setStyle({ style: Style.Dark })
      await StatusBar.setBackgroundColor({ color: '#000000' })

      await StatusBar.getInfo()
    } catch (error) {
      // Optional: handle the error if needed
    }
  }
})
</script>

<template lang="pug">
q-layout(view="hhh LpR lFf")
  .status-bar-spacer

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
          img(:src="`${publicFolder}/ACompas-4-logo.png`" alt="A Compás icon", width="40")
        img(:src="`${publicFolder}/ACompas-4-name.png`" alt="A Compás name title", height="30").q-mt-xs.q-ml-sm

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

  q-page-container#appMain.text-info
    q-resize-observer(
      debounce="10",
      @resize="onResize"
    )
    router-view(v-slot="{ Component, route }")
      Transition(name="fade", mode="out-in")
        component(:is="Component", :key="route.fullPath")
</template>

<style>

:root {
  --status-bar-height: 0px;
}

body.capacitor-android,
.capacitor-android {
  --status-bar-height: 24px !important;
}

.status-bar-spacer {
  height: 0;
  background-color: #000000;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 6001;
  display: none;
}

body.capacitor-android .status-bar-spacer,
.capacitor-android .status-bar-spacer {
  height: var(--status-bar-height) !important;
  display: block !important;
}

body.capacitor-android .q-header,
.capacitor-android .q-header {
  top: var(--status-bar-height) !important;
  z-index: 6000;
}

@supports (padding-top: env(safe-area-inset-top)) {
  body.capacitor-android,
  .capacitor-android {
    --status-bar-height: env(safe-area-inset-top) !important;
  }
}

body.capacitor-android .q-page-container,
.capacitor-android .q-page-container {
  padding-top: var(--status-bar-height) !important;
}

body:not(.capacitor-android) .status-bar-spacer {
  display: none !important;
}
</style>
