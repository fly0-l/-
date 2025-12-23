//导入express
const express=require("express")
//创建路由对象
const router=express.Router()

const userinfoHandler=require("../router_handler/userinfoHandler.js")
//路由处理函数

//
router.post("/add",userinfoHandler.userAdd)
router.post("/allUsers",userinfoHandler.userAll)
router.post("/edit/:id",userinfoHandler.userEdit)
router.post("/delete/:id",userinfoHandler.userDelete)
//导出用户信息对象
module.exports=router