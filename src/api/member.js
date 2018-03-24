import request from '@/utils/request';
import api from './api';
const { listUser, applyCourse } = api;

//获取会员列表
export function getlistUser() {
  return request({
    url: listUser,
    method: 'get'
  });
}

//获取会员报名课程列表
export function getApplyCourse(query) {
  return request({
    url: applyCourse,
    method: 'get',
    params: query
  });
}
