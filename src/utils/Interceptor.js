import axios from 'axios';
import { asset_url } from './Config';

const uncaught_path = [
    asset_url("/login"),
    asset_url("/menu")
]

axios.interceptors.response.use( (response) => {
    return response;
 }, (error) => {
    switch (error.response.status) {
        case 403:
            if (uncaught_path.indexOf(window.location.pathname)==-1) {
                const redirection = '/login?redirect=' + window.location.pathname;
                window.location.href = redirection;
            }
            break;
        default:
            return Promise.reject(error);
    }
    return Promise.reject(error);
 });