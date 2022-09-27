<script setup lang="ts">
  import { watch, ref } from 'vue'
  import { openURL, Platform } from 'quasar'
  import { storeToRefs } from 'pinia'
  import { useRouter } from 'vue-router'
  import TuningFork from 'src/components/TuningFork.vue'
  import { useTuningForkStore } from 'src/stores/tuning-fork'
  import { useSessionStore } from 'src/stores/session'

  const helpDialog = ref(false)
  const tuningDialog = ref(false)
  const shortcutsDialog = ref(false)
  const router = useRouter()
  const sessionStore = useSessionStore()

  const {
    trackVisits,
    privacyDialogOpen
  } = storeToRefs(sessionStore)

  const {
    toggleTrackVisits,
    enableTrackVisits,
    enableTrackingChosen,
    openPrivacyDialog,
    closePrivacyDialog,
    toggleDialog
  } = sessionStore

  const tuningForkStore = useTuningForkStore()

  const {
    stop
  } = tuningForkStore

  const launch = (url: string) => {
    // if (Platform.is.cordova) {
    //   cordova.InAppBrowser.open(url, '_system')
    //   return
    // }
    openURL(url)
  }

  watch(tuningDialog, (value: boolean) => {
    if (!value) tuningForkStore.stop()
  })
</script>

<template lang="pug">
div
  q-list(no-border, link, separator)
    q-item(id="helpQItem", clickable, v-ripple, @click="helpDialog = true")
      q-item-section(avatar)
        q-icon(name="help")
      q-item-section Help
    q-item(id="tuningForkQItem", clickable, v-ripple, @click="tuningDialog = true")
      q-item-section(avatar)
        q-icon(name="hearing")
      q-item-section Tuning fork
    q-item(clickable, v-ripple, @click="shortcutsDialog = true")
      q-item-section(avatar)
        q-icon(name="keyboard")
      q-item-section Shortcuts
    q-item(id="privacyQItem", clickable, v-ripple, @click="openPrivacyDialog()")
      q-item-section(avatar)
        q-icon(name="person")
      q-item-section Privacy
    q-item(clickable, v-ripple, @click="launch('https://play.google.com/store/apps/details?id=audio.acompas.app')")
      q-item-section(avatar)
        q-icon(name="android")
      q-item-section Get the Android app
    q-expansion-item(icon="public", label="Follow")
      q-list(no-border, link, inset-separator)
        q-item(clickable, v-ripple, @click="launch('https://www.facebook.com/acompas.org/')")
          q-item-section(avatar)
            q-icon(name="ion-logo-facebook")
          q-item-section Facebook
        q-item(clickable, v-ripple, @click="launch('https://twitter.com/acompas_org')")
          q-item-section(avatar)
            q-icon(name="ion-logo-twitter")
          q-item-section Twitter
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
    q-item(clickable, v-ripple, @click="launch('https://gitlab.com/acompas/acompas')")
      q-item-section(avatar)
        q-icon(name="code")
      q-item-section Source code
    q-item(clickable, v-ripple, @click="launch('https://gitlab.com/acompas/acompas/issues')")
      q-item-section(avatar)
        q-icon(name="bug_report")
      q-item-section Issues
    q-item(clickable, v-ripple, @click="router.push('/privacy')")
      q-item-section(avatar)
        q-icon(name="security")
      q-item-section Privacy policy
  q-dialog(id="helpDialog", v-model="helpDialog", @show="toggleDialog(true)", @hide="toggleDialog(false)")
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Help
      q-card-section
        div
          p: b Palo
          p Use this button to select the flamenco rhythm that you want.
        div
          p: b Pre-count
          p Optionaly define a number of beats to use as pre-count for the selected palo.
        div
          p: b Start beat
          p Optionaly change the start beat for the selected palo.
        div
          p: b Improvise
          p If it is on, then sometimes the metronome will stop sticking to the pre-programmed pattern and play random patterns for one or more instrument(s).
        div
          p: b Swing
          p If its value is 0, the eighth note is exactly half a quarter note. When it approaches to 1, a lag is applied, for a "jazz-like" rhythm flavour.
        div
          p: b Humanize
          p If it is on, then random little time variations are applied to the sounds. The result is a bit more realistic.
        div
          p: b Tempo
          p There are 2 ways to define the tempo: the knob circle, and you can decrement/increment the bpm with the + and - buttons.
        div
          p: b Instruments mixer
          p Access the mixer. Select playing instruments, set its own relative volume, and wether playing quarter notes or eighth notes.
        div
          p: b View mode
          p Choose between dots, counter and clock visualisations.
        div
          p: b Reset
          p Reset the metronome's settings to the default values. You can reset all settings or reset settings for the current palo.
      q-card-section(align="center")
        q-btn(
          id="closeHelpBtn",
          color="primary",
          v-close-popup
        ) Close
  q-dialog(id="privacyDialog", :value="privacyDialogOpen", @show="toggleDialog(true)", @hide="toggleDialog(false)")
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Privacy
      q-card-section
        div
          div
            p.q-mb-sm: b Allow this app to send us some anonymised usage data ?
            q-toggle(
              id="toggleTrackVisits",
              :model-value="trackVisits",
              @update:model-value="toggleTrackVisits"
              ).primary
            p We collect that data to have an idea about how many users we have. We don't sell or give access to this data to anyone else. You can enable or disable this feature when you want to.
      q-card-section(align="center")
        q-btn(
          id="enableAndClosePrivacyDialogBtn",
          color="primary",
          v-close-popup,
          @click="enableTrackVisits(); enableTrackingChosen(); closePrivacyDialog()"
        ).q-mr-sm Enable &amp; close
        q-btn(
          id="closePrivacyDialogBtn",
          color="secondary",
          v-close-popup,
          @click="enableTrackingChosen(); closePrivacyDialog()"
        ) Close
  q-dialog(id="tuningDialog", v-model="tuningDialog", @show="toggleDialog(true)", @hide="toggleDialog(false)")
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Tuning fork
      q-card-section
        tuning-fork
      q-card-section(align="center")
        q-btn(
          id="closeTuningDialogBtn",
          color="primary",
          v-close-popup
        ) Close
  q-dialog(id="shortcutsDialog", v-model="shortcutsDialog", @show="toggleDialog(true)", @hide="toggleDialog(false)")
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Shortcuts
      q-card-section
        q-markup-table(flat)
          tbody
            tr
              td.text-right
                kbd Space
              td.text-left
                | Start / Stop metronome
            tr
              td.text-right
                kbd Up
              td.text-left
                | Tempo + 1
            tr
              td.text-right
                kbd Down
              td.text-left
                | Tempo - 1
            tr
              td.text-right
                kbd Alt
                | +
                kbd Up
              td.text-left
                | Tempo + 5
            tr
              td.text-right
                kbd Alt
                | +
                kbd Down
              td.text-left
                | Tempo - 5
            tr
              td.text-right
                kbd Shift
                | +
                kbd Up
              td.text-left
                | Tempo + 10
            tr
              td.text-right
                kbd Shift
                | +
                kbd Down
              td.text-left
                | Tempo - 10
            tr
              td.text-right
                kbd Esc
              td.text-left
                | Close dialog
            tr
              td.text-right
                kbd Tab
              td.text-left
                | Change focus button
      q-card-section(align="center")
        q-btn(
          id="closeShortcutsDialogBtn",
          color="primary",
          v-close-popup
        ) Close
</template>

<style lang="sass">
kbd
  background-color: lightgray
  padding: 3px 8px
  margin: 3px
  border-radius: 4px
  text-shadow: 1px 1px 0 white
</style>
