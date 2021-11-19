import { createApp } from 'vue'
import store from './store/index'
import router from './router/index'
import './network/aixos_demo'
import App from './App.vue'
const app = createApp(App)

import { globalRegister } from './global'
globalRegister(app)
// app.use(globalRegister)
app.use(router)
app.use(store)

app.mount('#app')
console.log(process.env.VUE_APP_BASE_URL)
