<template lang="pug">
    tr
        td
            q-checkbox(
                color="primary",
                :value="selectedInstruments",
                :val="instrument.value",
                :label="instrument.label"
            )
        td
            q-toggle(
                icon="audiotrack",
                :value="instrument.eighthNotes",
                :disable="!isChecked || isClick"
                @input="handleToggleEighthNotes($event)"
            ).primary.ml.mr
        td(style="width: 100%;")
            q-slider(
                :value="instrument.volume",
                :min="-30",
                :max="30",
                :step="1",
                label,
                :label-value="`${instrument.volume}db`",
                snap,
                :disable="!isChecked"
                @change="handleChangeVolume($event)"
            )
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    import { QItem, QToggle, QCheckbox, QSlider } from 'quasar'

    export default {
        components: { QItem, QToggle, QCheckbox, QSlider },
        props: [ 'slug' ],
        computed: {
            ...mapState({
                selectedInstruments: state => state.selectedInstruments
            }),
            instrument () {
                return this.$store.getters.getInstrument(this.$props.slug)
            },
            isChecked () {
                return this.selectedInstruments.includes(this.instrument.value)
            },
            isClick () {
                return this.instrument.value === 'click'
            }
        },
        methods: {
            ...mapActions([
                'toggleEighthNotes',
                'changeVolume'
            ]),
            handleToggleEighthNotes (e) {
                this.toggleEighthNotes(this.instrument)
            },
            handleChangeVolume (e) {
                this.changeVolume({
                    instrument: this.instrument,
                    volume: e
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    tr > td
        padding 0.5rem 0
</style>