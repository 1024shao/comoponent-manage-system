import { createApp } from 'vue'
import store from './store/index'
import router from './router/index'
import App from './App.vue'
const app = createApp(App)

import { globalRegister } from './global'
// 引入路由
app.use(globalRegister)
app.use(router)
app.use(store)

app.mount('#app')
