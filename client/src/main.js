import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import  axios  from './http'
import '../css/reset.css'
//全局引入element-plus
import ElementPlus,{ ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'

//引用vuex
import store from './store'

axios.defaults.baseURL = '/api'
const app = createApp(App)
//全局挂载axios
app.config.globalProperties.$axios = axios
app.config.globalProperties.$message = ElMessage
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')

// new Vue({
// 	router,
// 	store,
// 	render:h=>h(App)
// }).$mount('#app')
