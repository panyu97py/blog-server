/**
 * 测试模块
 */
const router = require("koa-router")();
const test =require(__base+'/controller/test');
router.all("/test",test.lableSelectTest)
module.exports = router