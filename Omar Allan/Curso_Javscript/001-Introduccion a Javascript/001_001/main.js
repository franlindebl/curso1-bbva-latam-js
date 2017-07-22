

/*

Tabla de Letras
 0	  1.   2.   3.   4.   5.   6.   7.   8.   9.   10.  11.  12.  13.  14.  15.  16.  17.  18.  19.  20.  21.  22.	
"T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"

*/

var calculoDNI = function(numeroDNI){

var letra = "";
var indice = numeroDNI%23;
var tablaLetras = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];

letra = tablaLetras[indice];
return letra;

}

console.log("La letra del DNI 12312312K ES: ");
console.log(calculoDNI(12312312));
console.log("La letra del DNI 78163312C ES: ");
console.log(calculoDNI(78163312));
console.log("La letra del DNI 12345678Z ES: ");
console.log(calculoDNI(12345678));