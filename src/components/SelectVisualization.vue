<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import palosData from 'src/data/palosData'
import { useCoreStore } from 'src/stores/core'
import { usePaloStore } from 'src/stores/palo'
import { useSessionStore } from 'src/stores/session'

const route = useRoute()

const paloData = palosData.find(palo => palo.value === route.name)
const paloStore = usePaloStore(route.name as string)()
const { palo } = storeToRefs(paloStore)

const coreStore = useCoreStore()
const sessionStore = useSessionStore()

const visualizationDialog = ref(false)

const {
  visualizationSize
} = storeToRefs(coreStore)

const {
  selectVisualizationMode
} = paloStore

const {
  toggleDialog
} = sessionStore

const onSelectVisualizationMode = (v: any) => {
  selectVisualizationMode(v)
  visualizationDialog.value = false
}
</script>

<template lang="pug">
div
  p.caption View {{ $q.screen.gt.sm ? 'mode' : '' }}
  q-btn(
    outline,
    icon="remove_red_eye",
    :padding="$q.screen.lt.md ? 'sm' : 'md'",
    @click="visualizationDialog = true"
  )
  q-dialog(v-model="visualizationDialog", @show="toggleDialog(true)", @hide="toggleDialog(false)")
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center Select view mode
      q-card-section
        q-option-group(
          type="radio",
          color="primary",
          :model-value="palo.visualizationModes.find(el => el.isActive)",
          :options="palo.visualizationModes",
          @update:model-value="onSelectVisualizationMode"
        )
      q-card-section(align="center")
        q-btn(
          color="primary",
          v-close-popup
        ) Close
</template>
