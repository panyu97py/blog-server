const query = require(__base + "/config/mysql");
/**
 * 新增分类（需要携带token）
 * @param sort_name 分类名
 * @param sort_alias 分类别名
 * @param sort_desc 分类描述
 * @param parent_sort_id 父分类id
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  let { sort_name, sort_alias, sort_desc, parent_sort_id } = body;
  if (sort_name && sort_alias && sort_desc && parent_sort_id) {
    let sql = `INSERT INTO blog_sort (sort_id,sort_name, sort_alias,sort_desc,parent_sort_id) VALUES (REPLACE(UUID(),"-",""),?,?,?,?)`; //sql语句
    let params = [sort_name, sort_alias, sort_desc, parent_sort_id];
    let res = await query(sql, params);
    let status = res.affectedRows ? "success" : "fail";
    let message = res.affectedRows ? "新增分类成功" : "新增分类失败";
    ctx.body = { status, message };
  } else {
    ctx.status = 400;
    let status = "error";
    let message = sort_name
      ? sort_alias
        ? sort_desc
          ? "父分类id不能为空"
          : "分类描述不能为空"
        : "分类别名不能为空"
      : "分类名不能为空";
    ctx.body = { status, message };
  }
};
