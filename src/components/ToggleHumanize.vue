<template lang="pug">
    div
        p.caption.auto.mb Humanize
        q-toggle(
            :value="humanize",
            @input="toggleHumanize"
        ).primary.mt.mb
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import { QToggle } from 'quasar'

    export default {
        components: { QToggle },
        computed: {
            ...mapState({
                humanize: state => state.humanize
            })
        },
        methods: {
            ...mapActions([
                'toggleHumanize'
            ])
        }
    }
</script>
