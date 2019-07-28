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
  async created () {
    this.audioContext = await initMetronome(this.$store)
  },
  mounted () {
    document.addEventListener('keypress', event => {
      if (event.which === 32) {
        this.playStop()
      }
    })
    StartAudioContext(getContext, '#playBtn').then(async () => {
      this.audioContextState = await initMetronome(this.$store)
      if (this.audioContextState === 'running') this.startAudioContext()
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
