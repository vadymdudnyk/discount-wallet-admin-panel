<template>
    <v-card>
        <v-card-title><h3>Business activity log</h3></v-card-title>
        <v-card-text>
            <v-card
                    v-for="(event, key) in formattedEvents"
                    v-bind:key="key">
                <v-card-text>
                    <v-layout row>
                        <v-flex sm2>
                            {{event.time}}
                        </v-flex>
                        <v-flex sm10>
                            {{event.description}}
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-card-text>
    </v-card>
</template>

<script>
    import moment from 'moment'

    export default {
        name: "BusinessEvents",
        data() {
            return {
                events: []
            }
        },
        computed: {
            formattedEvents: function () {
                return this.$store.getters.businessEvents.map(value => {
                    return {
                        time: moment(value.time).format('LLL'),
                        description: value.description
                    }
                }).reverse();
            }
        }
    }
</script>

<style scoped>

</style>