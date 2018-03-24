import request from '@/utils/request';
import api from './api';
import store from '@/store';
const { upload } = api;

export function getUploadParam(params) {
  return request({
    url: 'http://oss-demo.aliyuncs.com/oss-h5-upload-js-php/php/get.php', //upload,
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
      if (xhr.readyState === 4) {
        if (xhr.status === xhr.DONE) {
          console.log(xhr.responseText);
        }
      }
    };
    xhr.open(url);
    xhr.send(formData);
  });
}
