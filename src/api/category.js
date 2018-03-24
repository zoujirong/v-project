import request from '@/utils/request';
import api from './api';
const {
  getListCategory,
  addCategory,
  reviseCategory,
  delCategory,
  getCategoryCourse,
  categoryCourseSort
} = api;

//获取类目列表
export function listCategory(param) {
  return request({
    url: getListCategory,
    method: 'get',
    params: param
  });
}

//添加类目
export function categoryAdd(param) {
  return request({
    url: addCategory,
    method: 'post',
    data: param
  });
}
//编辑类目
export function categoryRevise(param) {
  return request({
    url: reviseCategory,
    method: 'post',
    data: param
  });
}
//删除类目
export function CategoryDel(param) {
  return request({
    url: delCategory,
    method: 'GET',
    params: param
  });
}

//获取推荐课程
export function categoryCourse(params) {
  return request({
    url: getCategoryCourse,
    method: 'GET',
    params: params
  });
}

//类目课程排序
export function sortCategoryCourse(param) {
  return request({
    url: categoryCourseSort,
    method: 'POST',
    data: param
  });
}
