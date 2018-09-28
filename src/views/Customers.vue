<template>
    <v-container>
        <v-layout column>
            <v-flex>
                <v-data-table
                        :headers="headers"
                        :items="customers"
                        class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.id }}</td>
                        <td>{{ props.item.email }}</td>
                        <td>{{ props.item.phoneNumber }}</td>
                        <td>{{ props.item.firstName }}</td>
                        <td>{{ props.item.lastName }}</td>
                    </template>
                </v-data-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import http from "../http";

    export default {
        name: "Customers",
        data() {
            return {
                headers: [
                    {text: 'Id', align: 'left', value: 'id'},
                    {text: 'Email', align: 'left', value: 'email'},
                    {text: 'Phone Number', align: 'left', value: 'phoneNumber'},
                    {text: 'First Name', align: 'left', value: 'firstName'},
                    {text: 'Last Name', align: 'left', value: 'lastName'},
                ],
                customers: []
            }
        },
        computed: {
            selectedBusiness: function () {
                return this.$store.getters.selectedBusiness;
            }
        },
        watch: {
            selectedBusiness: function (businessId) {
                this.getBusinessCustomers(businessId);
            },
        },
        methods: {
            getBusinessCustomers(businessId) {
                if (businessId) {
                    http.getBusinessCustomers(businessId)
                        .then(response => {
                            this.customers = response.data;
                        });
                }
            }
        },
        created() {
            this.getBusinessCustomers(this.selectedBusiness);
        }
    }
</script>

<style scoped>

</style>