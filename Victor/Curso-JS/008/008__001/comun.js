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

    _pintarEstructura() {
        let estructura = '';
        estructura += '<div class="divDashboard">';
        estructura += '<div class="divHeader"></div>';
        estructura += '<div class="divMain"></div>';
        estructura += '<div class="DivFooter"></div>';
        estructura += '</div>';

        document.querySelector("body").innerHTML = estructura;
    }

    _pintarDivTabla(divDestino, DivTabla) {
        // Preparamos div main
        let divMain = document.querySelector(divDestino);
        divMain.innerHTML = "";

        let divTabla = document.createElement("DIV");
        divTabla.className = DivTabla + " tablaDefault";

        divMain.appendChild(divTabla);
    }

    _pintarEstructuraTabla(divDestino, tituloGral, tituloColumnas = [], nombreIDTbody) {
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

    _pintarTR(tbodyLista, htmlTD) {
        let tr = document.createElement("TR");
        tr.innerHTML = htmlTD;
        tbodyLista.appendChild(tr);
    }
}

class apiLocalStorage {
    constructor() {
    }

    _getJsonAtLocalStorage(nombreParametro) {
        let cadena = localStorage.getItem(nombreParametro);
        return JSON.parse(cadena);
    }

    _setJsonAtLocalStorage(nombreParametro, Objeto) {
        let cadena = JSON.stringify(Objeto);
        localStorage.setItem(nombreParametro, cadena);
    }
}