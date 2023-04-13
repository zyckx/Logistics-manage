import axios, {
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosError,
} from "axios";

// 创建axios实例
const service = axios.create({
  baseURL: "/api",
  timeout: 5000,
  withCredentials: true,
});
// axios请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
// axios响应拦截器
service.interceptors.response.use((response: AxiosResponse) => {
  return response;
});
export type { AxiosRequestConfig, AxiosResponse, AxiosError };
export default service;
