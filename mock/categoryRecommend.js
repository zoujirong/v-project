var mock = require('mockjs');
module.exports = {
  '/api/manager/category/listCategory': {
    traceId: 'feb41a5bcd38d3df',
    status: '0',
    msg: '',
    data: {
      total: 5,
      'data|5': [
        {
          num: '@num(1,10)',
          categoryId: '@num(1,10)',
          categoryName: '@cstr(1,5)',
          cover: mock.Random.image('100X50'),
          recommendTime: '@time'
        }
      ]
    }
  },
  // 类目选择
  '/api/admin/categoryChoose': {
    traceId: 'feb41a5bcd38d3df',
    status: '0',
    msg: '',
    data: {
      totalItem: 22,
      'chooesData|10': [
        {
          categoryName: 'Random.cstr(1,5)'
        }
      ]
    }
  }
  // 新增推荐类目
  // '/api/admin/category/setCategoryRecommend': {
  //   traceId: 'feb41a5bcd38d3df',
  //   status: '0',
  //   msg: '',
  //   data: {
  //     totalItem: 22,
  //     'data|10': [
  //       {
  //         categoryName: 'Random.cstr(1,5)'
  //       }
  //     ]
  //   }
  // }
};
