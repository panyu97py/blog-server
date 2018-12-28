const router = require("koa-router")();
const captcha =require(__base+'/controller/captcha');
/**
 * 验证码模块
 */
router.get('/',captcha.generate_captcha)
router.post('/',captcha.check_captcha)

module.exports =router