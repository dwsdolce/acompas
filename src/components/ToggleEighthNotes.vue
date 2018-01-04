<template lang="pug">
    div
        p.caption.auto Eighth-notes
        q-toggle(
            icon="audiotrack",
            :value="eighthNotes",
            @input="toggleEighthNotes"
        ).primary.mt.mb
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import { QToggle } from 'quasar'

    export default {
        components: { QToggle },
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
