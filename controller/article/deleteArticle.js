const query = require(__base + "/config/mysql");
/**
 * 删除博客博文（需要携带token）
 * @param article_id 博文id
 */
module.exports = async (ctx, next) => {
  let { article_id } = ctx.query;
  if (article_id) {
    let sql = `DELETE  FROM blog_article WHERE article_id=?`;
    let param = [article_id];
    let res = await query(sql, param);
    let status = res.affectedRows ? "success" : "fail";
    let message = res.affectedRows ? "删除博文成功" : "删除博文失败";
    ctx.body = { status, message };
  } else {
    ctx.status = 400;
    let status = "error";
    let message = "博文id不能为空";
    ctx.body = { status, message };
  }
};
