import request from "@/utils/request";
import {
  addBanner,
  editBanner,
  listBanner,
  delBanner,
  setBannerSort,
  listMarketCourse,
  cancelCourseMarketWay
} from "@/api/api.js";

// banner图列表
export function getListBanner(query) {
  return request({
    url: listBanner,
    method: "get",
    params: query
  });
}

//新增banner图
export function getAddBanner(query) {
  return request({
    url: addBanner,
    method: "post",
    params: query
  });
}

//编辑banner图
export function getEditBanner(query) {
  return request({
    url: editBanner,
    method: "post",
    params: query
  });
}

//删除banner图
export function getDelBanner(query) {
  return request({
    url: delBanner,
    method: "post",
    params: query
  });
}

//排序上下移banner图
export function getSetBannerSort(query) {
  return request({
    url: setBannerSort,
    method: "post",
    params: query
  });
}

//营销管理获取营销课程列表
export function getListMarketCourse(query) {
  return request({
    url: listMarketCourse,
    method: "get",
    params: query
  });
}

//取消课程营销方式
export function getCancelCourseMarketWay(query) {
  return request({
    url: cancelCourseMarketWay,
    method: "post",
    params: query
  });
}
