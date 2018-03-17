import request from '@/utils/request';
import api from './api';
const {
  marketWay,
  listMarketCourse,
  cancelCourseMarketWay,
  courseMarketWay
} = api;

//获取营销方式
export function getMarketWay(query) {
  return request({
    url: marketWay,
    method: 'get',
    params: query
  });
}

//营销管理获取营销课程列表
export function getListMarketCourse(query) {
  return request({
    url: listMarketCourse,
    method: 'get',
    params: query
  });
}

//取消课程营销方式
export function getCancelCourseMarketWay(query) {
  return request({
    url: cancelCourseMarketWay,
    method: 'post',
    params: query
  });
}

//设置课程营销方式
export function setCourseMarketWay(query) {
  return request({
    url: courseMarketWay,
    method: 'post',
    params: query
  });
}
