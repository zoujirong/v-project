var mock = require('mockjs');
module.exports = {
  '/api/manager/category/listCategory': {
    traceId: 'feb41a5bcd38d3df',
    status: '0',
    msg: '',
    data: {
      totalItem: 22,
      'categoryList|10': [
        {
          num: '@num(1,10)',
          categoryName: '@cstr(1,5)',
          cateImage: mock.Random.image('100X50'),
          recomend: '@time'
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
};
