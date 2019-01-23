const query = require(__base + "/config/mysql");
const decryptToken = require(__base + "/untils/decryptToken");
/**
 * 修改用户信息（需要携带token）
 * @param user_id 用户id
 * @param user_nickname 用户昵称
 * @param user_email 用户邮箱地址
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  let { user_id } = (await decryptToken(ctx)).data;
  const { user_nickname, user_email } = body;
  if (user_id) {
    let updateSql = `UPDATE bolg_user SET user_nickname = ?,user_email=? WHERE user_id=?`;
    let params = [user_nickname, user_email, user_id];
    let update_query_results = await query(updateSql, params);
    let status = update_query_results.affectedRows === 1;
    ctx.body = status
      ? { status: "success", message: "修改成功" }
      : {
          status: "fail",
          message: "修改失败，如有疑问请联系管理员"
        };
  } else {
    ctx.status = 400;
    ctx.body = { status: "error", message: "用户id不能为空" };
  }
};
