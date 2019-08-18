<template lang="pug">
div
  q-list(no-border, link, separator)
    q-item(clickable, v-ripple, @click="launch('https://play.google.com/store/apps/details?id=audio.acompas.app')")
      q-item-section(avatar)
        q-icon(name="android")
      q-item-section Get the Android app
    q-item#helpQItem(clickable, v-ripple, @click="helpDialog = true")
      q-item-section(avatar)
        q-icon(name="help")
      q-item-section Help
    q-item(clickable, v-ripple, @click="launch('https://gitlab.com/oricordeau/acompas')")
      q-item-section(avatar)
        q-icon(name="code")
      q-item-section Source code
    q-item(clickable, v-ripple, @click="launch('https://gitlab.com/oricordeau/acompas/issues')")
      q-item-section(avatar)
        q-icon(name="bug_report")
      q-item-section Issues
    q-expansion-item(icon="share", label="Share")
      q-list(no-border, link, inset-separator)
        q-item(clickable, v-ripple, @click="launch('https://www.facebook.com/sharer/sharer.php?u=https://acompas.org')")
          q-item-section(avatar)
            q-icon(name="ion-logo-facebook")
          q-item-section Share on Facebook
        q-item(clickable, v-ripple, @click="launch('https://twitter.com/share?url=https://acompas.org')")
          q-item-section(avatar)
            q-icon(name="ion-logo-twitter")
          q-item-section Share on Twitter
    q-item#tuningForkQItem(clickable, v-ripple, @click="tuningDialog = true")
      q-item-section(avatar)
        q-icon(name="hearing")
      q-item-section Tuning fork
  q-dialog#helpDialog(v-model="helpDialog")
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Help
      q-card-section
        div
          p: b Palo
          p Use this button to select the flamenco rhythm that you want.
        div
          p: b Instruments mixer
          p Access the mixer. Select playing instruments, set its own relative volume, and wether playing eighth notes.
        div
          p: b Improvise
          p If it is on, then random improvised sound events will be added to the sound patterns.
        div
          p: b Humanize
          p If it is on, then random little time variations are applied to the sounds.
        div
          p: b Tempo
          p Three ways to define tempo: the knob circle, input underneath for more precise setting, increment bpm with + and - buttons.
        div
          p: b View mode
          p Choose between dots and counter visualisation.
      q-card-section(align="center")
        q-btn#closeHelpBtn(
          color="primary",
          v-close-popup
        ) Close
  q-dialog#tuningDialog(v-model="tuningDialog")
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Tuning fork
      q-card-section
        tuning-fork
      q-card-section(align="center")
        q-btn(
          color="primary",
          v-close-popup
        ) Close
</template>

<script>
import { openURL, Platform } from 'quasar'
import TuningFork from 'components/TuningFork'

export default {
  components: { TuningFork },
  methods: {
    launch (url) {
      if (Platform.is.cordova) {
        cordova.InAppBrowser.open(url, '_system')
        return
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
