class APIClient {
    constructor() {

    }

    get(url, callback) {
        let peticion = new XMLHttpRequest();

        peticion.open("GET", url);

        peticion.onreadystatechange = function (response) {
            if (peticion.readyState === 4) {
                let objetoRespuesta = JSON.parse(peticion.responseText);
                callback(objetoRespuesta);
            }
        }

        peticion.send();

        return true;
    }

    post(url, datos, callback) {
        let peticion = new XMLHttpRequest();

        peticion.open("POST", url);

        peticion.onreadystatechange = function (response) {
            if (peticion.readyState === 4) {
                callback();
            }
        }
        peticion.send(datos);

        return true;
    }

    delete(url, callback) {
        let peticion = new XMLHttpRequest();

        peticion.open("DELETE", url);

        peticion.onreadystatechange = function (response) {
            if (peticion.readyState === 4) {
                callback();
            }
        }
        peticion.send();

        return true;
    }
}

class Utils {
    constructor() {

    }

    _getNombreAleatorio(arregloNombres) {
        var numeroAleatorio = Math.floor(Math.random() * arregloNombres.length);
        return arregloNombres[numeroAleatorio];
    }

    _getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    _cargaSelect(lista, nombreSelect) {
        var selector = document.getElementById(nombreSelect);
        for (var i = 0; i < lista.length; i++) {
            var option = document.createElement("option");
            option.text = lista[i];
            selector.add(option);
        }
    }

    _obtenTextSelect(idSelect) {
        var elemento = document.querySelector(idSelect);
        return elemento.options[elemento.selectedIndex].text;
    }

    _obtenValueInput(idInput) {
        var elemento = document.querySelector(idInput);
        return elemento.value;
    }

    _addEventClick(nombreButton, funcion) {
        document.querySelector(nombreButton).addEventListener("click", funcion);
    }

    _pintarEstructuraTabla(divDestino, tituloGral, tituloColumnas, nombreIDTbody) {
        let estructura = "";
        if (tituloGral != null) {
            estructura += '<p><strong>' + tituloGral + '</strong></p>';
        }
        estructura += '<table>';
        estructura += '<thead>';

        tituloColumnas.forEach((titulo) => estructura += this._pintarTH(titulo));

        estructura += '</thead>';
        estructura += '<tbody id="' + nombreIDTbody + '">';
        estructura += '</tbody>';
        estructura += '</table>';

        divDestino.innerHTML = estructura;
    }

    _pintarTH(valor) {
        return '<th>' + valor + '</th>';
    }

}
