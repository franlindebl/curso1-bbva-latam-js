 function obtenerPromedio(array) {
 	var numeros = array.split(':');
 	var sumador = 0;

 	numeros = Array.from(new Set(numeros)); //https://stackoverflow.com/questions/1960473/unique-values-in-an-array

 	for (var i = 0; i < numeros.length; i++) {
 		console.log(numeros[i])
 		sumador += Number(numeros[i]);
 	}

 	return sumador/numeros.length;
 }

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}


 console.log("El promedio es " +obtenerPromedio('80:70:90:100:100:100'));

 