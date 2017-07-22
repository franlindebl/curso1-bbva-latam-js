class Persona {
    constructor(nombre = null, apellido = null) {
        this._nombre = nombre;
        this._apellido = apellido;
    }

    dimenombre() {
        alert(this._nombre);
    }

    static construyePersonaConObjeto(personaComoObjeto) {
        let persona = new Persona(personaComoObjeto._nombre, personaComoObjeto._apellido);
        return persona;
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

/*setNombreAtlocalStorage();
getNombreFromlocalStorage();*/

//var persona1AsString = JSON.stringify(persona1);

//console.log(persona1AsString);