<script setup lang="ts">
import CustomCard from 'src/components/CustomCard.vue'
import MarkdownRenderer from 'src/components/MarkdownRenderer.vue'
</script>

<template lang="pug">
CustomCard(:popup="false")
  template(v-slot:title) {{ $t('doc.privacy.title') }}
  template(v-slot:content)
    .text-center
      MarkdownRenderer(:content="$t('doc.privacy.content')")
</template>
