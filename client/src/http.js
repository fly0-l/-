import axios from 'axios'
import { ElLoading,ElMessage } from 'element-plus'
import router from '@/router' 

//加载动画
let loading;
function startLoading(){
	loading=ElLoading.service({
		//lock为true，全屏加载
		lock:true,
		text:"拼命加载中ing...",
		background:'rgba(0,0,0,0,7)'
	})
}

//结束加载
function endLoading(){
	loading.close();
}

//请求拦截
axios.interceptors.request.use(config=>{
	//加载动画
	startLoading();
	
	if (localStorage.mytoken) {
	        // 设置统一的请求头 header
	        config.headers.Authorization = localStorage.mytoken
	    }
		
	return config;
},error=>{
	return Promise.reject(error)
})

//响应拦截
axios.interceptors.response.use(response=>{
	//结束动画
	endLoading();
	return response;
},error=>{
   //错误提醒
    endLoading();
    ElMessage.error(error.response.data)
	
	// 获取错误状态码
	    const { status } = error.response
	    if (status == 401) {
	        ElMessage.error("token失效，请重新登录")
	        // 清除token
	        localStorage.removeItem('mytoken')
	        // 重新跳转登录页面
	        router.push("/login")
	    }
	
	return Promise.reject(error)
})

export default axios;