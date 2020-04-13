<template lang="pug">
div
  p.caption Palo
    help-palo(:palo="selectedPalo")
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
</template>

<script>
import { mapState, mapActions } from 'vuex'
import HelpPalo from './HelpPalo'

export default {
  components: { HelpPalo },
  data () {
    return {
      palosDialog: false
    }
  },
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
    ]),
    onSelectedPalo (v) {
      this.selectPalo(v)
      this.palosDialog = false
    }
  }
}
</script>
