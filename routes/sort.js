/**
 * 测试模块
 */
const router = require("koa-router")();
const sort =require(__base+'/controller/sort');

//添加文章
// router.post("/article", test.article);
router.post("/add", sort.addSort);
router.post("/edit", sort.editSort);
router.get("/get", sort.getSort);
router.delete("/delete", sort.deleteSort);
router.post("/set", sort.setSort);

module.exports = router;
