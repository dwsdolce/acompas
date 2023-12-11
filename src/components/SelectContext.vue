<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useContextStore } from 'src/stores/context'
import CustomCard from 'src/components/CustomCard.vue'
import type { Ref } from 'vue'

const contextStore = useContextStore()

const { context, options } = storeToRefs(contextStore)
const { setContext } = contextStore

const contextDialog: Ref<boolean> = ref(false)

</script>

<template lang="pug">
div
  q-btn(
    id="contextBtn",
    ref="contextBtn",
    unelevated,
    color="grey-4",
    text-color="black",
    :label="context.label",
    :aria-label="context.label",
    @click="contextDialog = true"
  )
  q-dialog(
    id="contextDialog",
    v-model="contextDialog"
  )
    custom-card
      template(v-slot:title) Please select a context
      template(v-slot:content)
        q-list
          q-item(
            v-for="option in options",
            :key="option.value",
            clickable,
            v-ripple="false",
            @click="setContext(option)",
            :class="{ 'bg-grey-2': option.value === context.value }",
          )
            q-item-section
              q-item-label {{ option.label }}
            q-item-section(side)
              q-icon(name="check").q-ml-sm(v-if="option.value === context")
</template>
