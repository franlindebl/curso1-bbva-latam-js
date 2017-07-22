var calculoDNI = function (numeroDNI) {
	var letra = "";
	var tablaLetra = ["T","R","W","A","G","M","Y","F","P","D","X","B","N","J","Z","S","Q","V","H","L","C","K","E"];
	if (typeof(numeroDNI) == "number"){
		if (numeroDNI.toString().length === 8){
			if (numeroDNI >= 0){
				var i = numeroDNI%23;
				letra = tablaLetra[i];

			}else{
				alert("Debes introducir un valor numerico positivo");
			}

		}else{
			alert("Debes introducir un valor numerico a 8");
		}
		
	} else{
		alert("Debes introducir un valor numerico");
	}
	
	return letra;
};
