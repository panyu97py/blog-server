/**
 * 博文标签模块
 */
const router = require("koa-router")();
const label =require(__base+'/controller/label');

//新增标签
router.post("/add", label.addLabel);

//为文章设置标签
router.post("/set", label.setLabel);

// 编辑标签
router.post("/edit", label.editLabel);

// 获取所有标签 / 指定标签
router.get("/get", label.getLabel);

// 删除标签
router.delete("/delete", label.deleteLabel);

//取消文章绑定的标签
router.delete("/cancel", label.cancelLabel);


module.exports = router;
