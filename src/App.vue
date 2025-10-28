<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useSessionStore } from 'src/stores/session'
import CustomCard from 'src/components/CustomCard.vue'
import UpdateApp from 'src/components/UpdateApp.vue'
import { SplashScreen } from '@capacitor/splash-screen'

const router = useRouter()

const sessionStore = useSessionStore()

const { trackingChosen, isUpToDatev4 } = storeToRefs(sessionStore)

const updateDialog = computed(() => {
  return !isUpToDatev4.value
})

onMounted(async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000))

  if (!trackingChosen.value) {
    await router.push('/privacy-policy')
  }

  SplashScreen.hide()
})
</script>

<template lang="pug">
div
  RouterView
  q-dialog(
    id="updateDialog",
    v-model="updateDialog",
    persistent
  )
    CustomCard(:persistant="true")
      template(v-slot:title) {{ $t('doc.update.title') }}
      template(v-slot:content)
        UpdateApp
</template>
