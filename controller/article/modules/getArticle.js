const query = require(__base + "/config/mysql");
const cloneDeep =require('lodash/cloneDeep')
/**
 * 合并数据
 * @param {*} article_list 博文列表数据
 * @param {*} link_list 标签列表数据
 */
const merge =(article_list,link_list)=>{
  article_list=cloneDeep(article_list)
  link_list= cloneDeep(link_list)
  article_list.map(article => {
    article.article_labels=link_list.filter(item => {
      return item.article_id === article.article_id;
    })
    article.article_labels.map(item=>{
      delete item.article_id
    })
  });
  return article_list
}
/**
 * 获取博文(需要携带token)
 * @param article_id 博文id
 */
module.exports = async (ctx, next) => {
  let { article_id } = ctx.query;
  if (article_id) {
    let article_sql = `SELECT * FROM blog_article WHERE article_id=?`;
    let link_sql = `SELECT * FROM label_link_article WHERE article_id=?`;
    let param = [article_id];
    let article = await query(article_sql, param);
    let link = await query(link_sql, param);
    let status = article.length ? "success" : "fail";
    let message = article.length ? "查询成功" : "查询失败";
    ctx.body = { status, message, data: merge(article,link)[0] };
  } else {
    let article_sql = `SELECT * FROM blog_article`;
    let link_sql = `SELECT * FROM label_link_article`;
    let article_list = await query(article_sql);
    let link_list = await query(link_sql);
    ctx.body = {
      status: "success",
      message: "查询成功",
      data: merge(article_list,link_list)
    };
  }
};
