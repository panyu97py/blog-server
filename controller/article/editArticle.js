const query = require(__base + "/config/mysql");
/**
 * 编辑博文(需要携带toekn)
 * @param article_title 博文标题
 * @param article_content 博文内容
 * @param article_id 博文id
 */
module.exports = async (ctx, next) => {
  const body = ctx.requset.body;
  let { article_title, article_content, article_id } = body;
  if (article_title && article_content && article_id) {
    let sql = `UPDATE blog_article SET article_title=?, article_content=? WHERE article_id=?`;
    let params = [article_title, article_content, article_id];
    let res = await query(sql, params);
    let status = res.affectedRows ? "success" : "fail";
    let message = res.affectedRows ? "修改成功" : "修改失败";
    ctx.body = { status, message };
  } else {
    ctx.status = 400;
    let status = "error";
    let message = article_title
      ? article_content
        ? "博文id不能为空"
        : "博文内容不能为空"
      : "博文标题不能为空";
    ctx.body = { status, message };
  }
};
