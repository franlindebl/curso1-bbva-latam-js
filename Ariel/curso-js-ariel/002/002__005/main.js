/*
helpers aleatorios
*/

var nombresPersonas = ["Victor", "Omar", "Karen", "Ariel", "Omar", "David", "Esteban", "Matías", "Vlairner", "Lucy", "Ignacio", "Humberto", "Néstor", "Daniel", "Raymundo", "Fran"];
function generarNombreAleatorio() {
    var numeroAleatorio = Math.floor(Math.random() * nombresPersonas.length);
    return nombresPersonas[numeroAleatorio];
}

function generarEdadAleatorio() {
    var numeroAleatorio = Math.floor(Math.random() * 50);
    return numeroAleatorio;
}

function generarNumeroAleatorio(len) {
    var numeroAleatorio = Math.floor(Math.random() * len);
    return numeroAleatorio;
}

function generarArbolQuemadoAleatorio() {
    var numeroAleatorio = Math.round(Math.random() * 100);
    if (numeroAleatorio > 0 && numeroAleatorio < 5) {
        return true;
    } else {
        return false;
    }
}

function generarAireAleatorio() {
    //Nula/Media/Alta
    var numeroAleatorio = Math.round(Math.random() * 90);
    if (numeroAleatorio > 0 && numeroAleatorio < 29) {
        return "Nula";
    }
    if (numeroAleatorio > 30 && numeroAleatorio < 59) {
        return "Media";
    }
    if (numeroAleatorio > 60 && numeroAleatorio < 90) {
        return "Alta";
    }
}

function generarArbolAleatorio(len) {
    var numeroAleatorio = Math.floor(Math.random() * len);
    return numeroAleatorio;
}

var Viento = function() {
    this.velocidad = generarAireAleatorio();
}

var ParqueNatural = function() {
    this.areas = [];
    this.parqueDeBomberos = {
        bomberos: []
    };

    for (var i = 0; i < 10; i++) {
        this.areas.push(new Area(i));
        this.parqueDeBomberos.bomberos.push(new Bombero(i));
    }
}

ParqueNatural.prototype.addVisitante = function(visitante) {
    var areaAleatorio = generarNumeroAleatorio(this.areas.length);
    if (!(this.areas[areaAleatorio].visitantes.length == 10)) {
        if (this.areas[areaAleatorio]) {
            this.areas[areaAleatorio].visitantes.push(visitante);
        } else {
            console.error("TODO SE A QUEMADO!!!!!!!!!")
            clearInterval(intervalID);
        }
    }
}

ParqueNatural.prototype.arbolQuemado = function() {
    var areaAleatorio = generarNumeroAleatorio(this.areas.length);
    var arbolAleatorio = generarArbolAleatorio(this.areas[areaAleatorio].arboles.length);

    if (generarArbolQuemadoAleatorio() == true) {

        if (aire.velocidad == "Nula") {
            if (this.areas[areaAleatorio].arboles[arbolAleatorio]) {
                this.areas[areaAleatorio].arboles[arbolAleatorio].quemado = true;
            }
        }
        if (aire.velocidad == "Media") {
            if (this.areas[areaAleatorio].arboles[arbolAleatorio]) {
                this.areas[areaAleatorio].arboles[arbolAleatorio].quemado = true;
            }
            if (this.areas[areaAleatorio].arboles[arbolAleatorio + 1]) {
                this.areas[areaAleatorio].arboles[arbolAleatorio + 1].quemado = true;
            }
        }
        if (aire.velocidad == "Alta") {
             if (this.areas[areaAleatorio].arboles[arbolAleatorio]) {
                this.areas[areaAleatorio].arboles[arbolAleatorio].quemado = true;
            }
            if (this.areas[areaAleatorio].arboles[arbolAleatorio + 1]) {
                this.areas[areaAleatorio].arboles[arbolAleatorio + 1].quemado = true;
            }
            if (this.areas[areaAleatorio].arboles[arbolAleatorio + 2]) {
                this.areas[areaAleatorio].arboles[arbolAleatorio + 2].quemado = true;
            }
        }
    }
}

