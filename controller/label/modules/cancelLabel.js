const query = require(__base + "/config/mysql");
/**
 * 取消博文标签（需要携带token）
 * @param article_id 文章id
 * @param label_id 标签id
 */
module.exports = async (ctx, next) => {
  let { article_id, label_id } = ctx.query;
  if (article_id && label_id) {
    let sql = `DELETE FROM blog_set_label WHERE article_id=? AND label_id=?`;
    let param = [article_id, label_id];
    let res = await query(sql, param);
    let status = res.affectedRows === 1 ? "success" : "fail";
    let message = res.affectedRows === 1 ? "取消成功" : "取消失败";
    ctx.body = { status, message };
  } else {
    ctx.status=400
    let status ='error'
    let message = article_id?'标签id不能为空':'文章id不能为空'
    ctx.body= {status,message}
  }
};
