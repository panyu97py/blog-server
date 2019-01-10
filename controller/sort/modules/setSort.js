const query = require(__base + "/config/mysql");
/**
 * 设置分类与文章绑定
 */
module.exports = async (ctx, next) => {
  const body = ctx.resquest.body;
  let { article_id, sort_id } = body;
  if (article_id && sort_id) {
    let sql = `INSERT INTO blog_set_sort (article_id,sort_id) VALUES (?,?)`; //sql语句
    let params = [article_id, sort_id];
    let res = await query(sql, params);
    let status = res.affectedRows ? "success" : "fail";
    let message = res.affectedRows ? "分类设置成功" : "分类设置失败";
    ctx.body = { status, message };
  } else {
    ctx.status = 400;
    let message = article_id ? "分类id不能为空" : "文章id不能为空";
    ctx.body = { status: "error", message };
  }
};
