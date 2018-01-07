<template lang="pug">
    div
        p.caption.auto(v-if="visualizationSize.width > breakpoint.sm") View mode
        q-btn(
            round,
            outline,
            icon="remove_red_eye",
            @click="$refs.visualizationModal.open()"
        ).mt
        q-modal(
            ref="visualizationModal",
            :content-css="{padding: '2rem'}"
        )
            h5.m-none.mb Select view mode
            q-option-group(
                type="radio",
                color="primary",
                :value="selectedVisualizationMode",
                :options="visualizationModes",
                @input="selectVisualizationMode",
                @change="$refs.visualizationModal.close()"
            ).mt
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import { QBtn, QModal, QOptionGroup } from 'quasar'

    export default {
        components: { QBtn, QModal, QOptionGroup },
        computed: {
            ...mapState({
                visualizationModes: state => state.visualizationModes,
                selectedVisualizationMode: state => state.selectedVisualizationMode,
                visualizationSize: state => state.visualizationSize,
                breakpoint: state => state.breakpoint
            })
        },
        methods: {
            ...mapActions([
                'selectVisualizationMode'
            ])
        }
    }
</script>
