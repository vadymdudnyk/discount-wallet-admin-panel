import http from '../../http'

export const GET_BUSINESSES_REQUEST = 'GET_BUSINESSES_REQUEST';
export const GET_BUSINESSES_SUCCESS = 'GET_BUSINESSES_SUCCESS';
export const GET_BUSINESSES_FAILURE = 'GET_BUSINESSES_FAILURE';
export const UPDATE_BUSINESSES = 'UPDATE_BUSINESSES';
export const SELECT_BUSINESS = 'SELECT_BUSINESS';
const state = {
    businesses: [],
    selectedBusinessId: null,
    status: '',
};

const getters = {
    businesses: state => state.businesses,
    selectedBusiness: state => state.selectedBusinessId
};

const actions = {
    [GET_BUSINESSES_REQUEST]: ({commit}) => {
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
    [UPDATE_BUSINESSES]: ({commit}, businesses) => {
        commit(UPDATE_BUSINESSES, businesses)
    },
    [SELECT_BUSINESS]: ({commit}, businessId) => {
        commit(SELECT_BUSINESS, businessId)
    }
};

const mutations = {
    [GET_BUSINESSES_REQUEST]: (state) => {
        state.status = 'businesses requested';
    },
    [GET_BUSINESSES_SUCCESS]: (state, businesses) => {
        state.businesses = businesses;
        state.selectedBusinessId = businesses.length>0 ? businesses[0].id: undefined;
        state.status = 'success';
    },
    [GET_BUSINESSES_FAILURE]: (state) => {
        state.businesses = [];
        state.status = 'failed to fetch businesses';
    },
    [UPDATE_BUSINESSES]: (state, businesses) => {
        state.businesses = businesses;
        state.status = "businesses updated"
    },
    [SELECT_BUSINESS]: (state, businessId) => {
        state.selectedBusinessId = businessId;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
