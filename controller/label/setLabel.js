const query = require(__base + "/config/mysql");
/**
 * 为博文新增标签（需要携带token）
 * @param article_id 文章id
 * @param label_id 标签id
 */
module.exports = async (ctx, next) => {
  let body = ctx.request.body;
  let { article_id, label_id } = body;
  let sql = `INSERT INTO blog_set_label (article_id,label_id) VALUES (?,?)`;
  let param = [article_id, label_id];
  let res = await query(sql, param);
  let status = res.affectedRows === 1 ? "success" : "fail";
  let message = res.affectedRows === 1 ? "设置成功" : "设置失败";
  ctx.body = { status, message };
};
