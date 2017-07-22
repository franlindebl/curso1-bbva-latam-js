var nombres = ["Victor", "Omar", "Karen", "Ariel", "Omar", "David", "Esteban", "Matías", "Vlairner", "Lucy", "Ignacio", "Humberto", "Néstor", "Daniel", "Raymundo", "Fran"];

function Persona(edad, nacionalidad, altura, peso, enfermo) {
    this.nombre = initPersona();;
    this.edad = edad;
    this.nacionalidad = nacionalidad;
    this.altura = altura;
    this.peso = peso;
    this.enfermo = getRandomInteger(0, 1);
}

function Jugador(posicion, numero, calidad) {
    this.posicion = posicion;
    this.numero = numero;
    this.calidad = getRandomInteger(0, 100);
}

Jugador.prototype = new Persona();

function Equipo() {
    this.entrenador = new Entrenador();
    this.jugadores = [];

    for (var i = 0; i < 22; i++) {
        this.jugadores.push(new Jugador);
    }
}

function Entrenador() {
    this.initPersona();
}
Entrenador.prototype = new Persona();

Entrenador.prototype.elegirPlantillaParaPartido = function(jugadores) {
    var alineación = {
            portero = [];
            defensas = [];
            mediocampistas = [];
            delanteros = [];
        }
        //Elegir alineación aleaot
    alineacion.portero.push(jugadores.splice(0, 1));
    alineacion.defesas.push(jugadores.splice(0, 4));
    alineacion.mediocampistas.push(jugadores.splice(0, 4));
    alineacion.delanteros.push(jugadores.splice(0, 2));

    return alineación;
}

function generarNombreAleatorio(nombres) {
    var numeroAleatorio = Math.floor(Math.random() * nombres.length);
    return nombres[numeroAleatorio];
}
Jugador.prototype.initPersona = function() {
    this.nombre = generarNombreAleatorio(nombres);
}

function Partido(equipoa, equipob) {
  for (var i = 0; i < i.elegirPlantillaParaPartido.length; i++) {
  }
    var calidadMedios = equipoa.jugadores.mediocampistas.calidad - equipob.jugadores.mediocampistas.calidad;;
    var calidadDelanteros = equipoa.jugadores.defesas.calidad - equipob.jugadores.defesas.calidad;
    var calidadPorteros = equipoa.jugadores.portero.calidad - equipob.jugadores.portero.calidad;
    var calidadEquipo = (calidadMedios + calidadDelanteros) - calidadPorteros;
    var fortuna = getRandomInteger(0, 100);
    var total = calidadEquipo + fortuna;

    if (total > 0) {
        console.log("Gol");
    }
    if (total = 0) {
        console.log("Palo!!");
    }

    if (total < 0) {
        console.log("Nada");
    }
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Generar edad Aleatorio
function generarEdadAleatoria() {
    var edad = Math.floor(Math.random() * 30);
    return edad;
}
var equipoA = new Equipo();
var equipoB = new Equipo();
var entrenador = new Entrenador();

equipo.entrenador.elegirPlantillaParaPartido(equipo.alineación);
