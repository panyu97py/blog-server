/**
 * 无限级递归分类方法
 * @param data 需要递归分类的数据
 */

module.exports = function toTree(data) {
  // 删除 所有 children,以防止多次调用
  data.forEach(function(item) {
    delete item.children;
  });

  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  var map = {};
  data.forEach(function(item) {
    map[item.sort_id] = item;
  });

  var val = [];
  data.forEach(function(item) {
    // 以当前遍历项的pid,去map对象中找到索引的id
    var parent = map[item.parent_sort_id];

    // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      //如果没有在map中找到对应的索引ID,那么直接把当前的item添加到 val结果集中，作为顶级
      val.push(item);
    }
  });

  return val;
};
