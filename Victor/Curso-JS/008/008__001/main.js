let utils = new Utils();

class Persona {
    constructor(nombre, apellidos) {
        this._nombre = nombre;
        this._apellidos = apellidos;
    }
}

class Contacto extends Persona {
    constructor(nombre, apellidos, email, urlFotografia) {
        super(nombre, apellidos);
        this._id = utils._getRandomInteger(1, 10000000);
        this._email = email;
        this._urlFotografia = urlFotografia;
    }

    _getRowForTable() {
        let fila = '';
        fila += '<td>' + this._nombre + '</td>';
        fila += '<td>' + this._apellidos + '</td>';
        fila += '<td>' + this._email + '</td>';
        fila += '<td><img class="imgContacto" src="' + this._urlFotografia + '"></td>';
        fila += '<td><button id="btModificar_' + this._id + '" class="buttonModificar">Modificar</button>';
        fila += '<button id="btBorrar' + this._id + '" class="buttonBorrar">Borrar</button></td>';

        return fila;
    }
}

class Agenda {
    constructor() {
        this._contactos = [];

        // this._contactos.push(new Contacto("Victor", "Godinez", "email@correo.com", "https://bbva.cellsjs.com/img/logo-cells.png"));
        // this._contactos.push(new Contacto("Nestor", "Sanchez", "email@correo.com", "https://bbva.cellsjs.com/img/logo-cells.png"));

        new Utils()._pintarEstructura();

        this._getAgendaLocalStorage();
    }

    _pintarContactos() {
        new Utils()._pintarDivTabla(".divMain", "divLista");

        // Pintamos Tabla
        let divDestino = document.querySelector(".divLista");
        let tituloColumnas = ["Nombre", "Apellido", "e-mail", "Foto", "Acción"];
        new Utils()._pintarEstructuraTabla(divDestino, null, tituloColumnas, "tbodyListaContatos");

        let tbodyLista = document.querySelector("#tbodyListaContatos");
        this._contactos.forEach((contacto) => {
            new Utils()._pintarTR(tbodyLista, contacto._getRowForTable());
            // this.utils._addEventClick("#btBorrar" + personaje._id, this.borrarPersonaje.bind(this, personaje._id));
        });
    }

    _agregarContacto(nombre = "Nombre", apellidos = "Apellidos", email = "mail@mail.com", urlFotografia = "https://bbva.cellsjs.com/img/logo-cells.png") {
        this._contactos.push(new Contacto(nombre, apellidos, email, urlFotografia));
        new apiLocalStorage()._setJsonAtLocalStorage("agenda", this);
    }

    _getAgendaLocalStorage(){
        let agendaLS = new apiLocalStorage()._getJsonAtLocalStorage("agenda");
        console.info('agendaLS:',agendaLS);
        if(agendaLS != null){
            console.log('Entro');
            this._contactos = agendaLS._contactos;
        }
    }
}

let miAgenda = new Agenda();

// miAgenda._agregarContacto();

miAgenda._pintarContactos();