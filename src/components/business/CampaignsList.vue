<template>
    <v-card>
        <v-card-title>
            Campaigns
        </v-card-title>
        <v-card-text>
            <v-layout column>
                <v-flex v-for="campaign in campaigns" v-bind:key="campaign.id">
                    <CampaignItem v-bind:campaign="campaign"></CampaignItem>
                </v-flex>
                <v-flex v-if="newCampaignComponent">
                    <CreateCampaignComponent v-model="newCampaignComponent"
                                             v-bind:business-id="businessId"
                                             v-on:update-campaigns="getBusinessCampaigns"
                    ></CreateCampaignComponent>
                </v-flex>
            </v-layout>
        </v-card-text>
        <v-card-actions>
            <v-btn round color="primary" v-show="!newCampaignComponent" @click="newCampaignComponent=true">Create campaign</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import http from "../../http";
    import CreateCampaignComponent from "./CreateCampaingComponent";
    import CampaignItem from "./CampaignItem";

    export default {
        components: {CampaignItem, CreateCampaignComponent},
        props: ['businessId'],
        name: "CampaignsList",
        data() {
            return {
                campaigns: [],
                newCampaignComponent: false
            }
        },
        created() {
            this.getBusinessCampaigns();
            // this.$on("update-campaigns", () => this.getBusinessCampaigns())
        },
        methods: {
            getBusinessCampaigns() {
                http.getBusinessCampaigns(this.businessId)
                    .then(value => {
                        this.campaigns = value.data;
                    })
            }
        }
    }
</script>

<style scoped>

</style>