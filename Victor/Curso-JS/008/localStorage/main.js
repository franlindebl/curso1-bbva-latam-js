/*
function getNombreFromLocalStorage() {
    let nombre = localStorage.getItem("nombre");
    console.log(nombre);
}

function setNombreFromLocalStorage(nombre) {
    localStorage.setItem("nombre", nombre);
}

setNombreFromLocalStorage("Pedro");
getNombreFromLocalStorage();
*/
/*
var persona1 = new Persona("Fran", "Linde");
var persona1AsString = JSON.stringify(persona1);

console.info(persona1AsString);
*/

class Persona {
    constructor(nombre = null, apellido = null) {
        this._nombre = nombre;
        this._apellidos = apellido;
    }

    dimeNombre() {
        alert(this._nombre);
    }

    static contruyePersonaConObjeto(personaComoObjeto) {
        let persona = new Persona(personaComoObjeto._nombre, personaComoObjeto._apellidos);

        return persona;
    }

    setParamsDePersonaConObjeto(personaComoObjeto) {
        this._nombre = personaComoObjeto._nombre;
        this._apellidos = personaComoObjeto._apellidos;
    }
}

function getPersonaAtLocalStorage() {
    let personaAsString = localStorage.getItem("persona");
    let persona = JSON.parse(personaAsString);

    return persona;
}

function setPersonaAtLocalStorage(persona) {
    let persona1AsString = JSON.stringify(persona);
    localStorage.setItem("persona", persona1AsString);
}

let persona1 = new Persona("Fran", "Linde");
// persona1.dimeNombre();
setPersonaAtLocalStorage(persona1);

let persona2 = getPersonaAtLocalStorage();
let persona3 = Persona.contruyePersonaConObjeto(persona2);

let persona4 = new Persona();
persona4.setParamsDePersonaConObjeto(persona2);

let persona5 = persona1;
persona5.setParamsDePersonaConObjeto(persona2);

console.info('persona1: ', persona1);
console.info('persona2: ', persona2);
console.info('persona3: ', persona3);
console.info('persona4: ', persona4);
console.info('persona5: ', persona5);