var calculoArray = function (arreglo) {
    var objFrase = { longitud: 0 };
    for (var i = 0; i < arreglo.length; i++) {
        //console.log(typeof (arreglo[i]));
        if (typeof (arreglo[i]) == 'string') {
            if (arreglo[i].length > objFrase.longitud) {
                objFrase.longitud = arreglo[i].length;
                objFrase.string = arreglo[i];
            }
        }else{
            console.log("La valor " + arreglo[i] + " no es String.");
        }
    }
    return objFrase;
}

var array = ["Hola", "Frase corta", "Frase normalita", "Frase muy muy larga", 0, 1000000];
//console.log("La longitud mas larga es: " + calculoArray(array).longitud);
console.log(calculoArray(array));