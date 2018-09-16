<template>
    <v-btn flat outline @click="logout">
        Logout
    </v-btn>
</template>

<script>
    import {AUTH_LOGOUT} from "../store/modules/auth";

    export default {
        name: "LogoutButton",
        methods: {
            logout() {
                this.$store.dispatch(AUTH_LOGOUT)
                    .then(() => {
                        this.$router.push('/')
                    })
            }
        }
    }
</script>

<style scoped>

</style>
