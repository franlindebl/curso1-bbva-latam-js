function getNombreAleatorio(arregloNombres) {
    var numeroAleatorio = Math.floor(Math.random() * arregloNombres.length);
    return arregloNombres[numeroAleatorio];
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}