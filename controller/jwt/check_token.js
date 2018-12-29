module.exports = (ctx, next) => {
  return next().catch(err => {
    if (err.status === 401 ||err.status === '401') {
      ctx.status = 401;
      ctx.body = {
        type: "error",
        message: "无效的Token"
      };
    } else {
      throw err;
    }
  });
};
