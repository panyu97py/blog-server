/**
 * 集合所有子路由
 */
const router = require("koa-router")();

//添加用户模块至路由表
const users = require("./user");
router.use("/user", users.routes(), users.allowedMethods());
router.all("/", async ctx => {
  await ctx.render("index");
});

//添加验证码模块
const captcha =require('./captcha')
router.use('/captcha',captcha.routes(),captcha.allowedMethods());

// 添加测试模块
const test = require("./test");
router.use("/test", test.routes(), test.allowedMethods());

module.exports = router;
