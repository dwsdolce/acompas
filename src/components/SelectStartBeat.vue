<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import palosData from 'src/data/palosData'
import { useCoreStore } from 'src/stores/core'
import { usePaloStore } from 'src/stores/palo'
import { useSessionStore } from 'src/stores/session'
import { forEachValue } from 'src/composables/utils'
import type { numOpts } from 'src/composables/models'

const route = useRoute()

const paloData = palosData.find(palo => palo.value === route.name)
const paloStore = usePaloStore(route.name as string)()
const { palo } = storeToRefs(paloStore)

const coreStore = useCoreStore()
const sessionStore = useSessionStore()

const $q = useQuasar()

const startBeatDialog = ref(false)

const {
  selectStartBeat
} = paloStore

const {
  toggleDialog
} = sessionStore

const onSelectedStartBeat = (v: number) => {
  forEachValue(paloData?.startBeats, (startBeat: numOpts, key: number) => {
    if (startBeat.value === v) {
      selectStartBeat(startBeat)
    }
  })
  startBeatDialog.value = false
}
</script>

<template lang="pug">
div
  p.caption Start beat
  q-btn(
    id="startBeatBtn",
    outline,
    color="white",
    :padding="$q.screen.lt.md ? 'sm' : 'md'",
    @click="startBeatDialog = true"
  ) {{ palo.selectedStartBeat?.label }}
  q-dialog(
    id="startBeatDialog",
    v-model="startBeatDialog",
    @show="toggleDialog(true)",
    @hide="toggleDialog(false)"
  )
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Start beat
      q-card-section
        q-option-group(
          type="radio",
          color="primary",
          :model-value="palo.selectedStartBeat",
          :options="paloData?.startBeats",
          @update:model-value="onSelectedStartBeat"
        )
      q-card-section(align="center")
        q-btn(
          id="closeStartBeatDialogBtn",
          color="primary",
          v-close-popup
        ) Close
</template>
