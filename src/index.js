import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL='https://jsonplaceholder.typicode.com'; //ONLY IF THE STARTING OF API IS SAME
axios.defaults.headers.common['Authorization']= 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => { // for request
    console.log(request);
    //edit request config like headers etc...
    return request; // if not return request, you are blocking the all other axios requests.
}, error => {
    console.log(error);
    return Promise.reject(error); // still work the local requests like UI displaying for error.
});

axios.interceptors.response.use(response => { // for request
    console.log(response);
    //edit request config like headers etc...
    return response; // if not return response, you are blocking the all other axios response.
}, error => {
    console.log(error);
    return Promise.reject(error); // still work the local response like UI displaying for error.
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
