<template>
    <div>
        <v-btn flat outline @click="loginModal=true">
            Login
        </v-btn>
        <v-btn flat outline @click="registrationModal=true">
            Registration
        </v-btn>
        <LoginModal v-model="loginModal">

        </LoginModal>
        <RegistrationModal v-model="registrationModal">

        </RegistrationModal>
    </div>
</template>

<script>
    import LoginModal from "./LoginModal";
    import RegistrationModal from "./RegistrationModal";
    export default {
        name: "AuthenticationButton",
        components: {RegistrationModal, LoginModal},
        data() {
            return {
                loginModal: false,
                registrationModal: false
            }
        }
    }
</script>

<style scoped>

</style>
