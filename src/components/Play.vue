<template lang="pug">
q-btn#playBtn(
  ref="playBtn"
  round,
  color="primary",
  :icon="isPlaying ? 'stop' : 'play_arrow'",
  @click="playStop"
).mt
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { QBtn, QIcon } from 'quasar'
import { getContext, initMetronome } from '../plugins/metronome'
import StartAudioContext from 'startaudiocontext'

export default {
  components: { QBtn, QIcon },
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
