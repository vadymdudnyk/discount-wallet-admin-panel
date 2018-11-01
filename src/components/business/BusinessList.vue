<template>
    <v-card>
        <v-container v-if="selectedBusiness">
            <v-layout column>
                <v-flex>
                    <BusinessInfo v-bind:business="selectedBusiness"></BusinessInfo>
                </v-flex>
                <v-flex>
                    <Administrators v-bind:administrators="selectedBusiness.administrator"></Administrators>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    import Administrators from "./Administrators";
    import BusinessInfo from "./BusinessInfo";

    export default {
        name: "BusinessList",
        components: {BusinessInfo, Administrators},
        computed: {
            selectedBusiness() {
                return this.$store.getters.business;
            }
        }
    }
</script>

<style scoped>

</style>
