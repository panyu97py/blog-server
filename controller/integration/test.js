// const request = require('request');
const query = require(__base + "/config/mysql");

module.exports = async (ctx, next) => {
  // let sql = `SELECT * FROM sort`
  let sql = `SELECT * FROM blog_sort`;
  let res = await query(sql);
  console.log( toTree(res))
  let data = toTree(res)
  ctx.body = { data};
};
