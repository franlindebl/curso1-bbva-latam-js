class Contacto {
    constructor(nombre, apellidos,email,foto) {
        this._nombre = nombre;
        this._apellidos = apellidos;
        this._email = email;
        this._urlFoto = foto;
    }

    getRowForTable () {
        let fila = "";
        fila = '<tr>';
        fila += '<td>' + this._nombre + '</td>';
        fila += '<td>' + this._apellidos + '</td>';
        fila += '<td>' + this._email + '</td>';
        fila += '<td>' + this._urlFoto + '</td>';
        fila += '<td><button class="button-main" >Borrar</button></td>';
        fila += '</tr>';
        return fila;
    }
}

class Agenda {
    constructor() {
        this._agenda = [];
    }

    bGuardar() {
        let contacto = null;
        let nombre = document.getElementById('nombre').value;
        let apellidos = document.getElementById('apellidos').value;
        let email = document.getElementById('email').value;
        let foto = document.getElementById('foto').value;
        contacto = new Contacto(nombre, apellidos,email,foto);

    }

    bCerrar() {
        let c = document.getElementById('formpersona');
        c.style = "display: none;";

    }

    bCrear() {
        let c = document.getElementById('formpersona');
        c.style = "display: block;";
    }

    pintarContactos () {
        document.getElementById('tbodycontactos').innerHTML = "";
        let tbodyinner = "";
        for (let i=0;i<this._agenda.length;i++) {
            let contacto = this._agenda[i];
            tbodyinner = tbodyinner + contacto.getRowForTable();
        }
        document.getElementById('tbodycontactos').innerHTML = tbodyinner;
    }

    // pintarBaseHtml() {
    //     // var div1 = document.createElement('div');
    //     // div1.setAttribute('id','formpersona');
    //     // div1.setAttribute('class','row-top');
    //     // var h2 = document.createElement('h2');
    //     // h2.textContent ="Añadir contacto:";
    //     // div1.insertBefore(h2, div1.firstChild);
    //     // document.body.insertBefore(div1, document.body.firstChild);
        

    //     document.body.getElementsByTagName('BODY').innerHTML = "";
    //     let headerForm = "";
    //     '<div class="row-top" id="formpersona"> <h2>Añadir contacto:</h2> <p> <label>Nombre:</label> <input type="text" id="nombre"> <label>Apellidos:</label> <input type="text" id="ocupacion"> <label>Email:</label> <input type="text" id="debt"> <label>Foto:</label> <input type="text" id="arma"> <button class="button-main" onclick="">Guardar</button> <button class="button-main" onclick="">Cerrar</button> </p> </div> <div class="row-bottom"> <h3>Listado de contactos:</h3> <button class="button-main" onclick="">Crear</button> <table> <thead> <tr> <td>Nombre</td> <td>Apellidos</td> <td>Email</td> <td>Foto</td> <td>Boton</td> </tr> </thead> <tbody id="tbodycontactos"> </tbody> </table> </div>'
    //     document.body.getElementsByTagName('BODY').innerHTML = headerForm;
    // }
}


var ag = new Agenda();
ag.pintarContactos();






