import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';

import axios from 'axios';
import App from './App';

axios.defaults.baseURL = 'http://localhost:8000/api';
window.a = axios

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
