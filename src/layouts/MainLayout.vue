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
  console.log('Platform:', Capacitor.getPlatform())
  console.log('isNativePlatform:', Capacitor.isNativePlatform())
  console.log('Body classes before:', document.body.className)

  // Forcer l'ajout de la classe Android
  if (Capacitor.getPlatform() === 'android') {
    document.body.classList.add('capacitor-android')
    console.log('Added capacitor-android class manually')
  }

  console.log('Body classes after:', document.body.className)

  if (Capacitor.isNativePlatform()) {
    try {
      // Configuration StatusBar pour éviter la superposition
      await StatusBar.setOverlaysWebView({ overlay: false })
      await StatusBar.setStyle({ style: Style.Dark })
      await StatusBar.setBackgroundColor({ color: '#000000' })

      // Vérifier la configuration
      const info = await StatusBar.getInfo()
      console.log('StatusBar info:', info)

      console.log('StatusBar configured successfully')
    } catch (error) {
      console.error('StatusBar configuration error:', error)
    }
  }

  // Debug CSS
  setTimeout(() => {
    const spacer = document.querySelector('.status-bar-spacer')
    const header = document.querySelector('.q-header')
    console.log('Spacer element:', spacer)
    console.log('Spacer computed height:', spacer ? getComputedStyle(spacer).height : 'not found')
    console.log('Header computed top:', header ? getComputedStyle(header).top : 'not found')
    console.log('CSS variable value:', getComputedStyle(document.documentElement).getPropertyValue('--status-bar-height'))
  }, 1000)
})
</script>

<template lang="pug">
q-layout(view="hhh LpR lFf")
  //- Spacer pour la status bar Android
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
/* Fix pour la status bar Android - Version renforcée */
:root {
  --status-bar-height: 0px;
}

/* Forcer la détection Android */
body.capacitor-android,
.capacitor-android {
  --status-bar-height: 24px !important;
}

/* Spacer pour la status bar - Plus spécifique */
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

/* Afficher le spacer sur Android uniquement */
body.capacitor-android .status-bar-spacer,
.capacitor-android .status-bar-spacer {
  height: var(--status-bar-height) !important;
  display: block !important;
}

/* Ajuster le header pour Android - Plus spécifique */
body.capacitor-android .q-header,
.capacitor-android .q-header {
  top: var(--status-bar-height) !important;
  z-index: 6000;
}

/* Support pour les appareils avec encoche */
@supports (padding-top: env(safe-area-inset-top)) {
  body.capacitor-android,
  .capacitor-android {
    --status-bar-height: env(safe-area-inset-top) !important;
  }
}

/* Alternative si le header ne bouge pas */
body.capacitor-android .q-page-container,
.capacitor-android .q-page-container {
  padding-top: var(--status-bar-height) !important;
}

/* Cacher explicitement sur web */
body:not(.capacitor-android) .status-bar-spacer {
  display: none !important;
}
</style>
