/**
 * Sends an HTTP request to the API.
 */

import {config} from './Config'
import axios from 'axios';


const defaultConfig = {withCredentials: true}

function ajaxGet(path) {
    return axios.get(config.urls.API_URL + path, defaultConfig);
}

function ajaxPost(path, data) {
    return axios.post(config.urls.API_URL + path, data, defaultConfig);
}

function ajaxPut(path, data) {
    return axios.put(config.urls.API_URL + path, data, defaultConfig);
}

function ajaxPatch(path, data) {
    return axios.patch(config.urls.API_URL + path, data, defaultConfig);
}

function ajaxDelete(path) {

    return axios.delete(config.urls.API_URL + path, defaultConfig);
}


export { ajaxGet, ajaxPost, ajaxPut, ajaxDelete, ajaxPatch };
