function vaciarPapelera(array) {

	for (var i = 0; i < array.length; i++) {
		if(array[i] == '*' ) {
			array.splice(i, 1);
		}
	}

	return array;
}

console.log(vaciarPapelera(new Array(2,3,'*',5,7)));

function agruparElementos(array) {

	var arrayNumeros = [];
	var arrayLetras = [];

	for (var i = 0; i < array.length; i++) {
		if(typeof(array[i]) == 'number') {
			arrayNumeros.push(array[i]);
		} else if(typeof(array[i]) == 'string') {
			arrayLetras.push(array[i]);
		}
	}

	return new Array(arrayNumeros + ',' + arrayLetras); 

}

console.log(agruparElementos(['B', 'a', 4 , 23, 'J']));


function ponerBonitasLasLetras(array) {

	for (var i = 0; i < array.length; i++) {
		if(typeof(array[i]) != 'number') {
			if(array[i] == 'a' || array[i] == 'e' || 
				array[i] == 'i' || array[i] == 'o' || 
				array[i] == 'u'  ) {
				array[i] = array[i].toUpperCase();
			} else {
				array[i] = array[i].toLowerCase();
			}
		}
	}

	return array;
}

console.log(ponerBonitasLasLetras(['a','C',1,3,'i','e', 'z']));

function ponerBonitosLosNumeros(array) {
	for (var i = 0; i < array.length; i++) {
		if(typeof(array[i]) == 'number' && array[i].toString().length > 1) {
			subarray = array[i].toString().split('');
			var sumador = 0;
			for (var j = 0; j < subarray.length; j++) {
				sumador += Number(subarray[j]);
			}

			array[i] = sumador;
		}
	}

	for (var i = 0; i < array.length; i++) {
		if(array[i].toString().length > 1) {
			console.log(array[i]);
			return ponerBonitosLosNumeros(array);
		} 
	}
	return array;
}

console.log(ponerBonitosLosNumeros([194,23, 'b' ,9 ,888888]));

function arrayToString(array) {
	var resultado = '';

	for (var i = 0; i < array.length; i++) {
		resultado += array[i];
	}

	return resultado;
}

console.log(arrayToString([194,23, 'b' ,9 ,888888]));