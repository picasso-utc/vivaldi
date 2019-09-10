import axios from 'axios';
import { asset_url } from './Config';

axios.interceptors.response.use( (response) => {
    return response;
 }, (error) => {
    switch (error.response.status) {
        case 403:
            if (window.location.pathname !== asset_url("/login")) {
                window.location.href = asset_url("/login");
            }
            break;
        default:
            return;
    }
    return Promise.reject(error);
 });