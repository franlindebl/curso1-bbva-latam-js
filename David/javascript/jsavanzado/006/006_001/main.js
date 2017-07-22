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

function hacerGetpersonajesConFetch(){
    var url = "https://ironhack-characters.herokuapp.com/characters";
    var misCabeceras = new Headers();

    var miInit = {
        method : 'GET',
        headers: misCabeceras
    };

    /*fetch(url, miInit).then(
        (response) => {
            console.log(response);
            response.json().then((dataEnJson)=> console.log(dataEnJson));
        }
    );*/

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

/*hacerGetpersonajesConFetch();*/


class Personaje {
    constructor(id, nombre, ocupacion, debt, weapon) {
        this._nombre = nombre;
        this._ocupacion = ocupacion;
        this._debt = debt;
        this._weapon = weapon;
        this._id = id;

    }

    getRowForDivPersonajes(funcionBorrado) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var td5 = document.createElement('td');


        var btoBorrar = document.createElement('button');

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        td5.appendChild(btoBorrar);

        btoBorrar.id = 'botonTomarNota';
        btoBorrar.type = 'button';
        btoBorrar.textContent = 'Borrar';
        btoBorrar.addEventListener("click", () => funcionBorrado(this._id));



        td1.textContent = this._nombre ;
        td2.textContent = this._ocupacion;
        td3.textContent = this._weapon ;
        td4.textContent = this._debt ;
        


        /*let fila = "";
        fila = fila + '<tr>';
        fila = fila + '<td>' + this._nombre + '</td>';
        fila = fila + '<td>' + this._ocupacion + '</td>';
        fila = fila + '<td>' + this._weapon + '</td>';
        fila = fila + '<td>' + this._debt + '</td>';
        fila = fila + '<td><button class="button-main" onclick="removerPorId('+ this._id +')">Borrar</button><td>'; //'+ this._id +'
        fila = fila + '</tr>';*/

        return tr;
    }
}

class PersonajeClient {
    constructor() {
        this._urlBase = "https://ironhack-characters.herokuapp.com";
        this._apiClient = new APIClient();
    }

    getDePersonajes(callback) {
        let urlCompleta = this._urlBase + '/characters';

        let traduccionCallback = (respuesta) => {
            let arrayPersonajes = [];

            for (let i = 0; i < respuesta.length; i++) {
                let elem = respuesta[i];
                let personaje = new Personaje(elem.id, elem.name, elem.occupation, elem.debt, elem.weapon);
                arrayPersonajes.push(personaje);
            }

            callback(arrayPersonajes);
        }

        this._apiClient.get(urlCompleta, traduccionCallback);
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

    post(url, datos, callback) {
        var peticion = new XMLHttpRequest();

        peticion.open("POST", url);

         var data = new FormData();
         
         data.append("name", datos._nombre);
         data.append("occupation", datos._occupation);
         data.append("debt", datos._debt);
         data.append("weapon", datos._weapon);

        peticion.onreadystatechange = function(response) {
            if (peticion.readyState === 4) {
                var objetoRespuesta = JSON.parse(peticion.responseText);
                callback(objetoRespuesta);
            }
        }

        peticion.send(data);
    }

    delete(url) {
        var peticion = new XMLHttpRequest();

        peticion.open("DELETE", url);

        peticion.onreadystatechange = function(response) {
            if (peticion.readyState === 4) {
                var objetoRespuesta = JSON.parse(peticion.responseText);
                callback(objetoRespuesta);
            }
        }
        peticion.send();
    }
}

class AlmacenarPersonajes {

    constructor() {
        this._personajes = [];
        this._personajeClient = new PersonajeClient();
        this.pintarEstructuraGeneral();
    }

    getPersonajes() {
        let miCallback = (data) => {
            this._personajes = data;
            this.pintarPersonajes(this._personajes);
        }
        this._personajeClient.getDePersonajes(miCallback);
    }

    pintarPersonajes(personajes){

        var funcionBorrado = (id) => this.removerPorId(id);

        document.getElementById("personajes").innerHTML = "";
        let tbodyInner = document.createElement("tbody");
        for (let i = 0; i < personajes.length; i++) {
            let personaje = personajes[i];
            tbodyInner.appendChild(personaje.getRowForDivPersonajes(funcionBorrado));
            //console.log(personajes[i]);
        }
        console.log("personajes", personajes);
        document.getElementById("personajes").appendChild(tbodyInner);
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
        let personaje = new Personaje(); 
        personaje._nombre = document.getElementsByName("nombre")[0].value;
        personaje._weapon = document.getElementsByName("weapon")[0].value;
        personaje._occupation = document.getElementsByName("occupation")[0].value;
        personaje._debt = true;
        console.log("carga POST", personaje);
        
        let terminoCallback = () => {
            console.log("termino");
            this.getPersonajes();
        }
        this._personajeClient.postDePersonajes(personaje, terminoCallback);
        
    }
    removerPorId(id){
        console.log("id a borrar : ", id);
    }

    pintar() {
        document.getElementById("header").innerHTML = "";
        this.pintarTag("nombre", "input");

        this.pintarTag("weapon", "input");

        this.pintarTag("occupation", "input");

        this.pintarTag("debt", "input");

        var botonAtenderOrdenes = document.createElement('button');
        botonAtenderOrdenes.id = 'botonTomarNota';
        botonAtenderOrdenes.type = 'button';
        botonAtenderOrdenes.textContent = 'Cargar';
        botonAtenderOrdenes.onclick = () => this.addPersonaje();
        header.appendChild(botonAtenderOrdenes);

    }

    btoBorrar(){
       var botonBorrar = document.createElement('button');
        botonBorrar.id = 'botonBorrar';
        botonBorrar.type = 'button';
        botonBorrar.textContent = 'Borrar';
        botonBorrar.onclick = () => this.addPersonaje();
        document.getElementById("btoBorrar").innerHTML = botonBorrar;
    }

<label for="exampleInputEmail1">Email address</label>

    pintarTag(nombre, tipo) {
        var anonimoTag = document.createElement(tipo);
        anonimoTag.id = nombre;
        anonimoTag.name = nombre;
        anonimoTag.type = tipo;
        anonimoTag.textContent = nombre;

        header.appendChild(anonimoTag);
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
