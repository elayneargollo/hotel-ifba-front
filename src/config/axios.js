import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/';

const api = axios.create({
    baseURL: baseURL,
    // headers: {"Access-Control-Allow-Origin": "*"},
    // headers: {'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'},
    // headers: {'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD'},
    // headers: {'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD'},
    // headers: {'X-Powered-By': ''},
    //headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
    // headers: { 'Content-Type': 'application/json' },

    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },


});

export default api;
