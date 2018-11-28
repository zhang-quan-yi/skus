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
            let num = this._skusAsKey[skus[i].join(';')];
            this._resolveSku([],skus[i],num);
        }

        // console.log('_cacheNum',this._cacheNum);
    }

    _resolveSku(select,sku,initNum){
        let cacheNum = this._cacheNum;

        if(select.length === sku.length){
            let key = select.join(';');
            if(!cacheNum[key]){
                cacheNum[key] = initNum;
            }else{
                cacheNum[key] += initNum;
            }
        }else{
            let length = select.length;
            let val = sku[length];
            this._resolveSku(select.concat(''),sku,initNum);
            this._resolveSku(select.concat(val),sku,initNum);
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
                if(typeof selectedCopy !== 'undefined'){
                    let val = row[j];
                    selectedCopy[i] = val;
                    light[i][j] = this._getCacheNum(selectedCopy.join(';'))?1:0;
                }
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