module.exports = (ctx, next) => {
  const body = ctx.request.body;
  console.log(body)
  ctx.body = {
    type: "success",
    message: "提交成功"
  };
};
