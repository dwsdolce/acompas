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
  toggleHumanize
} = paloStore
</script>

<template lang="pug">
.text-center
  p.caption Humanize
  q-toggle(
    :model-value="palo.humanization",
    @update:model-value="toggleHumanize()",
    color="primary",
    keep-color
  )
</template>
