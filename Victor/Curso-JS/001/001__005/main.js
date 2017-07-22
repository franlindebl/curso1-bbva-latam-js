var contadorDeCaracteres = function (cadena) {
    var arraySalida = { data: {}, error: null };
    if (typeof (cadena) == 'string') {
        var cadenaTemp = cadena.split('');

        for (var i = 0; i < cadenaTemp.length; i++) {
            arraySalida.data[cadenaTemp[i]] = (arraySalida.data[cadenaTemp[i]] ? arraySalida.data[cadenaTemp[i]] : 0) + 1;
        }

    } else {
        arraySalida.error = "No has enviado un string";
    }

    return arraySalida;
}

var cadena = 8;
var resultadoContador = contadorDeCaracteres(cadena);
console.log("Cadena: " + cadena);
console.log(resultadoContador);

var cadena2 = "123qweasdzxc123asd";
var resultadoContador2 = contadorDeCaracteres(cadena2);
console.log("Cadena: " + cadena2);
console.log(resultadoContador2);