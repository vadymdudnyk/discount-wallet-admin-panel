import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from './views/LandingPage'
import Home from './views/Home'
import store from './store'


Vue.use(Router);

const isAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
        return
    }
    next('/')
};

const isNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return
    }
    next('/home')
};

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'landingPage',
            component: LandingPage,
            beforeEnter: isNotAuthenticated
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            beforeEnter: isAuthenticated,
        }
    ]
})

