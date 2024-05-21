<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template lang="pug">
p.text-center {{ $t('doc.shortcuts.title') }}
q-markup-table(flat)
  tbody
    tr
      td.text-right
        kbd Space
      td.text-left {{ $t('doc.shortcuts.space') }}
    tr
      td.text-right
        kbd Up
      td.text-left {{ $t('doc.shortcuts.up') }}
    tr
      td.text-right
        kbd Down
      td.text-left {{ $t('doc.shortcuts.down') }}
    tr
      td.text-right
        kbd Esc
      td.text-left {{ $t('doc.shortcuts.esc') }}
    tr
      td.text-right
        kbd Tab
      td.text-left {{ $t('doc.shortcuts.tab') }}
</template>

<style lang="sass">
kbd
  background-color: lightgray
  padding: 3px 8px
  margin: 3px
  border-radius: 4px
  text-shadow: 1px 1px 0 white
</style>
