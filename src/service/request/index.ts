import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ElLoading } from 'element-plus'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
interface HYRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: AxiosRequestConfig) => AxiosRequestConfig
  responseInterceptorCatch?: (err: any) => any
}

interface HYRequestConfig extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors
}

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  loading?: ILoadingInstance

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    // 实例化请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 实例化响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    this.instance.interceptors.request.use(
      (config) => {
        this.loading = ElLoading.service({
          lock: true,
          background: 'rgba(0,0,0,.5)'
        })
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        return res.data
      },
      (err) => {
        this.loading?.close()
        return err
      }
    )
  }

  request(config: AxiosRequestConfig) {
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}

export default HYRequest
