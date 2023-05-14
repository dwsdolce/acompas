<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import palosData from 'src/data/palosData'
import { usePaloStore } from 'src/stores/palo'

const route = useRoute()

const paloData = palosData.find(palo => palo.value === route.name)
const paloStore = usePaloStore(route.name as string)()
const { palo } = storeToRefs(paloStore)

const {
  toggleImprovise
} = paloStore
</script>

<template lang="pug">
.text-center.q-mx-md
  p.caption Improvise
    span(v-if="palo.name !== 'no-compas'").q-ml-sm
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
          p.text-body2 If it is on, then sometimes the metronome will stop sticking to the pre-programmed pattern and play random patterns for one or more instrument(s).

  q-toggle(
    :model-value="palo.improvisation",
    @update:model-value="toggleImprovise",
    :disable="palo.name === 'no-compas'",
    left-label,
    color="primary",
    keep-color
  )
    q-tooltip(
      v-if="palo.name === 'no-compas'",
      anchor="top middle",
      self="bottom middle",
      :offset="[10, 10]"
    ) This option is disabled for this palo.
</template>
