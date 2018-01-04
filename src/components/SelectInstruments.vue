<template lang="pug">
    div
        p.caption.auto Instruments
        q-btn(
            outline,
            @click="$refs.instrumentsModal.open()"
        ).mt.mb Mixer
        q-modal(ref="instrumentsModal", :content-css="{minWidth: '50vw', padding: '2rem'}")
            h5.m-none.mb Mix instruments
            q-transition(
                enter="fadeIn",
                leave="fadeOut"
            )
                q-alert(
                    v-if="!selectedInstruments.length",
                    color="negative",
                    icon="warning"
                ) No instrument is selected. You will have no sound in the metronome...
            table(style="width: 100%;").q-table
                thead
                    tr
                        th.text-center Active
                        th.text-center 8th
                        th.text-center Volume (db)
                tbody
                    instrument-mixer(
                        v-for="instrument in instruments",
                        :key="instrument.value",
                        :slug="instrument.value"
                    )
            q-btn(
                color="primary",
                @click="$refs.instrumentsModal.close()"
            ).float-right Close
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import { QIcon, QBtn, QModal, QTransition, QAlert } from 'quasar'
    import InstrumentMixer from '@components/InstrumentMixer'

    export default {
        components: { QIcon, QBtn, QModal, QTransition, QAlert, InstrumentMixer },
        computed: {
            ...mapState({
                selectedInstruments: state => state.selectedInstruments,
                instruments: state => state.instruments
            })
        },
        watch: {
            selectedInstruments (value) {
                this.selectInstruments(value)
            }
        },
        methods: {
            ...mapActions([
                'selectInstruments'
            ])
        }
    }
</script>
