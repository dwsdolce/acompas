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
div
  p.caption Pre-count
  q-btn(
    id="preCountBtn",
    outline,
    color="white",
    :padding="$q.screen.lt.md ? 'sm' : 'md'",
    @click="preCountDialog = true"
  ) {{ palo.selectedPreCount?.label }}
  q-dialog(
    id="preCountDialog",
    v-model="preCountDialog",
    @show="toggleDialog(true)",
    @hide="toggleDialog(false)"
  )
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Number of pre-count beats
      q-card-section
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
        ) Close
</template>