ParqueNatural.prototype.arbolPorcentajeQuemado = function() {
    for (var x = 0; x < parque.areas.length; x++) {
        var area = parque.areas[x];
        var estadoArea = "";
        for (var y = 0; y < area.arboles.length; y++) {
            var arbol = area.arboles[y];
            var estadoArbol = "🌲";
            if (arbol.quemado == true) {
                estadoArbol = "🔥"
                if (arbol.porcentajeQuemado == 100) {
                    var sequemo = area.arboles.indexOf(arbol);
                    area.arboles.splice(sequemo, 1);
                    //console.error("el arbol: " + y + " del area: " + x + " se MURIO!!!!! " + arbol.porcentajeQuemado + " !!");
                } else {
                    arbol.porcentajeQuemado += 10;
                    //console.warn("el arbol: " + y + " del area: " + x + " se SIGUE a QUEMANDO " + arbol.porcentajeQuemado + " !!");
                }
            }
            estadoArea = estadoArea + estadoArbol;

        }

        console.log("Estado del área " + area.areaId + " con: " + area.arboles.length + " arboles vivos!!");
        console.log("======================");
        console.log(estadoArea);
        console.log("======================");
    }
}

ParqueNatural.prototype.propagarFuego = function() {
    for (var x = 0; x < parque.areas.length; x++) {
        var area = parque.areas[x];
        if (area.arboles.length == 0) {
            var sequemoArea = parque.areas.indexOf(area);
            //console.error("El area: " + sequemoArea + " es inhabitable!!!");
            parque.areas.splice(sequemoArea, 1);
        } else {
            for (var y = 0; y < area.arboles.length; y++) {
                var arbol = area.arboles[y];
                if (arbol.porcentajeQuemado > 10) {
                    if (area.arboles[y + 1]) {
                        area.arboles[y + 1].quemado = true;
                    } else {
                        if (parque.areas[x + 1]) {
                            if (parque.areas[x + 1].arboles[0]) {
                                parque.areas[x + 1].arboles[0].quemado = true;
                            }
                        } else {
                            if (parque.areas[0].arboles[0]) {
                                parque.areas[0].arboles[0].quemado = true;
                            }
                        }
                    }
                }
            }
        }
    }
}

var Arbol = function(id) {
    this.arbolId = id;
    this.quemado = false;
    this.porcentajeQuemado = 0;
}

var Area = function(id) {
    this.areaId = id;
    this.visitantes = [];
    this.arboles = [];

    for (var i = 0; i < 100; i++) {
        var nuevoArbolId = this.areaId + "_" + i;
        this.arboles.push(new Arbol(nuevoArbolId));
    }
}

var Persona = function() {
    this.nombre = "";
    this.edad = 0;
}

Persona.prototype.initPersona = function() {
    this.nombre = generarNombreAleatorio();
    this.edad = generarEdadAleatorio();
}

var Bombero = function(id) {
    this.initPersona();
    this.bomberoId = id;
}

Bombero.prototype = new Persona();

var Visitante = function() {
    this.initPersona();
    this.piromano = false;
}

Visitante.prototype = new Persona();

function ejecutarCiclo() {
    parque.addVisitante(new Visitante());

    parque.arbolQuemado();

    parque.arbolPorcentajeQuemado();

    parque.propagarFuego();

    console.log("Ciclo ejecutado");
}

/* Parque */

var parque = new ParqueNatural();
var aire = new Viento();
var intervalID;

function abrirParque() {
    intervalID = setInterval(ejecutarCiclo, 500);
}

function cerrarParque() {
    clearInterval(intervalID);
    for (var i = 0; i < parque.areas.length; i++) {
        parque.areas[i].visitantes = [];
    }
}
