<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { Screen, Platform } from 'quasar'
import { storeToRefs } from 'pinia'
import LeftDrawer from 'src/components/LeftDrawer.vue'
import { useSessionStore } from 'src/stores/session'
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
        q-icon(name="menu")
      q-toolbar-title
        router-link(to="/").flex.items-center
          img(src="~assets/app-icon.png" alt="A Compás icon" width="40").q-mr-sm
          img(src="~assets/app-name.png" alt="A Compás name title" width="90").q-mt-sm
      //- q-space
      .text-weight-light v{{ appVersion }}

  q-drawer(
    bordered,
    v-model="leftDrawerOpen",
    content-class="bg-grey-2",
    :breakpoint="1439"
  )
    left-drawer

  q-page-container.text-info
    q-resize-observer(
      debounce="10",
      @resize="onResize"
    )
    router-view(v-slot="{ Component, route }")
      Transition(name="fade", mode="out-in")
        component#appMain(:is="Component", :key="route.name")
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
