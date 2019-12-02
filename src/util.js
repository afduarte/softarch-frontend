import axios from 'axios';

// create an axios instance
const service = axios.create({
  baseURL: '/api', // api base_url
  timeout: 60000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // if (user.isLoggedIn()) {
    //   const token = user.token;
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // eslint-disable-line no-param-reassign
    }
    return config;
  },
  (error) => {
    // Do something with request error
    Promise.reject(error);
  },
);

export const api = service;

export default { api };
