import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-c8d97.firebaseio.com/'
});

export default instance;