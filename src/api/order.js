import request from '@/utils/request';
import api from './api';
const { listOrder } = api;

//订单管理
export function orderList(params) {
  return request({
    url: listOrder,
    method: 'GET',
    params
  });
}
