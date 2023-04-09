<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDialogPluginComponent } from 'quasar'
import { useSessionStore } from 'src/stores/session'

const sessionStore = useSessionStore()

const {
  dialogOpen
} = storeToRefs(sessionStore)
</script>

<template lang="pug">
q-dialog(
  v-model="dialogOpen"
)
  slot
</template>
