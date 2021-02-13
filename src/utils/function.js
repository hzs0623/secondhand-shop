import { pro_token } from './var';

export function getToken() {
  try {
    const obj = JSON.parse(window.localStorage.getItem(pro_token)) || {};
    return obj;
  } catch (e) {
    console.log(e);
  }
}
