function hacer() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://ironhack-characters.herokuapp.com/characters");
    xhr.onreadystatechange = function(response) {
        console.log(xhr.responseText);
    }
    xhr.send();
    return true;
}

function hacerPostDepersonaje() {
    var peticion = new XMLHttpRequest();

    peticion.open("POST", "https://ironhack-characters.herokuapp.com/characters");

    peticion.onreadystatechange = function(response) {
        if (peticion.readyState === 4) {
            console.log(peticion.responseText);
        }
    }

    var data = new FormData();
    data.append("name", "Nuevo personakje de Fran");
    data.append("occupation", "Matar Alumnos");
    data.append("debt", "NUevo personakje de Fran");
    data.append("weapon", "ahh Xanxo");

    peticion.send(data);
}

/*-----------------------------------------------------------------------*/

function hacerGetpersonajesConFetch() {
    var url = "https://ironhack-characters.herokuapp.com/characters";
    var misCabeceras = new Headers();

    var miInit = {
        method: 'GET',
        headers: misCabeceras
    };

    var prueba = fetch(url, miInit).then(
        (response) => {
            return response.json();
        }
    ).then(
        (dataEnJson) => {
            console.log(dataEnJson);
            return true;
        }
    );

}

//hacerGetpersonajesConFetch();


class Personaje {
    constructor(nombre, ocupacion, debt, weapon) {
        this._nombre = nombre;
        this._ocupacion = ocupacion;
        this._debt = debt;
        this._weapon = weapon;

    }

    getRowForDivPersonajes() {
        let fila = "";
        fila = fila + '<tr>';
        fila = fila + '<td>' + this._nombre + '</td>';
        fila = fila + '<td>' + this._ocupacion + '</td>';
        fila = fila + '<td>' + this._weapon + '</td>';
        fila = fila + '<td>' + this._debt + '</td>';
        fila = fila + '<td><button class="button-main" onclick="">Borrar</button></td>';
        fila = fila + '</tr>';
        return fila;
    }
}

class PersonajeClient {
    constructor() {
        this._urlBase = "https://ironhack-characters.herokuapp.com";
        this._apiClient = new APIClient();
    }

    getDePersonajes(callback) {
        let urlCompleta = this._urlBase + '/characters';

        var promise = this._apiClient.get(urlCompleta).then((data) => {
            let arrayPersonajes = [];

            for (let i = 0; i < data.length; i++) {
                let elem = data[i];
                let personaje = new Personaje(elem.name, elem.occupation, elem.debt, elem.weapon);
                arrayPersonajes.push(personaje);
            }

            return arrayPersonajes;
        });

        return promise;
    }

    postDePersonajes(arrayPersonaje, callback) {
        let urlCompleta = this._urlBase + '/characters';

        console.log("postDePersonajes : ", arrayPersonaje);

        let traduccionCallback = (respuesta) => {
            let arrayPersonajes = [];
            console.log("respuesta", respuesta);

            callback(respuesta);
        }
        this._apiClient.post(urlCompleta, arrayPersonaje, traduccionCallback);
    }
}

class APIClient {
    constructor() {

    }

    get(url) {
        var misCabeceras = new Headers();

        var miInit = {
            method: 'GET',
            headers: misCabeceras
        };

        var promise = fetch(url, miInit).then(
            (response) => {
                return response.json();
            }
        );
        return promise;
    }


}

class AlmacenarPersonajes {

    constructor() {
        this._personajes = [];
        this._personajeClient = new PersonajeClient();
        this.pintarEstructuraGeneral();

    }

    getPersonajes() {
        let miCallback =
            this._personajeClient.getDePersonajes().then((data) => {
                this._personajes = data;
                this.pintarPersonajes(this._personajes);
            });
            
    }

    pintarPersonajes(personajes) {
        console.log("pintarPersonajes : ", personajes);

        document.getElementById("personajes").innerHTML = "";
        let tbodyInner = "";
        for (let i = 0; i < personajes.length; i++) {
            let personaje = personajes[i];
            tbodyInner = tbodyInner + personaje.getRowForDivPersonajes();
            console.log(personajes[i]);
        }
        document.getElementById("personajes").innerHTML = tbodyInner;

    }

    pintarEstructuraGeneral() {
        document.getElementById("estructura").innerHTML = "";
        var header = document.getElementById("header");
        let fila = "";
        fila = fila + '<form><div id="header" class="header">Añadir Personajes</div></form>';
        fila = fila + '<div><div class="columna-izq columna"><table id="personajes" class="w3-table-all w3-centered"></table></div>';
        fila = fila + '<div id="recepcion" class="footer"></div>';
        return document.getElementById("estructura").innerHTML = fila;
    }
    addPersonaje() {

        this.getPersonajes();
    }
    pintar() {
        document.getElementById("header").innerHTML = "";
        this.pintarInput("nombre", "input");
        this.pintarInput("weapon", "input");
        this.pintarInput("occupation", "input");
        this.pintarInput("debt", "input");

        var botonAtenderOrdenes = document.createElement('button');
        botonAtenderOrdenes.id = 'botonTomarNota';
        botonAtenderOrdenes.type = 'button';
        botonAtenderOrdenes.textContent = 'Cargar';
        botonAtenderOrdenes.onclick = () => this.addPersonaje();
        header.appendChild(botonAtenderOrdenes);
    }

    btoBorrar() {
        var botonBorrar = document.createElement('button');
        botonBorrar.id = 'botonBorrar';
        botonBorrar.type = 'button';
        botonBorrar.textContent = 'Borrar';
        botonBorrar.onclick = () => this.addPersonaje();
        //header.appendChild(botonBorrar); 

        document.getElementById("btoBorrar").innerHTML = botonBorrar;

    }

    pintarInput(nombre, tipo) {
        var anonimoInput = document.createElement(tipo);
        anonimoInput.id = nombre;
        anonimoInput.name = nombre;
        anonimoInput.type = tipo;
        anonimoInput.textContent = nombre;
        header.appendChild(anonimoInput);
    }
    iniciarIntervalo() {
        this.ejecutarCiclo();
    }
    ejecutarCiclo() {
        this.pintar();
    }
}

let misPersonajes = null;
window.onload = () => {
    var misPersonajes = new AlmacenarPersonajes();
    console.log(misPersonajes);
    misPersonajes.iniciarIntervalo();
}
