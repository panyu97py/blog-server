module.exports = {
  secret: "my_blog_app",
  tokenValidityPeriod: 20 * 60,//token 有效时间
  unless: {
     path: [/^\//]
    //  path: [/^\/user\/token/,/^\/user\/register/,/^\/user\/check_username/,/^\/captcha/] //数组中的路径不需要通过jwt验证
  }
};
