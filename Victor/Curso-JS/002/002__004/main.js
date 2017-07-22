/*
1) Define una clase Persona que tenga los siguientes atributos:

Nombre: 
Edad:
Nacionalidad:
Altura: 
Peso:
Enfermo: true/false

2) Definir la clase Jugador que herede de persona y tenga los siguientes atributos:

Posición: (portero/defensa/mediocentro/delantero)
Numero: 
Calidad: (0-100)

3) Definir la clase Equipo que tenga:

- Array de jugadores
- Entrenador 


4) Definir la clase Entrenador que herede de Persona y tenga los siguientes métodos:

- elegirPlantillaParaPartido() que elegirá de sus jugadores a los mejores para un partido:
    1 portero
    4 defensas
    4 mediocentros
    2 delanteros
*/

var nombresPersonas = ["Victor", "Omar", "Karen", "Ariel", "Omar", "David", "Esteban", "Matías", "Vlairner", "Lucy", "Ignacio", "Humberto", "Néstor", "Daniel", "Raymundo", "Fran"];
var nacionalidadPersonas = ["Mexico", "España", "Chile", "Brasil", "Peru", "Alemania"];
var posicionJugador = ["portero", "defensa", "mediocentro", "delantero"];

function generaNombresAleatorio(arregloNombres) {
    var numeroAleatorio = Math.floor(Math.random() * arregloNombres.length);
    return arregloNombres[numeroAleatorio];
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function enfermoAleatorio(probabilidad) {
    return (getRandomInteger(1, probabilidad) == 1) ? true : false;
}

var Persona = function () {
    this._nombre = "";
    this._edad = 0;
    this._nacionalidad = "";
    this._altura = 0;
    this._peso = 0;
    this._enfermo = false;
}

Persona.prototype.initPersona = function () {
    this._nombre = generaNombresAleatorio(nombresPersonas);
    this._edad = getRandomInteger(15, 50);
    this._nacionalidad = generaNombresAleatorio(nacionalidadPersonas);
    this._altura = getRandomInteger(150, 210);
    this._peso = getRandomInteger(50, 95);
    this._enfermo = enfermoAleatorio(10);
}

var Jugador = function () {
    this.initPersona();
    this._posicion = "";
    this._numero = 0;
    this._calidad = 0;
}

Jugador.prototype = new Persona();

Jugador.prototype.initJugador = function () {
    this._posicion = generaNombresAleatorio(posicionJugador);
    this._numero = getRandomInteger(0, 100);
    this._calidad = getRandomInteger(0, 100);
}

var Entrenador = function () {
    this.initPersona();
}

Entrenador.prototype = new Persona();

Entrenador.prototype.elegirJugadores = function (jugadores) {
    var alineacion = {
        portero: [],
        defensa: [],
        mediocentros: [],
        delanteros: []
    };

    /*
    elegir jugadores para cada posición
        1 portero
        4 defensas
        4 mediocentros
        2 delanteros
    */

    console.log('El entrenador ', this._nombre, ' plantilla ...');
    this.asignacionPorPosicion(1, "portero", jugadores, alineacion);
    this.asignacionPorPosicion(4, "defensa", jugadores, alineacion);
    this.asignacionPorPosicion(4, "mediocentros", jugadores, alineacion);
    this.asignacionPorPosicion(2, "delanteros", jugadores, alineacion);

    return alineacion;
}

Entrenador.prototype.buscarJugador = function (jugadores, posicionJugador) {
    var indice = 0;
    var calidadTemp = 0;

    console.log('--- ', posicionJugador);
    // console.log('indice: ', indice);
    for (var p = 0; p < jugadores.length; p++) {
        if (jugadores[p]._posicion == posicionJugador && calidadTemp < jugadores[p]._calidad) {
            indice = p;
        }
    }

    if (indice == 0) {
        indice = getRandomInteger(0, jugadores.length);
        console.log('Jugador elegido aleatoriamente: ', jugadores[indice]);
    } else {
        console.log('Jugador elegido: ', jugadores[indice]);
    }

    var jugador = null

    try {
        jugador = jugadores[indice];
        if (typeof(jugador) == "undefined") {
            throw 'Jugador no encontrado';
        }
    } catch (e) {
        console.error('Error: ', e);
        jugador = jugadores[getRandomInteger(0, jugadores.length - 1)];
    }

    // var jugador = jugadores[indice];
    jugadores.splice(indice, 1);

    return jugador;
}

Entrenador.prototype.asignacionPorPosicion = function (cantidad, posicionJugador, jugadores, alineacion) {
    // console.log(alineacion);
    for (var i = 0; i < cantidad; i++) {
        alineacion[posicionJugador].push(this.buscarJugador(jugadores, posicionJugador));
    }
}

var Equipo = function () {
    this._plantilla = [];
    this._entrenador = new Entrenador();

    // Alta de jugadores
    for (var j = 0; j < 22; j++) {
        var jugador = new Jugador();
        jugador.initJugador();
        this._plantilla.push(jugador);
    }
}


// var equipo = new Equipo();
// Asi llamamos al entrenador para que elija a los jugadores
// console.log(equipo._entrenador.elegirJugadores(equipo._plantilla));

var Partido = function () {
    this._equipo1 = null;
    this._equipo2 = null;

    this._marcador = [];
}

Partido.prototype.ejecutaPartido = function () {
    var equipo1 = new Equipo();
    this._equipo1 = equipo1._entrenador.elegirJugadores(equipo1._plantilla);
    console.log('Equipo 1: ', this._equipo1);

    var equipo2 = new Equipo();
    this._equipo2 = equipo2._entrenador.elegirJugadores(equipo2._plantilla);
    console.log('Equipo 2: ', this._equipo2);

    this._marcador.push(0);
    this._marcador.push(0);
    console.log('Iniciando el partido... ');
    for (var i = 0; i < 5; i++) {
        this.marcadorPartido(this.ataqueEquipo(this._equipo1, this._equipo2), 0);
        this.marcadorPartido(this.ataqueEquipo(this._equipo2, this._equipo1), 1);
    }

    console.log('Marcador final:', this._marcador);
}

/*
Lógica del partido:
 
Cada equipo hará 10 ataques que funcionarán de la siguiente manera
 
Por ejemplo:
 
Si ataca el equipo 1 se calculará:
 
A = (Suma de calidad de medio centros equipo 1) - (Suma de calidad de medio centros equipo 1)
B = (Suma de calidad de delanteros 1) - (Suma de calidad de defensas equipo 2)
C = A + B - (Suma de calidad de portero equipo B)
Fortuna = numero aleatorio entre 0 y 100
 
Para cada jugador que no esté en su puesto del equipo 1: 
C = C - 10
 
Para cada jugador que no esté en su puesto del equipo 2: 
C = C + 10
 
TOTAL = C + Fortuna
 
Si total es mayor que cero -> GOOOOOOOL
Si total es igual a cero -> PALO !!!
Si total es menor que cero -> Ná de ná​ 
*/

Partido.prototype.sumaCalidad = function (posicion, equipo) {
    var sumaCalidad = 0;
    // console.log('equipo',equipo[posicion]);
    for (var i = 0; i < equipo[posicion].length; i++) {
        // console.log('---------> equipo',equipo[posicion][i]);
        sumaCalidad += equipo[posicion][i]._calidad;
    }

    return sumaCalidad;
}

Partido.prototype.indiceNoPosicion = function (posicion, equipo) {
    var sumaNoPosicion = 0;
    // console.log('equipo',equipo[posicion]);
    for (var i = 0; i < equipo[posicion].length; i++) {
        if (equipo[posicion][i]._posicion != posicion) {
            sumaNoPosicion += 1;
        }
    }

    return sumaNoPosicion;
}

Partido.prototype.ataqueEquipo = function (equipo1, equipo2) {
    var A = 0;
    var B = 0;
    var C = 0;
    var Fortuna = 0;
    var TOTAL = 0;

    A = this.sumaCalidad('mediocentros', equipo1) - this.sumaCalidad('mediocentros', equipo2);
    B = this.sumaCalidad('delanteros', equipo1) - this.sumaCalidad('defensa', equipo2);
    C = (A + B) - this.sumaCalidad('portero', equipo2);
    Fortuna = getRandomInteger(0, 200);

    C += -10 * this.indiceNoPosicion('portero', equipo1);
    C += -10 * this.indiceNoPosicion('defensa', equipo1);
    C += -10 * this.indiceNoPosicion('mediocentros', equipo1);
    C += -10 * this.indiceNoPosicion('delanteros', equipo1);

    C += 10 * this.indiceNoPosicion('portero', equipo2);
    C += 10 * this.indiceNoPosicion('defensa', equipo2);
    C += 10 * this.indiceNoPosicion('mediocentros', equipo2);
    C += 10 * this.indiceNoPosicion('delanteros', equipo2);

    TOTAL = C + Fortuna;

    return TOTAL > 0 ? 1 : (TOTAL == 0 ? 0 : (TOTAL < 0 ? -1 : null));
}

Partido.prototype.marcadorPartido = function (accion, indice) {
    switch (accion) {
        case -1:
            console.log('Ná de ná​');
            break;
        case 1:
            this._marcador[indice] += 1;
            console.log('GOOOOOOOL');
            break;
        case 0:
            console.log('PALO !!!');
            break;
        default:
            console.log('Que fue eso!!!');
    }
}

var partido = new Partido();

partido.ejecutaPartido();

// Par
