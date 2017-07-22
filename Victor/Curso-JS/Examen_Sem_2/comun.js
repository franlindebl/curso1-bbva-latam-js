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

function obtenValueInputClean(idInput) {
    var element = document.getElementById(idInput);
    var valor = element.value;

    element.value = "";
    return valor;
}

function creaCeldaTexto(nombreTabla, textoCelda) {
    var celda = document.createElement("TD");
    var texto = document.createTextNode(textoCelda);
    celda.appendChild(texto);
    document.getElementById(nombreTabla).appendChild(celda);
}

function creaCeldaImagen(nombreTabla, url) {
    var celda = document.createElement("TD");
    var img = document.createElement("IMG");
    img.setAttribute("scr", url)
    celda.appendChild(img);
    document.getElementById(nombreTabla).appendChild(celda);
}

function creaCeldaButton(nombreTabla, id) {
    var celda = document.createElement("TD");
    var boton = document.createElement("BUTTON");
    boton.setAttribute("class", "btnBorrar");
    boton.setAttribute("onclick", "miTienda.delProducto('" + id + "')");
    boton.innerHTML = "Borrar";

    celda.appendChild(boton);
    document.getElementById(nombreTabla).appendChild(celda);
}

function creaEncabezadosTabla(nombreTabla) {
    var x = document.createElement("TR");
    document.getElementById(nombreTabla).appendChild(x);

    var celda = document.createElement("TH");
    var texto = document.createTextNode("Imagen");
    celda.appendChild(texto);
    document.getElementById(nombreTabla).appendChild(celda);

    var celda1 = document.createElement("TH");
    var texto2 = document.createTextNode("Nombre");
    celda1.appendChild(texto2);
    document.getElementById(nombreTabla).appendChild(celda1);

    var celda3 = document.createElement("TH");
    var texto3 = document.createTextNode("Precio");
    celda3.appendChild(texto3);
    document.getElementById(nombreTabla).appendChild(celda3);

    var celda4 = document.createElement("TH");
    var texto2 = document.createTextNode("Descripción");
    celda4.appendChild(texto2);
    document.getElementById(nombreTabla).appendChild(celda4);

    var celda5 = document.createElement("TH");
    var texto5 = document.createTextNode("Acciones");
    celda5.appendChild(texto5);
    document.getElementById(nombreTabla).appendChild(celda5);
}