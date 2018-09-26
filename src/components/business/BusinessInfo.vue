<template>
    <v-card>
        <v-card-title>
            Business
        </v-card-title>
        <v-card-text>
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
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        props:['business'],
        name: "BusinessInfo"
    }
</script>

<style scoped>

</style>