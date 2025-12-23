import { createRouter, createWebHistory } from 'vue-router'
// import MainVue from '@/views/Main.vue'
const routes = [
  {
    path: '/',
    redirect: "/index"
  },
  {
    path: '/index',
	name:'index',
    component: () => import("../views/index.vue"),
	children:[
		{
			path:'',
			component:()=>import("../views/Home.vue")
		},
		{
			path:'/home',
			name:'home',
			component:()=>import("../views/Home.vue")
		},
		{
			path:'/infoshow',
			name:'infoshow',
			component:()=>import("../views/infoshow.vue")
		},
		{
			path:'/fundlist',
			name:'fundlist',
			component:()=>import("../views/FundList.vue")
		}
	]
  },
  {
	  path: '/register',
	  name:'register',
	  component: () => import("../views/register.vue")
  },
  {
	  path:'/:catchAll(.*)',
	  name:'notfound',
	  component:() => import("../views/404.vue")
  },
  {
	  path: '/login',
	  name:'login',
	  component: () => import("../views/login.vue")
  }
  
]



export default routes