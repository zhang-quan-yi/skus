//let PathFinder = require('../src/alg_1.js');
//let PathFinder = require('../src/alg_2_1.js');
let PathFinder = require('../src/alg_2_2.js');

let maps = [
    [3,5,7],
    [11,13],
    [17,19,23],
    [41,42]
];

let skus = [
    [3,11,17,41],
    [3,11,19,42]
];



let path = new PathFinder(maps,skus);
let selectedSkuIndex;
console.log(path.selected);
console.log(path.light);
console.log('_________________');

path.add([2,0]);
console.log(path.selected);
console.log(path.light);
console.log('_________________');

path.del([2,0]);
console.log(path.selected);
console.log(path.light);
console.log('_________________');

path.add([0,0]);
console.log(path.selected);
console.log(path.light);
console.log('_________________');

path.add([1,0]);
console.log(path.selected,path.light);

selectedSkuIndex = path.add([2,0]);
console.log(path.selected);
console.log(path.light);
console.log('selectedSkuIndex',selectedSkuIndex);
console.log('_________________');

selectedSkuIndex = path.add([3,0]);
console.log(path.selected);
console.log(path.light);
console.log('selectedSkuIndex',selectedSkuIndex);
console.log('_________________');