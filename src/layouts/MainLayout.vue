<template lang="pug">
  q-layout(view="hHh Lpr lFf")
    q-header
      q-toolbar
        q-btn#menuBtn(
          flat,
          dense,
          round,
          @click="leftDrawerOpen = !leftDrawerOpen",
          aria-label="Menu"
        )
          q-icon(name="menu")

        q-toolbar-title
          img(:src="'AClogo.png'" alt="A Compás" style="margin-top: 6px;")

    q-drawer(
      bordered,
      v-model="leftDrawerOpen",
      content-class="bg-grey-2",
      :breakpoint="1439"
    )
      side-menu#sideMenu

    q-page-container
      q-page.flex.bg-grey-10.full-width.full-height.items-center
        app-main#appMain
</template>

<script>
import { openURL } from 'quasar'
import SideMenu from 'components/SideMenu'
import AppMain from '../components/AppMain'

export default {
  name: 'MainLayout',
  components: {
    SideMenu,
    AppMain
  },
  data () {
    return {
      leftDrawerOpen: this.$q.screen.gt.md
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
