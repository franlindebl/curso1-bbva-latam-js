var arreglo = ["Hola", "Frase corta", "Frase normalita", "Frase muy muy larga", "otro"];

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

console.log(medirLongitud(arreglo));