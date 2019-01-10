const query = require(__base + "/config/mysql");
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
    article=article[0]
    article.article_labels=link
    article.article_labels.map(item=>{
      delete item.article_id
    })
    ctx.body = { status, message, data: article };
  } else {
    let article_sql = `SELECT * FROM blog_article`;
    let link_sql = `SELECT * FROM label_link_article`;
    let article_list = await query(article_sql);
    let link_list = await query(link_sql);
    article_list.map(article => {
      article.article_labels=link_list.filter(item => {
        return item.article_id === article.article_id;
      })
      article.article_labels.map(item=>{
        delete item.article_id
      })
    });
    console.log(link_list);
    ctx.body = {
      status: "success",
      message: "查询成功",
      data: article_list
    };
  }
};
