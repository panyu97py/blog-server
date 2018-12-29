// const jwt = require("jsonwebtoken");
// const util = require("util");
// const verify = util.promisify(jwt.verify);
// const { secret } = require(__base + "/config/jwtKoa"); //jsonWebToken 配置文件
// const query = require(__base + "/config/mysql");
// const encryption = require(__base + "/untils/encryption.js");

module.exports = async (ctx, next) => {
  const start = new Date();
  await next();
  const log_respone_time = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${log_respone_time}ms`);
  
  // let log_request_user_id = ctx.header.authorization
  //   ? (await verify(ctx.header.authorization.split(" ")[1], secret)).user_id
  //   : null;
  // let log_request_url = ctx.url;
  // let log_request_method = ctx.method;
  // let log_request_host = ctx.header.host;
  // let log_respone_status = ctx.status;
  // let log_respone_params = ctx.body;
  // // ctx.body
  // let log_requset_params = ctx.request.body;

  // Object.keys(log_requset_params).map((key, index) => {
  //   if (key.indexOf("password" )!== -1) {
  //     log_requset_params[key]='*************'
  //   }
  // });
  // let sql = `INSERT INTO blog_log (log_request_date,log_request_user_id, log_request_url,log_request_method,log_request_host,log_respone_status,log_respone_time,log_requset_params,log_respone_params) VALUES (?,?,?,?,?,?,?,?,?)`;
  // let params = [
  //   start,
  //   log_request_user_id,
  //   log_request_url,
  //   log_request_method,
  //   log_request_host,
  //   log_respone_status,
  //   log_respone_time,
  //   JSON.stringify(log_requset_params),
  //   JSON.stringify(log_respone_params)
  // ];
  // await query(sql, params);
};
