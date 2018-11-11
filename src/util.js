/**
 * 复制二维数组；
 */
exports.cloneTowLevelArray = function(maps){
    var ret = [];
    var j;
    for(j=0;j<maps.length;j++){
        var i = maps[j];
        ret.push(i.slice?i.slice() : i);
    }

    return ret;
};

exports.containSubArray = function(arr,subArr){
    let _arr = arr.slice();
    let ret = 1;

    if(subArr.length){
        for(let i=0;i<subArr.length;i++){
            let item = subArr[i];
            let index = _arr.indexOf(item);

            if(index !== -1){
                _arr.splice(index,1);
            }else{
                ret = 0;
                break;
            }
        }
    }

    return ret;
}