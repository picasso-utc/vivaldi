import axios from 'axios';

axios.interceptors.response.use( (response) => {
    return response;
 }, (error) => {
    switch (error.response.status) {
        case 403:
            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
            break;
        default:
            return;
    }
    return Promise.reject(error);
 });