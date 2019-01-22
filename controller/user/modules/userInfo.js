const jwt = require("jsonwebtoken");
const util = require("util");
const verify = util.promisify(jwt.verify);
const { secret } = require(__base + "/config/jwtKoa");
/**
 * 获取用户信息（需要携带token）
 * 解密token
 */
module.exports = async ctx => {
  const token = ctx.header.authorization; // 获取jwt
  let payload;
  if (token) {
    payload = await verify(token.split(" ")[1], secret); // // 解密，获取payload
    ctx.body = { status: "success", message: "获取用户信息成功", data:payload };
  } else {
    ctx.status = 401;
    ctx.body = {
      status: "error",
      message: "无效的token"
    };
  }
};
