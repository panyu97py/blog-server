const query = require(__base + "/config/mysql");
const decryptToken = require(__base + "/untils/decryptToken");
/**
 * 新增评论(需要携带token)
 * @param user_id 用户id
 * @param article_id 被评论的博文id
 * @param commit_content 评论内容
 * @param parent_comment_id 父评论的id
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  let { user_id } = (await decryptToken(ctx)).data;
  let { article_id, commit_content, parent_comment_id } = body;
  if (user_id && article_id && commit_content && parent_comment_id) {
    let sql = `INSERT INTO blog_comment (comment_id,user_id, article_id,commit_content,parent_comment_id) VALUES (REPLACE(UUID(),"-",""),?,?,?,?)`; //sql语句
    let params = [user_id, article_id, commit_content, parent_comment_id];
    let res = await query(sql, params);
    let status = res.affectedRows ? "success" : "fail";
    let message = res.affectedRows ? "评论成功" : "评论失败";
    ctx.body = { status, message };
  } else {
    ctx.status = 400;
    let status = "error";
    let message = user_id
      ? article_id
        ? commit_content
          ? "父评论id不能为空"
          : "评论内容不能为空"
        : "被评论的博文id不能为空"
      : "用户id不能为空";
    ctx.body = { status, message };
  }
};
