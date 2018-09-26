<template>
    <v-card>
        <v-card-title>
            Administrators
        </v-card-title>
        <v-card-text>
            <v-flex v-for="administrator in administrators" :key="administrator.id">
                <v-chip close>{{administrator.email}}</v-chip>
            </v-flex>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        props: ['administrators'],
        name: "Administrators"
    }
</script>

<style scoped>

</style>