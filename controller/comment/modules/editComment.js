const query = require(__base + "/config/mysql");
/**
 * 编辑评论
 * @param comment_id 评论id
 * @param commit_content 评论内容sa
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  let { comment_id, commit_content } = body;
  if (comment_id && commit_content) {
    let sql = `UPDATE blog_comment SET commit_content=? WHERE comment_id=?`;
    let params = [commit_content, comment_id];
    let res = await query(sql, params);
    let status = res.affectedRows ? "success" : "fail";
    let message = res.affectedRows ? "修改评论成功" : "修改评论失败";
    ctx.body = { status, message };
  } else {
    ctx.status = 400;
    let status = "error";
    let message = comment_id ? "评论内容不能为空" : "评论id不能为空";
    ctx.body = { status, message };
  }
};
