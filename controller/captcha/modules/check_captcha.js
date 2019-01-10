const query = require(__base + "/config/mysql");
/**
 * 校验验证码（无需携带token）
 * @param captcha_id 验证码id
 * @param captcha_text 用户输入的验证码
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  let { captcha_id, captcha_text } = body;
  if (captcha_id && captcha_text) {
    let sql = `SELECT * FROM blog_captcha WHERE captcha_id=? AND captcha_text=?`; //sql语句
    let params = [captcha_id, captcha_text];
    let query_results = await query(sql, params);
    let deleteSql =` DELETE FROM blog_captcha WHERE captcha_id = ?`
    let deleteParam = [captcha_id]
    await query(deleteSql, deleteParam);
    let status =  query_results.length ? "success" : "fail";
    let message =  query_results.length ? "验证码校验成功" : "验证码校验失败";
    ctx.body = { status, message };
  } else {
    ctx.status = 400;
    let message = captcha_id ? "验证码不能为空" : "验证码id不能为空";
    ctx.body = { status: "error", message };
  }
};
