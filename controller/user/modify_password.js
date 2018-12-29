const query = require(__base + "/config/mysql");
const encryption = require(__base + "/untils/encryption.js");
/**
 * 修改用户密码 (需要携带token)
 * @param user_name 用户名
 * @param original_user_password 原密码
 * @param new_user_password 新密码
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  const { user_name, original_user_password, new_user_password } = body;
  if (
    user_name &&
    original_user_password &&
    new_user_password &&
    original_user_password !== new_user_password
  ) {
    let selectSql = `SELECT user_id,user_name,user_nickname FROM bolg_user WHERE user_name=? AND user_password=?`;
    let selectParams = [user_name, encryption(original_user_password)];
    let select_query_results = await query(selectSql, selectParams);
    let status = select_query_results.length === 1;
    if (status) {
      let updateSql = `UPDATE bolg_user SET user_password = ? WHERE user_name=? AND user_password=?`;
      let updateParams = [
        encryption (new_user_password),
        user_name,
        encryption(original_user_password)
      ];
      await query(updateSql, updateParams);
      ctx.body = { status: "success", message: "修改密码成功" };
    } else {
      ctx.body = { status: "fail", message: "原密码核对失败" };
    }
  } else {
    ctx.status = 400;
    let message = user_name
      ? original_user_password
        ? original_user_password === new_user_password
          ? "新密码与原密码不能相同"
          : "新密码不能为空"
        : "原密码不能为空"
      : "用户名不能为空";
    ctx.body = { status: "error", message };
  }
};
