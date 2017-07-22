function contadorCaracter(string) {
    var resultado = {};
    var array = string.split("");

    array.forEach(function(caracter) {
        if (!resultado[caracter]) {
            resultado[caracter] = 0;
        }
        resultado[caracter] = resultado[caracter] + 1;
    });
    return resultado;
}

contadorCaracter("werqwerw");