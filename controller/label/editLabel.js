const query = require(__base + "/config/mysql");
/**
 * 编辑标签（需要携带token）
 * @param label_name 标签名
 * @param label_alias 标签别名
 * @param label_desc 标签描述
 * @param label_id 标签id
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  let { label_name, label_alias, label_desc, label_id } = body;
  if (label_name && label_alias && label_desc && label_id) {
    let sql = `UPDATE blog_label SET label_name = ?,label_alias = ?,label_desc = ? WHERE label_id = ?`;
    let params = [label_name, label_alias, label_desc, label_id];
    let res = await query(sql, params);
    let status = res.affectedRows ? "success" : "fail";
    let message = res.affectedRows ? "修改成功" : "修改失败";
    ctx.body = { status, message };
  } else {
    ctx.status = 400;
    let message = label_name
      ? label_alias
        ? label_desc
          ? "标签id不能为空"
          : "标签描述不能为空"
        : "标签别名不能为空"
      : "标签名不能为空";
    ctx.body = { status: "error", message };
  }
};
