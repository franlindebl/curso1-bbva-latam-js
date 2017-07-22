/*
hacer clase vikingo

-nombre
-salud
-potenciaAtaque
-velocidad
*/

var Vikingo = function(nombre, salud, potenciaAtaque, velocidad) {
    this.nombre = nombre;
    this.salud = salud;
    this.potenciaAtaque = velocidad;
    this.velocidad = velocidad;
    this.armas = [];
};

Vikingo.prototype.ataca = function(vikingo) {
    vikingo._salud -= this._potenciaAtaque;
    //if (this.vikingo.armas){

    //}
}
;

Vikingo.prototype.saludOK = function() {
    return (this._salud > 0) ? true : false;
}

var Batalla = {
    vikingos: [],
    armas: [],
    addVikingo: function(nombre, salud, potenciaAtaque, velocidad) {
        this.vikingos.push(new Vikingo(nombre,salud,potenciaAtaque,velocidad));
    },

    addArma: function(tipo, potencia, ataquesRestantes) {
        this.armas.push(new Arma(tipo,potencia,ataquesRestantes));
    },

    iniciarBatalla: function(vikingo1, vikingo2) {
        var quienInicia = null;

        for (i = 0; i < this.vikingos.length; i++) {}

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
};

function numeroRandom(limit) {
    return Math.floor((Math.random() * limit) + 1);
}

var armas = ["cuchillo", "espada", "acha"];

function generarArmaAleatorio() {
    var armaAleatorio = Math.floor(Math.random() * armas.length);
    return armas[armaAleatorio];
}

for (var v = 0; v < 2; v++) {
    Batalla.addVikingo("Vikingo " + v, 1000, numeroRandom(20), numeroRandom(100));
    for (var b = 0; b < 10; b++) {
        Batalla.vikingos[v].armas.push(Batalla.addArma(this.generarArmaAleatorio(), numeroRandom(50), numeroRandom(10)));
    }
}

console.log(Batalla.vikingos);
//Batalla.iniciarBatalla(Batalla.vikingos[0], Batalla.vikingos[1]);

/*
crear las clase Armas() que tenga un tipo : espada cuchillo, una propiedad potencia y ataques restante 
Subir la salud 1000
*/

/*
Modifica la function ataca de Vikingo para que si tiene armas disponibles para que si tiene armas disponibles 
ataque con el arma mas potente, cada ves que use un arma , debera debera restar uno a ataquesRestantes de ese
arma, cuando el arma tenga 0 ataquesRestantes, el vikingo debera abandonar el arma añade la funcion abandonarArma()
a Vikingo   
*/

var Arma = function(tipo, potencia, ataquesRestantes) {
    this.tipo = tipo;
    this.potencia = potencia;
    this.ataquesRestantes = ataquesRestantes;
}
