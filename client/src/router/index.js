import { createRouter, createWebHistory} from 'vue-router'
import routes from './router_config.js'
 
 // 配置信息
const router = createRouter({
	routes:routes,
    history: createWebHistory(import.meta.env.BASE_URL)// createWebHistory => 不带#号,需后端支持  createWebHashHistory带#号
    
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.mytoken ? true : false
  if (to.path == "/login" || to.path == '/register') {
    next()
  } else {
    isLogin ? next() : next("/login")
  }
})

export default router;

