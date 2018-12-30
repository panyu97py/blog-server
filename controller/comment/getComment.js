const query = require(__base + "/config/mysql");
/**
 * 获取评论
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  let { comment_id, user_id, article_id } = body;
  if (!comment_id && !user_id && !article_id) {
    let sql = `SELECT * FROM blog_comment`;
    let res = await query(sql);
    ctx.body = { status: "success", message: "查询成功", data: res };
  } else if (comment_id && !user_id && !article_id) {
    let sql = `SELECT * FROM blog_comment WHERE comment_id=?`;
    let param = [comment_id];
    let res = await query(sql, param);
    ctx.body = { status: "success", message: "查询成功", data: res };
  } else if (user_id && !comment_id && !article_id) {
    let sql = `SELECT * FROM blog_comment WHERE user_id=?`;
    let param = [user_id];
    let res = await query(sql, param);
    ctx.body = { status: "success", message: "查询成功", data: res };
  } else if (article_id && !user_id && !comment_id) {
    let sql = `SELECT * FROM blog_comment WHERE article_id=?`;
    let param = [article_id];
    let res = await query(sql, param);
    ctx.body = { status: "success", message: "查询成功", data: res };
  }
};
