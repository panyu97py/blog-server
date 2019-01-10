const query = require(__base + "/config/mysql");
/**
 * 编辑分类
 * @param sort_id 分类id
 * @param sort_name 分类名
 * @param sort_alias 分类别名
 * @param sort_desc 分类描述
 * @param parent_sort_id 父分类id
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  let { sort_name, sort_alias, sort_desc, parent_sort_id, sort_id } = body;
  if (sort_name && sort_alias && sort_desc && parent_sort_id && sort_id) {
    let sql = `UPDATE blog_sort SET sort_name = ?,sort_alias = ?,sort_desc = ?,parent_sort_id=? WHERE sort_id = ?`;
    let params = [sort_name, sort_alias, sort_desc, parent_sort_id, sort_id];
    let res = await query(sql, params);
    let status = res.affectedRows ? "success" : "fail";
    let message = res.affectedRows ? "分类编辑成功" : "分类编辑失败";
    ctx.body = { status, message };
  } else {
    ctx.status = 400;
    let message = sort_name
      ? sort_alias
        ? sort_desc
          ? parent_sort_id
            ? "标签id不能为空"
            : "父标签id不能为空"
          : "标签描述不能为空"
        : "标签别名不能为空"
      : "标签名不能为空";
    ctx.body = { status: "error", message };
  }
};
