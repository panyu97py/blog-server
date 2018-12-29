const query = require(__base + "/config/mysql");
/**
 * 新增 标签（需要携带token）
 * @param label_name 标签名
 * @param label_alias 标签别名
 * @param label_desc 标签描述
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  let { label_name, label_alias, label_desc } = body;

  if (label_name && label_alias) {
    let sql = `INSERT INTO blog_label (label_id,label_name, label_alias,label_desc) VALUES (REPLACE(UUID(),"-",""),?,?,?)`; //sql语句
    let params = [label_name, label_alias, label_desc];
    let res = await query(sql, params);
    status = res.affectedRows ? "success" : "fail";
    message = res.affectedRows ? "添加标签成功" : "添加标签失败";
    ctx.body = { status, message };
  } else {
    ctx.status = 400;
    message = label_name ? "标签别名不能为空" : "标签名不能为空";
    ctx.body = { status: "error", message };
  }
};
