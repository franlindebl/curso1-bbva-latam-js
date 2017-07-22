
function contarCaracteres(cadena) {

	var componentes = cadena.split('');

	var resultado = {

	}

	console.log(componentes.length);

	for (var i = 0; i < componentes.length; i++) {
		if(!resultado[componentes[i]]) {
			resultado[componentes[i]] = 0;
		}

		resultado[componentes[i]]++;	
	}


	return(resultado);
}

console.log(contarCaracteres("abbabcbdbabdbdbabababcbcbab"));
console.log(contarCaracteres("xyyyxyxyxzyxyzyxyxyasdfz"));