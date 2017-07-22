function obtenerDNI(serie) {
	var numero = Number(serie);

	var mensaje = "";

	if(typeof numero != 'number')
		mensaje +="Se debe introducir un valor numérico. \n";
	if(serie.toString().length < 8) {
		//mensaje +="Se debe introducir un número de 8 cifras. \n";
		console.log("sssss");
		var ceros = "";

		for (var i = 0; i < (8 - serie.toString().length); i++) {
			ceros +="0";
		}

		numero = ceros + serie;
	}
	if(numero < 0)
		mensaje+= "Se debe introducir número positvo. \n";

	if(mensaje.length > 0)
		return mensaje;

	var residuo = numero % 23;
	var letra = '';

	switch(residuo) {
		case 0:
			letra = 'T';
			break;
		case 1:
			letra = 'R';
			break;
		case 2:
			letra = 'W';
			break;
		case 3:
			letra = 'A';
			break;
		case 4:
			letra = 'G';
			break;
		case 5:
			letra = 'M';
			break;
		case 6:
			letra = 'Y';
			break;
		case 7:
			letra = 'F';
			break;
		case 8:
			letra = 'P';
			break;
		case 9:
			letra = 'D';
			break;
		case 10:
			letra = 'X';
			break;
		case 11:
			letra = 'B';
			break;
		case 12:
			letra = 'N';
			break;
		case 13:
			letra = 'J';
			break;
		case 14:
			letra = 'Z';
			break;
		case 15:
			letra = 'S';
			break;
		case 16:
			letra = 'Q';
			break;
		case 17:
			letra = 'V';
			break;
		case 18:
			letra = 'H';
			break;
		case 19:
			letra = 'L';
			break;
		case 20:
			letra = 'C';
			break;
		case 21:
			letra = 'K';
			break;
		case 22:
			letra = 'E';
			break;
		default: console.log("Valor no encontrado.");
	}

	return numero + letra;
}

console.log(obtenerDNI(12312));
console.log(obtenerDNI(78163312));
console.log(obtenerDNI(12345678));
console.log(obtenerDNI(34667892));
console.log(obtenerDNI(92234488));