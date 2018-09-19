import http from '../../http'

export const GET_BUSINESSES_REQUEST = 'GET_BUSINESSES_REQUEST';
export const GET_BUSINESSES_SUCCESS = 'GET_BUSINESSES_SUCCESS';
export const GET_BUSINESSES_FAILURE = 'GET_BUSINESSES_FAILURE';
export const UPDATE_BUSINESSES = 'UPDATE_BUSINESSES';
const state = {
    businesses: [],
    status: '',
};

const getters = {
    businesses: state => state.businesses
};

const actions = {
    [GET_BUSINESSES_REQUEST]: ({commit, dispatch}) => {
        return new Promise(((resolve, reject) => {
            commit(GET_BUSINESSES_REQUEST);
            http.getBusinesses()
                .then(response => {
                    commit(GET_BUSINESSES_SUCCESS, response.data);
                    resolve(response)
                }, error => {
                    commit(GET_BUSINESSES_FAILURE, error);
                    reject(error)
                })
        }))
    },
    [UPDATE_BUSINESSES]: ({commit, dispatch}, businesses) => {
        commit(UPDATE_BUSINESSES, businesses)
    }
};

const mutations = {
    [GET_BUSINESSES_REQUEST]: (state) => {
        state.status = 'businesses requested';
    },
    [GET_BUSINESSES_SUCCESS]: (state, businesses) => {
        state.businesses = businesses;
        state.status = 'success';
    },
    [GET_BUSINESSES_FAILURE]: (state) => {
        state.businesses = [];
        state.status = 'failed to fetch businesses';
    },
    [UPDATE_BUSINESSES]: (state, businesses) => {
        state.businesses = businesses
        state.status = "businesses updated"
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
