import request from '@/utils/request';
import api from './api';
import store from '@/store';
const { uploadParam } = api;

export function getUploadParam(params) {
  return request({
    url: uploadParam,
    methods: 'get',
    params
  });
}

export function uploadImage(url, params) {
  let formData = new FormData();
  let token = store.getters.token;
  Object.keys(params).forEach(key => {
    formData.append(key, params[key]);
  });
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == xhr.DONE) {
        if (xhr.status == 200) {
          resolve();
        } else {
          reject(JSON.parse(xhr.responseText));
        }
      }
    };
    xhr.open('POST', url);
    xhr.send(formData);
  });
}
