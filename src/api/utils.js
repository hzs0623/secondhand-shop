import store from "@/store";
import router from "@/router";
import ElementUI from 'element-ui';
import { loadingState } from "@/libs/loading";
import { getToken } from "@/utils";

let token = getToken().token;

// 记录和显示错误
export function errorLog(error) {
  // 打印到控制台
  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }
  // 显示提示
  error.message && ElementUI.Message.error(error.message);
}

// 创建一个错误
function errorCreate(msg = '') {
  const error = new Error(msg);
  errorLog(error);
  throw error;
}

export const handleRequest = (config) => {
  const { method, params = {}, headers = {}, loading = true } = config;
  loading && loadingState(loading);
  try {
    const authtoken = store.getters['global/token'] || token;
    if (method === 'get') {
      config.params = {
        ...params,
        _t: Date.now()
      }
    }
    config.headers = {
      ...headers,
      authtoken
    }

    return config;
  } catch (e) {
    console.log(e);
  }
}

export const handleResponse = (response) => {
  const { config, data: axiosData } = response;
  loadingState(false); // 关闭loading
  const { code, msg = ' ', data = {} } = axiosData;
  switch (`${code}`) {
    case '1001':
      return data;
    case '1005':  // 身份有问题登陆
      token = '';
      store.dispatch('/global/setUserInfo', {
        token: '',
        username: ''
      })
      if (router.currentRoute.path !== "/login") {
        router.replace({
          path: "/login"
        });
      }
      return Promise.reject(msg);
    default:
      errorCreate(`${msg}`);
      return Promise.reject(msg);
  }
}