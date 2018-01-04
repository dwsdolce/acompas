<template lang="pug">
    q-fixed-position(corner="top-right", :offset="[18, 18]")
        q-transition(
            enter="fadeIn",
            leave="fadeOut"
        )
            q-alert(
                v-if="isTooSlow",
                color="negative",
                icon="warning",
                appear,
                enter="fadeIn",
                leave="fadeOut"
            ) {{ slowMessage }}
        q-transition(
            enter="fadeIn",
            leave="fadeOut"
        )
            q-alert(
                v-if="isTooFast",
                color="negative",
                icon="warning",
                appear,
                enter="fadeIn",
                leave="fadeOut"
            ) {{ fastMessage }}
</template>

<script>
    import { mapState } from 'vuex'
    import { QFixedPosition, QTransition, QAlert } from 'quasar'

    export default {
        components: {
            QFixedPosition,
            QTransition,
            QAlert
        },
        computed: {
            ...mapState({
                isTooSlow: state => state.isTooSlow,
                isTooFast: state => state.isTooFast,
                slowMessage: state => state.selectedPalo.slowMessage,
                fastMessage: state => state.selectedPalo.fastMessage
            })
        }
    }
</script>
