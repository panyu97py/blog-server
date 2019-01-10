module.exports = async (ctx, next) => {
  const start = new Date();
  await next();
  const log_respone_time = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${log_respone_time}ms`);
};
