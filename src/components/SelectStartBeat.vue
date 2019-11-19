<template lang="pug">
div
  p.caption.q-mb-sm Start beat
  q-btn#startBeatBtn(
    outline,
    color="white",
    @click="startBeatDialog = true"
  ) {{ selectedStartBeatLabel }}
  q-dialog#startBeatDialog(v-model="startBeatDialog")
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Start beat
      q-card-section
        q-option-group(
          type="radio",
          color="primary",
          :value="selectedStartBeat",
          :options="startBeats",
          @input="onSelectedStartBeat"
        )
      q-card-section(align="center")
        q-btn#closeStartBeatDialogBtn(
          color="primary",
          v-close-popup
        ) Close
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { forEachValue } from '../assets/utils'

export default {
  data () {
    return {
      startBeatDialog: false
    }
  },
  computed: {
    ...mapState({
      startBeats: state => state.startBeats,
      selectedStartBeat: state => state.selectedStartBeat.value,
      selectedStartBeatLabel: state => state.selectedStartBeat.label
    })
  },
  methods: {
    ...mapActions([
      'selectStartBeat'
    ]),
    onSelectedStartBeat (v) {
      forEachValue(this.$store.state.startBeats, (startBeat, key) => {
        if (startBeat.value === v) {
          this.selectStartBeat(startBeat)
        }
      })
      this.startBeatDialog = false
    }
  }
}
</script>

<style lang="stylus">
#startBeatBtn .q-btn__content
  text-transform: none
.q-option-group > div
  padding 0
  .q-radio__inner
    padding: 0px
</style>
