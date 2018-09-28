<template>
    <v-layout class="pa-2">
        <v-select
                v-model="storeSelectedBusiness"
                :items="$store.getters.businesses"
                item-text="businessName"
                item-value="id"
                label="Select business"
        ></v-select>
    </v-layout>
</template>

<script>
    import {SELECT_BUSINESS} from "../../store/modules/business";

    export default {
        name: "BusinessSelector",
        data() {
            return {
                selectedBusiness: null,
            }
        },
        computed: {
            storeSelectedBusiness: {
                get() {
                    return this.$store.getters.selectedBusiness;
                },
                set(value) {
                    this.$store.dispatch(SELECT_BUSINESS, value)
                }
            }
        }
    }
</script>

<style scoped>

</style>