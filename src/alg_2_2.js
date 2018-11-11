let {cloneTowLevelArray} = require('./util.js');
// var sku = {
//     "10;20;30": 1,
//     "10;20;31": 2,
//     "11;20;30": 1,
//     "10;21;31": 2,
//     "10;21;32": 9
// };

// var maps = [
//     [10, 11, 12],
//     [20, 21],
//     [30, 31, 32]
// ];
let maps = [
    [3,5,7],
    [11,13],
    [17,19,23]
];

let skus = [
    [3,11,17],
    [3,13,19]
];

class FindPath{
    constructor(maps,skus){
        this.maps = maps;
        this.skus = skus;

        this._skusAsKey = {};
        this._cacheNum = {};

        this.light = [[]];

        this.selected = [];
        this.emptySelected = [];

        this.init();
        this._check();
    }

    init(){
        let light,
            skus = this.skus,
            filteredMaps,
            i,
            j;

        light = this.light = cloneTowLevelArray(this.maps);
    
        for(i=0;i<light.length;i++){
            let row = light[i];

            this.selected[i] = '';

            for(j=0;j<row.length;j++){
                this.light[i][j] = 1;
            }
        }

        this.emptySelected = this.selected.slice();

        for(i=0;i<skus.length;i++){
            let key = skus[i].join(';');
            this._skusAsKey[key] = 1;
        }

        this._initNum();
    }
    _initNum(){
        let skus = this.skus;
        
        for(let i=0;i<skus.length;i++){
            this._resolveSku(skus[i]);
        }
    }

    _resolveSku(sku){
        let emptySelected = this.emptySelected,
            cacheNum = this._cacheNum,
            length= sku.length,
            skuKey = sku.join(';'),
            num = this._skusAsKey[skuKey];

        for(let i=0;i<length;i++){

            let select = emptySelected.slice();

            for(let j = i;j<length;j++){
                select[j] = sku[j];
                let key = select.join(';');

                if(!cacheNum[key]){
                    cacheNum[key] = num;
                }else{
                    cacheNum[key] += num;
                }
            }
        } 
    }

    _check(){
        let selected = this.selected,
            maps = this.maps,
            light = this.light,
            i,
            j;

        for(i=0;i<maps.length;i++){
            let row = maps[i];
            let selectedCopy = selected.slice();

            for(j=0;j<row.length;j++){
                let val = row[j];
                selectedCopy[i] = val;
                light[i][j] = this._getCacheNum(selectedCopy.join(';'))?1:0;
            }
        }

        return light;
    }

    _getCacheNum(key){
        return this._cacheNum[key]||0;
    }

    add(point){
        let maps = this.maps,
            val = maps[point[0]][point[1]];

        if(val){
            this.selected[point[0]] = val;
            this._check();
        }
    }

    del(point){
        let maps = this.maps,
            val = maps[point[0]][point[1]];

        if(val){
            this.selected[point[0]] = '';
            this._check();
        }
    }
}

let path = new FindPath(maps,skus);
console.log(path.light);

path.add([1,1]);
console.log(path.light);

path.add([1,0]);
console.log(path.light);

path.del([1,0]);
console.log(path.light);

console.log(path._cacheNum);