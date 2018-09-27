import axios from 'axios';

const url = process.env.VUE_APP_BACKEND_URL;

function login(username, password) {
    return axios.post(url + '/users/authentications', {
        username, password
    })
}

function register(email, phoneNumber, password) {
    return axios(
        {
            method: 'post',
            url: url + '/users/merchants',
            data: {
                email,
                phoneNumber,
                password
            },
            validateStatus: () => {
                return true;
            }
        }
    );
}

function getBusinesses() {
    return axios({
        method: 'get',
        url: url + '/businesses',
    });
}

function getBusinessCampaigns(businessId) {
    return axios({
        method: 'get',
        url: url + `/businesses/${businessId}/campaigns`
    })
}

function createCampaign(businessId, campaignType, couponType, maxUsages, description, expirationTime) {
    return axios({
        method: 'post',
        url: url+ `/businesses/${businessId}/campaigns`,
        data: {
            businessId,
            campaignType,
            couponType,
            maxUsages,
            description,
            expirationTime
        }
    })
}

function getCouponTypes() {
    return axios({
        method:'get',
        url: url + '/enums/coupon-types'
    })
}

function getCampaignTypes() {
    return axios({
        method:'get',
        url: url + '/enums/campaign-types'
    })
}

function getBusinessCustomers(businessId) {
    return axios({
        method:'get',
        url: `${url}/businesses/${businessId}/customers`
    })
}


export default {
    login,
    register,
    getBusinesses,
    getBusinessCampaigns,
    getCouponTypes,
    getCampaignTypes,
    createCampaign,
    getBusinessCustomers
}
