/*
1) Realiza la modelización de un parque natural. Empieza con el siguiente código.

var parqueNatural = {
areas = [],
parqueDeBomberos = {}
}

En cada una de las áreas (añade 10 áreas) encontraremos un array de árboles (100 por área) y un array de visitantes (100 en todo el parque).
En el parque de bomberos encontraremos un array de bomberos (10) y posiblemente más propiedades que se te puedan ocurrir.
Los bomberos y los visitantes deberán heredar de la clase Persona.

2) Añade un método ejecutar ciclo que represente el paso de 1h en el parque.
Cada ciclo que pase debemos llamar a ejecutar ciclo de los visitantes que se irán cambiando de recinto de forma aleatoria.
Haz que el método se ejecute cada segundo.

3) En cada paso de un ciclo se puede originar un fuego (probabilidad del 5%) que empezaría quemando un arbol aleatorio dentro del parque.
Cada ciclo que pase el fuego se extenderá al arbol al arbol siguiente, si no hay arbol siguiente, deberá saltar al primer arbol del área siguiente.
Asi sucesivamente hasta expandirse por todo el parque. Cada ciclo que pase el fuego en los arboles, estos estarán un 10% más quemados.
Cuando lleguen al 100% de quemados, se habrá perdido el arbol. (Quitarlo del área).​
*/

var nombresPersonas = ["Victor", "Omar", "Karen", "Ariel", "Omar", "David", "Esteban", "Matías", "Vlairner", "Lucy", "Ignacio", "Humberto", "Néstor", "Daniel", "Raymundo", "Fran"];
var nacionalidadPersonas = ["Mexico", "España", "Chile", "Brasil", "Peru", "Alemania"];
var velocidadViento = ["Nula", "Media", "Alta"];

function getNombreAleatorio(arregloNombres) {
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
}

Persona.prototype.initPersona = function () {
    this._nombre = getNombreAleatorio(nombresPersonas);
    this._edad = getRandomInteger(1, 50);
    this._nacionalidad = getNombreAleatorio(nacionalidadPersonas);
    this._altura = getRandomInteger(150, 210);
    this._peso = getRandomInteger(50, 95);
}

var Arbol = function (id) {
    this._arbolID = id;
    this._incendiado = false;
    this._porcConsumido = 0;
}

Arbol.prototype.cicloArbol = function () {
    this._porcConsumido += 10;
    this._porcConsumido = this._porcConsumido > 100 ? 100 : this._porcConsumido;
}

var Area = function (id) {
    this._areaId = id;
    this._arboles = [];
    this._visitantes = [];

    for (var b = 0; b < 90; b++) {
        this._arboles.push(new Arbol(this._areaId + "_" + b));
    }
}

Area.prototype.imprimirEstadoArea = function () {
    var estadoArea = "";
    var estadoVisitantes = "";

    for (var i = 0; i < this._arboles.length; i++) {
        var estadoArbol = "🌲";
        if (this._arboles[i]._incendiado) {
            estadoArbol = "🔥";
        }

        estadoArea = estadoArea + estadoArbol;
    }

    for (var i = 0; i < this._visitantes.length; i++) {
        var visitantes = "🚶";
        estadoVisitantes = estadoVisitantes + visitantes;
    }
    console.log("Estado del área [" + this._areaId + "]");
    console.log("======================");
    console.log(estadoArea);
    console.log("======================");
    console.log(estadoVisitantes);
    console.log("======================");
}

var Bombero = function (id) {
    this.initPersona();
    this._bomberoID = id;
    this._edad = getRandomInteger(20, 55);
}

Bombero.prototype = new Persona();

var Visitante = function () {
    this.initPersona();
}

Visitante.prototype = new Persona();

var Viento = function () {
    this._velocidad = null;
}

Viento.prototype.estadoViento = function () {
    return velocidadViento[getRandomInteger(0, 2)];
}

