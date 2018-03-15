import request from "@/utils/request";
import api from "./api";
const { courseList } = api;

export function queryCourseList(params) {
  return request({
    url: courseList,
    type: "get",
    params
  });
}
