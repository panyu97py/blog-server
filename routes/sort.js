/**
 * 博文分类模块
 */
const router = require("koa-router")();
const sort =require(__base+'/controller/sort');

//添加分类
router.post("/add", sort.addSort);

//编辑分类
router.post("/edit", sort.editSort);

// 获取分类列表
router.get("/get", sort.getSort);

// 删除分类
router.delete("/delete", sort.deleteSort);

// 为文章绑定分类
router.post("/set", sort.setSort);

module.exports = router;
