/**
 * 评论模块
 */
const router = require("koa-router")();
const comment =require(__base+'/controller/comment');

//添加评论
router.post("/add", comment.addComment);

//编辑评论
router.post("/edit", comment.editComment);

// 获取评论
router.get("/get", comment.getComment);

// 删除评论
router.delete("/delete", comment.deleteComment);



module.exports = router;
