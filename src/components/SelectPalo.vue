<template lang="pug">
div
  p.caption.q-mb-sm Palo
  q-btn#paloBtn(
    outline,
    color="white",
    @click="palosDialog = true"
  ) {{ selectedPaloLabel }}
  q-dialog#palosDialog(v-model="palosDialog")
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Please select a palo
      q-card-section
        q-option-group(
          type="radio",
          color="primary",
          :value="selectedPalo",
          :options="palos",
          @input="onSelectedPalo"
        )
      q-card-section(align="center")
        q-btn#closePalosDialogBtn(
          color="primary",
          v-close-popup
        ) Close
  q-btn#paloHelpBtn(
    round,
    size="14px",
    icon="help",
    @click="paloHelpDialog = true"
  )
  q-dialog#paloHelpDialog(v-model="paloHelpDialog")
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center {{ selectedPaloLongLabel }}
        p {{ selectedPaloDoc }}
        p {{ selectedPaloCities }}
        p Wikipedia article : #[q-btn(round, icon="link", @click="launch(selectedPaloWikipediaUrl)")]
        p Example video : #[q-btn(round, icon="link", @click="launch(selectedPaloVideoExample)")]
      q-card-section(align="center")
        q-btn#closePaloHelpDialogBtn(
          color="primary",
          v-close-popup
        ) Close
</template>

<script>
import { openURL, Platform } from 'quasar'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      palosDialog: false,
      paloHelpDialog: false
    }
  },
  computed: {
    ...mapState({
      palos: state => state.palos,
      selectedPalo: state => state.selectedPalo.value,
      selectedPaloLabel: state => state.selectedPalo.label,
      selectedPaloLongLabel: state => state.selectedPalo.longLabel,
      selectedPaloDoc: state => state.selectedPalo.doc,
      selectedPaloCities: state => (state.selectedPalo.cities ? 'Cities : ' + state.selectedPalo.cities : ''),
      selectedPaloWikipediaUrl: state => state.selectedPalo.wikipediaUrl,
      selectedPaloVideoExample: state => state.selectedPalo.videoExample
    })
  },
  methods: {
    ...mapActions([
      'selectPalo'
    ]),
    onSelectedPalo (v) {
      this.selectPalo(v)
      this.palosDialog = false
    },
    launch (url) {
      if (Platform.is.cordova) {
        cordova.InAppBrowser.open(url, '_system')
        return
      }
      openURL(url)
    }
  }
}
</script>

<style lang="stylus">
#paloBtn .q-btn__content
  text-transform: none
#paloHelpBtn
  margin-left: 4px
.q-option-group > div
  padding 0.2rem 0
</style>
