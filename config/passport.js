require('dotenv').config()
const mysql = require('mysql')
//实现数据分离
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt
const keys=require("../routes/router_handler/config")
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.jwtSecretKey
// opts.issuer = 'accounts.examplesoft.com'
// opts.audience = 'yoursite.net'

module.exports =passport=>{
	passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
		console.log("执行到这里")
	    console.log(jwt_payload)
		return done(null, jwt_payload)
	}))
}