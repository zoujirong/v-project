import request from '@/utils/request'

//获取类目列表
export function getListCategory() {
    return request({
        url: '/api/minApp/manager/category/listCategory',
        method: 'get',
    })
}