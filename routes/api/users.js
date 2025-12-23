//使用路由来实现get和post方法
const express = require('express')
const router=express.Router();
const url=require("url");
const passport=require("passport")
const userHandler=require("../router_handler/user_handler.js")
const jwt_de=require("jwt-decode")

// token="Bearer Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6Im1vbW8xIiwiaWRlbnRpdHkiOiLnlKjmiLciLCJpYXQiOjE3MzI3ODU4NjMsImV4cCI6MTczMjgyMTg2M30.sjAhv4DEbdBZV-Kd1ubwZJw7zdC-kxELcwtL6NVEzog"

// console.log(jwt_de.jwtDecode(token))
console.log(userHandler)
//监听服务器运行
const port = 5000
//配置服务器访问地址(路由)
// api/users/register
// @desc 返回的请求的json数据
// @access public
router.post('/register', userHandler.register)


// api/users/login
// @desc 返回token jwt passport
// @access public
router.post('/login',userHandler.login)
// passport.authenticate('jwt',{session:false}),
router.get('/current',(req,res)=>{
	console.log(req.headers); // 这将打印出请求头，包括Authorization头（如果存在）
	// console.log(jwt_de.jwtDecode(token))
	console.log(req.user); // 这将打印出解码后的JWT payload（如果验证成功）
	res.json({
	    msg: "success",
	    user: "kk"
		}) // 可选：将用户信息返回给客户端
})

module.exports=router