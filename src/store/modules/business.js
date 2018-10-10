import http from '../../http'

export const GET_BUSINESSES_REQUEST = 'GET_BUSINESSES_REQUEST';
export const GET_BUSINESSES_SUCCESS = 'GET_BUSINESSES_SUCCESS';
export const GET_BUSINESSES_FAILURE = 'GET_BUSINESSES_FAILURE';
export const UPDATE_BUSINESSES = 'UPDATE_BUSINESSES';
export const SELECT_BUSINESS = 'SELECT_BUSINESS';
export const GET_BUSINESS_EVENTS = 'GET_BUSINESS_EVENTS';
export const GET_LOYALTY_CARD_POLICY = 'GET_LOYALTY_CARD_POLICY';
export const UPDATE_LOYALTY_CARD_POLICY = 'UPDATE_LOYALTY_CARD_POLICY';
const state = {
    businesses: [],
    selectedBusinessId: null,
    business: {},
    events: [],
    loyaltyCardPolicy: {},
    status: '',
};

const getters = {
    businesses: state => state.businesses,
    selectedBusiness: state => state.selectedBusinessId,
    business: state => state.business,
    businessEvents: state => state.events,
    loyaltyCardPolicy: state => state.loyaltyCardPolicy
};

const actions = {
    [GET_BUSINESSES_REQUEST]: ({commit}) => {
        return new Promise(((resolve, reject) => {
            commit(GET_BUSINESSES_REQUEST);
            http.getBusinesses()
                .then(response => {
                    commit(GET_BUSINESSES_SUCCESS, response.data);
                    commit(SELECT_BUSINESS, response.data[0].id);
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
    [SELECT_BUSINESS]: ({commit, dispatch}, businessId) => {
        commit(SELECT_BUSINESS, businessId);
        dispatch(GET_BUSINESS_EVENTS)
    },
    [GET_BUSINESS_EVENTS]: ({commit}) => {
        http.getBusinessEvents(state.selectedBusinessId)
            .then(resp => {
                commit(GET_BUSINESS_EVENTS, resp.data)
            })
    },
    [GET_LOYALTY_CARD_POLICY]: ({commit}) => {
        http.getLoyaltyCardPolicy(state.selectedBusinessId)
            .then(resp => {
                commit(GET_LOYALTY_CARD_POLICY, resp.data)
            })
    },
    [UPDATE_LOYALTY_CARD_POLICY]: ({commit, dispatch}, maxStamps) => {
        return new Promise((resolve, reject) => {
            commit(UPDATE_LOYALTY_CARD_POLICY);
            http.updateLoyaltyCardPolicy({
                businessId: state.selectedBusinessId,
                loyaltyCardPolicyId: state.loyaltyCardPolicy.id,
                maxStamps
            })
                .then(() => {
                    dispatch(GET_LOYALTY_CARD_POLICY);
                    resolve();
                }).catch(() => {
                reject();
            })
        })
    }
};

const mutations = {
    [GET_BUSINESSES_REQUEST]: (state) => {
        state.status = 'businesses requested';
    },
    [GET_BUSINESSES_SUCCESS]: (state, businesses) => {
        state.businesses = businesses;
        state.selectedBusinessId = businesses.length > 0 ? businesses[0].id : undefined;
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
        state.business = state.businesses.filter(business => business.id === businessId)[0]
    },
    [GET_BUSINESS_EVENTS]: (state, events) => {
        state.events = events;
    },
    [GET_LOYALTY_CARD_POLICY]: (state, loyaltyCardPolicy) => {
        state.loyaltyCardPolicy = loyaltyCardPolicy;
    },
    [UPDATE_LOYALTY_CARD_POLICY]: (state) => {
        state.status = 'updating loyalty card policy'
    }

};

export default {
    state,
    getters,
    actions,
    mutations
}
