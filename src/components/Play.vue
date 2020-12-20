<template lang="pug">
q-btn#playBtn(
  ref="playBtn"
  round,
  size="22px",
  color="primary",
  :icon="isPlaying ? 'stop' : 'play_arrow'",
  @click="playStop"
)
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      audioContextState: null
    }
  },
  computed: {
    ...mapState({
      isPlaying: state => state.isPlaying
    })
  },
  methods: {
    ...mapActions([
      'playStop'
    ])
  }
}
</script>
