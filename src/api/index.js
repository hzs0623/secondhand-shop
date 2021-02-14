import axios from 'axios';
import { handleResponse, handleRequest } from './utils';
import { apiUrl } from '@/utils/var';


// 创建一个 axios 实例
const service = axios.create({
  baseURL: apiUrl,
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
