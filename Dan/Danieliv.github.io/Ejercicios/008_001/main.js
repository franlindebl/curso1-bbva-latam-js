class Agenda {
    constructor() {
        this._contactos = [];
        this.mostrarAgenda();
    }

    addContacto(contacto) {
        for (let i = 0; i < contacto.length; i++) {
            this._contactos.push(contacto);
        }
        this._contactos.pintarContactos();
    }

    mostrarAgenda() {
        let button = document.createElement("BUTTON");
        let text = document.createTextNode("Mostrar Agenda");
        button.appendChild(text);
        document.getElementById("body").appendChild(button);
    }

    mostrarFormulario() {
        let button = document.getElementById("add");
        button.addEventListener("click", () => {
            this._contactos.crearContacto();
        });
    }

    crearContacto() {
        let name = document.getElementById("name").value;
        let lastname = document.getElementById("lastname").value;
        let email = document.getElementById("email").value;
        let picture = document.getElementById("picture").value;

        let contacto = new Contacto(name, lastname, email, picture);

        this._contactos.addContacto(contacto);
    }

    pintarContactos() {
        document.getElementById("tbodycontactos").innerHTML = "";
        let tbodyInner = "";
        for (let i = 0; i < this._contactos.length; i++) {
            let contacto = this._contactos[i];
            tbodyInner = tbodyInner + contacto.getRowForTable();
        }
        document.getElementById("tbodycontactos").innerHTML = tbodyInner;
    }
}

//Clase contacto
class Contacto {
    constructor(nombre = null, apellido = null, email = null, picture) {
        this._nombre = nombre;
        this._apellido = apellido;
        this._email = email;
        this._picture = "https://media.giphy.com/media/xUA7aUcMUIMiPru4cE/giphy.gif" || picture;
    }

    // static contactoConObjeto(objContacto) {
    //     let persona = new Contacto(objContacto._nombre, objContacto._apellido);
    //     return persona;
    // }

    getRowForTable() {
        let fila = '';
        fila = fila + '<tr>';;
        fila = fila + '<td>' + this._nombre + '</td>';
        fila = fila + '<td>' + this._apellido + '</td>';
        fila = fila + '<td>' + this._email + '</td>';
        fila = fila + '<td>' + this._picture + '</td>';
        fila = fila + '</tr>';

        return fila;
    }
}






// //////////////////////////////////////////////////////////////////////////////////////
// function getValuesFromLocalStorage() {
//     let contactoAsString = localStorage.getItem("contacto")
//     let contacto = JSON.parse(contactoAsString);
//     return contacto;
// }

// function setValuesFromLocalStorage(contacto) {
//     let contactoAsString = JSON.stringify(contacto);
//     localStorage.setItem("contacto", contactoAsString);
// }

window.onload = function() {
    var miAgenda = new Agenda;
    var contacto1 = new Contacto("Daniel", "Navarrete", "dan@dan.com");
    
    console.log(miAgenda);
};
// let contacto1 = new Contacto("Daniel", "Navarrete");
// setValuesFromLocalStorage(contacto1);
// let contacto2 = getValuesFromLocalStorage();
// let contacto3 = Contacto.contactoConObjeto(contacto2);
// console.log(contacto1);
// console.log(contacto2);
// console.log(contacto3);
