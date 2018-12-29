const query = require(__base + "/config/mysql");
/**
 * 删除标签（需要携带token）
 * @param label_id 标签id
 */
module.exports = async (ctx, next) => {
  let { label_id } = ctx.query;
  if (label_id) {
    let sql = `DELETE FROM blog_label WHERE label_id=?`;
    let params = [label_id];
    let res = await query(sql, params);
    let status = res.affectedRows ? "success" : "fail";
    let message = res.affectedRows ? "删除成功" : "删除失败";
    ctx.body = { status, message };
  } else {
    ctx.body = { status: "error", message: "标签id不能为空" };
  }
};
