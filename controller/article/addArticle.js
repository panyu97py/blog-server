const query = require(__base + "/config/mysql");
/**
 * 创建博客博文（需要携带token）
 * @param article_title 博文标题
 * @param user_id 用户id
 * @param article_content 博文内容
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  let { article_title, user_id, article_content } = body;
  if (article_title && user_id && article_content) {
    let sql = `INSERT INTO blog_article (article_id,article_title, article_content,user_id) VALUES (REPLACE(UUID(),"-",""),?,?,?)`; //sql语句
    let params = [article_title,user_id,article_content]
    let res =await query(sql, params)
    let status = res.affectedRows?'success':'fail'
    let message =res.affectedRows?'新增博文成功':'新增博文失败'
    ctx.body ={status,message}
  } else {
    ctx.status = 400;
    let status = "error";
    let message = article_title
      ? user_id
        ? "博文内容不能为空"
        : "用户id"
      : "博文标题不能为空";
    ctx.body = { status, message };
  }
};
