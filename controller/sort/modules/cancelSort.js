const query = require(__base + "/config/mysql");
/**
 * 取消博文分类（需要携带token）
 * @param article_id 文章id
 * @param sort_id 分类id
 */
module.exports = async (ctx, next) => {
  let { article_id, sort_id } = ctx.query;
  if (article_id && sort_id) {
    let sql = `DELETE FROM blog_set_sort WHERE article_id=? AND sort_id=?`;
    let param = [article_id, sort_id];
    let res = await query(sql, param);
    let status = res.affectedRows === 1 ? "success" : "fail";
    let message = res.affectedRows === 1 ? "取消成功" : "取消失败";
    ctx.body = { status, message };
  } else {
    ctx.status = 400;
    let status = "error";
    let message = article_id ? "分类id不能为空" : "文章id不能为空";
    ctx.body = { status, message };
  }
};
