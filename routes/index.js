/**
 * 集合所有子路由
 */
const router = require('koa-router')()
const users =require('./users')
//添加用户模块至路由表
router.use('/users', users.routes(), users.allowedMethods());

module.exports = router
