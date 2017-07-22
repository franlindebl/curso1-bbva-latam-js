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

var pubsub = (function () {
    var suscriptores = {};

    function subscribe(event, callback) {
        if (!suscriptores[event]) {
            var suscriptorArray = [callback];
            suscriptores[event] = suscriptorArray;
        } else {
            suscriptores[event].push(callback);
        }
    }

    function publish(event, data) {
        if (suscriptores[event]) {
            suscriptores[event].forEach(function (callback) {
                // console.info('Que llego: ',data);
                callback(data);
            });
        }
    }

    return {
        pub: publish,
        sub: subscribe
    }
}());

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
    this._arbolSensor = (getRandomInteger(1, 15) == 1) ? true : false;
}

Arbol.prototype.cambiarIncendiado = function (area) {
    this._incendiado = true;
    if (this._arbolSensor) {
        // console.info('Publicando Incendio: ', area);
        pubsub.pub("alertaIncendio", area);
    }
}
/*
Arbol.prototype.cicloArbol = function () {
    if (this._incendiado) {
        this._porcConsumido += 10;
        this._porcConsumido = this._porcConsumido > 100 ? 100 : this._porcConsumido;
    }
}
*/
Arbol.prototype.cicloArbolVida = function () {
    if (this._incendiado == true) {
        this._porcConsumido += 10;
        this._porcConsumido = this._porcConsumido > 100 ? 100 : this._porcConsumido;
    } else {
        if (this._porcConsumido > 0 && this._porcConsumido < 100) {
            this._porcConsumido -= 10;
            this._porcConsumido = this._porcConsumido < 0 ? 0 : this._porcConsumido;
        }
    }
}

var Area = function (id) {
    this._areaId = id;
    this._arboles = [];
    this._visitantes = [];
    this._bomberos = [];

    for (var b = 0; b < 90; b++) {
        this._arboles.push(new Arbol(this._areaId + "_" + b));
    }
}

Area.prototype.getEstadoArea = function () {
    var estadoArea = "";
    this.isOnFire = false;
    for (var i = 0; i < this._arboles[0].length; i++) {
        var estadoArbol = "🌲";

        if (this._arboles[0][i].estaQuemado) {
            estadoArbol = "🔥";
            this.isOnFire = true;
        }
        estadoArea += estadoArbol + "";
    }

    estadoArea += "\n";

    for (var i = 0; i < this._visitantes.length; i++) {
        var estadoVisitante = "😃";
        if (this.isOnFire) {
            estadoVisitante = "😱";
        }
        if (this._arboles[0].length == 0)
            estadoVisitante = "😐";

        estadoArea += estadoVisitante;
    }

    return estadoArea;
}

Area.prototype.imprimirEstadoAreaV0 = function () {
    var estadoArea = "";
    var estadoVisitantes = "";
    var estadoBomberos = "";

    for (var i = 0; i < this._arboles.length; i++) {
        var estadoArbol = this._arboles[i]._arbolSensor ? "🍄" : "🌳";

        if (this._arboles[i]._porcConsumido >= 100) {
            estadoArbol = "☠️";
        } else {
            if (this._arboles[i]._incendiado == true) {
                if (this._arboles[i]._porcConsumido <= 20) {
                    estadoArbol = "🌕";
                } else if (this._arboles[i]._porcConsumido <= 40) {
                    estadoArbol = "🌖";
                } else if (this._arboles[i]._porcConsumido <= 60) {
                    estadoArbol = "🌗";
                } else if (this._arboles[i]._porcConsumido <= 80) {
                    estadoArbol = "🌘";
                } else if (this._arboles[i]._porcConsumido <= 100) {
                    estadoArbol = "🌑";
                }
            } else {
                if (this._arboles[i]._porcConsumido > 0 && this._arboles[i]._porcConsumido < 100) {
                    estadoArbol = "💦";
                }
            }
        }

        estadoArea += estadoArbol;
    }

    for (var i = 0; i < this._visitantes.length; i++) {
        estadoVisitantes += "🚶";
    }

    for (var i = 0; i < this._bomberos.length; i++) {
        estadoBomberos += "🚒";
    }

    console.log("====================== Estado del área [" + this._areaId + "] ======================");
    console.log(estadoArea);
    console.log(estadoVisitantes);
    console.log(estadoBomberos);
}

