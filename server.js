const express=require("express")
const app=express()
const passport=require("passport")


const users=require("./routes/api/users.js")
const userinfo=require("./routes/api/user_info.js")

const fund=require("./routes/api/fund.js")

// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())
app.use(express.urlencoded({ extended: false }))
const bodyParser = require("body-parser")
// 使用body-parse中间件 要放在路由之前
app.use(bodyParser.json())

//passport初始化
app.use(passport.initialize())
require("./config/passport")(passport)

//使用routes
//配置服务器访问地址(路由)
app.use("/api/users",users)
app.use("/api/userinfo",userinfo)
app.use("/api/fund",fund)




app.listen(5000, '0.0.0.0', () => console.log('Server running on 5000'))
