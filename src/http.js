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
            validateStatus: (status) => {
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


export default {
    login,
    register,
    getBusinesses
}
