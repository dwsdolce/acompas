<template lang="pug">
    q-toolbar(class="toolbar")
        q-btn(flat, @click="toggleSideMenu")
            q-icon(name="menu")
        q-toolbar-title(:padding="1")
            img(id="logo", :src="'statics/AClogo.png'")
</template>

<script>
    import { mapActions } from 'vuex'
    import {
        QToolbar, QToolbarTitle, QBtn, QIcon
    } from 'quasar'

    export default {
        components: { QToolbar, QToolbarTitle, QBtn, QIcon },
        methods: {
            ...mapActions([
                'toggleSideMenu'
            ])
        }
    }
</script>
