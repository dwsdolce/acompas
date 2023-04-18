<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import { usePaloStore } from 'src/stores/palo'
import { useSessionStore } from 'src/stores/session'
import palosData from 'src/data/palosData'
import HelpPalo from 'src/components/HelpPalo.vue'

const $q = useQuasar()
const route = useRoute()
const paloData = palosData.find(palo => palo.value === route.name)
const paloStore = usePaloStore(route.name as string)()
const sessionStore = useSessionStore()

const {
  palo
} = storeToRefs(paloStore)

const {
  selectPalo
} = paloStore

const {
  toggleDialog
} = sessionStore

const palosDialog = ref(false)

const onSelectedPalo = (v: string) => {
  palosDialog.value = false
  selectPalo(v)
}
</script>

<template lang="pug">
div
  p Palo
    help-palo(v-show="palo.name !== 'no-compas'", :palo="palo")
  q-btn(
    id="paloBtn",
    outline,
    color="white",
    :padding="$q.screen.lt.md ? 'sm' : 'md'",
    :label="paloData?.label",
    @click="palosDialog = true"
  )
  q-dialog(
    id="optDialog",
    v-model="palosDialog"
  )
    q-card(style="width: 100%; overflow: hidden;")
      q-card-section
        q-btn(icon="close", flat, round, dense, v-close-popup).absolute.q-top-right.q-mr-sm
        .text-h6.text-center Please select a palo
      q-card-section.scroll(style="max-height: 80vh;")
        q-option-group(
          type="radio",
          color="primary",
          :options="palosData",
          :model-value="paloData?.value",
          @update:model-value="onSelectedPalo($event)"
        )
</template>
