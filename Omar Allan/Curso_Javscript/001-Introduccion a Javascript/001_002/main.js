

/*

Tabla de Letras
 0	  1.   2.   3.   4.   5.   6.   7.   8.   9.   10.  11.  12.  13.  14.  15.  16.  17.  18.  19.  20.  21.  22.	
"T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"

1.- si introducimos un valor no numerico debera mostrar el mensaje : "debes introducir un valor numerico"
2.- si introducimos un valor numerico que no tenga 8 cifras debera mostrar "debes introducir un numero de 8 cifras"
3.- si introducimos un valor nuemrico negarivo mande error


*/

var calculoDNI = function(numeroDNI){

	var letra = "";
	var indice = numeroDNI%23;
	var tablaLetras = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
	var x = "";
    var y = numeroDNI.toString();


	if (isNaN(numeroDNI)){
		letra = "debes introducir un valor numerico";
	} else if(y.length !== 8){
		letra = "Debes introducir 8 numeros solamente";
			}
			else if(numeroDNI < 0){
				letra = "error numero negativo introduce uno mayor a 0";
			}else{
				letra = tablaLetras[indice];
			}
			return letra;
}


console.log("La letra del DNI 12312312K ES: ");
console.log(calculoDNI(12312312));
console.log(calculoDNI("a1231231"));
console.log(calculoDNI(331231231));
console.log(calculoDNI(-1231231));

/*console.log("La letra del DNI 78163312C ES: ");
console.log(calculoDNI(78163312));
console.log("La letra del DNI 12345678Z ES: ");
console.log(calculoDNI(12345678));*/