<template lang="pug">
  div
    p.caption.auto Eighth-notes
    q-toggle(
      icon="audiotrack",
      :value="eighthNotes",
      @input="toggleEighthNotes"
    ).primary
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapState({
                eighthNotes: state => state.eighthNotes
            })
        },
        methods: {
            ...mapActions([
                'toggleEighthNotes'
            ])
        }
    }
</script>
