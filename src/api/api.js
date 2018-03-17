export default {
  login: '/login/login',
  logout: '/login/logout',
  //课程模块
  courseList: '/course/listCourse', //课程列表
  courseShelve: '/course/courseUnshelve', //课程上下架
  courseDetail: '/course/getCourseById', //单个课程详情
  courseStudent: '/course/listCourseApplyUser', //课程报名的学生列表
  courseRecommend: '/course/recommendCourse', //课程推荐
  courseChapter: '/course/listChapterByCourseId', //课程章节
  courseUpdate: '/course/editCourse', //更新课程信息
  chapterUpdate: '/course/editCourseChapter', //更新课程章节
  //类目管理
  getListCategory: '/category/listCategory',
  addCategory: '/category/addCategory',
  reviseCategory: '/category/editCategory',
  delCategory: '/category/delCategory',
  getCategoryCourse: '/category/listCategoryCourse',
  categoryCourseSort: '/category/setCategoryCourseSort',

  //会员管理
  listUser: '/user/listUser',
  applyCourse: '/user/listUserApplyCourse',

  //banner图接口
  addBanner: '/banner/addBanner',
  editBanner: '/banner/editBanner',
  listBanner: '/banner/listBanner',
  delBanner: '/banner/delBanner',
  setBannerSort: '/banner/setBannerSort',
  //营销管理接口
  listMarketCourse: '/market/listMarketCourse',
  cancelCourseMarketWay: '/market/cancelCourseMarketWay',
  //老师管理
  getlistTeacher: '/teacher/listTeacher',
  teacherAdd: '/teacher/addTeacher',
  editTeacher: '/teacher/editTeacher'
};
