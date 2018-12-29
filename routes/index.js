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

//验证码模块
const captcha =require('./captcha')
router.use('/captcha',captcha.routes(),captcha.allowedMethods());

//测试模块
const test = require("./test");
router.use("/test", test.routes(), test.allowedMethods());

//标签模块
const label = require("./label");
router.use("/label",label.routes(),label.allowedMethods())

//分类模块
const sort = require("./sort");
router.use("/sort",sort.routes(),sort.allowedMethods())

//博文模块
const article = require("./article");
router.use("/article",article.routes(),article.allowedMethods())

module.exports = router;
