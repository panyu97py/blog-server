const svgCaptcha = require("svg-captcha");
const query = require(__base + "/config/mysql");
module.exports = async (ctx, next) => {
  const cap = svgCaptcha.create();
  let { data, text } = cap;
  let id =Date.now().toString(16);
  let sql = `INSERT INTO blog_captcha (captcha_id, captcha_text) VALUES (?,?)`; //sql语句
  let params = [id,text];
  await query(sql, params);
  ctx.body = {id,data};
};
