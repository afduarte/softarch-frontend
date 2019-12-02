import axios from 'axios';
import Bus from '@/bus';
// create an axios instance
const service = axios.create({
  baseURL: '/api', // api base_url
  timeout: 60000, // request timeout
});

// request interceptor
service.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // eslint-disable-line no-param-reassign
  } else {
    Promise.reject(new Error('No token'));
  }
  return config;
},
error => Promise.reject(error));

service.interceptors.response.use(response => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Bus.$emit('logout');
    }
    return Promise.reject(error);
  });

export const api = service;

export const timer = time => new Promise((resolve) => {
  setTimeout(() => resolve(), time);
});

export default { api };
