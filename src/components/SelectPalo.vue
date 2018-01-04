<template lang="pug">
    div
        p.caption.auto Palo
        q-btn(
            outline,
            color="white",
            @click="$refs.palosModal.open()"
        ).mt.mb {{ selectedPaloLabel }}
        q-modal(ref="palosModal", :content-css="{padding: '2rem'}")
            h5.m-none.mb Select palo
            q-option-group(
                type="radio",
                color="primary",
                :value="selectedPalo",
                :options="palos",
                @input="selectPalo",
                @change="$refs.palosModal.close()"
            ).mt
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import {
        QBtn,
        QModal,
        QOptionGroup
    } from 'quasar'

    export default {
        components: { QBtn, QModal, QOptionGroup },
        computed: {
            ...mapState({
                palos: state => state.palos,
                selectedPalo: state => state.selectedPalo.value,
                selectedPaloLabel: state => state.selectedPalo.label
            })
        },
        methods: {
            ...mapActions([
                'selectPalo'
            ])
        }
    }
</script>

<style lang="stylus">
    .q-option-group > div
        padding 0.2rem 0
</style>
