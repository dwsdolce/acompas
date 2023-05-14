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
.text-center.q-mx-md
  p.caption Humanize
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
          p.text-body2 If it is on, then random little time variations are applied to the sounds. The result is a bit more realistic.

  q-toggle(
    :model-value="palo.humanization",
    @update:model-value="toggleHumanize()",
    left-label,
    color="primary",
    keep-color
  )
</template>
