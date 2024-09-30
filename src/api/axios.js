import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://smart.owphiyr.com.br',
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  },
});
export default instance;
