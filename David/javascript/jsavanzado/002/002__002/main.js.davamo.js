/*
Ejecicio 002__002

1)Haciendo unos de funciones y de new realiza una clase vikingo 
que almacene la informacion de un vikingo:

nombre
salud (0-100)
potenciaAtaque (0- 20)
velocidad (0 -100)


2)Has uso de prototype y añade un metodo .ataca(vikingo) a
Vikingo para que ataque a su oponente;
El ataque le restara salud a vikingo atacado (La potencia de ataque de vikingo atacante)

3) Realia una clase Batalla cuyas instancias enfrenten a dos Vikingos

Batalla tendra una metodo iniciarBatalla que hara que comienze
Una Batalla tendra una serie de asaltos en los que: 

4) Crear la clase Arma() que tenga un tipo: (espada/ cuchillo... etc),
una propiedad potencia (20-50) y un ataquesRestante (0-10)

Recuerda subir la salud de vikingo a 1000

5) Añade una propiedad armas a vikingo para que pueda poseer
varias armas para su batalla. Añade el metodo addArma() para añadir armas a los vikingos.

6) Modifica la funcion ataca de vikingo, para que si tiene armas
disponibles, ataque con el arma mas potente, Cada vez q unse un arma, debera restar uno a ataquesRestantes de ese arma. 
Cuando el arma tenga 0 ataquesRestantes, el vikingo debera abandonar el arma (añade la funcion abandonarArma() a Vikingo)

*/

var Vikingo = function(nombre, salud, potenciaAtaque, velocidad) {
    this.nombre = nombre;
    this.salud = salud;
    this.potenciaAtaque = potenciaAtaque;
    this.velocidad = velocidad;
    this.armas = [];
};

Vikingo.prototype.ataca = function(vikingo) {
    if (this.armas.length > 0) {
        var armaParaAtacar = this.asignarArmaVikingo(this.armas);
        vikingo.salud = vikingo.salud - armaParaAtacar.potencia;
    }
};

Vikingo.prototype.addArma = function(arma) {
    this.armas.push(arma);
};

Vikingo.prototype.abandonarArma = function(vikingo) {
    if (this.armas.length == 0) {
        var armaParaAtacar = this.asignarArmaVikingo(this.armas);
        vikingo.salud = vikingo.salud - armaParaAtacar.potencia;
    }
};

Vikingo.prototype.asignarArmaVikingo = function(armas) {
    var array = armas.sort(function(a, b) {
        return a.potencia - b.potencia; });
    var armamaspotente = array[armas.length - 1];
    return armamaspotente;
}

var Batalla = function(vikingo1, vikingo2) {
    this.vikingo1 = vikingo1;
    this.vikingo2 = vikingo2;
};

Batalla.prototype.iniciarBatalla = function() {
    var AtacaVikingo1 = true;
    if (this.vikingo1.velocidad > this.vikingo2.velocidad) {
        AtacaVikingo1 = true;
    } else {
        AtacaVikingo1 = false;
    }

    while (this.vikingo1.salud > 0 && this.vikingo2.salud > 0) {
        if (AtacaVikingo1) {
            this.vikingo1.ataca(this.vikingo2);
        } else {
            if (AtacaVikingo2) {
                this.vikingo2.ataca(this.vikingo1);
            }
        }
        AtacaVikingo1 = !AtacaVikingo1;
    }
};

var Arma = function(tipo, potencia, ataquesRestante) {
    this.tipo = tipo;
    this.potencia = potencia;
    this.ataquesRestante = ataquesRestante;
};

function asignarArmaVikingo(armas) {
    var array = armas.sort(function(a, b) {
        return a.potencia - b.potencia; });
    var armamaspotente = array[armas.length - 1];
    return armamaspotente;
}


var arma1 = new Arma("Espada", 50, 7);
var arma2 = new Arma("cuchillo", 40, 8);
var arma3 = new Arma("lanza", 50, 10);
var arma4 = new Arma("hacha", 20, 3);

var vikingo1 = new Vikingo("Ragnar", 500, 20, 80);
var vikingo2 = new Vikingo("Looky", 500, 10, 60);

vikingo1.addArma(arma1);
vikingo1.addArma(arma2);
vikingo2.addArma(arma3);
vikingo2.addArma(arma4);


vikingo1.ataca(vikingo2);
vikingo2.ataca(vikingo1);
