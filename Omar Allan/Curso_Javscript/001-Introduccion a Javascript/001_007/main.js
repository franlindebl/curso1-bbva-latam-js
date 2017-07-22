

function buscarPareja(array){
var arreglo1 = [];
	for(var i=0; i<array.length; i++){
	for(var x=i; x<array.length; x++){
	if( (array[i] + array[x]) == 0 ){
	arreglo1.push( i + "," + x );
	}
	}
	}
	return arreglo1;
	}
var array = [2,-5,10,5,4,-10,0,-5];
console.log(buscarPareja(array));


