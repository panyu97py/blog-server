/**
 * 测试模块
 */
const router = require("koa-router")();
const test =require(__base+'/controller/test');

//登陆
router.post("/article", test.article);


module.exports = router;