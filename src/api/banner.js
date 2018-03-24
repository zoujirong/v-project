import request from '@/utils/request';
import api from './api';
const { addBanner, editBanner, listBanner, delBanner, setBannerSort } = api;

// banner图列表
export function getListBanner(query) {
  return request({
    url: listBanner,
    method: 'get',
    params: query
  });
}

//新增banner图
export function getAddBanner(query) {
  return request({
    url: addBanner,
    method: 'post',
    data: query
  });
}

//编辑banner图
export function getEditBanner(query) {
  return request({
    url: editBanner,
    method: 'post',
    data: query
  });
}

//删除banner图
export function getDelBanner(query) {
  return request({
    url: delBanner,
    method: 'post',
    data: query
  });
}

//排序上下移banner图
export function getSetBannerSort(query) {
  return request({
    url: setBannerSort,
    method: 'post',
    data: query
  });
}
