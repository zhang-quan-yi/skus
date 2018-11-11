let {cloneTowLevelArray,containSubArray} = require('./util.js');

let maps = [
    [3,5,7],
    [11,13],
    [17,19,23]
];

let skus = [
    [3,11,17],
    [3,13,19]
];

/***
 * 
 * maps 所有属性值的组合
 * skus 所有sku条目
 */
class PathFinder{
    constructor(maps,skus){
        this.maps = maps;
        this.skus = skus;

        // 属性值在 maps 中的下标索引值
        this._way = [];

        // 属性值是否可选
        this.light = [[]];

        this.selected = [];

        this.init();

        this._check();
    }

    init(){
        let light,
            i,
            j;

        light = this.light = cloneTowLevelArray(this.maps);
        
        // 初始化 _way 属性 以及 light 属性
        for(i=0;i<light.length;i++){
            let row = light[i];
            for(j=0;j<row.length;j++){
                this._way[row[j]] = [i,j];
                
                this.light[i][j] = 1;
            }
        }
    }

    _check(){
        let light = this.light,
            maps = this.maps,
            skus = this.skus,
            i,
            j;

        for(i=0;i<light.length;i++){
            let row = light[i];
            let selected = this._getSelected(i);
            let filteredSkus = this._filterSkus(selected,skus);
            
            for(j=0;j<row.length;j++){
                if(row[j] !== 2){
                    let currentValue = maps[i][j];
                    light[i][j] = this._checkItem(currentValue,filteredSkus);
                }
            }
        }

        return light;
    }

    _getSelected(rowIndex){
        let selected = this.selected,
            _way = this._way,
            ret = [];

        if(selected.length){
            for(let i=0;i<selected.length;i++){
                let item = selected[i];
                let coordinate = _way[item];

                if(coordinate[0] !== rowIndex){
                    // 所选的不是同一行
                    ret.push(item);
                }
            }
        }
        return ret;
    }

    _checkItem(value,skus){
        let filteredSkus = this._filterSkus([value],skus);
        return filteredSkus.length?1:0;
    }

    // 根据已经选取的组合过滤 skus；
    _filterSkus(selected,skus){
        let ret = [];

        if(selected.length){
            for(let i=0;i<skus.length;i++){
                let isContain = containSubArray(skus[i],selected);
                if(isContain){
                    ret.push(skus[i]);
                }
            }
        }else{
            ret = skus;
        }

        return ret;
    }

    add(coordinate){
        let val = this.maps[coordinate[0]][coordinate[1]];

        if(!this.light[coordinate[0]][coordinate[1]]){
            throw new Error('无法选择'+ coordinate +'，请选择其它选项');
        }

        if(this.selected.indexOf(val) !== -1){
            return;
        }

        this._dealChange(coordinate);
        this.selected.push(val);
        this.light[coordinate[0]][coordinate[1]] = 2;
        this._check();
    }

    _dealChange(coordinate){
        let selected = this.selected;
        let maps = this.maps;
        let _way = this._way;
        let light = this.light;

        for(let i=0;i<selected.length;i++){
            let item = selected[i];
            let itemCoordinate = _way[item];

            if(coordinate[0] === itemCoordinate[0]){
                this.light[itemCoordinate[0]][itemCoordinate[1]] = 1;
                selected.splice(i,1);
                break;
            }
        }
    }

    del(point){
        let val;
        try{
            val = this.maps[point[0]][point[1]];
        }catch(e){}

        if(val){
            let index = this.selected.indexOf(val);
            if(index !== -1){
                this.light[point[0]][point[1]] = 1;
                this.selected.splice(index,1);
                this._check();
            }
        }
    }
}

let path = new PathFinder(maps,skus);
console.log(path.light);

path.add([1,1]);
console.log(path.light);

path.add([1,0]);
console.log(path.light);

path.del([1,0]);
console.log(path.light);