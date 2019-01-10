const router = require("koa-router")();
const integration =require(__base+'/controller/integration');

//测试
router.all("/test", integration.test);

module.exports=router