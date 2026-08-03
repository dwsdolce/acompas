<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const props = defineProps<{
  content: string | string[]
}>()

const html = computed(() => {
  const parsedContent = Array.isArray(props.content)
    ? props.content.join('\n')
    : props.content
  return DOMPurify.sanitize(marked.parse(parsedContent) as string)
})
</script>

<template lang="pug">
div(v-html="html")
</template>
