import request from '@/utils/request';
import api from './api';
const { login, logout } = api;

export function loginByUsername(data) {
  return request({
    url: login,
    method: 'post',
    data
  });
}

export function logOut() {
  return request({
    url: logout,
    method: 'post'
  });
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}
