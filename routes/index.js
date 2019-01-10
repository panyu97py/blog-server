/**
 * 集合所有子路由
 */
const router = require("koa-router")();

//添加用户模块至路由表
const users = require("./modules/user");
router.use("/user", users.routes(), users.allowedMethods());
router.all("/", async ctx => {
  await ctx.render("index");
});

//验证码模块
const captcha =require('./modules/captcha')
router.use('/captcha',captcha.routes(),captcha.allowedMethods());

//标签模块
const label = require("./modules/label");
router.use("/label",label.routes(),label.allowedMethods())

//分类模块
const sort = require("./modules/sort");
router.use("/sort",sort.routes(),sort.allowedMethods())

//博文模块
const article = require("./modules/article");
router.use("/article",article.routes(),article.allowedMethods())

//评论模块
const comment = require("./modules/comment");
router.use("/comment",comment.routes(),comment.allowedMethods())

// 请求转发模块
const integration = require("./modules/integration");
router.use("/integration",integration.routes(),integration.allowedMethods())

//测试模块
const test = require("./modules/test")
router.use("/test",test.routes(),test.allowedMethods())

module.exports = router;
