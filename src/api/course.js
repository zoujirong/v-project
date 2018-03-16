import request from '@/utils/request';
import api from './api';
const { courseList, courseShelve, courseDetail } = api;

export function queryCourseList(params) {
  return request({
    url: courseList,
    type: 'get',
    params
  });
}

export function updateCourseShelve(params) {
  return request({
    url: courseShelve,
    type: 'post',
    params
  });
}
export function getCourseDetail(courseId) {
  return request({
    url: courseDetail,
    type: 'post',
    params: { courseId }
  });
}
