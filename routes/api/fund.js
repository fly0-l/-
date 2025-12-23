const express = require('express')
const router = express.Router()
const passport = require('passport')

const fundsHandler = require('../router_handler/fundHandler')

// 新增资金记录（必须登录）
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  fundsHandler.fundsAdd
)

// 查询当前用户所有资金记录
router.get(
  '/allFunds',
  passport.authenticate('jwt', { session: false }),
  fundsHandler.fundsAll
)

// 编辑资金记录（只能编辑自己的）
router.post(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  fundsHandler.fundsEdit
)

// 删除资金记录（只能删除自己的）
router.post(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  fundsHandler.fundsDelete
)

module.exports = router
