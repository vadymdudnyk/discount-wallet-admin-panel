import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from './views/LandingPage'
import Home from './views/Home'
import Business from './views/Business'
import Dashboard from './views/Dashboard'
import Codes from './views/Codes'
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
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: Dashboard,
                },
                {
                    path: 'business',
                    name: 'business',
                    component: Business,
                },
                {
                    path: 'codes',
                    name: 'Codes',
                    component: Codes,
                }
            ]
        }
    ]
})

