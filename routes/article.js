/**
 * 博文模块
 */
const router = require("koa-router")();
const article =require(__base+'/controller/article');

//添加文章
router.post("/article", article.addArticle);


module.exports = router;
