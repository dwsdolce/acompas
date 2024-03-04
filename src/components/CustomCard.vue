<script setup lang="ts">
import { ref, computed, onUpdated } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { usePatternStore } from 'src/stores/patterns'

const router = useRouter()
const patternStore = usePatternStore()
const props = defineProps({
  persistant: {
    type: Boolean,
    default: false
  },
  popup: {
    type: Boolean,
    default: true
  }
})

const {
  selectedContextName,
  selectedPatternName
} = storeToRefs(patternStore)
</script>

<template lang="pug">
q-card(style="width: 700px; max-width: 90vw; max-height: 90vh;").text-black
  q-card-section
    div(v-if="!persistant")
      q-btn(v-if="popup", icon="close", flat, round, dense, v-close-popup).absolute.q-top-right.q-mr-sm
      q-btn(v-else, icon="close", flat, round, dense, @click="router.push(`/${selectedContextName}/${selectedPatternName}`)").absolute.q-top-right.q-mr-sm
    .text-h6.text-center
      slot(name="title")
  q-separator
  q-card-section(style="max-height: 70vh;").scroll
    slot(name="content")
  q-separator(v-if="$slots.actions")
  q-card-actions(v-if="$slots.actions", align="center")
    slot(name="actions")
</template>
