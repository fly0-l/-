<template>
	<div class="login">
		<section class="form_container">
			<div class="manage_tip">
				<span class="title">
					米修在线后台管理系统
				</span>
				<div class="contentForm">
				<!-- 提交表单 -->
			       <el-form :model="loginUser"  :rules="rules" ref="loginForm" label-width="80px" class="loginForm">
			         <el-form-item label="邮箱" prop="email">
			             <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
			         </el-form-item>
				     <el-form-item label="密码" prop="password">
				        <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
				     </el-form-item>
			        <el-form-item>
			           <el-button type="primary" class="submit_btn" @click="SubmitForm('loginForm')">登录</el-button>
			        </el-form-item>
					
					<div class="tiparea">
					          <p>还没有账号？现在<router-link to="/register">注册</router-link></p>
					</div>
			    </el-form>
			</div>
			</div>
		</section>
	</div>
</template>

<script setup>
	import { jwtDecode } from "jwt-decode"
	import { reactive, ref} from "vue"
	import { useRouter } from "vue-router"
	import { useStore } from "vuex"
	import { ElMessage } from 'element-plus'
	import axios from "@/http";
	const router = useRouter()
	const store=useStore()
    const loginForm = ref(null)
	// 定义响应式数据
	const loginUser = reactive({
	  email: "",
	  password: ""
	});
	
	// 表单验证规则
	const rules = reactive({
	  email: [
	    {
	      type: "email",
	      required: true,
	      message: "邮箱格式不正确",
	      trigger: "change"
	    }
	  ],
	  password: [
	    { required: true, message: "密码不能为空", trigger: "blur" },
	    { min: 6, max: 30, message: "长度在6-30之间", trigger: "blur" }
	  ]
	});
	
	// 登录事件
	const SubmitForm = () => {
	   const form = loginForm.value;
	   form.validate((valid) => {
	    if (valid) {
	      axios
	        .post("users/login", loginUser)
	        .then((res) => {
	          //   console.log(res);
	          // 登录成功 拿到token 后端做了token
	          //   token
	          const { token } = res.data;
	          //   存储到localStorage
	          localStorage.setItem("mytoken", token);
	          
	          //   解析token
	          const decoded = jwtDecode(token);
	
	          //   token存储到vuex中
	          store.dispatch("setAuthenticated", !isEmpty(decoded));
	          store.dispatch("setUser", decoded);
	
	          // 路由跳转
	          router.push("/");
	        })
	        .catch((err) => {
	         ElMessage.error("登录失败！");
	        });
	    } else {
	      ElMessage({
	        type: "error",
	        message: "错误提交申请",
	      });
	      return false;
	    }
	  });
	};
	
	// 判断是否为空的方法
	const isEmpty = (value) => {
	  return (
	    value === undefined ||
	    value === null ||
	    (typeof value === "object" && Object.keys(value).length === 0) ||
	    (typeof value === "string" && value.trim().length === 0)
	  );
	};

</script>

<style scoped>
	.login{
		position: relative;
		width: 100%;
		height: 100%;
		background: url(../assets/image/background2.png) no-repeat center center;
		background-size: 100% 100%;
	}
	.form_container{
		width: 370px;
		height: 210px;
		position: absolute;
		top: 10%;
		left:34%;
		padding: 25px;
		border-radius: 5px;
		text-align: center;
	}
	.form_container .manage_tip .title{
		font-family: 'Microsoft YaHei';
		font-weight: bold;
		font-size: 26px;
		color: #fff;
	}
	.loginForm{
		margin-top: 20px;
		background-color: rgb(94, 90, 90);
		padding: 30px 40px 20px 30px;
		border-radius: 5px;
		
	}
	
	.loginForm .tiparea {
	    text-align: right;
	    font-size: 12px;
	    color: #fff;
	}
	
	.loginForm .tiparea p a {
	color: #409eff;
	}
	
	.loginForm :deep(.el-form-item__label) {
	color: #fff;
	padding-top: 5px;
	}
	
	.loginForm :deep(.el-input__wrapper) {
	background-color: rgb(94, 90, 90);
	.el-input__inner {
	    color: #fff;
	    padding: 20px 0;
	}
	}
	.submit_btn{
		width: 100%;
	}
</style>