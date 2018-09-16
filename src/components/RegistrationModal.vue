<template>
    <v-layout row justify-center>
        <v-dialog v-model="value" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Registration</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="Email" required v-model="email"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Phone number" required v-model="phoneNumber"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="Password" type="password" required v-model="password"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-checkbox labe="Privacy policy acceptance" v-model="tacAcceptance"></v-checkbox>
                            </v-flex>
                            <v-flex>
                                <v-alert
                                        outline
                                        v-model="alert"
                                        dismissible
                                        type="error"
                                >
                                    Cannot register with provided credentials : {{errorMessage}}
                                </v-alert>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="closeDialog">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="register">Register</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import {REGISTER_AND_AUTHENTICATE_REQUEST} from "../store/modules/auth";

    export default {
        props: ['value'],
        name: "RegistrationModal",
        data() {
            return {
                email: "",
                phoneNumber: "",
                password: "",
                tacAcceptance: false,
                alert: false,
                errorMessage: ""
            }
        },
        methods: {
            closeDialog() {
                this.$emit('input', false)
            },
            register() {
                const email = this.email;
                const phoneNumber = this.phoneNumber;
                const password = this.password;
                const tacAcceptance = this.tacAcceptance;
                this.$store.dispatch(REGISTER_AND_AUTHENTICATE_REQUEST, {email, phoneNumber, password})
                    .then(() => {
                        this.closeDialog();
                        this.$router.push('/home')
                    }, (error) => {
                        this.alert = true;
                        this.errorMessage = error.data.status
                    })
            }

        }
    }
</script>

<style scoped>

</style>
