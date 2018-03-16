import request from '@/utils/request';
import api from './api';
const { listTeacher, teacherAdd, editTeacher } = api;

//获取老师列表
export function listTeacher() {
  return request({
    url: getlistTeacher,
    method: 'GET'
  });
}

//添加老师
export function addTeacher() {
  return request({
    url: teacherAdd,
    method: POST,
    param: {}
  });
}

//编辑老师
export function editTeacher() {
  return request({
    url: editTeacher,
    method: 'POST',
    param: {}
  });
}
