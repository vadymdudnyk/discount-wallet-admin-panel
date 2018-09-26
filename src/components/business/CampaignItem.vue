<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                {{campaign.description}}
            </v-card-title>
            <v-card-text>
                <v-layout column>
                    <v-flex>
                        <b>Campaign type:</b> {{campaign.campaignType}}
                    </v-flex>
                    <v-flex>
                        <b>Coupon type:</b> {{campaign.couponType}}
                    </v-flex>
                    <v-flex>
                        <b>Max usages:</b> {{campaign.maxUsages}} times
                    </v-flex>
                    <v-flex>
                        <b>Expiration time:</b> {{campaign.expirationTime}} hours
                    </v-flex>
                    <v-flex wrap>
                        <b>Description:</b>{{campaign.description}}
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        props: ['campaign'],
        name: "CampaignItem"
    }
</script>

<style scoped>

</style>