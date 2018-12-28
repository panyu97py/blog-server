const query = require(__base + "/config/mysql");
/**
 * 修改用户信息（需要携带token）
 * @param user_id 用户id
 * @param user_nickname 用户昵称
 * @param user_email 用户邮箱地址
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  const { user_id, user_nickname, user_email } = body;
  if (user_id) {
    let updateSql = `UPDATE bolg_user SET user_nickname = ?,user_email=? WHERE user_id=?`;
    let params = [user_nickname, user_email, user_id];
    await query(updateSql, params);
    ctx.body = { type: "success", message: "修改成功" };
  } else {
    ctx.status = 400;
    ctx.body = { type: "error", message: "用户id不能为空" };
  }
};
