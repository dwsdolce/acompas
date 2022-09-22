<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { Screen } from 'quasar'
import LeftDrawer from 'src/components/LeftDrawer.vue'

const leftDrawerOpen: Ref<boolean> = ref(Screen.gt.md)
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
        img(:src="'AClogo.png'" alt="A Compás").q-my-auto
      q-space
      .text-weight-light Version 3.0

  q-drawer(
    bordered,
    v-model="leftDrawerOpen",
    content-class="bg-grey-2",
    :breakpoint="1439"
  )
    left-drawer(id="sideMenu")

  q-page-container.bg-dark.text-info
    #appMain
      router-view
    //- app-main(id="appMain")
</template>
