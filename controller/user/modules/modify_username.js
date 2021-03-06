const query = require(__base + "/config/mysql");
const encryption = require(__base + "/untils/encryption.js");
const decryptToken = require(__base + "/untils/decryptToken");
/**
 * 修改用户名（需要携带token）
 * @param user_id 用户id
 * @param new_user_name 新用户名
 * @param user_password 密码
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  let { user_id } = (await decryptToken(ctx)).data;
  let { new_user_name, user_password } = body;
  if (user_id && user_password && new_user_name) {
    let updateSql = `UPDATE bolg_user SET user_name = ? WHERE user_id=? AND user_password=?`;
    let params = [new_user_name, user_id, encryption(user_password)];
    let data = await query(updateSql, params);
    ctx.body = {
      status: data.affectedRows === 1 ? "success" : "fail",
      message: data.affectedRows === 1 ? "修改成功" : "密码错误"
    };
  } else {
    ctx.status = 400;
    let message = user_id
      ? user_password
        ? "新用户名不能为空"
        : "用户密码不能为空"
      : "用户id不能为空";
    ctx.body = { status: "error", message };
  }
};
