const jwt = require("jsonwebtoken");
const { secret, tokenValidityPeriod } = require(__base + "/config/jwtKoa");
const query = require(__base + "/config/mysql");
const encryption = require(__base + "/untils/encryption.js");

/**
 * 用户登陆（无需携带token）
 * @param user_name 用户名
 * @param user_password 密码
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  const { user_name, user_password } = body;
  if (user_name && user_password) {
    let sql = `SELECT user_id,user_name,user_nickname,user_email FROM bolg_user WHERE user_name=? AND user_password=?`; //sql语句
    let params = [user_name, encryption(user_password)]; //参数
    let query_results = await query(sql, params);
    if (query_results.length === 1) {
      let { user_id, user_name, user_nickname, user_email } = query_results[0];
      let user_info = {
        user_id,
        user_name,
        user_nickname,
        user_email
      };
      const token = jwt.sign(user_info, secret, {
        expiresIn: tokenValidityPeriod
      });
      ctx.body = { status: "success", message: "用户名、密码校验成功", data:token };
    } else {
      ctx.status = 401;
      ctx.body = { status: "fail", message: "账户或密码错误" };
    }
  } else {
    ctx.status = 400;
    let message = user_name ? "密码不能为空" : "用户名不能为空";
    ctx.body = { status: "error", message };
  }
};
