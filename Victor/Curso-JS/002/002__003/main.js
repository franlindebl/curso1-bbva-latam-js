// saludMaxima se usa como constante donde queramos usar la salud máxima (la bajé a 500 para que la batalla dure menos)
var saludMaxima = 500;

var nombresPersonas = ["Victor", "Omar", "Karen", "Ariel", "Omar", "David", "Esteban", "Matías", "Vlairner", "Lucy", "Ignacio", "Humberto", "Néstor", "Daniel", "Raymundo", "Fran"];
var nombresArmas = ["Cuchillo", "Hacha", "Moto cierra", "Escuadra", "M60", "Bazooka"];

function generaNombreAleatorio() {
    var numeroAleatorio = Math.floor(Math.random() * nombresPersonas.length);
    return nombresPersonas[numeroAleatorio];
}

function generaNombresAleatorio(arregloNombres) {
    var numeroAleatorio = Math.floor(Math.random() * arregloNombres.length);
    return arregloNombres[numeroAleatorio];
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Vikingo = function () {
    this._nombre = "";
    this._salud = 100;
    this._dinero = 0;
}

Vikingo.prototype.initVikingo = function () {
    this._nombre = generaNombreAleatorio();
    this._dinero = getRandomInteger(0, 1000000);
}



/*
1) realiza una clase ejército que tenga un array de vikingos 
*/
var Ejercito = function () {
    this._soldados = [];
    this._curanderos = [];
}

Ejercito.prototype.buscarCurandero = function () {
    var indiceCurandero = 0;
    for (var c = 0; c < this._curanderos.length; c++) {
        if (this._curanderos[c]._numeroRecusitar > 0) {
            return c;
        }
    }

    return null;
}

Ejercito.prototype.intentarCurar = function () {
    console.log('Intentar curar...');
    var indiceCurandero = this.buscarCurandero();
    if (indiceCurandero != null) {
        this._curanderos[indiceCurandero].resucitar(this._soldados[0]);
        console.log('Soldado: ' + this._soldados[0]._nombre + ' ha curado por ' + this._curanderos[indiceCurandero]._nombre);
    } else {
        console.log('Soldado: ' + this._soldados[0]._nombre + ' ha muerto.');
        this._soldados.splice(0, 1);
    }
}

// ejercito1.

/*
2) realiza una clase soldadoVikingo que herede de vikingo y tenga los métodos necesarios para la lucha 
*/
var SoldadoVikingo = function () {
    // Inicializador del padre
    this.initVikingo();
    // Variables propias de SoldadoVikingo
    this._potencia = getRandomInteger(1, 20);
    this._velocidad = getRandomInteger(1, 100);
    this._armas = [];
}

SoldadoVikingo.prototype = new Vikingo();

SoldadoVikingo.prototype.ataca = function (vikingo) {
    var armaElegida = this.armaElegida || this.elegirArma();
    var potenciaAtaque = this.getPotenciaActual();
    var nombreArma = "sus puños";
    if (armaElegida) {
        armaElegida.usar();
        potenciaAtaque = armaElegida.potencia;
        nombreArma = armaElegida.tipo + "(" + armaElegida.ataquesRestantes + ")";
    }
    console.log(this._nombre + " atacará a " + this._nombre + " con potencia " + this._potencia + " usando " + nombreArma);
    vikingo.modificarSalud(-potenciaAtaque);
    if (armaElegida && armaElegida.ataquesRestantes === 0) {
        this.abandonarArma(armaElegida);
    }
};

SoldadoVikingo.prototype.getPotenciaActual = function () {
    var potenciaActual = Math.round(this._potencia * 0.8 + this._potencia * 0.2 * this._salud / saludMaxima);
    return potenciaActual;
};

SoldadoVikingo.prototype.modificarSalud = function (cantidad) {
    this._salud += cantidad;
    if (this._salud < 0) {
        this._salud = 0;
    } else {
        if (this._salud > saludMaxima) {
            this._salud = saludMaxima;
        }
    }
    console.log("    La salud de " + this._nombre + " ahora es " + this._salud);
};

SoldadoVikingo.prototype.getEstado = function () {
    var estado = this._nombre + " [salud:" + this._salud + ", potencia:" + this._potencia + "(" + this.getPotenciaActual() + "), velocidad:" + this._velocidad + ", dinero:" + this._dinero + "]";
    for (var i = 0; i < this._armas.length; i++) {
        var arma = this._armas[i];
        estado += "\n    " + arma.tipo + " [potencia:" + arma.potencia + ", ataquesRestantes:" + arma.ataquesRestantes + "]";
    }
    return estado;
};

SoldadoVikingo.prototype.addArma = function (arma) {
    this._armas.push(arma);
};

SoldadoVikingo.prototype.abandonarArma = function (arma) {
    var indice = this._armas.indexOf(arma);
    var abandonadas = this._armas.splice(indice, 1);
    if (abandonadas[0] == this.armaElegida) {
        this.armaElegida = null;
    }
    console.log("    " + this._nombre + " ha abandonado su " + abandonadas[0].tipo);
};

SoldadoVikingo.prototype.elegirArma = function () {
    var armaElegida = null;
    for (var i = 0; i < this._armas.length; i++) {
        var arma = this._armas[i];
        if (!armaElegida || arma.potencia > armaElegida.potencia) {
            armaElegida = arma;
        }
    }
    if (armaElegida) {
        console.log("    " + this._nombre + " ha elegido su " + armaElegida.tipo);
        this.armaElegida = armaElegida;
    }
    return armaElegida;
};

SoldadoVikingo.prototype.robarDinero = function (vikingo) {
    this.dinero += vikingo.dinero;
    console.log(this._nombre + " ha robado " + this._dinero + " monedas a " + vikingo._nombre);
    vikingo.dinero = 0;
};

SoldadoVikingo.prototype.robarArmas = function (vikingo) {
    if (vikingo.armas.length) {
        this.armas = this.armas.concat(vikingo.armas);
        console.log(this._nombre + " ha robado " + vikingo._armas.length + " armas a " + vikingo._nombre);
        vikingo.armas = [];
    }
};

// var soldado = new SoldadoVikingo(15,10);

/*
3) realiza una clase curanderoVikingo que herede de vikingo, añade a la clase ejército un array de curanderos y añade el método resucitar(vikingo), que permitirá recuperar la salud de los soldados muertos en combate. Los curanderos solo podrán resucitar 5 veces
*/
var CuranderoVikingo = function () {
    this._numeroRecusitar = 5;
}

CuranderoVikingo.prototype = new Vikingo();

CuranderoVikingo.prototype.resucitar = function (vikingo) {
    if (this._numeroRecusitar > 0) {
        vikingo._salud = 100;
        this._numeroRecusitar -= 1;
    }
}

/*
4) añade un método enfrentarEjercitos en la clase batalla, que reciba dos ejércitos y los enfrente entre si.
Enfrentará el primer soldado de cada ejército contra el primer soldado del otro. Cuando mueran vikingos si él ejércitos tiene curanderos, podrán revivir al vikingo.
Si no pueden revivirlo, deberá abandonar el array y pasara a enfrentarse el siguiente 
La batalla acabará cuando uno de los dos ejércitos pierda todos sus soldados.
*/

function Pelea(vikingo1, vikingo2) {
    this.vikingo1 = vikingo1;
    this.vikingo2 = vikingo2;
}

Pelea.prototype.iniciarPelea = function () {
    var vikingos = [];
    vikingos.push(this.vikingo1);
    vikingos.push(this.vikingo2);
    console.log("***** " + vikingos[0]._nombre + " y " + vikingos[1]._nombre + " entraran en batalla *****");
    console.log(vikingos[0].getEstado());
    console.log(vikingos[1].getEstado());

    var v1 = vikingos[0].velocidad;
    var v2 = vikingos[1].velocidad;
    var turno = v1 > v2 ? 0 : v1 < v2 ? 1 : Math.round(Math.random());

    var atacante;
    var atacado;

    while (vikingos[0]._salud > 0 && vikingos[1]._salud > 0) {
        atacante = vikingos[turno];
        atacado = vikingos[turno ? 0 : 1];
        atacante.ataca(atacado);
        turno = turno ? 0 : 1;
    }

    console.log("***** " + atacante._nombre + " ha ganado la batalla contra " + atacado._nombre + " *****");
    console.log(vikingos[0].getEstado());
    console.log(vikingos[1].getEstado());
    atacante.robarDinero(atacado);
    // atacante.robarArmas(atacado);
};

function Batalla(ejercito1, ejercito2) {
    this._ejercito1 = ejercito1;
    this._ejercito2 = ejercito2;
}

Batalla.prototype.iniciarBatalla = function () {
    // logica de la batalla

    console.log('Ejercito 1', this._ejercito1);
    console.log('Ejercito 2', this._ejercito2);

    while (this._ejercito1._soldados.length > 0 && this._ejercito2._soldados.length > 0) {
        console.log('Inicia encuentro...');
        var pelea = new Pelea(this._ejercito1._soldados[0], this._ejercito2._soldados[0]);
        pelea.iniciarPelea();

        /// comprobamos salud de this._ejercito1.soldados[0] y de 1
        if (this._ejercito1._soldados[0]._salud <= 0) {
            this._ejercito1.intentarCurar();
        } else {
            this._ejercito2.intentarCurar();
        }
    }
}

/* ********** Clase Arma ********** */
function Arma(tipo, potencia, ataquesRestantes) {
    this.tipo = tipo;
    this.potencia = potencia;
    this.ataquesRestantes = ataquesRestantes;
}
Arma.prototype.usar = function () {
    this.ataquesRestantes--;
};

var ejercito1 = new Ejercito();
var ejercito2 = new Ejercito();

for (var i = 0; i < 25; i++) {
    ejercito1._soldados.push(new SoldadoVikingo());
    ejercito2._soldados.push(new SoldadoVikingo());

    var numeroArmasAleatorio = getRandomInteger(0, 5);
    for (var a = 0; a < numeroArmasAleatorio; a++) {
        ejercito1._soldados[i].addArma(new Arma(generaNombresAleatorio(nombresArmas), 40, 5));
    }
    numeroArmasAleatorio = getRandomInteger(0, 5);
    for (var a = 0; a < numeroArmasAleatorio; a++) {
        ejercito2._soldados[i].addArma(new Arma(generaNombresAleatorio(nombresArmas), 40, 5));
    }
}

for (var i = 0; i < 5; i++) {
    ejercito1._curanderos.push(new CuranderoVikingo());
    ejercito2._curanderos.push(new CuranderoVikingo());
}

var battle = new Batalla(ejercito1, ejercito2);
battle.iniciarBatalla();