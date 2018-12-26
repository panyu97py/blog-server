module.exports = {
  secret: "my_blog_app",
  tokenValidityPeriod: 20 * 60,
  unless: {
    path: [/^\/users\/login/] //数组中的路径不需要通过jwt验证
  }
};
