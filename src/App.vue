<template lang="pug">
    q-layout(ref="layout", view="hHh LpR lFf").bg-grey-10
        alert
        toolbar(slot="header")
        side-menu(slot="left")
        router-view
</template>

<script>
    import { mapState } from 'vuex'
    import { QLayout } from 'quasar'
    import Alert from '@components/Alert'
    import Toolbar from '@components/Toolbar'
    import SideMenu from '@components/SideMenu'
    import AppMain from '@components/AppMain'

    export default {
        components: {
            QLayout,
            Alert,
            Toolbar,
            SideMenu,
            AppMain
        },
        computed: {
            ...mapState({
                shownSideMenu: state => state.shownSideMenu
            })
        },
        watch: {
            shownSideMenu (value) {
                this.$refs.layout.toggleLeft()
            }
        }
    }
</script>

<style lang="stylus">
    #logo
        height 40px
    p.caption
        margin 0 0 .1rem
    p.caption:not(:first-child)
        margin-top 1rem
    .no-style.auto.q-input-field
        color white
</style>
