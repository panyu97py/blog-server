const query = require(__base + "/config/mysql");
/**
 * 校验用户名是否已经存在（无需携带token）
 * @param user_name 用户名
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  const { user_name } = body;
  if (user_name) {
    let sql = `SELECT * FROM bolg_user WHERE user_name=?`;
    let params = [user_name];
    let query_results = await query(sql, params);
    let status = query_results.length === 0 ? true : false;
    let type = status ? "success" : "fail";
    let message = status ? "用户名可用" : "用户名已被注册";
    ctx.body = { type, message };
  }else{
    ctx.status=400
    ctx.body = { type:'error', message:'用户名不能为空' };
  }
};