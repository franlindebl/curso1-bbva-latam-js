var calculoDNI = function (numeroDNI) {
	var letra = "";
	var i = numeroDNI%23;
	var tablaLetra = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];

	letra = tablaLetra[i];

	return letra;
};

console.log("La letra del DNI 12312312K es:");
console.log(calculoDNI(12312312));
console.log("La letra del DNI 78163312C es:");
console.log(calculoDNI(78163312));
console.log("La letra del DNI 12345678Z es:");
console.log(calculoDNI(12345678));