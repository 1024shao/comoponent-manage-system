import { createApp } from 'vue'
import store from './store/index'
import router from './router/index'
import App from './App.vue'
const app = createApp(App)

import { globalRegister } from './global'
import { axiosInstance } from './service/index'

globalRegister(app)
app.use(router)
app.use(store)

app.mount('#app')
axiosInstance.request({
  method: 'GET',
  url: 'get'
})
