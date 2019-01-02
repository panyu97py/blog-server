// const request = require('request');
// const query = require(__base + "/config/mysql");
const splitTree = require(__base + "/untils/splitTree")

module.exports = async (ctx, next) => {
  const body = ctx.request.body 
  let {sort_id, data}=body 
  ctx.body = splitTree( data,sort_id)
};
