/*

Ejercicio: 001_010
*/

var zoo = {
    nombre : "Zoologico",
    ubicacion : {},
    areas : [],
    aforo : 120
}

var ubicacion = {
    direccion : "calle de los animales 5",
    ciudad : "Paris",
    pais : "Francia"
}

var area1 = {
    nombre: "Reptiles",
    aforoMaximoZona : 30,
    recintos :[]
}

function crearArea(nombre, aforo){
    return {
        nombre: nombre,
        aforoMaximoZona : aforo,
        recintos :[]
    }
}

var recinto = {
    nro : 1,
    tipo : [],
    animales : [],
    capacidad: 20
}

var tipo = {
    codigo : 1234,
    estructura : "Vidrio ultra resistente" 
}

var animal = {
    nombre : "henry",
    salud : 100,
    especie : "oso"
}

var area1 = crearArea("Reptiles", 10);
var area2 = crearArea("Aves", 10);
var area3 = crearArea("Animales acuaticos", 10);
zoo.areas.push(area1, area2, area3);


zoo.areas.push(area1);