<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import { usePaloStore } from 'src/stores/palo'
import { useSessionStore } from 'src/stores/session'
import InstrumentMixer from 'src/components/InstrumentMixer.vue'
import SelectDecay from 'src/components/SelectDecay.vue'

const route = useRoute()

const paloStore = usePaloStore(route.name as string)()
const sessionStore = useSessionStore()

const $q = useQuasar()

const instrumentsDialog = ref(false)

const {
  palo
} = storeToRefs(paloStore)

const {
  toggleDialog
} = sessionStore

// watch(selectedInstruments, (value) => {
//   if (!value.length) {
//     $q.notify({
//       message: 'No instrument is selected. You will have no sound in the metronome ...',
//       color: 'secondary',
//       icon: 'warning'
//     })
//   }
// })
</script>

<template lang="pug">
div
  //- p.caption Mixer
  q-btn(
    id="mixerBtn",
    outline,
    icon="tune",
    :padding="$q.screen.lt.md ? 'sm' : 'md'",
    label="Mixer",
    @click="instrumentsDialog = true"
  )
  q-dialog(
    id="mixerDialog",
    v-model="instrumentsDialog",
    @show="toggleDialog(true)",
    @hide="toggleDialog(false)"
  )
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Instruments mixer
      q-card-section
        select-decay
      q-card-section
        table(style="width: 100%;").q-table
          thead
            tr
              th.text-center Active
              th.text-center 8th
              th.text-center Volume (db)
          tbody
            instrument-mixer(
              v-for="instrument in palo.instruments",
              :key="instrument.value",
              :slug="instrument.value"
            )
      q-card-section(align="center")
        q-btn(
          id="closeMixerDialogBtn",
          color="primary",
          v-close-popup
        ) Close
</template>
