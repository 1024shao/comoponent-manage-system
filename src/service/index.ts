// service 统一出口

import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
// 暴露网络服务

const axiosInstance = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log('interceptor')
      return config
    },
    responseInterceptorCatch: (err) => {
      console.log(err)
      return err
    }
  }
})

// 其他服务
export { axiosInstance }
