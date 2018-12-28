/**
 * 用户权限模块
 */
const router = require("koa-router")();
const user =require(__base+'/controller/user');


//获取toekn
router.post("/token", user.token);

//用户注册
router.post("/register",user.register);

//修改用户密码
router.post("/modify_password",user.modify_password);

//修改用户信息（如用户昵称、用户email地址等）
router.post("/modify_userInfo",user.modify_userInfo);

//修改用户名
router.post("/modify_username",user.modify_username);

//获取用户信息
router.get("/userInfo", user.userInfo);

//校验用户名（是否存在）
router.get("/check_username", user.check_username);


module.exports = router;
