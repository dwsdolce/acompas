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
      router-view
</template>

<script>
import { openURL } from 'quasar'
import SideMenu from 'components/SideMenu'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.screen.gt.md
    }
  },
  methods: {
    openURL
  },
  components: {
    SideMenu
  }
}
</script>

<style>
</style>
