const token = require("./modules/token");
const userInfo = require("./modules/userInfo");
const register = require("./modules/register");
const check_username = require("./modules/check_username");
const modify_password = require("./modules/modify_password");
const modify_userInfo = require("./modules/modify_userInfo");
const modify_username = require("./modules/modify_username");

module.exports = {
  token,
  userInfo,
  register,
  check_username,
  modify_password,
  modify_userInfo,
  modify_username
};
