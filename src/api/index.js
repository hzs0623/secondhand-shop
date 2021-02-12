import axios from 'axios';
import { handleResponse, handleRequest } from './utils';


// 创建一个 axios 实例
const service = axios.create({
  baseURL: 'http://127.0.0.1:3333',
});

// 请求拦截器
service.interceptors.request.use(config => {
  return handleRequest(config);
}, error => {
  Promise.reject(error);
})

// 响应拦截器
service.interceptors.response.use(
  response => {
    return handleResponse(response);
  },
  error => {
    Promise.reject(error);
  }
)

export default service; // 4. 导出请求
