var stringDeNumeros = function (str) {
    var aux = str.split(":");
    var suma = 0;
    var index
    for (var i = 0; i < aux.length; i++){
        index = aux.indexOf(i);
        aux.splice(index, i);
    }

    for (var i = 0; i < aux.length; i++){
        suma = suma + Number(aux[i]);
    }
    suma = suma / aux.length;
    return suma;

};