/**
 * 博文模块
 */
const router = require("koa-router")();
const article =require(__base+'/controller/article');

//添加文章
router.post("/add", article.addArticle);
//编辑文章
router.post("/edit", article.editArticle);
// 获取文章
router.get("/get", article.getArticle);
// 删除文章
router.delete("/delete", article.deleteArticle);



module.exports = router;
