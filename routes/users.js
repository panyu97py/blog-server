/**
 * 用户权限模块
 */
const router = require("koa-router")();
const user =require(__base+'/controller/user');

//登陆
router.post("/login", user.login);
router.post("/register",user.register);
router.get("/userInfo", user.userInfo);
router.get("/check_username", user.check_username);


module.exports = router;
