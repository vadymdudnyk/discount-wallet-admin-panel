<template>
    <v-app>
        <v-navigation-drawer
                persistent
                :mini-variant="miniVariant"
                :clipped="clipped"
                v-model="drawer"
                enable-resize-watcher
                fixed
                app
        >
            <v-list>
                <v-list-tile
                        value="true"
                        v-for="(item, i) in items"
                        :key="i"
                        :to="item.link"
                >
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar
                app
                :clipped-left="clipped"
        >
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-btn icon @click.stop="miniVariant = !miniVariant">
                <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
            </v-btn>
            <v-btn icon @click.stop="clipped = !clipped">
                <v-icon>web</v-icon>
            </v-btn>
            <v-btn icon @click.stop="fixed = !fixed">
                <v-icon>remove</v-icon>
            </v-btn>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-layout class="pt-3">
                <v-flex sm4>
                    <BusinessSelector></BusinessSelector>
                </v-flex>
            </v-layout>
            <v-spacer></v-spacer>
            <LogoutButton></LogoutButton>
        </v-toolbar>
        <v-content>
            <router-view></router-view>
        </v-content>
        <v-footer :fixed="fixed" app>
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script>
    import AuthenticationButton from '../components/AuthenticationButton'
    import HelloWorld from './Dashboard'
    import LogoutButton from "../components/LogoutButton";
    import {GET_BUSINESS_EVENTS, GET_BUSINESSES_REQUEST, GET_LOYALTY_CARD_POLICY} from "../store/modules/business";
    import BusinessSelector from "../components/business/BusinessSelector";

    export default {
        name: 'home',
        components: {
            BusinessSelector,
            LogoutButton,
            AuthenticationButton,
            HelloWorld
        },
        data() {
            return {
                clipped: false,
                drawer: true,
                fixed: false,
                items: [
                    {
                        icon: 'home',
                        title: 'Home',
                        link: '/home'
                    },
                    {
                        icon: 'money',
                        title: 'Business',
                        link: '/home/business'
                    },
                    {
                        icon: 'home',
                        title: 'Configure Loyalty Cards',
                        link: '/home/loyaltyCards'
                    },
                    {
                        icon: 'people',
                        title: 'Customers',
                        link: '/home/customers'
                    },
                    {
                        icon: 'bubble_chart',
                        title: 'Coupons',
                        link: '/home/coupons'

                    }],
                miniVariant: false,
                title: ''
            }
        },
        created() {
            this.$store.dispatch(GET_BUSINESSES_REQUEST)
                .then(() => {
                    this.$store.dispatch(GET_BUSINESS_EVENTS);
                    this.$store.dispatch(GET_LOYALTY_CARD_POLICY);
                });

        }
    }
</script>
