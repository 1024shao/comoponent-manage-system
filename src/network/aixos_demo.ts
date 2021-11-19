import axios from 'axios'
// 通过httbin 网站模拟数据
// axios.get('https://httpbin.org/get').then((res) => {
//   console.log(res)
// })
axios.defaults.baseURL = 'https://httpbin.org'
axios.defaults.timeout = 5000
axios.all([axios.get('get'), axios.post('post')]).then((res) => {
  console.log(res)
})
// 设置请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 这里设置loading动画和token字段
    return config
  },
  (err) => {
    console.log('请求失败')
    return err
  }
)

// 设置响应拦截器
axios.interceptors.response.use(
  (res) => {
    // 对结果进行处理
    return res
  },
  (err) => {
    console.log('服务器相应失败')
    return err
  }
)

axios.get('get').then((res) => {
  console.log(res)
})
