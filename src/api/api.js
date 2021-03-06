export default {
  //登录
  login: '/admin/login',
  logout: '/admin/logout',
  //课程模块
  courseList: '/course/listCourse', //课程列表
  courseShelve: '/course/courseUnshelve', //课程上下架
  courseDetail: '/course/getCourseById', //单个课程详情
  courseStudent: '/course/listCourseApplyUser', //课程报名的学生列表
  courseRecommend: '/course/recommendCourse', //课程推荐
  courseChapter: '/course/listChapterByCourseId', //课程章节
  courseAdd: '/course/addCourse', //发布课程
  courseUpdate: '/course/editCourse', //更新课程信息
  chapterUpdate: '/course/editCourseChapter', //更新课程章节
  proclamation: '/course/editCourseAnnouncement', //公告管理
  //类目管理
  getListCategory: '/category/listCategory', //类目列表
  addCategory: '/category/addCategory',
  reviseCategory: '/category/editCategory',
  delCategory: '/category/delCategory',
  getCategoryCourse: '/course/listCourse',
  // getCategoryCourse: '/category/listCategoryCourse',
  categoryCourseSort: '/category/setCategoryCourseSort',

  //会员管理
  listUser: '/user/listUser',
  applyCourse: '/user/listUserApplyCourse',

  //banner图接口
  addBanner: '/banner/addBanner',
  editBanner: '/banner/editBanner',
  listBanner: '/banner/listBanner',
  delBanner: '/banner/delBanner',
  setBannerSort: '/banner/sortBanner',
  //营销管理接口
  marketWay: '/market/listMarketWay',
  marketCourse: '/market/listMarketCourse',
  cancelCourseMarketWay: '/market/cancelCourseMarketWay',
  courseMarketWay: '/market/setCourseMarketWay',
  //老师管理
  listTeacher: '/teacher/listTeacher',
  addTeacher: '/teacher/addTeacher',
  editTeacher: '/teacher/editTeacher',
  //订单管理
  listOrder: '/order/listOrder',
  //上传
  uploadParam: '/oss/getToken',

  //新增类目推荐位
  getCategoryRecommend: '/category/setCategoryRecommend',
  // 类目选择
  chooseCate: '/admin/categoryChoose'

  // 取消推荐
};
