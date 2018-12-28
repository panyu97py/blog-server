const query = require(__base + "/config/mysql");
module.exports = async (ctx, next) => {
  const body = ctx.request.body;
  const { username, originalPassword, newPassword } = body;
};
