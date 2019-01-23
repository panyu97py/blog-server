const jwt = require("jsonwebtoken");
const util = require("util");
const verify = util.promisify(jwt.verify);
const { secret } = require(__base + "/config/jwtKoa");
/**
 * token 解密获取用户信息
 */
module.exports = async ctx => {
  let token = ctx.header.authorization;
  if (token) {
    let data = await verify(token.split(" ")[1], secret);
    let status = "success";
    let message = "成功";
    return { status, data, message };
  } else {
    let status = "error";
    let data = null;
    let message = "错误！！！ token 不存在";
    return { status, data, message };
  }
};
