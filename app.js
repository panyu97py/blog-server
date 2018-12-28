global.__base = __dirname + '/';
const Koa = require("koa");
const app = new Koa();
const cors = require('koa2-cors');//跨域
const json = require("koa-json");
const jwtKoa = require("koa-jwt");//jsonWebToken 中间件
const views = require("koa-views");
const session = require('koa-session');
const routes = require("./routes");//路由表
const logger = require("koa-logger");//日志
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");//http body
const  {secret,unless} = require(__base + '/config/jwtKoa');//jsonWebToken 配置文件


// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(json());
app.use(cors());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "html"
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

app.keys = ['some secret hurr'];

const CONFIG = {
  key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));


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
