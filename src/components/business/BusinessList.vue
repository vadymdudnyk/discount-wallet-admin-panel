<template>
    <v-card>
        <v-container fluid>
            <v-layout row wrap>
                <v-flex
                        v-for="business in businesses"
                        :key="business.id">
                    <v-card>
                        <v-card-title>
                            {{business.businessName}}
                        </v-card-title>
                        <v-container>
                            <v-layout column>
                                <v-flex>
                                    <v-text-field v-model="business.businessName" disabled label="Business name"></v-text-field>
                                </v-flex>
                                <v-flex>
                                    <v-text-field v-model="business.city" disabled label="City"></v-text-field>
                                </v-flex>
                                <v-flex>
                                    <v-text-field v-model="business.address" disabled label="Address"></v-text-field>
                                </v-flex>
                                <v-flex>
                                    <v-text-field v-model="business.zipCode" disabled label="ZipCode"></v-text-field>
                                </v-flex>
                                Administrators:
                                <v-flex v-for="administrator in business.administrator" :key="administrator.id">
                                    <v-chip close>{{administrator.email}}</v-chip>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    import {GET_BUSINESSES_REQUEST, UPDATE_BUSINESSES} from "../../store/modules/business";

    export default {
        name: "BusinessList",
        computed: {
            businesses: {
                get() {
                    console.log("Get");
                    return this.$store.state.business.businesses
                },
                set (value) {
                    console.log("set");
                    this.$store.dispatch(UPDATE_BUSINESSES, value)
                }
            }
        },
        created() {
            this.$store.dispatch(GET_BUSINESSES_REQUEST);
        }
    }
</script>

<style scoped>

</style>
