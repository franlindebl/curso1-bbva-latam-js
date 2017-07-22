var log = x=>console.log(x);
var nombrePersonas = ["Victor", "Omar", "Karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Nestor"]

var zoo = {
    nombre: "El último zoológico",
    ubicacion: {},
    areas: [],
    aforo: 70,
    numeroVisitantes: 0,
    caja: 1000000,
    enfermeria: []
};

var ubicacion = {
    direccion: "Calle de los animalitos 123",
    ciudad: "Ciudad de México",
    pais: "México",
    telefono: 999888777
}

function area(nombre, aforo, recintos, animales) {
    return {
        nombre: nombre,
        aforoMaximo: aforo,
        recintos: recintos,
    };
}

function recintoDetalles(nombre, animales, capacidad, detalle) {
    return {
        nombre: nombre,
        animales: animales,
        capacidad: capacidad,
        detalle: detalle,
        visitantes: []
    };
}

function animales(nombre, especie, salud, hambre, pais) {
    return {
        nombre: nombre,
        especie: especie,
        salud: salud,
        hambre: hambre,
        pais: pais
    };
}

var tigreBlanco = animales("Tigre Blanco", "Felino", 100, 80, "Egipto");
var tigreNormal = animales("Tigre", "Felino", 90, 60, "Africa");

var palomas = animales("Palomas", "Avis Chilensis", 100, 100, "Chile");
var flamencos = animales("Flamenco", "Phoenicopteridae", 10, 0, "Colombia");

var tigres = [];
tigres.push(tigreBlanco, tigreNormal);

var aves = [];
aves.push(palomas, flamencos);

var recinto1 = recintoDetalles("Jaula de tigres", tigres, 50, "Jaula super reforzada con titanium");
var recinto2 = recintoDetalles("Baños", [], 70, "Baños para hombres y mujeres, aptos para personas con discapacidad");
var recinto3 = recintoDetalles("Jaula para aves", aves, 60, "Algunas aves que se pelean a seguido");

var recintoTigres = [];
recintoTigres.push(recinto1, recinto2);

var recintoAves = [];
recintoAves.push(recinto3);

var area1 = area("Mamíferos", 5000, recintoTigres);
var area2 = area("Aves", 200, recintoAves);

zoo.ubicacion = ubicacion;
zoo.areas.push(area1, area2);

log(zoo);

function ejecutarCiclo() {
    addPersona();
    console.log("Una persona añadida");
    modificarSalud();
    console.log("Se modifico la salud de los animales");
    recuperarSalud();

}

function generarNumeroAleatorio() {
    var numeroAleatorio = Math.floor(Math.random() * nombrePersonas.length);
    return nombrePersonas[numeroAleatorio];
}

function generarEdadAleatorio() {
    var edadAleatorio = Math.floor(Math.random() * 90);
    return edadAleatorio;
}

function generarEstudianteAleatorio() {
    var estudianteAleatorio = Math.round(Math.random());
    return estudianteAleatorio;
}

function addPersona() {
    if (zoo.numeroVisitantes < zoo.aforo) {
        var persona = crearPersona(generarNumeroAleatorio(), 500, generarEdadAleatorio(), generarEstudianteAleatorio());
        cobrarEntrada(persona);
        var recintoLibre = pimerRecintoLibre();
        recintoLibre.visitantes.push(persona);
        zoo.numeroVisitantes++;
    } else {
        console.error("Zoo esta lleno");
    }
}

function pimerRecintoLibre() {
    var recintoLibre = null;
    for (var i = 0; i < zoo.areas.length; i++) {
        var area = zoo.areas[i];
        for (var j = 0; j < area.recintos.length; j++) {
            var recinto = area.recintos[j];
            if (!recintoLibre && recinto.visitantes.length < recinto.capacidad) {
                recintoLibre = recinto;
            }
        }
    }
    return recintoLibre
}

function cobrarEntrada(persona) {
    var importeEntrada = 5;
    if (persona.edad > 65 || persona.edad < 14) {
        importeEntrada = 0
    } else {
        if (persona.estudiante) {
            importeEntrada = 3
        }
    }
    persona.cartera = persona.cartera - importeEntrada;
    zoo.caja = zoo.caja + importeEntrada;
}

function crearPersona(nombre, cartera, edad, estudiante) {
    return {
        nombre: nombre,
        cartera: cartera,
        edad: edad,
        estudiante: estudiante
    }
}

var intervalID = setInterval(ejecutarCiclo, 1000);

function cerrarZoo() {
    clearInterval(intervalID);
    for (var i = 0; i < zoo.areas.length; i++) {
        var area = zoo.areas[i];
        for (var j = 0; j < area.recintos.length; j++) {
            var recinto = area.recintos[j];
            recinto.visitantes = [];
        }
    }
    zoo.numeroVisitantes = 0;
}

function modificarSalud() {
    for (var i = 0; i < zoo.areas.length; i++) {
        var area = zoo.areas[i];
        for (var j = 0; j < area.recintos.length; j++) {
            var recinto = area.recintos[j];

            for (var o = 0; o < recinto.animales.length; o++) {
                var animal = recinto.animales[o];
                modificarSaludAleatoria(animal);
                checarSalud(recinto, animal);
            }
        }
    }
}

function modificarSaludAleatoria(animal) {
    var saludAleatoria = Math.floor(Math.random() * 1);

    var modiSalud = animal.salud;
    if (saludAleatoria == 0) {
        modiSalud = modiSalud - 20;
    } else {
        modiSalud = modiSalud + 20;
    }
    if (modiSalud > 100) {
        animal.salud = 100;
    }
    if (modiSalud < 0) {
        animal.salud = 0;
    }
}

function checarSalud(recinto, animal) {

    if (animal.salud < 50) {
        enviarEnfenmeria(recinto, animal);
    }

}

function enviarEnfenmeria(recinto, animal) {
    var index = recinto.animales.indexOf(animal);
    var aux = recinto.animales.splice(index, 1);
    
    var casos = {
        recinto: recinto,
        animal: animal
    }
    zoo.enfermeria.push(casos);
}

function recuperarSalud() {
    .enfermeria[].animal.salud
    var sumaSalud = 0;
    var caso = 0;
    for (var i = 0; i < zoo.enfermeria.length; i++) {
        caso = zoo.enfermeria[i];

        if (caso.animal.salud >= 100) {
            caso.recinto.push(caso.animal);
            var index = zoo.enfermeria.indexOf(caso);
            zoo.enfermeria.splice(index, 1);
        }else{
            sumaSalud = zoo.enfermeria[i].salud;
            sumaSalud = sumaSalud + 10;
            zoo.enfermeria[i].salud = sumaSalud;
        }
    }

}



