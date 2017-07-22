var arrayDeTest1 = ["Richie", "Joanie", "Greg", "Marcia", "Bobby"];
var arrayDeTest2 = ["Blanka", "Zangief", "Chun Li", "Guile"];
var arrayDeTest3 = ["Red", "Blue", "Green"];
var arrayDeTest4 = ["Hola", "Frase corta", "Frase normalita", "Frase muy muy larga"];

var resultados = [];

function medirLongitud(arreglo) {
	var longitud = 0;
	var indice = 0;

	for(var i = 0; i<arreglo.length; i++ ){
		var array = [];

		var conversion = arreglo[i];

		if(conversion.length >= longitud) {
			indice = i;
			longitud = conversion.length;
		}

	}

	return {
		longitud: longitud,
		string: arreglo[indice]
	};
}

resultados.push(medirLongitud(arrayDeTest1), 
	medirLongitud(arrayDeTest2),
	medirLongitud(arrayDeTest3),
	medirLongitud(arrayDeTest4) );

function obtenerMedia(resultados) {
	var sumador = 0;

	for(var i = 0;i < resultados.length; i++ ) {
		sumador = sumador + resultados[i].longitud;
	}

	return sumador/resultados.length; 
}

console.log("La media es  " + obtenerMedia(resultados));