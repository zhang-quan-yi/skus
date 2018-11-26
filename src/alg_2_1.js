let {cloneTowLevelArray} = require('./util.js');

class PathFinder{
    constructor(maps,skus){
        this.maps = maps;
        this.skus = skus;

        this._skusAsKey = {};
        
        this._cacheNum = {};

        this.light = [[]];

        this.selected = [];
        this.emptySelected = [];

        this._skusIndex = {};

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
            this._skusIndex[key] = i;
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
                light[i][j] = this._getNum(selectedCopy.join(';'))?1:0;
            }
        }

        return light;
    }

    _getNum(key){
        let cacheNum = this._cacheNum;
        let _skus = this._skusAsKey;
        let maps = this.maps;

        if(typeof cacheNum[key] !== 'undefined'){
            return cacheNum[key];
        }
    
        let selectItems = key.split(';');
    
        // 退化
        if(typeof _skus[key] !== 'undefined'){
            return _skus[key]||0;
        }
    
        // 递归拼接
        let ret = 0;
        for(let i=0;i<maps.length;i++){
            if(!selectItems[i]){
                for(let j=0;j<maps[i].length;j++){
                    selectItems[i] = maps[i][j];
                    ret += this._getNum(selectItems.join(';'));
                    // console.log(selectItems.join(';'));
                }
                break;
            }
        }
    
        cacheNum[key] = ret;
        return ret;
    }

    add(point){
        let maps = this.maps,
            val = maps[point[0]][point[1]];

        if(val){
            this.selected[point[0]] = val;
            this._check();
        }

        // 判断是否选取结束，返回选取的 sku 结果
        return this.getSkuIndex();
    }

    getSkuIndex(){
        let skuKey = this.selected.join(';');
        let selectKey = this._skusIndex[skuKey];
        return (typeof selectKey !== 'undefined')?selectKey:-1;
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

module.exports = PathFinder;