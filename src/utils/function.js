import { pro_token } from '@/constant';

export function getToken() {
  try {
    const obj = JSON.parse(window.localStorage.getItem(pro_token)) || {};
    return obj;
  } catch (e) {
    return {}
  }
}
