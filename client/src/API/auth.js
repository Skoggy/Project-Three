import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

export function loginAPI(data) {
    return axios.post(`${BASE_URL}/api/login`, data);
}

export function registerAPI(data) {
    return axios.post(`${BASE_URL}/api/signup`, data);
}

export function getUserBaseOnToken(token) {
    return axios.get(`${BASE_URL}/ap/me`, {
        headers: {
            Autorization: "Bearer " + token,
            "Content-Type": "application/json",
        },
    });
};