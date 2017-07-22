class Personaje {
    constructor(nombre, ocupacion, debt, arma, id) {
        this._id = id;
        this._nombre = nombre;
        this._ocupacion = ocupacion;
        this._debt = debt;
        this._arma = arma;
    }
    getRowForTable () {
        let fila = "";
        fila = '<tr>';
        fila += '<td>' + this._nombre + '</td>';
        fila += '<td>' + this._ocupacion + '</td>';
        fila += '<td>' + this._debt + '</td>';
        fila += '<td>' + this._arma + '</td>';
        fila += '<td><button class="button-main" onclick="alm.deletePersonajeDelForm(' + this._id + ')">Borrar</button></td>';
        fila += '</tr>';
        return fila;
    }
}

class APIClient {
    constructor() {}

    get(url, callback) {
        var peticion = new XMLHttpRequest();
        peticion.open("GET", url);
        peticion.onreadystatechange = function(response) {
            if (peticion.readyState === 4) {
                var objetoRespuesta = JSON.parse(peticion.responseText);
                callback(objetoRespuesta);
            }
        }
        peticion.send();
    }

    post(url, data, callback) {
        var peticion = new XMLHttpRequest();
        peticion.open("POST", url);
        peticion.onreadystatechange = function(response) {
            if (peticion.readyState === 4) {
                var objetoRespuesta = JSON.parse(peticion.responseText);
                callback(objetoRespuesta);
            }
        }
        // var data = new FormData();
        // data.append("name", name);
        // data.append("occupation", ocupacion);
        // data.append("debt", debt);
        // data.append("weapon", weapon);
        peticion.send(data);
    }

    delete(url, callback) {
        var peticion = new XMLHttpRequest();
        peticion.open("DELETE", url);
        peticion.onreadystatechange = function(response) {
            if (peticion.readyState === 4) {
                callback("Se elimino con exito la posición: ");
            }
        }
        peticion.send();
    }
}

class PersonajeClient {
    constructor() {
        this._urlBase = "https://ironhack-characters.herokuapp.com/characters";
        this._apiClient = new APIClient();
    }

    getDePersonajes(callback) {
        let urlCompleta = this._urlBase;

        let traduccionCallback = (respuesta) => {
            let arrayPersonajes = [];

            for(let i=0; i<respuesta.length; i++){
                let elem = respuesta[i];
                let personaje = new Personaje(elem.name, elem.occupation, elem.debt, elem.weapon, elem.id);
                arrayPersonajes.push(personaje);
            }
            callback(arrayPersonajes);
        }
        this._apiClient.get(urlCompleta, traduccionCallback);
    }

    postDePersonajes(data,callback) {
        let urlCompleta = this._urlBase;

        var dataForm = new FormData();
        dataForm.append("name", data._nombre);
        dataForm.append("occupation", data._ocupacion);
        dataForm.append("debt", data._debt);
        dataForm.append("weapon", data._arma);

        this._apiClient.post(urlCompleta, dataForm, callback);
    }

    deleteDePersonajes(id,callback) {
        let urlCompleta = this._urlBase + "/" + id;
        this._apiClient.delete(urlCompleta, callback);
    }
}

class AlmacenPersonajes {
    constructor() {
        this._personajes = [];
        this._personajeClient = new PersonajeClient();
    }

    iniciarIntervalo(){
        window.setInterval( () => this.ejecutarCiclo(), 2000);
    }

    addPersonajes(){
        let miCallback = (data) => {
            console.log(data);
            this._personajes = data;
        }
        this._personajeClient.getDePersonajes(miCallback);
    }

    getPersonajeDelForm (callback) {
        let personaje = null;
        let nombre = document.getElementById('nombre').value;
        let ocupacion = document.getElementById('ocupacion').value;
        let debt = document.getElementById('debt').value;
        let arma = document.getElementById('arma').value;
        personaje = new Personaje(nombre, ocupacion, debt, arma);

        let miCallback = (data) => {
            console.log(data);
        }

        this._personajeClient.postDePersonajes(personaje,miCallback);
    }

    deletePersonajeDelForm (id,callback) {

        let miCallback = (data) => {
            console.warn(data + id);
        }

        this._personajeClient.deleteDePersonajes(id,miCallback);
    }

    pintarPersonajes () {
        document.getElementById('tbodypersonaje').innerHTML = "";
        let tbodyinner = "";
        for (let i=0;i<this._personajes.length;i++) {
            let personaje = this._personajes[i];
            tbodyinner = tbodyinner + personaje.getRowForTable();
        }
        document.getElementById('tbodypersonaje').innerHTML = tbodyinner;
    }

    ejecutarCiclo(){
        this.addPersonajes();
        this.pintar();
        console.log("Se refresca");
    }

    pintar() {
        this.pintarPersonajes();
    }
}

var alm = null;
window.onload = () => {
    alm = new AlmacenPersonajes();
    alm.iniciarIntervalo();
};

