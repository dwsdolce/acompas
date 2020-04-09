<template>
  <q-page class="flex bg-grey-10 full-width">
    <AppMain id="appMain" />
  </q-page>
</template>

<style>
</style>

<script>
import AppMain from '../components/AppMain'

export default {
  name: 'PageIndex',
  components: {
    AppMain
  }
}
</script>

<style lang="stylus" scoped>
.q-page
  align-items: center
  #appMain
    .screen--xs &
      padding: 2px;
</style>
