/**
 * 验证码模块
 */
const router = require("koa-router")();
const captcha =require(__base+'/controller/captcha');

 //生成验证码
router.get('/',captcha.generate_captcha)

//校验验证码
router.post('/',captcha.check_captcha)

module.exports =router