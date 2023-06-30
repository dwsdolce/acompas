import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useTuningFork } from 'src/composables/tuning-fork'

export const useTuningForkStore = defineStore('tuning-fork', () => {
  const {
    activeNote,
    initTuningFork,
    playNote,
    startSequence,
    stopSequence,
    changeNote
  } = useTuningFork()

  const isPlaying = ref<boolean>(false)
  const notes = ref<string[]>(['E2', 'A2', 'D3', 'G3', 'B3', 'E4'])

  const init = () => {
    initTuningFork()
  }

  const play = (note?: string) => {
    if (note) {
      playNote(note)
    } else {
      startSequence()
      isPlaying.value = true
    }
  }

  const stop = () => {
    stopSequence()
    isPlaying.value = false
  }

  // const changeNote = (payload: string | null) => {
  //   activeNote.value = payload
  // }

  return {
    isPlaying,
    notes,
    activeNote,
    init,
    play,
    stop,
    changeNote
  }
})
