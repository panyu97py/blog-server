const jwt = require("jsonwebtoken");
const { secret, tokenValidityPeriod } = require(__base + "/config/jwtKoa");
const query = require(__base + "/config/mysql");
/**
 * 用户登陆
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  let { username, password } = body;
  if (username && password) {
    let sql = `SELECT user_id,user_name,user_nickname FROM bolg_user WHERE user_name=? AND user_password=?`; //sql语句
    let params = [username, password]; //参数
    let query_results = await query(sql, params);
    if (query_results.length === 1) {
      let { user_id, user_name, user_nickname } = query_results[0];
      let user_info = {
        user_id,
        user_name,
        user_nickname
      };
      const token = jwt.sign(user_info, secret, {
        expiresIn: tokenValidityPeriod
      });
      ctx.body = { token };
    } else {
      ctx.body = { type: "fail", message: "账户或密码错误" };
    }
  } else {
    ctx.status = 400;
    ctx.body = { type: "error", message: "参数错误" };
  }
};
