import request from '@/utils/request';
import api from './api';
const { listTeacher, addTeacher, editTeacher } = api;

//获取老师列表
export function teacherList(params) {
  return request({
    url: listTeacher,
    method: 'GET',
    params
  });
}

//添加老师
export function teacherAdd(params) {
  return request({
    url: addTeacher,
    method: 'POST',
    params
  });
}

//编辑老师
export function teacherEdit(params) {
  return request({
    url: editTeacher,
    method: 'POST',
    params
  });
}
