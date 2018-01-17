/**
 * Created by Fransic on 4/13/2017.
 */

function transposeMatrix(matrix) {
    var reverse = [];

    for(var i=0; i<matrix[0].length; i++){
        var data = [];
        for(var j=0; j<matrix.length; j++){
            data.push(matrix[j][i]);
        }
        reverse.push(data);
    }

    matrix.transpose=reverse;
}


function matrixDiff(matrixA,matrixB){
    var result = [];
    for(var i=0; i<matrixA.length;i++){
        var col = [];
        for(var j=0; j<matrixA[i];j++){
            col.push(matrixA[i][j]-matrixB[i][j]);
        }
        result.push(col);
    }
    return result;
}

function vectorDiff(vecA,vecB){
    var result = [];
    for(var i=0; i<vecA.length;i++){
        result.push(vecA[i]-vecB[i])
    }
    return result;
}

function vectorAdd(vecA,vecB){
    var result = [];
    for(var i=0; i<vecA.length;i++){
        result.push(vecA[i]+vecB[i])
    }
    return result;
}


function vectorScale(vec,scale){
    var result = [];
    for(var i=0; i<vec.length;i++){
        result.push(vec[i]*scale);
    }
    return result;
}



function vectorMag(vec){
    var result = 0;
    for(var i=0; i<vec.length;i++){
        result = result + Math.pow(vec[i],2);
    }
    return Math.pow(result,.5);
}


function matrixDist(matrixA,matrixB){
    var result = [];
    for(var i=0; i<matrixA.length;i++){
        var col = [];
        if(matrixA[i].length>1){
            for(var j=0; j<matrixA[i];j++){
                col.push(Math.abs(matrixA[i][j]-matrixB[i][j]));
            }
        }else{
            col.push(Math.abs(matrixA[i]-matrixB[i]));
        }
        result.push(col);
    }
    return result;
}

function matrixAdd(matrixA,matrixB){
    var result = [];
    for(var i=0; i<matrixA.length;i++){
        var col = [];
        if(matrixA[i].length>1){
            for(var j=0; j<matrixA[i];j++){
                col.push(matrixA[i][j]+matrixB[i][j]);
            }
        }else{
            col.push(matrixA[i]+matrixB[i])
        }
        result.push(col);
    }
    return result;
}


/*
 UNITIZES VALUES TO CREATE A UNBIASED MATRIX WITH EQUAL WEIGHTS
 */

function unitizeVector(values){
    evaluateData(values);
    var normalize = [];
    for(var i = 0; i<values.length;i++) {
        var val = parseFloat(values[i]);
        normalize.push((val - values.minimum) / (values.maximum - values.minimum));
    }
    return normalize;
}



/*
 EVALUATES DATA BY RETURNING THE MIN THE MAX AND THE RANGE
 */

function evaluateData(values){
    var minimum = parseFloat(values[0]);
    var maximum = parseFloat(values[0]);
    for(var i = 0 ;i<values.length;i++){
        var val = parseFloat(values[i]);
        if(val>maximum){
            maximum = val;
        }
        if(val<minimum){
            minimum = val;
        }
    }
    values.minimum = minimum;
    values.maximum = maximum;
    values.range = maximum-minimum;
    return values;
}

