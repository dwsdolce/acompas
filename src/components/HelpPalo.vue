<script setup lang="ts">
import { ref } from 'vue'
import { openURL, Platform } from 'quasar'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { usePaloStore } from 'src/stores/palo'
import { useCoreStore } from 'src/stores/core'
import { useSessionStore } from 'src/stores/session'
import palosData from 'src/data/palosData'

const route = useRoute()

const paloData = palosData.find(palo => palo.value === route.name)

const coreStore = useCoreStore()

const paloStore = usePaloStore(route.name as string)()

const { palo } = storeToRefs(paloStore)

const {
  visualizationMode,
  selectTempo
} = paloStore

const sessionStore = useSessionStore()

const {
  toggleDialog
} = sessionStore



const paloHelpDialog = ref(false)

const launch = (url: string | undefined) => {
  if (url) {
    // if (Platform.is.cordova) {
    //   cordova.InAppBrowser.open(url, '_system')
    //   return
    // }
    openURL(url)
  }
}
</script>

<template lang="pug">
span.q-ml-sm
  q-btn(
    id="paloHelpBtn",
    dense,
    round,
    flat,
    size="10px",
    padding="none",
    icon="help",
    @click="paloHelpDialog = true"
  )
  q-dialog(
    id="paloHelpDialog",
    v-model="paloHelpDialog",
    @show="toggleDialog(true)",
    @hide="toggleDialog(false)"
  )
    q-card(style="width: 100%;")
      q-card-section
        .text-h6.text-center {{ paloData?.longLabel }}
        div(v-html="paloData?.doc")
        p {{ paloData?.places }}
        p(v-if="paloData?.wikipediaUrl") Wikipedia article : #[q-btn(round, icon="link", @click="launch(paloData?.wikipediaUrl)")]
        p(v-if="paloData?.videoExample") Example video : #[q-btn(round, icon="link", @click="launch(paloData?.videoExample)")]
      q-card-section(align="center")
        q-btn(
          id="closePaloHelpDialogBtn",
          color="primary",
          v-close-popup
        ) Close
</template>
