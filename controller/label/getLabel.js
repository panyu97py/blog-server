const query = require(__base + "/config/mysql");
/**
 * 获取标签列表（需要携带token）
 * @param label_id 标签id
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  let { label_id } = body;
  if (label_id) {
    let sql = `SELECT * FROM blog_label WHERE label_id=?`;
    let param = [label_id];
    let res = await query(sql, param);
    let status = res.length === 1 ? "success" : "fail";
    let data = res.length === 1 ? res[0] : {};
    let message = res.length === 1 ? "查询成功" : "查询失败该标签不存在";
    ctx.body = { status, message, data };
  } else {
    let sql = `SELECT * FROM blog_label`;
    let message = "查询成功";
    let data = await query(sql);
    ctx.body = { status: "success", message, data };
  }
};
