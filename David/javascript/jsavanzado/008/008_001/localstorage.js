/*
Trata de realizar la mayor abstracción posib​le: en el HTML no puede haber nada más que la importación del script JS.
 Los botones de acciones no pueden hacer referencia a ningún objeto (deberás añadir las acciones con addEventListener 
 de arrow functions o funciones bindeadas). Haz que la agenda se pinte haciendo llamadas a pintar de cada contacto.

Pasos:

1) Crea la clase contacto que almacenará los datos básicos de una persona:

- Nombre
- Apellidos
- Email
- URL fotografía

2) Crea la clase Agenda que almacene los contactos de un usuario.

3) Maqueta la agenda de contactos. Puedes hacer uso de una tabla o si lo quieres hacer más visual puedes 
usar divs y darles el estilo que quieras.

4) Crea un botón que al ser pulsado muestre un formulario que permita la creación de un contacto en la agenda. 
El formulario tendrá los campos necesarios para la creación y además los botones "Guardar" y "Cerrar". 
Guardar se encargará de guardar el contacto y cerrar ocultará de nuevo el formulario. 
Cuando se cree un contacto se deberá mostrar en el listado de contactos de la agenda.

5) Haz que la agenda completa se guarde en LocalStorage de manera que cada vez que abramos la página web se muestre 
la agenda completa.

BONUS:

6) Añade un botón eliminar en cada contacto que permita el borrado de este.

7) Añade un botón modificar que haga editable la información de un usuario. 

8) Permite la ordenación de la agenda por Nombre o por apellido​

*/

class Persona {
    constructor(nombre, apellido, email, photo) {
        this._nombre = nombre;
        this._apellido = apellido;
        this._email = apellido;
        this._photo = photo;
    }

    dimenombre() {
        alert(this._nombre);
    }

    static construyePersonaConObjeto(personaComoObjeto) {
        let persona = new Persona(personaComoObjeto._nombre, personaComoObjeto._apellido);
        return persona;
    }

    getRowForDivPersona(funcionBorrado) {
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
        td2.textContent = this._apellido;
        td3.textContent = this._email;
        td4.textContent = this._photo ;
      
        return tr;
    }


}



function getNombreFromlocalStorage() {
    let nombre = localStorage.getItem("nombre");
    console.log(nombre);
}

function setNombreAtlocalStorage(nombre) {
    localStorage.setItem("nombre", "fran");
    console.log(nombre);
}

function getPersonaFromlocalStorage() {
    var persona1AsString = JSON.stringify("persona");
    let persona = JSON.parse(persona1AsString);
    return persona;
}

function setPersonaAtlocalStorage(persona) {
    var persona1AsString = JSON.stringify(persona);
    localStorage.setItem("persona", persona1AsString);
}


if (!getPersonaFromlocalStorage()) {
    var persona1 = new Persona("fran", "linde");
    setPersonaAtlocalStorage(persona1);

} else {
    let persona2 = getPersonaFromlocalStorage();
    let persona3 = Persona.construyePersonaConObjeto(persona2);

    console.log(persona1);
    console.log(persona2);
}

class Agenda {

    constructor() {
        this._personas = [];
        persona = new Persona();
        this.pintarEstructuraGeneral();
    }

    pintarPersonas(varpersonas){
    	console.log(" personas --> ", personas);
        var funcionBorrado = (id) => this.removerPorId(id);
        document.getElementById("personas").innerHTML = "";
        let tbodyInner = document.createElement("tbody");
        //let persona = varpersonas;	

        tbodyInner.appendChild(persona.getRowForDivPersona(funcionBorrado));

       /* for (let i = 0; i < personas.length; i++) {
            let persona = personas[i];
            tbodyInner.appendChild(persona.getRowForDivPersona(funcionBorrado));
            console.log(" pintar personas ", persona);

        }*/
        console.log(" despues pintar personas personas.length", personas);
        document.getElementById("personas").appendChild(tbodyInner);
    }

    pintarEstructuraGeneral() {
        document.getElementById("estructura").innerHTML = "";
        var header = document.getElementById("header");
        let fila = "";
        fila = fila + '<form><div id="header" class="header">Añadir Personajes</div></form>';
        fila = fila + '<div><div class="columna-izq columna"><table id="personas" class="w3-table-all w3-centered"></table></div>';
        fila = fila + '<div id="recepcion" class="footer"></div>';
        return document.getElementById("estructura").innerHTML = fila;
    }
    addPersona() {
        let personas = new Persona(); 
        personas._nombre = document.getElementsByName("nombre")[0].value;
        personas._apellido = document.getElementsByName("apellido")[0].value;
        personas._email = document.getElementsByName("email")[0].value;
        personas._photo = document.getElementsByName("photo")[0].value;
        console.log("carga", personas);
        this.pintarPersonas(personas);
        
       /* let terminoCallback = () => {
            console.log("termino");
            this.getPersonajes();
        }
        this._personajeClient.postDePersonajes(personaje, terminoCallback);*/
        
    }
    removerPorId(id){
        console.log("id a borrar : ", id);
    }

    pintar() {
    	document.getElementById("header").innerHTML = "";
        var botonAtenderOrdenes = document.createElement('button');
        botonAtenderOrdenes.id = 'botonTomarNota';
        botonAtenderOrdenes.type = 'button';
        botonAtenderOrdenes.textContent = 'Creación de un contacto ';
        botonAtenderOrdenes.onclick = () => this.llamarForm();
        header.appendChild(botonAtenderOrdenes);

        this.pintarPersonas(this._personas);

    }
    llamarForm(){
    	console.log("llamaForm");
    	document.getElementById("header").innerHTML = "";
        this.pintarInput("nombre", "input");
        this.pintarInput("apellido", "input");
        this.pintarInput("email", "input");
        this.pintarInput("photo", "input");


        var botonGuardar = document.createElement('button');
        botonGuardar.id = 'botonGuardar';
        botonGuardar.type = 'button';
        botonGuardar.textContent = 'Guardar ';
        botonGuardar.onclick = () => this.addPersona();
        header.appendChild(botonGuardar);


        var botonCerrar = document.createElement('button');
        botonCerrar.id = 'botonCerrar';
        botonCerrar.type = 'button';
        botonCerrar.textContent = 'Cerrar';
        botonCerrar.onclick = () => this.salirForm();
        header.appendChild(botonCerrar);

    }

    salirForm(){
    	console.log("salirForm");
    	this.pintar();
    }

    btoBorrar(){
       var botonBorrar = document.createElement('button');
        botonBorrar.id = 'botonBorrar';
        botonBorrar.type = 'button';
        botonBorrar.textContent = 'Borrar';
        botonBorrar.onclick = () => this.addPersonaje();
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
    var misPersonajes = new Agenda();
    console.log(misPersonajes);
    misPersonajes.iniciarIntervalo();
}


/*setNombreAtlocalStorage();
getNombreFromlocalStorage();*/

//var persona1AsString = JSON.stringify(persona1);

//console.log(persona1AsString);