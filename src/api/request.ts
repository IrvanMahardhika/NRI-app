import axios from 'axios';
import { API_URL } from 'constants/config';

const request = axios.create({
  baseURL: API_URL
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export default request;
