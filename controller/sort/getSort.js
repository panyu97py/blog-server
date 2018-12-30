const query = require(__base + "/config/mysql");
/**
 * 获取分类
 * @param sort_id 分类id
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  let { sort_id } = body;
  if (sort_id) {
    let sql = `SELECT * FROM blog_sort WHERE sort_id=?`;
    let param = [sort_id];
    let res = await query(sql, param);
    ctx.body = res.length
      ? { status: "success", message: "查询成功", data: res[0] }
      : { status: "fail", message: "该分类不存在", data: {} };
  } else {
    let sql = `SELECT * FROM blog_sort`;
    let res = await query(sql);
    ctx.body = { status: "success", message: "查询成功", data: res };
  }
};
