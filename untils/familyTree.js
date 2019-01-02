
// //根据最后一个找到整个家族
// module.exports = (arr, pid) =>{
//   var temp = [];
//   var forFn = function(arr, pid) {
//     for (var i = 0; i < arr.length; i++) {
//       var item = arr[i];
//       if (item.id == pid) {
//         temp.push(item);
//         forFn(arr, item.pid);
//       }
//     }
//   };
//   forFn(arr, pid);
//   return temp;
// }