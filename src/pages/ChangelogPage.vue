<script setup lang="ts">
import CustomCard from 'src/components/CustomCard.vue'
import MarkdownRenderer from 'src/components/MarkdownRenderer.vue'
// The release history is deliberately not translated; see the data file for
// why. Only the title and description on this page come from i18n.
import changelogEntries from 'src/assets/data/changelog'

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template lang="pug">
q-page.text-grey-1.q-pa-sm.flex.justify-center.items-center
  custom-card(:popup="false")
    template(v-slot:title) {{ $t('doc.changelog.title') }}
    template(v-slot:content)
      q-list.bg-transparent
        template(v-for="(entry, index) in changelogEntries" :key="entry.version")
          q-item.q-pa-md
            q-item-section
              .row.items-center.q-mb-sm
                q-chip.text-weight-bold.bg-primary.text-white {{ entry.version }}
                q-space
                .text-caption.text-grey-8 {{ formatDate(entry.date) }}

              q-list.bg-transparent.q-ml-none
                q-item(
                  v-for="change in entry.changes",
                  :key="change",
                  dense
                )
                  q-item-section(side, center)
                    q-icon(name="mdi-circle", size="10px")
                  q-item-section
                    markdown-renderer(:content="change")

          q-separator.bg-grey-8(v-if="index < changelogEntries.length - 1")
</template>
