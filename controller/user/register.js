const query = require(__base + "/config/mysql");
const encryption =require (__base+"/untils/encryption.js")
/**
 * 用户注册（无需携带token）
 * @param user_name 用户名
 * @param user_password 密码
 * @param user_nickname 昵称
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  const { user_name, user_password, user_nickname } = body;
  if (user_name && user_password) {
    let sql = `INSERT INTO bolg_user (user_id,user_name, user_password,user_nickname) VALUES (REPLACE(UUID(),"-",""),?,?,?)`; //sql语句
    let params = [user_name, encryption(user_password), user_nickname];
    await query(sql, params);
    ctx.body = { type: "success", message: "注册成功" };
  } else {
    ctx.status = 400;
    let message = user_name ? "密码不能为空" : "用户名不能为空";
    ctx.body = { type: "error", message };
  }
};
