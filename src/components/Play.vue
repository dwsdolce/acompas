<template lang="pug">
q-btn#playBtn(
  ref="playBtn"
  round,
  size="18px",
  color="primary",
  :icon="isPlaying ? 'stop' : 'play_arrow'",
  @click="playStop"
)
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getContext, initMetronome } from '../plugins/metronome'
import StartAudioContext from 'startaudiocontext'

export default {
  computed: {
    ...mapState({
      isPlaying: state => state.isPlaying
    })
  },
  mounted () {
    document.addEventListener('keypress', event => {
      if (event.which === 32) {
        this.playStop()
      }
    })
    StartAudioContext(getContext, '#playBtn').then(() => {
      initMetronome(this.$store, (ctxState) => {
        if (ctxState === 'running') this.startAudioContext()
      })
    })
  },
  methods: {
    ...mapActions([
      'playStop',
      'startAudioContext'
    ])
  }
}
</script>
