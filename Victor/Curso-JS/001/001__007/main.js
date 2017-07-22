function buscarPareja(array){
    var arrayTemp = [];
    for(var i=0; i<array.length; i++){
        for(var j=i; j<array.length; j++){
            if( (array[i] + array[j]) == 0 ){
                arrayTemp.push( i + "," + j );
            }
             
        }
    }

    return arrayTemp;
}

var arrayPareja = [2,-5,10,5,4,-10,0,-5];
console.log(buscarPareja(arrayPareja));