Area.prototype.getHTML = function () {
    var html = '<div class="area">';
    html = html + '<span class="areaInner">';
    html = html + this.getEstadoArea();
    html = html + '</span>';
    html = html + '</div>';

    return html;
}

Area.prototype.imprimirEstadoArea = function () {
    log("Estado del área " + this._areaId);
    log(this.getEstadoArea);
    log("======================");
}

var Bombero = function (id) {
    this.initPersona();
    this._bomberoID = id;
    this._edad = getRandomInteger(20, 55);
    this._fuerza = 2;
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
    this.numeroIncendios = 0;

    for (var idArea = 0; idArea < 4; idArea++) {
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
    if ((getRandomInteger(1, 5) == 1 ? true : false) == true) {
        //if ((getRandomInteger(1, 20) == 1 ? true : false) == true) {
        var iniciaIncendio = false;
        while (!iniciaIncendio) {
            try {
                var numeroAleatorioArea = getRandomInteger(0, this.areas.length - 1);
                var numeroAleatorioArbol = getRandomInteger(0, this.areas[numeroAleatorioArea]._arboles.length - 1);

                if (this.areas[numeroAleatorioArea]._arboles[numeroAleatorioArbol]._incendiado == false) {
                    this.areas[numeroAleatorioArea]._arboles[numeroAleatorioArbol].cambiarIncendiado(numeroAleatorioArea);
                    iniciaIncendio = true;
                }
            } catch (er) {
                console.error('Fallo en generar incendio... ', er);
                iniciaIncendio = true;
            }
        }
    }
}

ParqueNatural.prototype.buscarSiguienteArbol = function () {
    console.log('Nueva funcionalidad');
}

// No esta terminado este BONUS...
/*
ParqueNatural.prototype.checkIncendioV2 = function () {
    for (var a = 0; a < this.areas.length; a++) {
        for (var b = 0; b < this.areas[a]._arboles.length; b++) {
            if (this.areas[a]._arboles[b]._incendiado == true) {
                if (this.areas[a]._arboles[b]._incendiado &&
                    this.areas[a]._arboles[b]._porcConsumido >= 10 &&
                    this.areas[a]._arboles[b]._porcConsumido < 100) {
                    var vientoTipo = Viento.estadoViento();
                    switch (vientoTipo) {
                        case "Nula":
                            console.info('El viento tiene una velodidad: ', vientoTipo);
                            if (b < (this.areas[a]._arboles.length - 1)) {
                                this.areas[a]._arboles[b + 1].cambiarIncendiado(a);
                            } else if (a < (this.areas.length - 1) && this.areas[a + 1]._arboles.length > 0) {
                                this.areas[a + 1]._arboles[0].cambiarIncendiado(a);
                            }
                            break;
                        case "Media":
                            console.warn('El viento tiene una velodidad: ', vientoTipo);
                            if (b < (this.areas[a]._arboles.length - 2)) {
                                this.areas[a]._arboles[b + 1].cambiarIncendiado(a);
                                this.areas[a]._arboles[b + 2].cambiarIncendiado(a);
                            } else if (a < (this.areas.length - 1) && this.areas[a + 1]._arboles.length > 0) {
                                this.areas[a]._arboles[b + 1].cambiarIncendiado(a);
                                this.areas[a + 1]._arboles[0].cambiarIncendiado(a);
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
}*/
/*
ParqueNatural.prototype.checkIncendio = function () {
    for (var a = 0; a < this.areas.length; a++) {
        for (var b = 0; b < this.areas[a]._arboles.length; b++) {
            if (this.areas[a]._arboles[b]._incendiado == true) {
                // Propagar incendio
                if (this.areas[a]._arboles[b]._incendiado &&
                    this.areas[a]._arboles[b]._porcConsumido >= 10 &&
                    this.areas[a]._arboles[b]._porcConsumido < 100) {
                    if (b < (this.areas[a]._arboles.length - 1)) {
                        this.areas[a]._arboles[b + 1].cambiarIncendiado(a);
                    } else if (a < (this.areas.length - 1) && this.areas[a + 1]._arboles.length > 0) {
                        this.areas[a + 1]._arboles[0].cambiarIncendiado(a);
                    }
                }
                this.areas[a]._arboles[b].cicloArbol();
            }
        }
    }
}
*/
ParqueNatural.prototype.checkIncendioBomberos = function () {
    for (var a = 0; a < this.areas.length; a++) {
        // Numero de bomberos en el area
        var numeroArbolesBomberos = this.areas[a]._bomberos.length * 2;

        for (var b = (this.areas[a]._arboles.length - 1); b >= 0; b--) {
            if (this.areas[a]._arboles[b]._incendiado == true) {
                if (numeroArbolesBomberos > 0) {
                    this.areas[a]._arboles[b]._incendiado = false;
                    numeroArbolesBomberos -= 1;
                } else {
                    // Propagar incendio
                    if (this.areas[a]._arboles[b]._incendiado &&
                        this.areas[a]._arboles[b]._porcConsumido >= 10 &&
                        this.areas[a]._arboles[b]._porcConsumido < 100) {
                        if (b < (this.areas[a]._arboles.length - 1)) {
                            this.areas[a]._arboles[b + 1].cambiarIncendiado(a);
                        } else if (a < (this.areas.length - 1) && this.areas[a + 1]._arboles.length > 0) {
                            this.areas[a + 1]._arboles[0].cambiarIncendiado(a);
                        }
                    }
                }
            }
            this.areas[a]._arboles[b].cicloArbolVida();
        }

        // Regresamos a los bomberos?
        if (numeroArbolesBomberos > 0) {
            var checkFuego = false;
            for (var b = 0; b < this.areas[a]._arboles.length; b++) {
                if (this.areas[a]._arboles[b]._incendiado) {
                    checkFuego = true;
                    break;
                }
            }

            if (checkFuego == false) {
                // this.regresarBomberos(a);
                pubsub.pub("incendioApagado", a);

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

ParqueNatural.prototype.moverBomberos = function (area) {
    this.numeroIncendios += 1;

    if (this.parqueDeBomberos.bomberos.length > 0) {
        while (this.parqueDeBomberos.bomberos.length > 0) {
            this.areas[area]._bomberos.push(this.parqueDeBomberos.bomberos.pop());
        }
    } else {
        // Buscar bomberos
        for (var a = 0; a < this.areas; a++) {
            if (a != area && this.areas[a]._bomberos.length > 2) {
                var contador = parseInt(this.areas[a]._bomberos.length / 2);

                while (contador > 0) {
                    this.parqueDeBomberos.bomberos.push(this.areas[area]._bomberos.pop());
                    contador -= 1;
                }

                break;
            }
        }
    }
}

ParqueNatural.prototype.regresarBomberos = function (area) {
    this.numeroIncendios -= 1;
    this.numeroIncendios = this.numeroIncendios < 0 ? 0 : this.numeroIncendios;

    // console.log('Quitar bomberos de area: ', area);
    while (this.areas[area]._bomberos.length > 0) {
        this.parqueDeBomberos.bomberos.push(this.areas[area]._bomberos.pop());
    }
}

ParqueNatural.prototype.pintarEstadoParque = function () {
    var contenidoParque = "";

    for (var i = 0; i < this.areas.length; i++) {
        var area = this.areas[i];
        contenidoParque = contenidoParque + area.getHTML();
    }

    var miparquehtml = document.getElementById("parque");
    miparquehtml.innerHTML = contenidoParque;
}

var miParque = new ParqueNatural();

var intervalID;

function cerrarParque() {
    clearInterval(intervalID);
    console.info('Parque cerrado...');
}

function abrirParque() {
    console.log('Ejecutando...');
    intervalID = setInterval(ejecutarCiclo, 1000);
}

/* */
pubsub.sub("alertaIncendio", function (e) { miParque.moverBomberos(e); });
pubsub.sub("incendioApagado", function (e) { miParque.regresarBomberos(e); });
/* */

// var intervalID = intervalID = setInterval(ejecutarCiclo, 1000);
var intervalID = null;

function ejecutarCiclo() {
    if (miParque.getNumeroVisitantes() < 100) {
        miParque.addVisitante();
    }

    miParque.retirarArboles();
    miParque.getIncendio();
    // miParque.checkIncendio();
    miParque.checkIncendioBomberos();
    miParque.moverVisitante();

    /*for (var a = 0; a < miParque.areas.length; a++) {
        miParque.areas[a].imprimirEstadoAreaV0();
    }*/
    miParque.pintarEstadoParque();

    // console.log("Ciclo ejecutado");
}

// console.log('ParqueNatural: ', miParque);

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