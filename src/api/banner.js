import request from "@/utils/request";
import api from "@/api/api.js";

// banner图列表
export function listBanner(query) {
  return request({
    url: listBanner,
    method: "get",
    params: query
  });
}

//新增banner图
export function addBanner(query) {
  return request({
    url: addBanner,
    method: "post",
    params: query
  });
}

//编辑banner图
export function editBanner(query) {
  return request({
    url: editBanner,
    method: "post",
    params: query
  });
}

//删除banner图
export function delBanner(query) {
  return request({
    url: delBanner,
    method: "post",
    params: query
  });
}

//排序上下移banner图
export function setBannerSort(query) {
  return request({
    url: setBannerSort,
    method: "post",
    params: query
  });
}

//营销管理获取营销课程列表
export function listMarketCourse(query) {
  return request({
    url: listMarketCourse,
    method: "get",
    params: query
  });
}

//取消课程营销方式
export function cancelCourseMarketWay(query) {
  return request({
    url: cancelCourseMarketWay,
    method: "post",
    params: query
  });
}
