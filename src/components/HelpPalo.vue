<template lang="pug">
span.q-ml-sm
  q-btn#paloHelpBtn(
    dense,
    round,
    flat,
    size="10px",
    padding="none",
    icon="help",
    @click="paloHelpDialog = true"
  )
  q-dialog#paloHelpDialog(v-model="paloHelpDialog")
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center {{ selectedPaloLongLabel }}
        div(v-html="selectedPaloDoc")
        p {{ selectedPaloPlaces }}
        p(v-if="selectedPaloWikipediaUrl") Wikipedia article : #[q-btn(round, icon="link", @click="launch(selectedPaloWikipediaUrl)")]
        p(v-if="selectedPaloVideoExample") Example video : #[q-btn(round, icon="link", @click="launch(selectedPaloVideoExample)")]
      q-card-section(align="center")
        q-btn#closePaloHelpDialogBtn(
          color="primary",
          v-close-popup
        ) Close
</template>

<script>
import { openURL, Platform } from 'quasar'
import { mapState } from 'vuex'

export default {
  props: [ 'palo' ],
  data () {
    return {
      paloHelpDialog: false
    }
  },
  computed: {
    ...mapState({
      palos: state => state.palos,
      selectedPalo (state) { return state.palos.find(palo => palo.value === this.palo) },
      selectedPaloLabel (state) { return this.selectedPalo.label },
      selectedPaloLongLabel (state) { return this.selectedPalo.longLabel },
      selectedPaloDoc (state) { return this.selectedPalo.doc },
      selectedPaloPlaces (state) { return this.selectedPalo.places ? 'Places : ' + this.selectedPalo.places : '' },
      selectedPaloWikipediaUrl (state) { return this.selectedPalo.wikipediaUrl },
      selectedPaloVideoExample (state) { return this.selectedPalo.videoExample }
    })
  },
  methods: {
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
