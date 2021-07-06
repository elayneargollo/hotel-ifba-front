import axios from 'axios';

const baseURL = 'https://hotelifba.herokuapp.com/';

const api = axios.create({
    baseURL: baseURL
});

export default api;
