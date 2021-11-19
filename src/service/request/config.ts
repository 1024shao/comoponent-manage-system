// 配置环境
//  开发 development
//  生产 production
//  测试 test
let BASE_URL = ''
const TIME_OUT = 5000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'https://httpbin.org'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http:..........'
} else {
  BASE_URL = 'http:..........'
}

export { BASE_URL, TIME_OUT }
