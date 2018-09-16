import router from "./router";
import axios from 'axios'
import store from './store'
import {AUTH_LOGOUT} from "./store/modules/auth";

const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = "Bearer " + token
}

const UNAUTHORIZED = 401;
axios.interceptors.response.use(
    response => response,
    error => {
        const {status} = error.response;
        if (status === UNAUTHORIZED) {
            console.log("Handling unauthorized");
            router.push('/');
            store.dispatch(AUTH_LOGOUT);
            return Promise.reject(error);
        }
    }
);

function init() {

}


export default {
    init
}
