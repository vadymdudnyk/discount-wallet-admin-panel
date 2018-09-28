<template>
    <v-container>
        <v-layout column>
            <v-flex>
                <v-data-table
                        :headers="headers"
                        :items="coupons"
                        class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.value }}</td>
                        <td>{{ props.item.customer.email }}</td>
                        <td>{{ props.item.campaignId }}</td>
                        <td>{{ props.item.couponType }}</td>
                        <td>{{ props.item.usages }}</td>
                        <td>{{ props.item.maxUsages }}</td>
                        <td>{{ props.item.active }}</td>
                        <td>{{ props.item.description }}</td>
                        <td>{{ props.item.creationDate }}</td>
                        <td>{{ props.item.expirationDate }}</td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import http from "../http";

    export default {
        name: "Coupons",
        data() {
            return {
                headers: [
                    {text: 'Id', align: 'left', value: 'id'},
                    {text: 'Value', align: 'left', value: 'value'},
                    {text: 'Customer', align: 'left', value: 'customer.email'},
                    {text: 'Campaign Id', align: 'left', value: 'campaignId'},
                    {text: 'Coupon Type', align: 'left', value: 'couponType'},
                    {text: 'Usages', align: 'left', value: 'usages'},
                    {text: 'Max usages', align: 'left', value: 'maxUsages'},
                    {text: 'Active', align: 'left', value: 'active'},
                    {text: 'Description', align: 'left', value: 'description'},
                    {text: 'Creation Date', align: 'left', value: 'creationDate'},
                    {text: 'Expiration Date', align: 'left', value: 'expirationDate'},
                ],
                coupons: []
            }
        },
        computed: {
            selectedBusiness: function () {
                return this.$store.getters.selectedBusiness;
            }
        },
        watch: {
            selectedBusiness: function (businessId) {
                this.getBusinessCoupons(businessId);
            },
        },
        methods: {
            getBusinessCoupons(businessId) {
                if (businessId) {
                    http.getBusinessCoupons(businessId)
                        .then(response => {
                            this.coupons = response.data;
                        });
                }
            }
        },
        created() {
            this.getBusinessCoupons(this.selectedBusiness);
        }
    }
</script>

<style scoped>

</style>
