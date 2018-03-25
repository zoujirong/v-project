import request from '@/utils/request';
import api from './api';
const { listTeacher, addTeacher, editTeacher } = api;

//获取老师列表
export function teacherList(param) {
  return request({
    url: listTeacher,
    method: 'GET',
    params: param
  });
}

//添加老师
export function teacherAdd(param) {
  return request({
    url: addTeacher,
    method: 'POST',
    data: param
  });
}

//编辑老师
export function teacherEdit(param) {
  return request({
    url: editTeacher,
    method: 'POST',
    data: param
  });
}
