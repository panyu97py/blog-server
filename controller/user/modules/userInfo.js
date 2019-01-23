const decryptToken = require(__base + "/untils/decryptToken");
/**
 * 获取用户信息（需要携带token）
 * 解密token
 */
module.exports = async ctx => {
  let payload = await decryptToken(ctx); // 解密，获取payload
  if (payload.status === "success") {
    ctx.body = payload;
  } else {
    ctx.status = 401;
    ctx.body = payload;
  }
};
