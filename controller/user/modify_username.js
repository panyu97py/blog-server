const query = require(__base + "/config/mysql");
/**
 * 修改用户名（需要携带token）
 * @param user_id 用户id
 * @param new_user_name 新用户名
 * @param user_password 密码
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  const { new_user_name, user_id, user_password } = body;
  if (user_id && user_password && new_user_name) {
    let updateSql = `UPDATE bolg_user SET user_name = ? WHERE user_id=? AND user_password=?`;
    let params = [new_user_name, user_id, user_password];
    let data = await query(updateSql, params);
    let status = data.affectedRows === 1;
    ctx.body = {
      type: status ? "success" : "fail",
      message: status ? "修改成功" : "密码错误",
    };
  } else {
    ctx.status = 400;
    let message = user_id
      ? user_password
        ? "新用户名不能为空"
        : "用户密码不能为空"
      : "用户id不能为空";
    ctx.body = { type: "error", message };
  }
};
