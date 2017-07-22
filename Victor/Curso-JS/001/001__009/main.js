// Ejercicio 001__009

// Esta función recibe un string y debe devolverlo con todas las letras a mayúsculas
function ponerTodasLasLetrasMayusculas(string) {
    return string.toUpperCase();
}

// Esta función recibe un string y devuelve el string inverso
// Por ejemplo: para el string "Hola clase" debe devolver "esalc aloH"
function stringInverso(string) {
    var cadenaTemp = "";
    var arrayTemp = string.split('');
    for (var i = arrayTemp.length - 1; i >= 0; i--) {
        cadenaTemp += arrayTemp[i];
    }

    return cadenaTemp;
}

// Esta funcion debe recibir un string y devolver el mismo string sin espacios
function eliminarEspacios(string) {
    var cadenaTemp = "";
    var arrayTemp = string.split(' ');
    // cadena = cadena.replace(/\s/g, '');
    for (var i = 0; i < arrayTemp.length; i++) {
        cadenaTemp += arrayTemp[i];
    }
    return cadenaTemp;
}

// Esta función debe recibir un string y decir si es un palíndromo (true / false)
// Un palíndromo es una frase que se lee igual al derecho que al revés
function esPalindromo(string) {
    var stringMayus1 = eliminarEspacios(ponerTodasLasLetrasMayusculas(string));
    var stringMayus2 = stringMayus1;

    stringMayus2 = stringInverso(stringMayus2);

    if (stringMayus1 == stringMayus2) {
        return true;
    } else {
        return false;
    }
}

console.log(ponerTodasLasLetrasMayusculas('Hola clase'));
console.log(stringInverso('Hola clase'));
console.log(eliminarEspacios('Ho la cla se'));
console.log(esPalindromo('HOla alOh'));
