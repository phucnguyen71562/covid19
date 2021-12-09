import config from 'app/config';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
  const customHeaders: any = {};

  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    customHeaders.Authorization = accessToken;
  }

  return {
    ...config,
    headers: {
      ...customHeaders,
      ...config.headers,
    },
  };
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
