function getNombreAleatorio(arregloNombres) {
    var numeroAleatorio = Math.floor(Math.random() * arregloNombres.length);
    return arregloNombres[numeroAleatorio];
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cargaSelect(lista, nombreSelect) {
    var selector = document.getElementById(nombreSelect);
    for (var i = 0; i < lista.length; i++) {
        var option = document.createElement("option");
        option.text = lista[i];
        selector.add(option);
    }
}

function obtenTextSelect(idSelect) {
    var elemento = document.getElementById(idSelect);
    return elemento.options[elemento.selectedIndex].text;
}

function obtenValueInput(idInput) {
    var elemento = document.getElementById(idInput);
    return elemento.value;
}