function ParqueNatural() {
    this.areas = [];
    this.parqueDeBomberos = {
        bomberos: []
    };

    for (var idArea = 0; idArea < 2; idArea++) {
        this.areas.push(new Area(idArea));
    }

    for (var idBombero = 0; idBombero < 10; idBombero++) {
        this.parqueDeBomberos.bomberos.push(new Bombero(idBombero));
    }
}

ParqueNatural.prototype.addVisitante = function () {
    this.areas[getRandomInteger(0, this.areas.length - 1)]._visitantes.push(new Visitante());
};

ParqueNatural.prototype.getNumeroVisitantes = function () {
    var numeroVisitantes = 0;
    for (var a = 0; a < this.areas.length; a++) {
        numeroVisitantes += this.areas[a]._visitantes.length;
    }
    // console.info("Numero de visitantes actual: ", numeroVisitantes);

    return numeroVisitantes;
};

ParqueNatural.prototype.getIncendio = function () {
    if ((getRandomInteger(1, 20) == 1 ? true : false) == true) {
        var iniciaIncendio = false;
        while (!iniciaIncendio) {
            try {
                var numeroAleatorioArea = getRandomInteger(0, this.areas.length - 1);
                var numeroAleatorioArbol = getRandomInteger(0, this.areas[numeroAleatorioArea]._arboles.length - 1);
                // console.warn(this.areas[numeroAleatorioArea]);

                if (this.areas[numeroAleatorioArea]._arboles[numeroAleatorioArbol]._incendiado == false) {
                    this.areas[numeroAleatorioArea]._arboles[numeroAleatorioArbol]._incendiado = true;
                    iniciaIncendio = true;
                    // console.warn('Se aprendido un arbol en el area: [', this.areas[numeroAleatorioArea]._areaId, '] - arbol [', this.areas[numeroAleatorioArea]._arboles[numeroAleatorioArbol]._arbolID, ']');
                }
            } catch (e) {
                console.error('Fallo en generar incendio... ', e);
                iniciaIncendio = true;
            }
        }
        // cerrarParque();
    }
}

ParqueNatural.prototype.buscarSiguienteArbol = function (){
    console.log('Nueva funcionalidad');
}

ParqueNatural.prototype.checkIncendioV2 = function () {
    for (var a = 0; a < this.areas.length; a++) {
        for (var b = 0; b < this.areas[a]._arboles.length; b++) {
            if (this.areas[a]._arboles[b]._incendiado == true) {
                /*
                Velocidad: Nula/Media/Alta
                En cada ejecución el viento tendrá una velocidad aleatoria

                Si la velocidad es nula el incendio se expandirá 1 arbol, si la velocidad es media: dos árboles, 
                si la dirección es alta: 3 árboles.
                */
                if (this.areas[a]._arboles[b]._incendiado &&
                    this.areas[a]._arboles[b]._porcConsumido >= 10 &&
                    this.areas[a]._arboles[b]._porcConsumido < 100) {
                    var vientoTipo = Viento.estadoViento();
                    switch (vientoTipo) {
                        case "Nula":
                            console.info('El viento tiene una velodidad: ', vientoTipo);
                            if (b < (this.areas[a]._arboles.length - 1)) {
                                this.areas[a]._arboles[b + 1]._incendiado = true;
                            } else if (a < (this.areas.length - 1) && this.areas[a + 1]._arboles.length > 0) {
                                this.areas[a + 1]._arboles[0]._incendiado = true;
                            }
                            break;
                        case "Media":
                            console.warn('El viento tiene una velodidad: ', vientoTipo);
                            if (b < (this.areas[a]._arboles.length - 2)) {
                                this.areas[a]._arboles[b + 1]._incendiado = true;
                                this.areas[a]._arboles[b + 2]._incendiado = true;
                            } else if (a < (this.areas.length - 1) && this.areas[a + 1]._arboles.length > 0) {
                                this.areas[a]._arboles[b + 1]._incendiado = true;
                                this.areas[a + 1]._arboles[0]._incendiado = true;
                            }
                            break;
                        case "Alta":
                            console.error('El viento tiene una velodidad: ', vientoTipo);
                            break;
                        default:
                            console.debug('El viento tiene una velodidad: ', vientoTipo);
                    }
                }

                this.areas[a]._arboles[b].cicloArbol();
            }
        }
    }
}

