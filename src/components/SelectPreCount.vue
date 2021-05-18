<template lang="pug">
div
  p.caption Pre-count
  q-btn#preCountBtn(
    outline,
    color="white",
    :padding="$q.screen.lt.md ? 'sm' : 'md'",
    @click="preCountDialog = true"
  ) {{ selectedPreCountLabel }}
  q-dialog#preCountDialog(v-model="preCountDialog", @show="toggleDialog(true)", @hide="toggleDialog(false)")
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Number of pre-count beats
      q-card-section
        q-option-group(
          type="radio",
          color="primary",
          :value="selectedPreCount",
          :options="preCounts",
          @input="onSelectedPreCount"
        )
      q-card-section(align="center")
        q-btn#closePreCountDialogBtn(
          color="primary",
          v-close-popup
        ) Close
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { forEachValue } from '../assets/utils'

export default {
  data () {
    return {
      preCountDialog: false
    }
  },
  computed: {
    ...mapState({
      preCounts: state => state.preCounts,
      selectedPreCount: state => state.selectedPreCount.value,
      selectedPreCountLabel: state => state.selectedPreCount.label
    })
  },
  methods: {
    ...mapMutations({
      toggleDialog: 'TOGGLE_DIALOG'
    }),
    ...mapActions([
      'selectPreCount'
    ]),
    onSelectedPreCount (v) {
      forEachValue(this.$store.state.preCounts, (preCount, key) => {
        if (preCount.value === v) {
          this.selectPreCount(preCount)
        }
      })
      this.preCountDialog = false
    }
  }
}
</script>
