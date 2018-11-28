# SKU（Stock Keeping Unit）的组合与算法整理；

本仓库只是对[sku组合查询算法探索](http://git.shepherdwind.com/sku-search-algorithm.html) 一文的整理，并补充了原文中的代码。

## 属性介绍

* `light` 二维数组
表示属性是否可以选择：0 不可选 | 1、2 可选

* `selected` 一维数组
表示已经选择的属性

## 方法介绍

* `add([x,y])` 
接收一个数组，选取下标为 `x`、`y` 的属性，返回值与 `getSkuIndex` 相同；

* `getSkuIndex()`
当还没有选取完整的属性时，返回 -1；
如果已经选取了一组完整的 `sku` 组合，返回所选取的 `sku` 的下标

* `del([x,y])`
取消选取下标为 `x`、`y` 的属性

## 示例

```javascript

# 所有的规格（实际使用中，将中文换成规格的id）
let maps = [
    ['红色','黄色','蓝色'],
    ['中号','大号'],
    ['套餐1','套餐2','套餐3']
];

# sku组合；
let skus = [
    ['红色','中号','套餐1'],
    ['红色','大号','套餐2']
];

let path = new PathFinder(maps,skus);


# 属性：path.light
# 表示 maps 中的属性是否可以选择：0 不可选 | 1、2 可选
console.log(path.light);
# 输出：
# [
#     [ 1, 0, 0 ], 
#     [ 1, 1 ], 
#     [ 1, 1, 0 ] 
# ]
# path.light[0][1] 为0，表示'黄色'不可选，因为 sku 中没有 '黄色' 的规格；
# path.light[0][2] 为0，表示'蓝色'不可选，因为 sku 中没有 '蓝色' 的规格；
# path.light[2][2] 为0，表示'套餐3'不可选，因为 sku 中没有 '套餐3' 的规格；


# 方法：path.add(point)
# 表示 选取 maps 中的规格，point 为规格的下标；
# 以下选取了规格'大号'
path.add([1,1]); 
console.log(path.light);
# 输出：
# [
#     [ 1, 0, 0 ], 
#     [ 1, 2 ], 
#     [ 0, 1, 0 ] 
# ]
# 与之前相比，path.light[2][1] 也变为0了，因为sku组合中，不存在 '大号' 与 '套餐1'的组合；


# 方法：path.del(point)
# 表示 取消选中的规格；
path.del([1,1]);

```