Realiza una agenda de contactos que se persista en el navegador.

Trata de realizar la mayor abstracción posib​le: en el HTML no puede haber nada más que la importación del script JS. Los botones de acciones no pueden hacer referencia a ningún objeto (deberás añadir las acciones con addEventListener de arrow functions o funciones bindeadas). Haz que la agenda se pinte haciendo llamadas a pintar de cada contacto.

Pasos:

1) Crea la clase contacto que almacenará los datos básicos de una persona:

- Nombre
- Apellidos
- Email
- URL fotografía

2) Crea la clase Agenda que almacene los contactos de un usuario.

3) Maqueta la agenda de contactos. Puedes hacer uso de una tabla o si lo quieres hacer más visual puedes usar divs y darles el estilo que quieras.

4) Crea un botón que al ser pulsado muestre un formulario que permita la creación de un contacto en la agenda. El formulario tendrá los campos necesarios para la creación y además los botones "Guardar" y "Cerrar". Guardar se encargará de guardar el contacto y cerrar ocultará de nuevo el formulario. Cuando se cree un contacto se deberá mostrar en el listado de contactos de la agenda.

5) Haz que la agenda completa se guarde en LocalStorage de manera que cada vez que abramos la página web se muestre la agenda completa.

BONUS:

6) Añade un botón eliminar en cada contacto que permita el borrado de este.

7) Añade un botón modificar que haga editable la información de un usuario. 

8) Permite la ordenación de la agenda por Nombre o por apellido​







Ejemplo de código con localStorage:


class Persona{
    constructor(nombre = null, apellido = null){
        this._nombre = nombre;
        this._apellido = apellido;
    }

    dimeNombre(){
        alert(this._nombre);
    }

    setParamsDePersonaConObjeto(personaComoObjeto){
        this._nombre = personaComoObjeto._nombre;
        this._apellido = personaComoObjeto._apellido;
    }
}

function getPersonaFromLocalStorage(){
    let personaAsString = localStorage.getItem("persona");
    let persona = JSON.parse(personaAsString);
    return persona;
}

function setPersonaAtLocalStorage(persona){
    let persona1AsString = JSON.stringify(persona);
    localStorage.setItem("persona", persona1AsString);
}


if(!getPersonaFromLocalStorage()){
    debugger;
    let persona1 = new Persona("Fran", "Linde");
    setPersonaAtLocalStorage(persona1);
}else{
    let objeto = getPersonaFromLocalStorage();
    let persona3 = new Persona();
    persona3.setParamsDePersonaConObjeto(objeto);

    console.log(persona3);
}

