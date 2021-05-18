<template lang="pug">
  q-dialog(v-model="dialogOpen")
    q-card(style="width: 100%;")
      q-card-section
        slot(name="header")
      q-card-section
        slot(name="main")
      q-card-section(align="center")
        slot(name="footer")
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    dialogOpen: {
      get () {
        return this.$store.state.dialogOpen
      },
      set (value) {
        console.log(value)
        if (value) {
          this.$store.commit('OPEN_DIALOG')
        } else {
          this.$store.commit('CLOSE_DIALOG')
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      toggleDialog: 'TOGGLE_DIALOG'
    })
  }
}
</script>
