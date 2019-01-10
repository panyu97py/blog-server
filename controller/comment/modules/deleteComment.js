const query = require(__base + "/config/mysql");
/**
 * 删除评论
 */
module.exports = async (ctx, next) => {
  let { comment_id } = ctx.query;
  if (comment_id) {
    let sql = `DELETE  FROM blog_comment WHERE comment_id=?`;
    let param = [comment_id];
    let res = await query(sql, param);
    let status = res.affectedRows ? "success" : "fail";
    let message = res.affectedRows ? "删除成功" : "删除失败";
    ctx.body = { status, message };
  } else {
    ctx.status = 400;
    ctx.body = { status: "error", message: "评论id不能为空" };
  }
};
