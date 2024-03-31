<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { usePatternStore } from 'src/stores/patterns'
import CustomCard from 'src/components/CustomCard.vue'
import type { Ref } from 'vue'
import type { ContextOption } from 'src/utils/types'

const router = useRouter()

const patternStore = usePatternStore()

const { data, contexts, selectedContext } = storeToRefs(patternStore)

const contextDialog: Ref<boolean> = ref(false)

const onSelectedContext = async (context: ContextOption) => {
  contextDialog.value = false
  router.push(`/${context.value}/${data.value.find(pattern => pattern.context === context.value)?.name}`)
}
</script>

<template lang="pug">
div
  q-btn(
    id="contextBtn",
    ref="contextBtn",
    unelevated,
    color="grey-4",
    text-color="black",
    :label="selectedContext?.label || 'Select context'",
    :aria-label="selectedContext?.label || 'Select context'",
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
            v-for="option in contexts",
            :key="option.value",
            clickable,
            v-ripple="false",
            @click="onSelectedContext(option)",
            :class="{ 'bg-grey-2': option.value === selectedContext.value }",
          )
            q-item-section
              q-item-label {{ option.label }}
                q-badge(rounded, :color="option.colors.primary").q-ml-md
            q-item-section(side)
              q-icon(name="mdi-check").q-ml-sm(v-if="option.value === selectedContext.value")
</template>
