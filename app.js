global.__base = __dirname + '/';
const Koa = require("koa");
const app = new Koa();
const json = require("koa-json");
const jwtKoa = require("koa-jwt");//jsonWebToken 中间件
const views = require("koa-views");
const routes = require("./routes");//路由表
const logger = require("koa-logger");//日志
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");//http body
const  {secret,unless} = require(__base + '/config/jsonWebToken');//jsonWebToken 配置文件


// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug"
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

// jsonwebtoken
app.use((ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        type:'error',
        message:'无效的Token'
      };
    } else {
      throw err;
    }
  });
});
app.use(
  jwtKoa({ secret }).unless(unless)
);

// routes 路由注册
app.use(routes.routes(), routes.allowedMethods());

module.exports = app;
