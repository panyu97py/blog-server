const router = require("koa-router")();
const jwt = require("jsonwebtoken");
router.prefix("/users");
// const util = require("util");
// const verify = util.promisify(jwt.verify); // 解密
const  {secret,tokenValidityPeriod} = require('../config/jsonWebToken');
router.post("/login", async (ctx, next) => {
  const user = ctx.request.body;
  if (user && user.name) {
    let userToken = {
      name: user.name
    };
    const token = jwt.sign(userToken, secret, { expiresIn: tokenValidityPeriod }); //token签名 有效期为20分钟
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
});
// router.get("/userInfo", async ctx => {
//   const token = ctx.header.authorization; // 获取jwt
//   let payload;
//   if (token) {
//     payload = await verify(token.split(" ")[1], secret, (error, decoded) => {
//       if (!error) {
//         console.log(decoded.name); //会输出123，如果过了60秒，则有错误。
//       }else{
//         console.log(error,decoded)
//       }
//     }); // // 解密，获取payload
//     ctx.body = {
//       payload
//     };
//   } else {
//     ctx.body = {
//       message: "token 错误",
//       code: -1
//     };
//   }
// });

module.exports = router;
