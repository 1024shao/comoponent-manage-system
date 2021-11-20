import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ElLoading } from 'element-plus'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
import { color } from 'echarts'

const DEFAULT_LOADING = false
interface HYRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: AxiosRequestConfig) => AxiosRequestConfig
  responseInterceptorCatch?: (err: any) => any
}

interface HYRequestConfig extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors
  showLoading?: boolean
}

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config)
    // 是否展示请求loading动画
    this.showLoading = config.showLoading || DEFAULT_LOADING
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
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            background: 'rgba(0,0,0,.5)',
            text: '正在加载中 . . . 请稍后'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        setTimeout(() => {
          this.loading?.close()
        }, 2000)
        return res.data
      },
      (err) => {
        this.loading?.close()
        return err
      }
    )
  }

  // <T> 设置promise 返回结果的类型
  request<T>(config: HYRequestConfig): Promise<T> {
    // 封装成一个promise对象,这样可以自定义处理数据
    return new Promise((resolve, reject) => {
      // if (config.interceptors?.requestInterceptor) {
      //   config = config.interceptors.requestInterceptor(config)
      // }
      // 实例是否需要请求拦截器
      if (config.showLoading === false) {
        this.showLoading = false
      }
      this.instance.request<any, T>(config).then(
        (res) => {
          // if (config.interceptors?.responseInterceptor) {
          //   res = config.interceptors.responseInterceptor(res)
          // }
          // console.log(res)
          resolve(res)
          // 恢复默认值,不影响下一个请求
          this.showLoading = DEFAULT_LOADING
        },
        (err) => {
          reject(err)
        }
      )
    })
  }
  get<T>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
