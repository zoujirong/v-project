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
  courseUpdate
} = api;

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
    type: 'get',
    params: { courseId }
  });
}

export function getCourseStudent(params) {
  return request({
    url: courseStudent,
    type: 'get',
    params
  });
}
export function updateCourseRecommend(params) {
  return request({
    url: courseRecommend,
    type: 'post',
    params
  });
}
export function getCourseChaper(courseId) {
  return request({
    url: courseChapter,
    type: 'get',
    params: { courseId }
  });
}
export function updateCourseChapter(params) {
  return request({
    url: chapterUpdate,
    type: 'post',
    params
  });
}

export function updateCourse(params) {
  return request({
    url: courseUpdate,
    type: 'post',
    params
  });
}
