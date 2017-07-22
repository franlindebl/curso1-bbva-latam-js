/*
    Tabla de letras

*/

var calculoDNI = function (numeroDNI) {
    var letra = "";
    var indice = 0;
    var tablaLetras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
    var longitud = ('' + numeroDNI).length;

    if (typeof (numeroDNI) == 'number') {
        if (numeroDNI > 0) {
            if (longitud <= 8) {
                if ( longitud < 8 ){
                    numeroDNI = '00000000'.substr(longitud) + numeroDNI;
                    console.log('Se complemento el valor numerico: ' + numeroDNI);
                }
                indice = numeroDNI % 23;
                letra = tablaLetras[indice];
            } else {
                console.log('Debe introducir un numéro de 8 cifras');
            }
        } else {
            console.log('Debes introducir un valor positivo');
        }
    } else {
        console.log('Debes introducir un valor numérico.');
    }

    return letra;
}

console.log("La letra del DNI 12312312K es:");
console.log(calculoDNI('12312312K'));
console.log("La letra del DNI 781633126 es:");
console.log(calculoDNI(781633126));
console.log("La letra del DNI -12345678 es:");
console.log(calculoDNI(-12345678));


console.log("La letra del DNI 678 es:");
console.log(calculoDNI(678));