<template>
    <v-container>
        <v-layout column>
            <v-flex>
                Setup your business loyalty card
            </v-flex>
            <v-flex>
                When user subscribes to your business then he receives loyalty card
            </v-flex>
            <v-flex>
                <v-text-field
                        :disabled='!editing'
                        :value="this.$store.getters.loyaltyCardPolicy.maxStamps"
                        @input="(maxStamps) => this.newMaxStamps = maxStamps"
                        label="Max stamps"
                        :outline="!editing"
                ></v-text-field>
            </v-flex>
            <v-flex>
                <v-btn color="purple" @click="editing=!editing">Edit</v-btn>
                <v-btn v-if="editing" color="green" @click="updateLoyaltyCardPolicy">Save</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {UPDATE_LOYALTY_CARD_POLICY} from "../store/modules/business";

    export default {
        name: "LoyaltyCards",
        data() {
            return {
                editing: false,
                newMaxStamps: null
            }
        },
        methods: {
            updateLoyaltyCardPolicy() {
                this.$store.dispatch(UPDATE_LOYALTY_CARD_POLICY, this.newMaxStamps)
                    .then(() => {
                        this.editing = false
                    })
            }
        }
    }
</script>

<style scoped>

</style>