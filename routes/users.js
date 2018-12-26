/**
 * 用户权限模块
 */
const router = require("koa-router")();
const user =require(__base+'/controller/user')

//登陆
router.post("/login", user.login);

module.exports = router;
