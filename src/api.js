import axios from "axios"
const accessToken = localStorage.getItem("accessToken");

export const api = axios.create({
    baseURL: 'https://reqres.in/api/',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
    }
});