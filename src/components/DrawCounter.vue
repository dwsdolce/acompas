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
  palo,
  metronomeEvent
} = storeToRefs(paloStore)

const counter = ref<number | null>(null)
const className = ref<string>('')

watch(metronomeEvent, (v: number | null) => {
  if (palo.value.selectedPrestartBeat&& paloData) {
    let index = (v as number) - (palo.value.selectedPrestartBeat.value * 2)
    // index needs to be strictly positive as it will be used with a % operator
    if (index < 0) {
      index += paloData?.nbBeatsInPattern
    }
    counter.value = paloData?.beatLabels[index % paloData?.nbBeatsInPattern]
    if (paloData?.accents.includes(((index % paloData?.nbBeatsInPattern) / 2) as never)) {
      className.value = 'accent'
    } else {
      className.value = ''
    }
  }
})
</script>

<template lang="pug">
.item-center.full-width
  h1(:class="className").text-center.q-ma-none
    div(v-if="metronomeEvent == null")
      q-icon(name="more_horiz")
    div(v-else).counter {{ counter }}
</template>

<style lang="sass" scoped>
// .counter
//   margin-bottom: 9.5px
.q-icon
  height: 0.85rem
.accent
  color: firebrick
</style>
