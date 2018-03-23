import axios from 'axios';
import { Message } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';
import qs from 'qs';

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30e3 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    config.data = { ...config.data, terminalType: 4 };
    if (store.getters.token) {
      config.headers.authorization = store.getters.token;
    }
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    console.log('axios error:', error); // for debug
    return Promise.reject({
      msg: error.message,
      status: 5000
    });
  }
);

// respone interceptor
service.interceptors.response.use(
  ({ data }) => {
    if (data.status > 0) return Promise.reject(data);
    return data;
  },
  error => {
    console.log('axios error:', error); // for debug
    return Promise.reject({
      msg: error.message,
      status: 5000
    });
  }
);

export default service;
