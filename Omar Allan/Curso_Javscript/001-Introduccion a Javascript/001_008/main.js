function stringDeNumeros(string) {

/*escribe una funcion que reciba un string de numeros separados por dos puntos, cree un array a partir 
de ese string y devuelva la media de todos los valores
*/
var x = string.split(":").map(Number);
console.log(x);
var suma=0;
var resultado=0;

for(var i=0; i <= x.length-1; i++){
var suma = suma + x[i];
//console.log(suma); 
}
var resultado = suma/x.length;
//console.log(resultado);
return resultado;
}

var string = '80:70:90:100';
console.log(stringDeNumeros(string));

