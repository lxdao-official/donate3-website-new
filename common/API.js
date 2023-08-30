/* eslint-disable no-undef */
import axios from 'axios';
import { getLocalStorage } from '../utils/utility';

if (typeof window !== 'undefined') {
  const accessToken = getLocalStorage('accessToken');
  const address = getLocalStorage('address');
  axios.defaults.headers.common['token'] = accessToken;
  axios.defaults.headers.common['address'] = address;
}

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_API_NEW;

function refreshAPIToken() {
  if (typeof window !== 'undefined') {
    const accessToken = getLocalStorage('accessToken');
    const address = getLocalStorage('address');
    axios.defaults.headers.common['token'] = accessToken;
    axios.defaults.headers.common['address'] = address;
  }
}

export { refreshAPIToken };
export default axios;
