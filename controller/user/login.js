const jwt = require("jsonwebtoken");
const  {secret,tokenValidityPeriod} = require(__base+'/config/jsonWebToken')
/**
 * 用户登陆
 */
module.exports = async (ctx, next) => {
  const user = ctx.request.body;
  if (user && user.name) {
    let userToken = {
      name: user.name
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
    ctx.body = {
      message: "参数错误",
      code: -1
    };
  }
};
