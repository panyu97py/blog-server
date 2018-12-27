const query = require(__base + "/config/mysql");
/**
 * 用户注册
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  let { username, password, nickname } = body;
  let sql = `INSERT INTO bolg_user (user_id,user_name, user_password,user_nickname) VALUES (REPLACE(UUID(),"-",""),?,?,?)`; //sql语句
  let params =[username, password, nickname]
  let query_results = await query(sql, params);
  ctx.body={query_results}
  
};
