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
  // Hide the splash as soon as there is an app behind it.
  //
  // This used to sleep five seconds first, which also held back the privacy
  // prompt below - a first-time user watched a splash screen before being
  // asked anything. Removing the sleep is not on its own what stops the
  // plugin warning that hide() came too late: startup genuinely outruns
  // Capacitor's three second default, because MainPage mounts before this
  // component and starts fetching and decoding 58 audio samples. The backstop
  // is raised to six seconds in capacitor.config.ts to cover that.
  if (!trackingChosen.value) {
    await router.push('/privacy-policy')
  }

  await SplashScreen.hide()
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
