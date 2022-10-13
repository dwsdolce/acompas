<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { usePaloStore } from 'src/stores/palo'
import { useSessionStore } from 'src/stores/session'

const route = useRoute()
const paloStore = usePaloStore(route.name as string)()
const sessionStore = useSessionStore()

const {
  visualizationModes,
  visualizationMode
} = storeToRefs(paloStore)

const {
  selectVisualizationMode
} = paloStore

const {
  toggleDialog
} = sessionStore

const onSelectVisualizationMode = (v: string) => {
  selectVisualizationMode(v)
}
</script>

<template lang="pug">
.text-center.q-mx-md
  .caption View mode
    span.q-ml-sm
      q-btn(
        dense,
        round,
        flat,
        size="10px",
        padding="none",
        icon="help"
      )
        q-tooltip(
          anchor="top middle",
          self="bottom middle",
          :offset="[10, 10]"
        )
          p.text-body2 Choose between dots, counter and clock visualisation.
  q-option-group(
    inline,
    left-label,
    type="radio",
    color="primary",
    :model-value="visualizationMode",
    @update:model-value="onSelectVisualizationMode"
    :options="visualizationModes"
  )
</template>
