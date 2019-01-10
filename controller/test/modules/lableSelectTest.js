const query = require(__base + "/config/mysql");
module.exports = async (ctx, next) => {
  let sql = `SELECT * FROM label`
  let res = await query(sql)
  ctx.body =res
};