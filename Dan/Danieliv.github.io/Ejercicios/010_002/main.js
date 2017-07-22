
window.onload = function() {
class Persona {
    constructor() {
        this._nombre = generarNombreAleatorio(nombres);
        this._edad = getRandomInteger(20, 60);
    }
}

class Cliente extends Persona {
    constructor() {
        super();
        this._dinero = getRandomInteger(0, 1500);
    }
}

class Camarero extends Persona {
    constructor() {
        super();
        this._cargo = generarCargoAleatorio(cargos);
    }
}

class Mesa {
    constructor(id) {
        this._id = id;
        this._capacidad = getRandomInteger(2, 10);
        this._sentadas = getRandomInteger(0, 10);
        if (this._sentadas > 0) {
            this._disponible = false;
        } else {
            this._disponible = true;
        }

        if (this._sentadas > 0) {
            this._ordenes = getRandomInteger(2, 10);
        } else {
            this._ordenes = 0;;
        }
    }

    getMesa() {
        let lugares = '';
        lugares = lugares + '<div class="mesa ' + this._disponible + ' "  id = "' + this._id + '">';
        lugares = lugares + '<div class="idMesa"> Mesa ' + (this._id + 1) +  ' </div>';
        lugares = lugares + '<div> ' + this._capacidad +  ' </div>';
        lugares = lugares + '<div> ' + this._sentadas +  ' </div>';
        lugares = lugares + '<div> ' + this._ordenes +  ' </div>';
        lugares = lugares + '</div>';

        return lugares;
    }
}

class Producto {
    constructor(existencias, calorias, precio) {
        this._existencias = existencias;
        this._calorias = calorias;
        this._precio = precio;
    }
}

class Bebida extends Producto {
    constructor(existencias, calorias, precio, esAlcoholica, gradosDeAlcohol) {
        super(existencias, calorias, precio);
        this._esAlcoholica = esAlcoholica;
        if (esAlcoholica) {
            this._gradosDeAlcohol = gradosDeAlcohol;
        } else {
            this._gradosDeAlcohol = 0;
        }
    }
}

class Comida extends Producto {
    constructor(existencias, calorias, precio, tipo) {
        super(existencias, calorias, precio);
        this._tipo = tipo;
    }
}

class Restaurante {
    constructor(nombre) {
        this._nombre = nombre;
        this._mesas = [];
        this._camareros = [];
        this._productos = [];
        this.addMesas(30);
        this.addCamareros(5);
    }

    addMesas(numeroMesas) {
        for (var i = 0; i < numeroMesas; i++) {
            this._mesas.push(new Mesa(i));
        }
         this.pintarMesa();
    }

    addCamareros(numeroCamareros) {
        for (var i = 0; i < numeroCamareros; i++) {
            this._camareros.push(new Camarero(i));
        }
    }

    pintarMesa() {

        document.getElementById("restaurante").innerHTML = "";

        let divInner = "";

        for (let i = 0; i < this._mesas.length; i++) {
            let mesa = this._mesas[i];
            divInner = divInner + mesa.getMesa(i);
        }

        document.getElementById("restaurante").innerHTML = divInner;
    }
}



var nombres = ["Victor", "Omar", "Karen", "Ariel", "Omar", "David", "Esteban", "Matías", "Vlairner", "Lucy", "Ignacio", "Humberto", "Néstor", "Daniel", "Raymundo", "Fran"];
var cargos = ["encargado", "mozo"];
//Numero aleatorio 
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Nombre aleatorio
function generarNombreAleatorio(nombres) {
    var numeroAleatorio = Math.floor(Math.random() * nombres.length);
    return nombres[numeroAleatorio];
}

//Cargo aleatorio
function generarCargoAleatorio(cargos) {
    var numeroAleatorio = Math.floor(Math.random() * cargos.length);
    return cargos[numeroAleatorio];
}

var miRestaurante = new Restaurante("Daniel\´s Restaurant");
// var cliente1 = new Cliente();
// // var mesa = new Mesa(0, false, ["Victor", "Omar", "Karen", "Ariel", "Omar"], ["Entrante", "Principal", "Postre"]);
// var comida1 = new Comida(20, 200, 550, "Postre"); //["Entrante", "Principal", "Postre"]
// var bebida1 = new Bebida(15, 130, 1200, false, 30);
// console.log(miRestaurante);
// console.log(cliente1);
// // console.log(mesa);
// console.log(comida1);
// console.log(bebida1);

};