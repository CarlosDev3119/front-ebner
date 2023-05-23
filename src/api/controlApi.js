
import axios from 'axios';


const controlApi = axios.create({
    baseURL: 'http://localhost:8080/api'
});


// interceptors
controlApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'authorization': localStorage.getItem('token')
    }

    return config;
})

export default controlApi;