<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useSessionStore } from 'src/stores/session'
import { usePatternStore } from 'src/stores/patterns'
import CustomCard from 'src/components/CustomCard.vue'
  import UpdateApp from 'src/components/UpdateApp.vue'

const router = useRouter()

const sessionStore = useSessionStore()

const {
  trackingChosen,
  isUpToDatev3
} = storeToRefs(sessionStore)

const updateDialog = computed(() => {
  return !isUpToDatev3.value
})

onMounted(() => {
  if (!trackingChosen.value) {
    return router.push('/privacy-policy')
  }
})

</script>

<template lang="pug">
div
  router-view
  q-dialog(
      id="updateDialog",
      v-model="updateDialog"
    )
      custom-card(:persistant="true")
        template(v-slot:title) {{ $t('updated') }}
        template(v-slot:content)
          UpdateApp
</template>
