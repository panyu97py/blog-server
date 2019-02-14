/**
 * 不需要验证token的接口
 */
const unlessPath = [
  /^\/user\/token/, //登陆获取token
  /^\/user\/register/, //注册
  /^\/user\/check_username/, //注册前校验用户名
  /^\/captcha/, //获取验证码，校验验证码
  /^\/article\/get/, //获取文章列表
  /^\/sort\/get/, //获取分类列表
  /^\/label\/get/ //获取标签列表
];
/**
 * jwt 配置信息
 */
module.exports = {
  secret: "my_blog_app",
  tokenValidityPeriod: 7 * 24 * 60 * 60, //token 有效时间 7天
  unless: {
    path: unlessPath
  }
};
