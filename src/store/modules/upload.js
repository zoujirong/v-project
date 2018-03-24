import { getUploadParam } from '@/api/common';
import { parseTime } from '@/utils';
import Cookies from 'js-cookie';

let EXPIRE_NAME = 'upload-param';
const getParam = () => {
  let param = Cookies.get(EXPIRE_NAME);
  if (param) {
    return JSON.parse(param);
  }
  return '';
};
const upload = {
  state: {
    uploadParam: getParam()
  },
  mutations: {
    SET_PARAM(state, uploadParam) {
      let { expire } = uploadParam;
      let ymd = parseTime(+new Date(), '{y}-{m}-{d}');
      let his = parseTime(expire, '{h}:{i}:{s}');
      let expires = new Date(`${ymd} ${his}`);
      Cookies.set(EXPIRE_NAME, JSON.stringify(uploadParam), { expires });
      state.uploadParam = uploadParam;
    }
  },
  actions: {
    GetUploadParam({ commit, state }) {
      return getUploadParam().then(res => {
        let data = res.data;
        commit('SET_PARAM', data);
        return data;
      });
    }
  }
};

export default upload;
