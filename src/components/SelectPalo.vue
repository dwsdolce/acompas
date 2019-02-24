<template lang="pug">
div
  b Palo
  br
  q-btn(
    outline,
    color="white",
    @click="palosDialog = true"
  ) {{ selectedPaloLabel }}
  q-dialog(v-model="palosDialog")
    q-card
      q-card-section
        b Please select a palo
      q-card-section
        q-option-group(
          type="radio",
          color="primary",
          :value="selectedPalo",
          :options="palos",
          @input="selectPalo",
          @change="palosDialog = false"
        )
      q-card-actions(align="right")
        q-btn(
          color="primary",
          v-close-dialog
        ) Close
  br
  br
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
  QBtn,
  QDialog,
  QCard,
  QCardSection,
  QOptionGroup
} from 'quasar'

export default {
  components: { QBtn, QDialog, QOptionGroup, QCard, QCardSection },
  computed: {
    ...mapState({
      palos: state => state.palos,
      selectedPalo: state => state.selectedPalo.value,
      selectedPaloLabel: state => state.selectedPalo.label
    })
  },
  methods: {
    ...mapActions([
      'selectPalo'
    ])
  },
  data () {
    return {
      palosDialog: false
    }
  }
}
</script>

<style lang="stylus">
.q-option-group > div
  padding 0.2rem 0
</style>
