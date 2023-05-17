<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import palosData from 'src/data/palosData'
import { usePaloStore } from 'src/stores/palo'

const route = useRoute()
const paloStore = usePaloStore(route.name as string)()
const paloData = palosData.find(palo => palo.value === route.name)

const {
  metronomeEvent
} = storeToRefs(paloStore)

const counter = ref<number | null>(null)
const className = ref<string>('')

watch(metronomeEvent, (v: number | null) => {
  if (v !== null && paloData) {
    counter.value = paloData?.beatLabels[(v as number)]

    if (paloData?.accents.includes(((v as number) / 2) as never)) {
      className.value = 'accent'
    } else {
      className.value = ''
    }
  } else {
    counter.value = null
    className.value = ''
  }
})
</script>

<template lang="pug">
.item-center.full-width
  h1(:class="className").text-center.q-ma-none
    div(v-if="metronomeEvent === null")
      q-icon(name="more_horiz")
    div(v-else).counter {{ counter }}
</template>

<style lang="sass" scoped>
.q-icon
  height: 0.85rem
.accent
  color: firebrick
</style>
