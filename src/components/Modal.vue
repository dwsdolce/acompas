<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSessionStore } from 'src/stores/session'

const sessionStore = useSessionStore()

const {
  dialogOpen
} = storeToRefs(sessionStore)
</script>

<template lang="pug">
q-dialog(v-model="dialogOpen")
  q-card(style="width: 100%;")
    q-card-section
      slot(name="header")
    q-card-section
      slot(name="main")
    q-card-section(align="center")
      slot(name="footer")
</template>
