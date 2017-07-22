var calculateDNI = function(numberDNI) {
    var letter = "";
    var i = numberDNI % 23

    var tableLetter = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E"];
    letter = tableLetter[i];

    if ((typeof (numberDNI)) !== "Number") {
        console.log("El valor ingresado no es un número");
    } else if (numberDNI.toString() > 8) {
        console.log("Ingresa 8 caracteres");
    } else if (numberDNI.toString() < 0) {
        console.log("Ingresa un valor positivo");
    } else {
        return letter;
    }
}

console.log("El calculo del DNI 12312312 es: " + calculateDNI(9488888));
console.log("El calculo del DNI 12312313 es: " + calculateDNI(2344567));
