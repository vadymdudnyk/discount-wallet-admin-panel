<template>
    <v-container>
        <v-layout column>
            <v-flex>
                <!--Move to separate component and place in navigation bar-->
                <v-select
                        v-model="selectedBusiness"
                        :items="$store.getters.businesses"
                        item-text="businessName"
                        item-value="id"
                        @change="getBusinessCustomers"
                        label="Select business"
                        outline
                ></v-select>
            </v-flex>
            <v-flex>
                <v-data-table
                        v-if="selectedBusiness != null"
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
                selectedBusiness: null,
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
        methods: {
            getBusinessCustomers() {
                http.getBusinessCustomers(this.selectedBusiness)
                    .then(response => {
                        this.customers = response.data;
                    });
            }
        }
    }
</script>

<style scoped>

</style>