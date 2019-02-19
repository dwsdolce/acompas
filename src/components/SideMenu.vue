<template lang="pug">
div
  q-list(no-border, link, separator)
    q-item(clickable, v-ripple, @click="launch('https://play.google.com/store/apps/details?id=audio.acompas.app')")
      q-item-section(avatar)
        q-icon(name="ion-android")
      q-item-section Get the Android app
    q-item(clickable, v-ripple, @click="helpDialog = true")
      q-item-section(avatar)
        q-icon(name="ion-information-circled")
      q-item-section Help
    q-item(clickable, v-ripple, @click="launch('https://gitlab.com/oricordeau/acompas')")
      q-item-section(avatar)
        q-icon(name="ion-code")
      q-item-section Source code
    q-item(clickable, v-ripple, @click="launch('https://gitlab.com/oricordeau/acompas/issues')")
      q-item-section(avatar)
        q-icon(name="ion-bug")
      q-item-section Issues
    q-expansion-item(icon="ion-share", label="Share")
      q-list(no-border, link, inset-separator)
        q-item(clickable, v-ripple, @click="launch('https://www.facebook.com/sharer/sharer.php?u=http://acompas.org')")
          q-item-section(avatar)
            q-icon(name="ion-social-facebook")
          q-item-section Share on Facebook
        q-item(clickable, v-ripple, @click="launch('https://twitter.com/share?url=http://acompas.org')")
          q-item-section(avatar)
            q-icon(name="ion-social-twitter")
          q-item-section Share on Twitter
        q-item(clickable, v-ripple, @click="launch('https://plus.google.com/share?url=http://acompas.org')")
          q-item-section(avatar)
            q-icon(name="ion-social-googleplus")
          q-item-section Share on Google +
    q-item(clickable, v-ripple, @click="tuningDialog = true")
      q-item-section(avatar)
        q-icon(name="ion-wrench")
      q-item-section Tuning fork
  q-dialog(v-model="helpDialog")
    q-card
      q-card-section
        h5(class="text-h5") Help
        div
          p: b Palo
          p Use this button to select the flamenco rhythm that you want.
        div
          p: b Eighth-notes
          p If it is off, then only the up-beats are played. If it is on, then up and down beats are played.
        div
          p: b Improvise
          p If it is on, then random improvised sound events will be added to the sound patterns.
        div
          p: b Humanize
          p If it is on, then random time variations are applied to the sounds.
        q-btn(
          color="primary",
          @click="helpDialog = false"
        ).float-right Close
  q-dialog(v-model="tuningDialog")
    h5(class="text-h5") Tuning fork
    tuning-fork
    q-btn(
      color="primary",
      @click="tuningDialog = false"
    ).float-right Close
</template>

<script>
import {
  QList, QItem, QItemSection, QExpansionItem, QDialog, QBtn, QCard, QCardSection, openURL, Platform
} from 'quasar'
import TuningFork from 'components/TuningFork'

export default {
  components: { QList, QItem, QItemSection, QExpansionItem, QDialog, QBtn, QCard, QCardSection, TuningFork },
  methods: {
    launch (url) {
      if (Platform.is.cordova) {
        cordova.InAppBrowser.open(url, '_system')
      }
      openURL(url)
    }
  },
  data () {
    return {
      helpDialog: false,
      tuningDialog: false
    }
  }
}
</script>
