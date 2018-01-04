<template lang="pug">
    .column.items-center.justify-center.no-wrap.mt
        q-icon(name="error_outline", color="grey-5", style="font-size: 5rem;")
        h3.text-white Oops. Nothing here...
        p.text-center.group
            q-btn(
                color="primary"
                @click="$router.replace('/')"
                icon="home"
            ) Go home
</template>

<script>
    import { QBtn, QIcon } from 'quasar'

    export default {
        components: {
            QBtn,
            QIcon
        }
    }
</script>
