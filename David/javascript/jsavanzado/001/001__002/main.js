/*

0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 
T R W A G M Y F P D X  B  N  J  Z  S  Q  V  H  L  C  K  E

*/

var calculoDNI = function(numeroDNI){
     var letra = "";


	if (typeof numeroDNI !== "number"){
    	letra = "Debe de ingresar un valor numerico";
	}

	if (typeof numeroDNI == "number"){
         
        if(numeroDNI.toString().length == 8 ) {
			var indice = numeroDNI%23;
			var tablaLetras = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
			letra = tablaLetras[indice];
		}else {
			if(numeroDNI < 0){
				letra = "debes introducir un valor positivo";
			}else{
           			letra = "Largo debe ser 8";
       		}
        }	
	}

	return letra;

}

/*console.log("La Letra del DNI 12312312K es: ");
console.log(calculoDNI(12312312));

console.log("La Letra del DNI 78163312C es: ");
console.log(calculoDNI(78163312));

console.log("La Letra del DNI 12345678Z es: ");
console.log(calculoDNI(12345678));*/


console.log(calculoDNI(1));

