var aMayusculas = function (srt) {
    var res = srt.toUpperCase();
	return res;	
};

var sInverso = function (srt) {
    var x = cadena.length;
    var cadenaInvertida = "";

    while (x>=0) {
        cadenaInvertida = cadenaInvertida + cadena.charAt(x);
        x--;
    }
    return cadenaInvertida;
};