var calculateDNI = function (numberDNI) {
	var letter = "";
	var i = numberDNI%23;
	var tableLetter = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];
	letter = tableLetter[i];
	return letter; 
}

console.log("El calculo del DNI 12312312 es: ")
console.log(calculateDNI(12312312));
console.log("El calculo del DNI 12312313 es: ")
console.log(calculateDNI(12312313));