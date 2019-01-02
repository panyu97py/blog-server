/**
 * 拆分树形结构 生成原始数组
 * @param data 树形结构数组
 */
module.exports = (data) => {
  let temp = [];
  var forFn = function(data) {
    //判断对象中是否存在 children 属性
    if (data.hasOwnProperty("children")) {
      data.children.map(item => {
        temp.push(item)
        forFn(item)
      });
    }else {
      temp.push (data)
    }
  };
  forFn(data)
  temp.forEach(function(item) {
    delete item.children;
  });
  return temp
};
