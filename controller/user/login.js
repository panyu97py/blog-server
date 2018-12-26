const jwt = require("jsonwebtoken");
const  {secret,tokenValidityPeriod} = require(__base+'/config/jsonWebToken')
/**
 * 用户登陆
 */
module.exports = async (ctx, next) => {
  const user = ctx.request.body;
  if (user && user.name) {
    let userToken = {
      name: user.name,
      nickName:'test',
      Gender:'male',
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
      type:'error',
      message: "参数错误",
    };
  }
};
