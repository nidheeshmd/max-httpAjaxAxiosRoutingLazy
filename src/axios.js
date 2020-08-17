import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authorization']= 'AUTH TOKEN FROM INSTANCE';

export default instance;

//we are using this on Blog.js