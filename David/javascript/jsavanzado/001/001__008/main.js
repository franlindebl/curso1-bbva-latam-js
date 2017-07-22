/*

Ejercicio: 001_008

Escribe una funcion que reciba un string de numeros 
separados por dos puntos, cree un array a partir del string y devuekva la media de todos los valores


*/



var stringDeNumeros = function(cadena){
	//var resultado = cadena.split(":");
	var resultado = cadena;
	console.log(" resultado : ", cadena );
    var total = 0; 
     for (var i=0; i < resultado.length; i++){
          total += parseInt(resultado[i]);
      }
      var promedio=total/resultado.length;
    return promedio;
}

var eliminarRepetidos= function(cadena){
    var array = []
	var resultado = cadena.split(":");
     for (var i=0; i < resultado.length; i++){
          var j = array.indexOf(resultado[i]);
          if ( j == -1 ) {
              array.push(resultado[i]);
              console.log(resultado[i]);
           }
      }
    return stringDeNumeros(array);
}


console.log(eliminarRepetidos('80:70:90:100:100:100:100:80'));

