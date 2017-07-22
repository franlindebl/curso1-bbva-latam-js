var calculoArray = function (arreglo) {
    var objFrase = { longitud: 0 };
    for (var i = 0; i < arreglo.length; i++) {
        //console.log(typeof (arreglo[i]));
        if (typeof (arreglo[i]) == 'string') {
            if (arreglo[i].length > objFrase.longitud) {
                objFrase.longitud = arreglo[i].length;
                objFrase.string = arreglo[i];
            }
        } else {
            console.log("La valor " + arreglo[i] + " no es String.");
        }
    }
    return objFrase;
}

var resultados = [];
var arrayDeTest1 = ["Richie", "Joanie", "Greg", "Marcia", "Bobby"];
var arrayDeTest2 = ["Blanka", "Zangief", "Chun Li", "Guile"];
var arrayDeTest3 = ["Red", "Blue", "Green"];
var arrayDeTest4 = ["Hola", "Frase corta", "Frase normalita", "Frase muy muy larga"];

resultados.push(calculoArray(arrayDeTest1).longitud);
resultados.push(calculoArray(arrayDeTest2).longitud);
resultados.push(calculoArray(arrayDeTest3).longitud);
resultados.push(calculoArray(arrayDeTest4).longitud);

console.log(resultados);

var suma = 0;
for (var i = 0; i < resultados.length; i++) {
    suma += resultados[i];
}

console.log("La media es: " + (suma / resultados.length));