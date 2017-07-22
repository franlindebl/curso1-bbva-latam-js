

/*

1.-funcion que calcule la longitud maxima de un array

*/

var arrayArreglos = function(datos){
	var long_maxima = 0;
	
	for (var indice = 0; indice < datos.length; indice++){
		if (long_maxima < datos[indice].length){
		 long_maxima = datos[indice].length;
		
		}
	}
return  long_maxima;
}

var datos = ["hola", "Frase corta", "frase normalita", "frase muy muy larga"];
console.log(arrayArreglos(datos));