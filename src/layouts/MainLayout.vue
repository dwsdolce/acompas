<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Screen, Platform } from 'quasar'
import { storeToRefs } from 'pinia'
import LeftDrawer from 'src/components/LeftDrawer.vue'
import SelectContext from 'src/components/SelectContext.vue'
import SelectSettings from 'src/components/SelectSettings.vue'
import { useSessionStore } from 'src/stores/session'
import type { Ref } from 'vue'
import type { Size } from 'src/utils/types'

const sessionStore = useSessionStore()

const { setVisualizationSize } = sessionStore

const leftDrawerOpen: Ref<boolean> = ref(Screen.gt.md)

Screen.setSizes({ sm: 500, md: 650, lg: 1000, xl: 2000 })

const appVersion = process.env.APP_VERSION?.valueOf() || '3'

const onResize = (size: Size) => {
  setVisualizationSize(size)
}
</script>

<template lang="pug">
q-layout(view="hhh LpR lFf")
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
      ).row.items-center.no-wrap.q-gutter-sm
        q-avatar(size="40px").shadow-1
          img(src="~assets/ACompas-4-logo.png" alt="A Compás icon", width="40")
        img(src="~assets/ACompas-4-name.png" alt="A Compás name title", height="30").q-mt-sm.q-ml-md

      q-space
      SelectContext
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
        component(:is="Component", :key="route.name")
</template>

<style lang="sass">
.q-electron-drag
  background: transparent

#appMain
  // overflow: hidden
  background: linear-gradient(to bottom, rgb(25, 25, 25) 0%, rgb(35, 35, 35) 35%, rgb(35, 35, 35) 65%, rgb(25, 25, 25) 99%)

.fade-enter-active,
.fade-leave-active
  transition: opacity 0.5s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0
</style>
