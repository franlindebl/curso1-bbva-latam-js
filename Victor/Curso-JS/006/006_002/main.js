class Personaje {
    constructor(nombre, ocupacion, debt, weapon, id) {
        this._nombre = nombre;
        this._ocupacion = ocupacion;
        this._debt = debt;
        this._weapon = weapon;
        this._id = id;
    }

    _getRowForTable() {
        let fila = '';
        fila += '<td>' + this._nombre + '</td>';
        fila += '<td>' + this._ocupacion + '</td>';
        fila += '<td>' + this._weapon + '</td>';
        fila += '<td>' + this._debt + '</td>';
        fila += '<td><button id="btModificar_' + this._id + '" class="buttonModificar">Modificar</button>';
        fila += '<button id="btBorrar' + this._id + '" class="buttonBorrar">Borrar</button></td>';

        return fila;
    }

    //////////////////////
    _getFormModifica() {
        let formulario = '';

        formulario += '<div class="datoForm datoFormMod"><label for="nombreMod">Nombre: </label><input id="nombreMod" type="text" value="$(this._nombre)" placeholder="Nombre del Personaje"/></div>';
        formulario += '<div class="datoForm datoFormMod"><label for="ocupacionMod">Ocupación: </label><input id="ocupacionMod" type="text" placeholder="Ocupacion del Personaje"/></div>';
        formulario += '<div class="datoForm datoFormMod"><label for="armaMod">Arma: </label><input id="armaMod" type="text" placeholder="Nombre del Personaje"/></div>';
        formulario += '<div class="datoForm datoFormMod"><label for="debtMod">Debut: </label><select id="debtMod"><option selected>SI</option><option>NO</option></select></div>';
        formulario += '<div class="datoForm datoFormMod"><button id="btGuardar">Guardar</button></div>';

        return formulario;
    }
}

class AlmacenPersonajes {
    constructor() {
        this._personajes = [];
        this._personajeClient = new PersonajeClient();

        this.utils = new Utils();
    }

    pintarEstructura() {
        let estructura = '';
        estructura += '<div class="divDashboard">';
        estructura += '<div class="divHeader"></div>';
        estructura += '<div class="divMain"></div>';
        estructura += '<div class="DivFooter"></div>';
        estructura += '</div>';

        document.querySelector("body").innerHTML = estructura;
    }

    pintarHeader() {
        let header = '<p><strong>Añadir personajes:</strong></p>';
        header += '<div class="datoForm"><label for="nombre">Nombre: </label><input id="nombre" type="text" placeholder="Nombre del Personaje"/></div>';
        header += '<div class="datoForm"><label for="ocupacion">Ocupación: </label><input id="ocupacion" type="text" placeholder="Ocupacion del Personaje"/></div>';
        header += '<div class="datoForm"><label for="arma">Arma: </label><input id="arma" type="text" placeholder="Nombre del Personaje"/></div>';
        header += '<div class="datoForm"><label for="debt">Debut: </label><select id="debt"><option selected>SI</option><option>NO</option></select></div>';
        header += '<div class="datoForm"><button id="btCrear">Crear</button></div>';

        document.querySelector(".divHeader").innerHTML = header;

        // Agregar evento click
        this.utils._addEventClick("#btCrear", this.addPersonaje.bind(this));
    }

    pintarDivTabla(divDestino) {
        divDestino.innerHTML = "";

        let divTabla = document.createElement("DIV");
        divTabla.className = "divListaPersonajes tablaDefault";

        divDestino.appendChild(divTabla);
    }

    pintarEstructuraTabla(divListaPersonajes) {
        let tituloColumnas = ["Nombre", "Ocupación", "Arma", "Debut", "Acción"];

        let divDestino = document.querySelector(divListaPersonajes);
        this.utils._pintarEstructuraTabla(divDestino, null, tituloColumnas, "tbodyListaPersonajes");
    }

    pintaListaPersonajes(data) {
        this._personajes = data;

        let tbodyListaPersonajes = document.querySelector("#tbodyListaPersonajes");
        tbodyListaPersonajes.innerHTML = "";

        this._personajes.forEach((personaje) => {
            let tr = document.createElement("TR");
            tr.innerHTML = personaje._getRowForTable();
            tbodyListaPersonajes.appendChild(tr);

            // Agregar evento click
            this.utils._addEventClick("#btBorrar" + personaje._id, this.borrarPersonaje.bind(this, personaje._id));
        });
    }

    pintarPersonajes() {
        let divMain = document.querySelector(".divMain");
        divMain.innerHTML = "";

        this.pintarDivTabla(divMain);
        this.pintarEstructuraTabla(".divListaPersonajes");

        this._personajeClient.getDePersonajes(this.pintaListaPersonajes.bind(this));

        let promise = this._apiClient.get(urlCompleta).then(
            (data) => {
                let arrayPersonajes = [];

                for (let i = 0; i < data.length; i++) {
                    let elem = data[i];
                    let personaje = new Personaje(elem.name, elem.occupation, elem.debt, elem.weapon, elem.id);
                    arrayPersonajes.push(personaje);
                }

                return arrayPersonajes;
            }
        );

        return promise;
    }

    pintar() {
        this.pintarEstructura();
        this.pintarHeader();
        this.pintarPersonajes();
    }

    addPersonaje() {
        let name = this.utils._obtenValueInput("#nombre");
        let ocupacion = this.utils._obtenValueInput("#ocupacion");
        let debt = this.utils._obtenValueInput("#debt") == 'SI' ? true : false;
        let weapon = this.utils._obtenValueInput("#arma");

        this._personajeClient.postDePersonajes(name, ocupacion, debt, weapon, this.pintar.bind(this));
    }

    borrarPersonaje(id) {
        this._personajeClient.deletePersonaje(id, this.pintar.bind(this));
    }
}

class PersonajeClient {
    constructor() {
        this._urlBase = "https://ironhack-characters.herokuapp.com";
        this._apiClient = new APIClient();
    }

    getDePersonajes(callback) {
        let urlCompleta = this._urlBase + '/characters';

        let promise = this._apiClient.get(urlCompleta).then(
            (data) => {
                let arrayPersonajes = [];

                for (let i = 0; i < data.length; i++) {
                    let elem = data[i];
                    let personaje = new Personaje(elem.name, elem.occupation, elem.debt, elem.weapon, elem.id);
                    arrayPersonajes.push(personaje);
                }

                return arrayPersonajes;
            }
        );

        return promise;
    }

    postDePersonajes(name, occupation, debt, weapon, callback) {
        let urlCompleta = this._urlBase + '/characters';

        let data = new FormData();

        data.append("name", name);
        data.append("occupation", occupation);
        data.append("debt", debt);
        data.append("weapon", weapon);

        this._apiClient.post(urlCompleta, data, callback);
    }

    deletePersonaje(id, callback) {
        let urlCompleta = this._urlBase + '/characters/' + id;

        this._apiClient.delete(urlCompleta, callback);
    }
}



let alm = null;

window.onload = () => {
    alm = new AlmacenPersonajes();
    alm.pintar();
};