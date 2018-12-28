const query = require(__base + "/config/mysql");

module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  let { id, captcha } = body;
  if (id && captcha) {
    let sql = `SELECT * FROM blog_captcha WHERE captcha_id=? AND captcha_text=?`; //sql语句
    let params = [id, captcha];
    let query_results = await query(sql, params);
    let status = query_results.length;
    let type = status ? "success" : "fail";
    let message = status ? "验证码校验成功" : "验证码校验失败";
    ctx.body = { type, message };
  } else {
    ctx.status = 400;
    let message = id ? "验证码不能为空" : "验证码id不能为空";
    ctx.body = { type: "error", message };
  }
};
