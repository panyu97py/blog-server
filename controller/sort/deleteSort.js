const query = require(__base + "/config/mysql");
/**
 * 删除分类
 * @param sort_id 分类id
 */
module.exports = async (ctx, next) => {
  let { sort_id } = ctx.query;
  if (sort_id) {
    let sql = `DELETE FROM blog_sort WHERE sort_id=?`;
    let params = [sort_id];
    let res = await query(sql, params);
    let status = res.affectedRows ? "success" : "fail";
    let message = res.affectedRows ? "删除成功" : "删除失败";
    ctx.body = { status, message };
  } else {
    ctx.status = 400;
    ctx.body = {
      status: "error",
      message: "分类id不能为空"
    };
  }
};
