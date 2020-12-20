<template lang="pug">
.column.wrap.content-center
  .flex.justify-center.q-gutter-md
    q-btn(
      v-for="note in notes",
      :ref="note",
      :key="note"
      :class="[ 'tuning-btn', `${note}`, activeNote === note ? 'active' : '' ]"
      @click="playSynth(note)"
    ) {{ note }}
  .flex.justify-center.q-gutter-md.q-mt-md
    div
      p.caption Play all
      q-btn(
        flat,
        round,
        :icon="isPlaying ? 'stop' : 'play_arrow'",
        @click="isPlaying ? stopLoop() : playLoop()"
      )
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { TuningForkPlayNote } from '../plugins/metronome'

export default {
  computed: {
    ...mapState({
      notes: state => state.tuningFork.notes,
      isPlaying: state => state.tuningFork.isPlaying,
      activeNote: state => state.tuningFork.activeNote
    })
  },
  methods: {
    ...mapMutations({
      playLoop: 'TUNING_FORK_PLAY',
      stopLoop: 'TUNING_FORK_STOP'
    }),
    playSynth (note) {
      TuningForkPlayNote(note)
    }
  }
}
</script>

<style lang="stylus" scoped>
.tuning-btn
  border 1px solid black
  background transparent
  &.active
    background rgba(0, 0, 0, 0.15)
</style>
