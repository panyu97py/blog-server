const jwt = require("jsonwebtoken");
const { secret, tokenValidityPeriod } = require(__base +
  "/config/jsonWebToken");
/**
 * 用户登陆
 */
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  if (body && permissionCheck(body)) {
    let userToken = {
      name: body.username,
      nickName: "test",
    };
    const token = jwt.sign(userToken, secret, {
      expiresIn: tokenValidityPeriod
    }); //token签名 有效期为20分钟
    ctx.body = {
      message: "获取token成功",
      code: 1,
      token
    };
  } else {
    ctx.status = 400;
    ctx.body = {
      type: "error",
      message: "参数错误"
    };
  }
};
const permissionCheck = ({username, password}) => {
  if (username === '123' && password === '123') {
    return true;
  }else {
    return false
  }
};
