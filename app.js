global.__base = __dirname + "/";
const Koa = require("koa");
const app = new Koa();
const cors = require("koa2-cors"); //跨域
const json = require("koa-json");
const jwtKoa = require("koa-jwt"); //jsonWebToken 中间件
const views = require("koa-views");
const session = require("koa-session");
const routes = require("./routes"); //路由表
const logger = require("koa-logger"); //日志
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser"); //http body
const { secret, unless } = require(__base + "/config/jwtKoa"); //jsonWebToken 配置文件
const log =require(__base + '/controller/log')
const sessionConfig = require(__base + '/config/session')
const jwt =require(__base + '/controller/jwt')

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
app.use(log.saveLog);

// error-handling
app.on("error", log.errorLog);

app.keys = ["some secret hurr"];
app.use(session(sessionConfig, app));

// jsonwebtoken
app.use(jwt.check_token);
app.use(jwtKoa({ secret }).unless(unless));

// routes 路由注册
app.use(routes.routes(), routes.allowedMethods());

module.exports = app;
