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
.text-center
  p.caption Improvise
  q-toggle(
    :model-value="palo.improvisation",
    @update:model-value="toggleImprovise",
    :disable="palo.name === 'no-compas'",
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
