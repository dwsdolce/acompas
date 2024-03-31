<script setup lang="ts">
import { ref, computed, onUpdated, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import CustomCard from 'src/components/CustomCard.vue'

const patternSearchHelpDialog = ref(false)

</script>

<template lang="pug">
span
  q-btn(
    id="patternSearchHelpBtn",
    ref="patternSearchHelpBtn",
    round,
    flat,
    size="15px",
    padding="none",
    icon="mdi-help-box",
    @click="patternSearchHelpDialog = true"
  )

  q-dialog(
    id="patternSearchHelpDialog",
    v-model="patternSearchHelpDialog"
  )
    custom-card
      template(v-slot:title) Search for a pattern
      template(v-slot:content)
        p
          | Many flamenco "palos" are actually derived from other rhythmical structures.
          | For example, "farruca" is derived from "tientos", "columbiana" or "garrotín" are kinds of "tangos".
          | Here you can input the name of any "palo" you ever heard of and A Compás will search for the patterns which it is derived from.
        ul
          li Search for a pattern by typing its name or a part of it.
          li The search is case insensitive.
          li The search is performed on the pattern name and on the linked patterns.
          li The search is performed on the whole string, not on the words.
</template>
