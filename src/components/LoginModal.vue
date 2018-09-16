<template>
    <v-layout row justify-center>
        <v-dialog v-model="value" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Login</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="Email or phone number" required v-model="username"></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field label="password" type="password" required v-model="password"></v-text-field>
                            </v-flex>
                            <v-flex>
                                <v-alert
                                        outline
                                        v-model="alert"
                                        dismissible
                                        type="error"
                                >
                                    Wrong credentials
                                </v-alert>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="closeDialog">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click.native="login">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>

    import {AUTH_REQUEST} from "../store/modules/auth";

    export default {
        props: ['value'],
        name: "LoginModal",
        data() {
            return {
                username: "",
                password: "",
                alert: false
            }
        },
        methods: {
            closeDialog() {
                this.$emit('input', false)
            },
            login() {
                const username = this.username;
                const password = this.password;
                this.$store.dispatch(AUTH_REQUEST, {
                    username,
                    password,
                })
                    .then(() => {
                        this.closeDialog();
                        this.$router.push("/home")
                    }, () => {
                        this.alert = true
                    })
            }

        }
    }
</script>

<style scoped>

</style>
