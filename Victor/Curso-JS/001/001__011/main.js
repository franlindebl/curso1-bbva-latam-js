var log = x => console.log(x);

var nombresPersonas = ["Victor", "Allan", "Karen", "Ariel", "Omar", "David", "Esteban", "Matías", "Vlairner", "Lucy", "Ignacio", "Humberto", "Néstor", "Daniel", "Raymundo", "Fran"];

var zoo = {
    nombre: "El último zoológico",
    ubicacion: {},
    areas: [],
    aforo: 30,
    numeroVisitantes: 0,
    caja: 10000,
    enfermeria: []
};

var ubicacion = {
    dirreccion: "Calle de los animalitos 123",
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

var recinto1 = recintoDetalles("Jaula de tigres", tigres, 10, "Jaula super reforzada con titanium");
var recinto2 = recintoDetalles("Baños", [], 50, "Baños para hombres y mujeres, aptos para personas con discapacidad");
var recinto3 = recintoDetalles("Jaula para aves", aves, 10, "Algunas aves que se pelean a seguido");

var recintoTigres = [];
recintoTigres.push(recinto1, recinto2);

var recintoAves = [];
recintoAves.push(recinto3);

var area1 = area("Mamíferos", 5000, recintoTigres);
var area2 = area("Aves", 200, recintoAves);

zoo.ubicacion = ubicacion;
zoo.areas.push(area1, area2);

log(zoo);


// reoresenta el paso de 1hrs en el zoo
function ejecutarCiclo() {
    // for (var i = 0; i < 10; i++) {
    addPersona();
    cambiarSaludDeTodosLosAnimales();
    recuperaEnfermeria();
    addHambre();
    console.log("Ciclo ejecutado");
    // console.log(zoo);
    // }
}

function generarNombreAleatorio() {
    var numeroAleatorio = Math.floor(Math.random() * nombresPersonas.length);
    return nombresPersonas[numeroAleatorio];
}

function generarEdadAleatoria() {
    var edad = Math.floor(Math.random() * 100);
    return edad;
}

function esEstudianteAleatorio() {
    var esEstudiante = Math.round(Math.random());
    return esEstudiante;
}

// Añade una persona al parque
function addPersona() {
    if (zoo.numeroVisitantes < zoo.aforo) {
        // Creamos una persona nueva, le cobramos y le introducimos en el parque
        var persona = crearPersona(generarNombreAleatorio(), 100, generarEdadAleatoria(), esEstudianteAleatorio());
        cobrarEntrada(persona);
        var recintoLibre = primerRecintoLibre();
        recintoLibre.visitantes.push(persona);
        zoo.numeroVisitantes++;
    } else {
        // Podemos colgar cartel de lleno
        console.log('El ZOO está lleno!');
        moverVisitante();
    }
}

function primerRecintoLibre() {
    var recintoLibre = null;

    for (var a = 0; a < zoo.areas.length; a++) {
        var area = zoo.areas[a];

        for (var r = 0; r < area.recintos.length; r++) {
            var recinto = area.recintos[r];
            if (!recintoLibre && recinto.visitantes.length < recinto.capacidad) {
                recintoLibre = recinto;
            }
        }
    }

    return recintoLibre;
}

function cobrarEntrada(persona) {
    var importeEntrada = 5;
    if (persona.edad > 65 || persona.edad < 14) {
        importeEntrada = 0;
    } else {
        if (persona.estudiante) {
            importeEntrada = 3;
        }
    }

    try {
        if (persona.cartera - importeEntrada < 0) { throw 'No tiene suficiente efectivo' }
        persona.cartera = persona.cartera - importeEntrada;
        zoo.caja = zoo.caja + importeEntrada;
    } catch (e) {
        console.error(e);
        cerrarZoo();
    }
}

// Constructor de personas
function crearPersona(nombre, cartera, edad, esEstudiante) {
    var persona = {
        nombre: nombre,
        cartera: cartera,
        edad: edad,
        estudiante: esEstudiante
    }

    return persona;
}

var intervalID = setInterval(ejecutarCiclo, 1000);

/* 
1) Crear función cerrar zoo:
- Parar el intevalo
- Sacar a todas las personas del zoo
*/
function cerrarZoo() {
    clearInterval(intervalID);
    /*
    zoo.numeroVisitantes = 0;

    
    for (var a = 0; a < zoo.areas.length; a++) {
        var area = zoo.areas[a];

        for (var r = 0; r < area.recintos.length; r++) {
            area.recintos[r].visitantes = [];
        }
    }
    */
}

/*
2) Crear función modificarSaludAleatoria(animal) que de manera aleatoria sume o reste
salud a un animal: aleatorio entre -20 y +20 (maximo de salud es 100).
*/
/*
3) En cada ciclo ejecutar la función de modificarSaludAleatoria() para todos los
animales, si alguno baja de 50 de salud, deberá ir a la enfermeria.
*/
function modificarSaludAleatoria(recinto, n, animal) {
    var tipoSalud = generarEdadAleatoria() == 1 ? 1 : -1;
    var salud = tipoSalud * Math.floor(Math.random() * 20);

    salud = animal.salud + salud;

    if (salud > 100) {
        salud = 100;
    } else if (salud < 50) {
        animal.salud = (salud < 0) ? 0 : salud;
        animalAEnfermeria(recinto, n, animal);
    }

    animal.salud = salud;
}

function cambiarSaludDeTodosLosAnimales() {
    // Recorrer todas la areas
    // Recorrer todos los recintos
    // Recorrer todos los animales


    for (var a = 0; a < zoo.areas.length; a++) {
        var area = zoo.areas[a];

        for (var r = 0; r < area.recintos.length; r++) {
            var recinto = area.recintos[r];

            for (var n = 0; n < recinto.animales.length; n++) {
                modificarSaludAleatoria(recinto, n, recinto.animales[n]);
            }
        }
    }
}

function animalAEnfermeria(recinto, n, animal) {
    console.warn('Animal en enfermeria: ');
    console.warn(animal);
    zoo.enfermeria.push(crearEnfermo(animal, recinto));
    eliminarAnimalRecinto(recinto, n);
}

function eliminarAnimalRecinto(recinto, n) {
    recinto.animales.splice(n, 1);
}

function crearEnfermo(animal, recinto) {
    return {
        recinto: recinto,
        animal: animal
    };
}

/*
4) En la enfermería en cada ciclo los animales recuperan 10 de salud (no se aplica 
modificarSaludAleatoria()).
5) Si el animal llega a 100 de salud deberá volver a su área (debemos saber a qué area
pertenecía)
*/
function recuperaEnfermeria() {
    for (var a = 0; a < zoo.enfermeria.length; a++) {
        var enfermo = zoo.enfermeria[a];

        enfermo.animal.salud += 10;

        if (enfermo.animal.salud >= 100) {
            enfermo.animal.salud = 100;
            console.info('Animal devuelto a recinto');
            console.info(enfermo.animal);
            enfermo.recinto.animales.push(enfermo.animal);
            zoo.enfermeria.splice(a, 1);
        }
    }
}

/*
6) Crear función addHambre() que en cada ciclo sume 10 al hambre de un animal. Cuando 
llegue a 100 el animal estará muy hambriento y deberá ser alimentado. Al alimentar un 
animal su hambre pasa a 0 y al zoo le cuesta 1000$
*/
function addHambre() {
    for (var a = 0; a < zoo.areas.length; a++) {
        var area = zoo.areas[a];

        for (var r = 0; r < area.recintos.length; r++) {
            var recinto = area.recintos[r];

            for (var n = 0; n < recinto.animales.length; n++) {
                modificarHambre(recinto, n, recinto.animales[n]);
            }
        }
    }
}

function modificarHambre(recinto, n, animal) {
    animal.hambre += 10;
    if (animal.hambre >= 100) {
        animal.hambre = 0;
        zoo.caja = zoo.caja - 1000;
        if (zoo.caja < 0) {
            zoo.caja = 0;
            comerVisitante(recinto);
        }
    }
}

/*
7) Si el zoo no tiene dinero para alimentar a los animales, no podrá hacerlo. Cuando un
animal tenga más de 150 de hambre, se coméra a un visitante. El zoo se quedará con su 
cartera.
 */
function comerVisitante(recinto) {
    console.error('¡¡¡Se comieron un visitante!!!');

    console.error(recinto.visitantes[0]);
    zoo.caja += recinto.visitantes[0].cartera;
    recinto.visitantes.splice(0, 1);
    zoo.numeroVisitantes--;
}

/*
8) En cada cicli los visitantes deberán cambiar al siguiente recinto. Cuando hayan
visitado todos abandonarán el parque.
*/
function moverVisitante() {

    var recintos = [];

    for (var a = 0; a < zoo.areas.length; a++) {
        var area = zoo.areas[a];

        for (var r = 0; r < area.recintos.length; r++) {
            var recinto = area.recintos[r];
            recintos.push(recinto);
        }
    }

    // console.log(recintos);
    // cerrarZoo();

    for (var r = recintos.length - 1; r > 0; r--) {
        var recinto = recintos[r];
        if((r == recintos.length - 1) && recinto.visitantes.length > 0){
            // console.log('Hasta luego ...');
            // console.log(recinto.visitantes);
            recinto.visitantes = [];
        }else{
            var recintoSiguiente = recintos[r+1];
            while(recinto.visitantes.length){
                var visitante = recinto.visitantes.pop();
                recintoSiguiente.visitantes.push(visitante);
            }
        }
    }

    console.warn(zoo);
    cerrarZoo();

}