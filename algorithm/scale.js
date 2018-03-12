/**
 * 进制换算：2 => 10
 * */

/**
 * 实现步骤：
 * 1、把数字字符串化
 * 2、把字符串劈成数组，然后反转
 * 3、求每个系数 * 基数 ^ 按权位次幂的和
 * */
function two_ten1(num) {
  let numStr = num + "";
  return numStr.split("").reverse().reduce(function(sum, v, i) {
    return sum + v * Math.pow(2, i)
  }, 0);
}

var two_ten2 = (function() {
  let cache = [],
       cacheLen = 16;
  for(let i = 0; i < cacheLen; i++) {
    cache.push(Math.pow(2, i));
  }

  return function(num) {
    let numStr = num + "";
    return numStr.split("").reverse().reduce(function(sum, v, i) {
      return sum + v * cache[i];
    }, 0);
  };
}());

function test() {
  var list = [ '1', '11', '111', '1111', '11111', '111111', '1111111', '11111111' ];
  console.time();
  list.forEach(v => console.log( two_ten1(v) ));
  console.timeEnd();
}
