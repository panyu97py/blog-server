const svgCaptcha = require("svg-captcha");
const query = require(__base + "/config/mysql");
/**
 * 生成验证码（无需token）
 */
module.exports = async (ctx, next) => {
  const cap = svgCaptcha.create();
  let { data, text } = cap;
  let captcha_id =Date.now().toString(16);
  let sql = `INSERT INTO blog_captcha (captcha_id, captcha_text) VALUES (?,?)`; //sql语句
  let params = [captcha_id,text];//sql参数
  await query(sql, params);
  ctx.body = {captcha_id,data};
};
