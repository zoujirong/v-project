import Mock from "mockjs";
import loginAPI from "./login";
import articleAPI from "./article";
import remoteSearchAPI from "./remoteSearch";
import transactionAPI from "./transaction";
import qs from "qs";

function mock(url, type, fn) {
  function wrap(fn) {
    return function(config) {
      config.body = JSON.stringify(qs.parse(config.body));
      return { status: 0, data: fn(config) };
    };
  }
  if (typeof fn === "function") {
    fn = wrap(fn);
  } else if (typeof type === "function") {
    type = wrap(type);
  }
  Mock.mock(url, type, fn);
}

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
mock(/\/login\/login/, "post", loginAPI.loginByUsername);
mock(/\/login\/logout/, "post", loginAPI.logout);
mock(/\/user\/info\.*/, "get", loginAPI.getUserInfo);

// 文章相关
mock(/\/article\/list/, "get", articleAPI.getList);
mock(/\/article\/detail/, "get", articleAPI.getArticle);
mock(/\/article\/pv/, "get", articleAPI.getPv);
mock(/\/article\/create/, "post", articleAPI.createArticle);
mock(/\/article\/update/, "post", articleAPI.updateArticle);

// 搜索相关
mock(/\/search\/user/, "get", remoteSearchAPI.searchUser);

// 账单相关
mock(/\/transaction\/list/, "get", transactionAPI.getList);

export default Mock;