ParqueNatural.prototype.checkIncendio = function () {
    for (var a = 0; a < this.areas.length; a++) {
        for (var b = 0; b < this.areas[a]._arboles.length; b++) {
            if (this.areas[a]._arboles[b]._incendiado == true) {
                // Propagar incendio
                if (this.areas[a]._arboles[b]._incendiado &&
                    this.areas[a]._arboles[b]._porcConsumido >= 10 &&
                    this.areas[a]._arboles[b]._porcConsumido < 100) {
                    if (b < (this.areas[a]._arboles.length - 1)) {
                        this.areas[a]._arboles[b + 1]._incendiado = true;
                    } else if (a < (this.areas.length - 1) && this.areas[a + 1]._arboles.length > 0) {
                        this.areas[a + 1]._arboles[0]._incendiado = true;
                    }
                }
                this.areas[a]._arboles[b].cicloArbol();
            }
        }
    }
}

ParqueNatural.prototype.retirarArboles = function () {
    var contadorArbolesAll = 0;
    for (var a = 0; a < this.areas.length; a++) {
        var arbolesVivos = this.areas[a]._arboles.slice(0, this.areas[a]._arboles.length);
        this.areas[a]._arboles = [];
        for (var b = 0; b < arbolesVivos.length; b++) {
            if (arbolesVivos[b]._porcConsumido != 100) {
                this.areas[a]._arboles.push(arbolesVivos[b]);
                contadorArbolesAll += 1;
            }
        }
    }

    if (contadorArbolesAll == 0) {
        cerrarParque();
    }
}

ParqueNatural.prototype.moverVisitante = function () {
    for (var a = 0; a < this.areas.length; a++) {
        if (this.areas[a]._visitantes.length > 0) {
            var visitanteTemporal = this.areas[a]._visitantes.slice(0, this.areas[a]._visitantes.length);
            this.areas[a]._visitantes = [];

            for (var v = 0; v < visitanteTemporal.length; v++) {
                var numeroAleatorioArea = getRandomInteger(0, this.areas.length - 1);
                var numeroAleatorioVisitante = getRandomInteger(0, this.areas[numeroAleatorioArea]._visitantes.length - 1);
                this.areas[numeroAleatorioArea]._visitantes.push(visitanteTemporal[v]);
            }
        }
    }
}

var miParque = new ParqueNatural();

var intervalID;

function cerrarParque() {
    clearInterval(intervalID);
    console.info('Parque cerrado...');
}

var intervalID = setInterval(ejecutarCiclo, 500);

function ejecutarCiclo() {
    if (miParque.getNumeroVisitantes() < 100) {
        miParque.addVisitante();
    } /*else {
        console.log('Visitantes: ', miParque.getNumeroVisitantes());
    }*/

    miParque.retirarArboles();
    miParque.getIncendio();
    miParque.checkIncendio();
    miParque.moverVisitante();

    for (var a = 0; a < miParque.areas.length; a++) {
        miParque.areas[a].imprimirEstadoArea();
    }

    console.log("Ciclo ejecutado");
}

console.log('ParqueNatural: ', miParque);

/*
BONUS para el ejercicio 002__005


1) Añade un objeto viento​ (de clase viento), con el siguiente atributo:

Velocidad: Nula/Media/Alta

En cada ejecución el viento tendrá una velocidad aleatoria

Si la velocidad es nula el incendio se expandirá 1 arbol, si la velocidad es media: dos árboles, 
si la dirección es alta: 3 árboles.

2) Los incendios ya no se originan de forma aleatoria en cualquier parte del bosque.

Los incendios los pueden originar los visitantes que sean fumadores (2 de cada 10). 
En cada ciclo hay una probabilidad del 10% de que un visitante fumador tire una colilla 
en el área en el que está y provoque un incendio.
*/