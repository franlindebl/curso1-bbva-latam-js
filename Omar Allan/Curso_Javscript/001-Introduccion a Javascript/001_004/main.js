

/*

1.-funcion que calcule la longitud maxima de un array

*/

var arrayArreglos = function(datos, datos1, datos2){
	var long_maxima = 0;
	var long_maxima1 = 0;
	var long_maxima2 = 0;
	var valor = "";
	
var arreglo1 = [];
var arreglo2 = [];

	for (var indice = 0; indice < datos.length; indice++){
		if (long_maxima < datos[indice].length){
		 long_maxima = datos[indice].length;
		 var valor = datos[indice]; //obtenga el valor como tal del arreglo
		}
	}
	arreglo1.splice(indice,0,valor);
	arreglo2.splice(indice,0,long_maxima);
	//console.log(arreglo1);

		for (var indice = 0; indice < datos1.length; indice++){
		if (long_maxima1 < datos1[indice].length){
		 long_maxima1 = datos1[indice].length;
		 var valor = datos1[indice];
		 
		}
	}
	arreglo1.splice(indice,0,valor);
	arreglo2.splice(indice,0,long_maxima1);
	//console.log(arreglo1);

		for (var indice = 0; indice < datos2.length; indice++){
		if (long_maxima2 < datos2[indice].length){
		 long_maxima2 = datos2[indice].length;
		 var valor = datos2[indice];
		}
	}

	arreglo1.splice(indice,0,valor);
	console.log(arreglo1);
	arreglo2.splice(indice,0,long_maxima2);
	console.log(arreglo2);


	var suma = long_maxima + long_maxima1 + long_maxima2;
	var media = suma / 3;
	console.log(media);



return  media;
}

var datos = ["hola", "Frase corta", "frase normalita", "frase muy muy larga"];
var datos1 = ["hola", "1234567890asdfghjjkk", "frase normalita", "frase muy muy larga"];
var datos2 = ["hola", "Frase corta", "frase normalitaxxxxxxxxxxxxxxx", "frase muy muy larga"];

console.log(arrayArreglos(datos, datos1, datos2));




/*

arrayDeStrings.forEach(function(string){
	var longitud =string.length;
	if (longitud > long_maxima){
		long_maxima = longitud;
	}
});*/