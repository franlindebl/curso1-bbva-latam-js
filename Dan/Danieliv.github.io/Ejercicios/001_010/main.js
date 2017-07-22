var cadena = "Cadena de prueba";

function invertirCadena(string) {
    var stringInvertida = "";
    for(var i=0; i<string.length; i++) {
        stringInvertida = string[i];
        console.log(stringInvertida)
    }
}

function convierteMayuscula (texto) {
    var cadenaMayuscula = texto.toUpperCase();
    return cadenaMayuscula;
}

function eliminaEspacios (string) {
    var dividirCadena = string.split(" ");
    var cadenaSinEspacios = dividirCadena;
        for(var i=0; i<dividirCadena.length; i++) {
            console.log(dividirCadena[i]);
        }
}

function eliminaEspacios (string) {
    var cadenaRemplazada = string.replace(/\s/g,'');
    return cadenaRemplazada;
}

function esPalindromo (string) {
    var palabraMayusculas = convierteMayuscula.string;
    var palabraInvertidaMayuscula = palabraInvertida.string;
    If(palabraInvertida == palabraMayusculas) 
        console.log("Es paindromo");
    

}

//invertirCadena(cadena);
//convierteMayuscula(cadena);
//eliminaEspacios(cadena);