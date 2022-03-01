import Axios from 'axios';

export const axios = Axios.create({
    baseURL: 'http://localhost:8181/api'
});

const responseBody = (response) => response.data;

const request = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody)
};

const Users = {
    add: (patientInfo) => request.post('/users', patientInfo),
    list: () => request.get('/users'),
}

const Auth = {
    login: (user) => request.post('/login', user)
}

const Appointments = {
    add: (event) => request.post('/appointments', event),
    list: () => request.get('/appointments')
}

const apiAgents = {
    Users,
    Appointments,
    Auth
}

export default apiAgents;