/*
    Ejercicio 002__002
    1) Haciendo uso de funciones y de new, realiza una "clase" vikingo
    que almacene la información de un vikingo:

    nombre 
    salud (0 - 100)
    potenciaAtaque (0 - 20)
    velocidad (0 - 100)

    2) Haz uso de prototype y añade un método .ataca(vikingo) a
    Vikingo para que ataque a su oponente;
    El ataque le restará salud al vikingo atacando (la potencia de
    ataque de Vikingo atacante)

    3) Realiza una clase Batalla() cuyas instancias enfrenten a dos
    Vikingos

    Batalla tendrá un método iniciarBatalla que hará que comienze.

    Una Batalla tendrá una serie de asaltos en los que:

    atacará primero el que más velocidad tenga
    y quitará de salud su potencia de ataque al rival,
    hasta que uno muera.

    4) Crear la clase Arma() que tenga un tipo: (espada /
    cuchillo,...,etc), una propiedad potencia (20-50) y un 
    ataquesRestantes (0-10).

    Recuerda subir la salud del vikingo a 1000.

    5) Añade una propiedad armas a Vikingo para que pueda poseer
    varias armas para su batalla. Añade el método addArma() para
    añadir armas a los vikingos.

    6) Modificar la función ataca de vikingo, para que si tiene armas
    disponibles, ataque con el arma más potente. Cada Vez que use un
    arma, deberá restar uno a ataquesRestantes de esa arma. Cuando el
    arma tenga 0 ataquesRestantes, el vikingo deberá abandonar el arma
    (añade la función abandonarArma() a Vikingo).
*/

/*function numeroRandom(limit) {
    return Math.floor((Math.random() * limit) + 1);
}*/

// Retorna un entero aleatorio entre min (incluido) y max (excluido)
// ¡Usando Math.round() te dará una distribución no-uniforme!
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var Vikingo = function (nombre, salud, potenciaAtaque, velocidad) {
    this._nombre = nombre;
    this._salud = salud;
    this._potenciaAtaque = potenciaAtaque;
    this._velocidad = velocidad;
    this._armas = [];
}

Vikingo.prototype.ataca = function (vikingo) {
    if (this._armas.length > 0) {
        var ultimaArma = this._armas[this._armas.length - 1];
        console.log("Usando arma...");
        console.log(ultimaArma);
        vikingo._salud -= ultimaArma._potencia;
        ultimaArma._ataquesRestantes -= 1;
        if (ultimaArma._ataquesRestantes <= 0) {
            console.log("Abadonando arma... ");
            console.log(ultimaArma._nombre);
            this.abandonarArma();
        }
    }else{
        console.log("Sin armas... a puños!!!");
        vikingo._salud -= this._potenciaAtaque;
    }
}

Vikingo.prototype.saludOK = function () {
    return (this._salud > 0) ? true : false;
}

Vikingo.prototype.addArma = function (tipo, potencia, ataquesRestantes) {
    this._armas.push(new Arma(tipo, potencia, ataquesRestantes));
}

Vikingo.prototype.abandonarArma = function () {
    this._armas.pop();
}

var Batalla = {
    vikingos: [],
    addVikingo: function (nombre, salud, potenciaAtaque, velocidad) {
        this.vikingos.push(new Vikingo(nombre, salud, potenciaAtaque, velocidad));
    },
    iniciarBatalla: function (vikingo1, vikingo2) {
        var quienInicia = null;
        if (vikingo1._velocidad > vikingo2._velocidad) {
            vikingo1.ataca(vikingo2);
            quienInicia = true;
        } else {
            vikingo2.ataca(vikingo1);
            quienInicia = false;
        }

        console.log(vikingo1);
        console.log(vikingo2);

        while (vikingo1.saludOK() && vikingo2.saludOK()) {
            quienInicia == !quienInicia;
            if (quienInicia == true) {
                vikingo1.ataca(vikingo2);
            } else {
                vikingo2.ataca(vikingo1);
            }
            console.log(vikingo1);
            console.log(vikingo2);
        }
        console.log("Batalla terminada...");
    }
}

var Arma = function (tipo, potencia, ataquesRestantes) {
    this._tipo = tipo;
    this._potencia = potencia;
    this._ataquesRestantes = ataquesRestantes;
}



for (var v = 0; v < 2; v++) {
    Batalla.addVikingo("Vikingo " + v, 1000, getRandomInt(1, 20), getRandomInt(1,100));
    var numeroArmas = getRandomInt(5);
    for (var a = 0; a < getRandomInt(1, 10); a++) {
        Batalla.vikingos[v].addArma("Tipo " + a, getRandomInt(20, 50), getRandomInt(1,10));
    }
    Batalla.vikingos[v]._armas.sort(function (a, b) {
        return a._potencia - b._potencia;
    });
}

console.log(Batalla.vikingos);
//Batalla.iniciarBatalla(Batalla.vikingos[0], Batalla.vikingos[1]);