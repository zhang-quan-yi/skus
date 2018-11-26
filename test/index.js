let PathFinder = require('../src/alg_1.js');
//let PathFinder = require('../src/alg_2_1.js');
//let PathFinder = require('../src/alg_2_2.js');

let maps = [
    [3,5,7],
    [11,13],
    [17,19,23]
];

let skus = [
    [3,11,17],
    [3,13,19]
];



let path = new PathFinder(maps,skus);

console.log(path.light);

path.add([1,1]);
console.log(path.light);

path.add([1,0]);
console.log(path.light);

path.del([1,0]);
console.log(path.light);

// 测试选取 add 方法返回 最终所选取的 sku 的下标；
let selectSkuIndex;
selectSkuIndex = path.add([0,0]);
console.log('selectSkuIndex',selectSkuIndex); // -1

selectSkuIndex = path.add([1,0]);
console.log('selectSkuIndex',selectSkuIndex); // -1

selectSkuIndex = path.add([2,0]);
console.log('selectSkuIndex',selectSkuIndex); // 0

// 选取另外一组sku
selectSkuIndex = path.del([2,0]);
selectSkuIndex = path.add([1,1]);
console.log('selectSkuIndex',selectSkuIndex); // -1

selectSkuIndex = path.add([2,1]);
console.log('selectSkuIndex',selectSkuIndex); // 1；