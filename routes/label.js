/**
 * 测试模块
 */
const router = require("koa-router")();
const label =require(__base+'/controller/label');

//添加文章
router.post("/add", label.addLabel);
router.post("/edit", label.editLabel);
router.get("/get", label.getLabel);
router.delete("/delete", label.deleteLabel);
router.post("/set", label.setLabel);



module.exports = router;
