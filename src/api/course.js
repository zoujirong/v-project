import request from '@/utils/request';
import api from './api';
const {
  courseList,
  courseShelve,
  courseDetail,
  courseStudent,
  courseRecommend,
  courseChapter,
  chapterUpdate,
  courseUpdate,
  courseAdd
} = api;

export function queryCourseList(params) {
  return request({
    url: courseList,
    method: 'get',
    params
  });
}

export function updateCourseShelve(params) {
  return request({
    url: courseShelve,
    method: 'post',
    data: params
  });
}
export function getCourseDetail(courseId) {
  return request({
    url: courseDetail,
    method: 'get',
    params: { courseId }
  });
}

export function getCourseStudent(params) {
  return request({
    url: courseStudent,
    method: 'get',
    params
  });
}
export function updateCourseRecommend(params) {
  return request({
    url: courseRecommend,
    method: 'post',
    daat: params
  });
}
export function getCourseChaper(courseId) {
  return request({
    url: courseChapter,
    method: 'get',
    params: { courseId }
  });
}
export function updateCourseChapter(params) {
  return request({
    url: chapterUpdate,
    method: 'post',
    data: params
  });
}

export function addCourse(params) {
  return request({
    url: courseAdd,
    method: 'post',
    data: params
  });
}

export function updateCourse(params) {
  return request({
    url: courseUpdate,
    method: 'post',
    data: params
  });
}
