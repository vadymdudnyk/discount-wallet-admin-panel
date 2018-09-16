import axios from "axios";
import http from '../../http'

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const REGISTER_AND_AUTHENTICATE_REQUEST = 'REGISTER_AND_AUTHENTICATE_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_LOGOUT = 'LOG_OUT';

const state = {
    token: localStorage.getItem('token') || '',
    status: '',
};

const getters = {
    isAuthenticated: state => !!state.token
};

const actions = {
    [AUTH_REQUEST]: ({commit, dispatch}, {username, password}) => {
        return new Promise(((resolve, reject) => {
            http.login(username, password)
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    axios.defaults.headers.common['Authorization'] = "Bearer" + " " + response.data.token;
                    commit(AUTH_SUCCESS, response.data.token);
                    resolve(response)
                }, error => {
                    commit(AUTH_ERROR, error);
                    reject(error)
                })
        }))
    },
    [REGISTER_AND_AUTHENTICATE_REQUEST]: ({commit, dispatch}, {email, phoneNumber, password}) => {
        return new Promise(((resolve, reject) => {
            http.register(email, phoneNumber, password)
                .then(response => {
                    if (response.status !== 200) {
                        commit(AUTH_ERROR, response);
                        reject(response)
                    }
                    localStorage.setItem('token', response.data.token);
                    axios.defaults.headers.common['Authorization'] = "Bearer" + " " + response.data.token;
                    commit(AUTH_SUCCESS, response.data.token);
                    resolve(response)
                })
        }))
    },
    [AUTH_LOGOUT]: ({commit, dispatch}) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_LOGOUT);
            localStorage.removeItem('token');
            resolve()
        })
    },
};

const mutations = {
    [AUTH_SUCCESS]: (state, token) => {
        state.status = 'success';
        state.error = '';
        state.token = token;
    },
    [AUTH_ERROR]: (state, error) => {
        state.status = 'error';
        state.error = error;
    },
    [AUTH_LOGOUT]: (state) => {
        state.status = '';
        state.token = ''
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
