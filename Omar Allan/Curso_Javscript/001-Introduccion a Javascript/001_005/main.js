

/*

1.-funcion que alamcene en un objeto las letras y el numero de veces que se repite

*/

function contadorCaracteres(palabra){
var resultado={};
var letra= palabra.split("");
//letra.forEach(function(caracter){

for (var i = 0; i < letra.length; i++){
var caracter = letra[i];
if(!resultado[caracter]){
	resultado[caracter] = 0;
}
resultado[caracter] = resultado[caracter] + 1;
}

return resultado;


}


var palabra = "aaabcdbcdbcadee";
console.log(contadorCaracteres(palabra));





