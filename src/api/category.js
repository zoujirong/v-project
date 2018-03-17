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
export function listCategory(pagination) {
  return request({
    url: getListCategory,
    method: 'get',
    param: { pagination }
  });
}

//添加类目
export function categoryAdd(categoryName) {
  return request({
    url: addCategory,
    method: 'post',
    param: { categoryName }
  });
}
//修改类目
export function categoryRevise(categoryId, categoryName) {
  return request({
    url: reviseCategory,
    method: 'post',
    param: {}
  });
}
//删除类目
export function CategoryDel(categoryId) {
  return request({
    url: delCategory,
    method: 'GET',
    param: { categoryId }
  });
}

//获取推荐课程
export function categoryCourse() {
  return request({
    url: getCategoryCourse,
    method: 'GET'
  });
}

//类目课程排序
export function sortCategoryCourse(courserId, weight) {
  return request({
    url: categoryCourseSort,
    method: 'POST',
    param: {}
  });
}
