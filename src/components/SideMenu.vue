<template lang="pug">
    div
        q-list(no-border, link, inset-separator)
            q-item(@click="launch('https://play.google.com/store/apps/details?id=audio.acompas.app')")
                q-item-side(icon="ion-social-android")
                q-item-main(label="Get the Android app")
            q-item(@click="$refs.helpModal.open()")
                q-item-side(icon="ion-information-circled")
                q-item-main(label="Help")
            q-item(@click="launch('https://gitlab.com/oricordeau/acompas')")
                q-item-side(icon="ion-code")
                q-item-main(label="Source code")
            q-item(@click="launch('https://gitlab.com/oricordeau/acompas/issues')")
                q-item-side(icon="ion-bug")
                q-item-main(label="Issues")
            q-collapsible(icon="ion-share", label="Share")
                q-list(no-border, link, inset-separator)
                    q-item(@click="launch('https://www.facebook.com/sharer/sharer.php?u=http://acompas.org')")
                        q-item-side(icon="ion-social-facebook")
                        q-item-main(label="Share on Facebook")
                    q-item(@click="launch('https://twitter.com/share?url=http://acompas.org')")
                        q-item-side(icon="ion-social-twitter")
                        q-item-main(label="Share on Twitter")
                    q-item(@click="launch('https://plus.google.com/share?url=http://acompas.org')")
                        q-item-side(icon="ion-social-googleplus")
                        q-item-main(label="Share on Google +")
            q-item(@click="$refs.tuningModal.open()")
                q-item-side(icon="ion-wrench")
                q-item-main(label="Tuning fork")
        q-modal(ref="helpModal", :content-css="{ padding: '2rem' }")
            h5.m-none.mb Help
            div
                p: b Palo
                p Use this button to select the flamenco rhythm that you want.
            div
                p: b Eighth-notes
                p If it is off, then only the up-beats are played. If it is on, then up and down beats are played.
            div
                p: b Improvise
                p If it is on, then random improvised sound events will be added to the sound patterns.
            div
                p: b Humanize
                p If it is on, then random time variations are applied to the sounds.
            q-btn(
                color="primary",
                @click="$refs.helpModal.close()"
            ).float-right Close
        q-modal(ref="tuningModal", :content-css="{ padding: '2rem' }")
            h5.m-none.mb Tuning fork
            tuning-fork
            q-btn(
                color="primary",
                @click="$refs.tuningModal.close()"
            ).float-right Close
</template>

<script>
    import {
        QList, QCollapsible, QItem, QItemSide, QItemMain, QModal, QBtn, openURL, Platform
    } from 'quasar'
    import TuningFork from '@components/TuningFork'

    export default {
        components: { QList, QCollapsible, QItem, QItemSide, QItemMain, QModal, QBtn, TuningFork },
        methods: {
            launch (url) {
                if (Platform.is.cordova) {
                    cordova.InAppBrowser.open(url, '_system')
                }
                openURL(url)
            }
        }
    }
</script>
