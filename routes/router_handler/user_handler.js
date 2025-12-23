const conn = require("../../config/key.js");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys=require("./config")
// 默认头像
const defaultAvatar = gravatar.url("test@test.com", { s: "200", r: "pg", d: "404" });

const register=(req, res) => {
  try {
    const userInfo = req.body;
    console.log("前端请求 body:", userInfo);

    // 校验必填字段
    if (!userInfo.name || !userInfo.password || !userInfo.email) {
      return res.status(400).json({
        status: 400,
        msg: "用户名、邮箱或密码不能为空"
      });
    }

    // 先检查邮箱是否已注册
    const sqlCheck = "SELECT * FROM user WHERE email = ?";
    console.log("检查邮箱 SQL 参数:", userInfo.email);

    conn.connectMySQL(sqlCheck, [userInfo.email], (result) => {
      try {
        if (result.length > 0) {
          return res.status(400).json({
            status: 400,
            msg: "该邮箱已被注册，请更换邮箱"
          });
        }

        // 密码加密
        const hashedPassword = bcrypt.hashSync(userInfo.password, 10);

        // 插入新用户
        const sqlInsert = "INSERT INTO user SET ?";
        const newUser = {
          email: userInfo.email,
          name: userInfo.name,
          password: hashedPassword,
          identity: userInfo.identity
        };
        console.log("插入用户 SQL 参数:", newUser);

        conn.connectMySQL(sqlInsert, newUser, (insertResult) => {
          try {
            if (insertResult.affectedRows !== 1) {
              return res.status(500).json({
                status: 500,
                msg: "注册失败，请稍后重试"
              });
            }

            // 注册成功
            res.json({
              status: 200,
              msg: "注册成功",
              email: userInfo.email,
              name: userInfo.name,
              identity: userInfo.identity,
              avatar: defaultAvatar
            });
          } catch (insertErr) {
            console.error("插入用户异常:", insertErr);
            res.status(500).json({ status: 500, msg: "服务器内部错误" });
          }
        });
      } catch (checkErr) {
        console.error("检查邮箱异常:", checkErr);
        res.status(500).json({ status: 500, msg: "服务器内部错误" });
      }
    });
  } catch (err) {
    console.error("注册异常:", err);
    res.status(500).json({ status: 500, msg: "服务器内部错误" });
  }
};

// 登录用户
const login = (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("前端请求 body:", req.body);

    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        msg: "邮箱或密码不能为空"
      });
    }

    // 查询用户是否存在
    const sql = "SELECT * FROM user WHERE email = ?";
    console.log("查询用户 SQL 参数:", email);

    conn.connectMySQL(sql, [email], (result) => {
      try {
        if (!result || result.length === 0) {
          return res.status(404).json({
            status: 404,
            msg: "用户不存在!"
          });
        }

        const user = result[0];

        // 验证密码
        bcrypt.compare(password, user.password, (err, isMatch) => {
          try {
            if (err) {
              console.error("bcrypt 比较异常:", err);
              return res.status(500).json({ status: 500, msg: "服务器内部错误" });
            }

            if (!isMatch) {
              return res.status(400).json({
                status: 400,
                msg: "密码错误!"
              });
            }

            // 登录成功，生成 token
            const payload = {
              id: user.email,
              name: user.name,
              email: user.email,
              identity: user.identity
            };

            const token = jwt.sign(payload, keys.jwtSecretKey, { expiresIn: 3600 });

            res.json({
              status: 200,
              msg: "登录成功",
              token: "Bearer " + token,
              user: payload
            });
          } catch (bcryptErr) {
            console.error("bcrypt 内部异常:", bcryptErr);
            res.status(500).json({ status: 500, msg: "服务器内部错误" });
          }
        });
      } catch (queryErr) {
        console.error("查询用户异常:", queryErr);
        res.status(500).json({ status: 500, msg: "服务器内部错误" });
      }
    });
  } catch (err) {
    console.error("登录异常:", err);
    res.status(500).json({ status: 500, msg: "服务器内部错误" });
  }
};


module.exports = { register, login }

