const query = require(__base + "/config/mysql");
/**
 * 用户注册
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  const { username, password, nickname } = body;
  if (username && password) {
    let sql = `INSERT INTO bolg_user (user_id,user_name, user_password,user_nickname) VALUES (REPLACE(UUID(),"-",""),?,?,?)`; //sql语句
    let params = [username, password, nickname];
    await query(sql, params);
    ctx.body = { type: "success", message: "注册成功" };
  } else {
    ctx.status = 400;
    let message = username ? "密码不能为空" : "用户名不能为空";
    ctx.body = { type: "error", message };
  }
};
