<template>
    <v-card>
        <v-container fluid>
            <v-layout row wrap>
                <v-flex
                        v-for="business in businesses"
                        :key="business.id">
                    <v-card>
                        <v-container>
                            <v-layout column>
                                <v-flex>
                                    <BusinessInfo v-bind:business="business"></BusinessInfo>
                                </v-flex>
                                <v-flex>
                                    <CampaignsList v-bind:business-id="business.id"></CampaignsList>
                                </v-flex>
                               <v-flex>
                                   <Administrators v-bind:administrators="business.administrator"></Administrators>
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
    import CampaignsList from "./CampaignsList";
    import Administrators from "./Administrators";
    import BusinessInfo from "./BusinessInfo";

    export default {
        name: "BusinessList",
        components: {BusinessInfo, Administrators, CampaignsList},
        computed: {
            businesses: {
                get() {
                    return this.$store.state.business.businesses
                },
                set (value) {
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
