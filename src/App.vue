<template lang="pug">
    q-layout(ref="layout", view="hHh LpR lFf").bg-grey-10
        alert
        toolbar(slot="header")
        side-menu(slot="left")
        router-view
</template>

<script>
    import { mapState } from 'vuex'
    import { QLayout, Platform } from 'quasar'
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
    // Piwik code
    window._paq = []
    let platformName = null
    if (Platform.is.cordova) platformName = 'Cordova'
    if (Platform.is.desktop) platformName = 'Website'

    window._paq.push(['setCustomVariable', 1, 'AppVersion', platformName, 'visit'])
    window._paq.push(['trackPageView'])
    window._paq.push(['enableLinkTracking'])
    const initPiwik = () => {
        var u = 'http://piwik.acompas.org/'
        window._paq.push(['setTrackerUrl', u + 'piwik.php'])
        window._paq.push(['setSiteId', 1])
        var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0]
        g.type = 'text/javascript'
        g.async = true
        g.defer = true
        g.src = u + 'piwik.js'
        s.parentNode.insertBefore(g, s)
    }
    initPiwik()
    // End Piwik code
</script>
<noscript>
    <p>
        <img src="http://piwik.acompas.org/piwik.php?idsite=1" style="border:0;" alt="" />
    </p>
</noscript>

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
