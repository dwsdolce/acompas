<template lang="pug">
    .full-width
        canvas#canvas(ref="canvas")
</template>

<script>
    import { mapState, mapMutations } from 'vuex'

    export default {
        computed: {
            ...mapState({
                visualizationMode: state => state.selectedVisualizationMode
            })
        },
        mounted () {
            this.onResize()
            this.$nextTick(() => {
                window.addEventListener('resize', this.onResize)
            })
        },
        methods: {
            ...mapMutations({
                getCanvasEl: 'GET_CANVAS_EL'
            }),
            onResize () {
                if (this.visualizationMode === 'dots') this.getCanvasEl(this.$refs.canvas)
            }
        }
    }
</script>

<style lang="stylus">
    #canvas
        width 100%
</style>
