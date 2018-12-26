const jwt = require("jsonwebtoken");
const util = require("util");
const verify = util.promisify(jwt.verify);
const { secret } = require(__base + "/config/jwtKoa");
/**
 * token 内容解密
 */
module.exports = async ctx => {
  const token = ctx.header.authorization; // 获取jwt
  let payload;
  if (token) {
    payload = await verify(token.split(" ")[1], secret); // // 解密，获取payload
    ctx.body = {
      payload
    };
  } else {
    ctx.status = 400;
    ctx.body = {
      type:'error',
      message: "token 错误"
    };
  }
};
