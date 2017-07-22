function vaciarPapelera(array) {
	// Esta función debe recibir un array y devolverlo habiéndole quitado los elementos que sean un asterisco (*)

	// Por ejeplo:
	// vaciarPapelera(['a',1,'*',5]) 

	// debe devolver:
	// ['a',1,5]
	console.log(array);

	for (var it = 0; it < array.length; it++){
		
		var i = array.indexOf("*");
		 if ( i !== -1 ) {
	        array.splice( i, 1 );
	        var x = array;    
	}
	}

	return x;
}

var array = ["a", "*", 5, "*", "3"];
console.log(vaciarPapelera(array));



function agruparElementos(array) {
		// Esta función debbe recibir un array con números y letras y devolverlo habiendo agrupado los elementos
		// En primer lugar se deben encontrar números, depués letras. El orden dentro de cada grupo no importa.

		// Por ejemplo: 
		// agruparElementos(['B', 'a', 4 , 23, 'J']) 

		// debe devolver:
		// [23, 4, 'B', 'a', 'J']
	console.log(array);
	var elementos = array.sort();
	return elementos;
}
var array = ["a", 23, 4, "d", 1];
console.log(agruparElementos(array));






function ponerBonitasLasLetras(array) {
	// Esta función debe recinbir un array de números y letras y devolverlo con las letras vocales en mayúsculas 
	// y las consonantes en minúsculas. Los números no deben ser tratados.

	// Por ejemplo:
	// ponerBonitasLasLetras([1,5,7,'a','J',p,'E'])

	// debe devolver:
	// [1,5,7,'A','j',p,'E']
	var fina = [];
		console.log(array);
		for (var it = 0; it < array.length; it++){	
			
			if (array[it] == "a" || array[it] == "e" || array[it] == "i" || array[it] == "o" || array[it] == "u" || array[it] == "A" || array[it] == "E" || array[it] == "I" || array[it] == "O" || array[it] == "U"){
				resultado = array[it].toUpperCase();
				fina.splice(it,0,resultado)
				//console.log(fina);

			}else if(isNaN(array[it])){
				resultado = array[it].toLowerCase();
				fina.splice(it,0,resultado)
				//console.log(fina);
			}
			else{
				resultado = array[it];
				fina.splice(it,0,resultado)
				//console.log(fina);
			}
		}
		return fina;
		}
var array = [1,5,7,'a','J','p','e'];
console.log(ponerBonitasLasLetras(array));



function ponerBonitosLosNumeros(array) {
	//It receives an array with numbers and letters and returns it with its numbers beautified. Letters remain unchanged
	//Beautify process is to reduce a number into a single digit number by adding all its digits together: 
	// 123 = 6 because 1+2+3 = 6
	// 9 = 9
	// 9956 = 2 because 9+9+5+6 = 29 -> 2+9 = 11 -> 1+1 = 2
	// 793 = 1 because 7+9+3 = 19 -> 1+9 = 10 -> 1+0 = 1

	// Esta función debe recibbir un array de números y letras, y devolverlo con los números "bonitos". 
	// Las letras no deben cambiar. 
	// Para poner bonito número debemos sumar todas sus cifras.
	// en caso de que el número resultante tenga más de una cifra, se petirá el proceso con este.
	// 123 se convertirá en 6 porque 1+2+3 = 6
	// 9 se convertirá en 9
	// 9956 se convertirá en 2 porque 9+9+5+6 = 29, 2+9 = 11 y 1+1 = 2
	// 793 se convertirá en 1 porque 7+9+3 = 19, 1+9 = 10 y 1+0 = 1

	// Este proceso debemos realizarlo sobre un array de elementos y aplicarlo solo a los números.

	// Por ejemplo: 
	// ponerBonitosLosNumeros([23,59, 4,'A','b'])

	// debe devolver
	// [5, 5, 4, 'A', 'b']
}

function ordenarArray(array) {
	//It receives an array with numbers and letters and returns it with its items sorted. Numbers on one side and letters on the other.
	//Example: ordenarArray([5,5, 4, 1, 'j', A','b', 'E']) returns [1, 4, 5, 5, 'A', 'b', 'E', 'j']
	console.log(array);
    var fina = [];
    var fina2 = [];
    for (var it = 0; it < array.length; it++){
    	
	    	if(isNaN(array[it])){

	    		resultado= array[it];
	    		fina.splice(it,0,resultado)

	    	}else {
	    		resultado= array[it];
				fina2.splice(it,0,resultado)

	    		//function comparar ( a, b ){ return a - b; }
	    		//var elementos = array.sort(comparar);
	    	}

		function comparar(a,b){return a.toLowerCase().localeCompare(b.toLowerCase()); }
		var elementos1 = fina.sort(comparar);

	    function comparar1 (a,b){ return a - b; }
	    var elementos2 = fina2.sort(comparar1);
	}
	
	var elementos = elementos2.concat(elementos1);
	return elementos;
}
var array = [5,5, 4, 1, 'j', 'A','b', 'E'];
console.log(ordenarArray(array));




function arrayToString(array) {
	//It receives an array and returns a string with all its elements.
	//Example: arrayToString([1, 4, 5, 5, 'A', 'b', 'E', 'j']) returns "1455AbEj"

var fina = "";
		console.log(array);
		for (var it = 0; it < array.length; it++){
		resultado = array[it];
		fina += resultado;
	}
return fina;

}

var array = [1, 4, 5, 5, 'A', 'b', 'E', 'j'];
console.log(arrayToString(array));


// Tests
/*
function transformacionCompletaDelArray(array) {
	array = vaciarPapelera(array);
	array = agruparElementos(array);
	array = ponerBonitasLasLetras(array);
	array = ponerBonitosLosNumeros(array);
	array = ordenarArray(array);
	array = arrayToString(array);

	return array;
}

console.log(transformacionCompletaDelArray(["a", 6, "B", "F", "*", 8, 78, "J"]) === "668Abfj");
console.log(transformacionCompletaDelArray(["*", "j", 6, "A", "F", "*", 8, "C", "b", "a", 78, "J", 43523, 1111, "r", "q", "y"]) === "46688AAbcfjjqry");


*/