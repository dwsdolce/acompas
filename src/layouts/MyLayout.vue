<template lang="pug">
  q-layout(view="hHh Lpr lFf")
    q-header(elevated)
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
          img(:src="'statics/AClogo.png'" alt="A Compás" style="margin-top: 6px;")

    q-drawer(
      v-model="leftDrawerOpen",
      bordered,
      content-class="bg-grey-2"
    )
      SideMenu#sideMenu

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
      leftDrawerOpen: this.$q.screen.gt.lg
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
