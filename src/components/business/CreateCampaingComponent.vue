<template>
    <v-card>
        <v-card-title>
            New campaign:
        </v-card-title>
        <v-card-text>
            <v-form v-model="valid">
                <v-select
                        v-model="newCampaign.campaignType"
                        :items="campaignTypes"
                        label="Campaign type"
                        required
                ></v-select>
                <v-select
                        v-model="newCampaign.couponType"
                        :items="couponTypes"
                        label="Coupon type"
                        required
                ></v-select>
                <v-text-field
                        v-model="newCampaign.description"
                        label="Coupon description"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="newCampaign.maxUsages"
                        label="Max usages (number)"
                        required
                ></v-text-field>
                <v-text-field
                        v-model="newCampaign.expirationTime"
                        label="Expiration time (hours)"
                        required
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="createCampaign">Create</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import http from "../../http";

    export default {
        props: ['value', 'businessId'],
        name: "CreateCampaignComponent",
        data() {
            return {
                campaignTypes: [],
                couponTypes: [],
                valid: false,
                newCampaign: {
                    campaignType: "WELCOME",
                    couponType: "PERCENT",
                    maxUsages: 1,
                    description: "Your coupon for 10% discount",
                    expirationTime: 72,
                }
            }
        },
        methods: {
            createCampaign() {
                http.createCampaign(
                    this.businessId,
                    this.newCampaign.campaignType,
                    this.newCampaign.couponType,
                    this.newCampaign.maxUsages,
                    this.newCampaign.description,
                    this.newCampaign.expirationTime
                ).then(() => {
                    this.$emit("update-campaigns");
                    this.close();
                });
            },
            close() {
                this.$emit('input', false)
            }
        },
        created() {
            http.getCampaignTypes()
                .then(value => {
                    this.campaignTypes = value.data;
                });
            http.getCouponTypes()
                .then(value => {
                    this.couponTypes = value.data;
                });
        }

    }
</script>

<style scoped>

</style>