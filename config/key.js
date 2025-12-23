//数据库连接
//连接数据库，提供数据库操作方法
const mysql=require('mysql');
const client=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"123456",
	database:"vueproject"
})


//query:执行数据库语句的方法
//sql:数据库语句 ，arr：数据库语句的参数
//query: 执行数据库语句的方法
//sql: 数据库语句 ，arr: 数据库语句的参数
function connectMySQL(sql, arr, callback) {
	client.query(sql, arr, function(err, result) {
		// 不要 return，直接把 err 和 result 都传出去
		callback(err, result);
	});
}
module.exports={connectMySQL,client}

