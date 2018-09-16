<template>
    <v-app dark>
        <v-container>
            <v-layout column align-center>
                <v-flex>
                    <h1>Welcome to our application</h1>
                </v-flex>
                <v-flex>
                    <AuthenticationButton>
                    </AuthenticationButton>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
    import AuthenticationButton from "../components/AuthenticationButton";
    export default {
        name: "LandingPage",
        components: {AuthenticationButton}
    }
</script>

<style scoped>

</style>
