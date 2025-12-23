//用户信息处理函数
const conn=require("../../config/key.js")        
const url=require("url")    
//添加用户信息
exports.userAdd=(req,res)=>{
	const fields={}
	const userinfo=req.body
	if(userinfo.name)fields.name=userinfo.name
	if(userinfo.name)fields.age=userinfo.age
	if(userinfo.name)fields.addr=userinfo.addr
	if(userinfo.name)fields.birth=userinfo.birth
	if(userinfo.name)fields.sex=userinfo.sex
	
	const sql='insert into user_info set ?'
	conn.connectMySQL(sql,fields,function(result){
		if(result.affectedRows !== 1 )return res.status(400).json("添加失败")
        res.json(fields)
	})  
}

//查询用户信息
exports.userAll=(req,res)=>{
	const sql='select * from user_info order by id desc'
	conn.client.query(sql,function(err,result){
		if(err)return res.status(400).json(err)
		if(result.length == 0 )return res.status(200).json("查无数据")
		res.json(result)
	})
}

//根据id编辑用户信息
exports.userEdit=(req,res)=>{
	const fields={}
	const userinfo=req.body
	if(userinfo.name)fields.name=userinfo.name
	if(userinfo.name)fields.age=userinfo.age
	if(userinfo.name)fields.addr=userinfo.addr
	if(userinfo.name)fields.birth=userinfo.birth
	if(userinfo.name)fields.sex=userinfo.sex
	
	const sql='update user_info set ? where id=?'
	conn.connectMySQL(sql,[fields,req.params.id],function(result){
		if(result.affectedRows !== 1)return res.status(400).json("编辑失败")
        res.json(fields)
	})
}

//根据id删除信息
exports.userDelete=(req,res)=>{
	const sql='delete from user_info where id=?'
	conn.connectMySQL(sql,req.params.id,function(result){
		if(result.affectedRows !== 1)return res.status(400).json("删除失败")
	    res.json("删除成功")
	})
}