<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import palosData from 'src/data/palosData'
import { usePaloStore } from 'src/stores/palo'
import { useSessionStore } from 'src/stores/session'
import { forEachValue } from 'src/composables/utils'
import type { numOpts } from 'src/composables/models'

const route = useRoute()

const paloData = palosData.find(palo => palo.value === route.name)

const paloStore = usePaloStore(route.name as string)()
const sessionStore = useSessionStore()

const $q = useQuasar()

const preCountDialog = ref(false)

const { palo } = storeToRefs(paloStore)

const {
  selectPreCount
} = paloStore

const {
  toggleDialog
} = sessionStore

// const onSelectedPreCount = (v: number) => {
//   forEachValue(paloData?.preCounts, (preCount: numOpts, key: number) => {
//     if (preCount.value === v) {
//       selectPreCount(preCount)
//     }
//   })
//   preCountDialog.value = false
// }
</script>

<template lang="pug">
.text-center.q-mx-md
  //- p.caption Pre-count
  q-btn(
    id="preCountBtn",
    outline,
    :padding="$q.screen.lt.md ? 'sm' : 'md'",
    :label="`Precount : ${palo.selectedPreCount?.label}`",
    @click="preCountDialog = true"
  ).lonely-btn
  q-dialog(
    id="preCountDialog",
    v-model="preCountDialog",
    @show="toggleDialog(true)",
    @hide="toggleDialog(false)"
  )
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Number of pre-count beats
        p.q-my-sm Plays a click for the defined number of beats before the metronome starts.
        p.q-my-sm How many beats of {{ paloData?.label }} do you want to be played ?
        q-option-group(
          type="radio",
          color="primary",
          :model-value="palo.selectedPreCount.value",
          @update:model-value="selectPreCount($event)"
          :options="paloData?.preCounts"
        )
      q-card-section(align="center")
        q-btn(
          id="closePreCountDialogBtn",
          color="primary",
          v-close-popup
        ) OK
</template>
