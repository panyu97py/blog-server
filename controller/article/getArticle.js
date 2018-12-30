const query = require(__base + "/config/mysql");
/**
 * 获取博文(需要携带token)
 * @param article_id 博文id
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  let { article_id } = body;
  if (article_id) {
    let sql = `SELECT * FROM blog_article WHERE article_id=?`;
    let param = [article_id];
    let res = await query(sql, param);
    let status = res.length ? "success" : "fail";
    let message = res.length ? "查询成功" : "查询失败";
    ctx.body = { status, message, data: res[0] };
  } else {
    let sql =`SELECT * FROM blog_article`
    let res =  await query(sql);
    ctx.body = {status:'success',message:'查询成功', data:res}
  }
};
