/*
Partiendo del ejercicio anterior... Pinta el restaurante!


1) Realiza una función dentro de Mesa que devuelva el HTML de una mesa. Una mesa puede estar representada por un div con sus datos.

2) Realiza una función dentro de Restaurante que se encargue de pedir a todas las mesas el HTML y pintarlo.

3) Realiza una función dentro de Carta que devuelva un HTML con la tabla de productos y sus existencias.

4) Asocia las funciones anteriores al pintado completo del restaurante.​
*/

let nombre = ["David", "Vlaimer", "Esteban", "Matias", "Omar", "Lucy", "Karen"]
let comida = ["Porotos", "Lentejas", "Garbanzos", "Porotos", "Lentejas", "Garbanzos"];
let bebidaAlcohilica = ["Wiskey", "Pisco", "Tequila"];
let bebidaNoAlcoholica = ["Coca", "Fanta", "Jugo", "H20"];
let cargo = ["Encargado", "Mozo"];
let tipoArray = ["Entrante", "Principal", "Postre"];
let entrante = ["Camaron", "Palmitos", "Esparragos"];
let principal = ["Bifee", "Pure", "Chorrillana"];
let postre = ["Mote", "Helado", "Flan"];

//dato tipo de comida elija 
function tipoAleatorio(tipo) {
    var tipoVar;
    if (tipo == "Entrante") {
        tipoVar = getElementoAleatorio(entrante);
    }

    if (tipo == "Principal") {
        tipoVar = getElementoAleatorio(principal);
    }

    if (tipo == "Postre") {
        tipoVar = getElementoAleatorio(postre);
    }
    return tipoVar;
}

function getElementoAleatorio(elemento) {
    return elemento[Math.floor(Math.random() * (elemento.length))];
}

function getIntRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTrueFalse() {
    return Math.random() >= 0.5;
}


class Persona {
    constructor() {
        this._nombre = getElementoAleatorio(nombre); // random arrya nombre
        this._edad = this.getEdadAleatorio(20, 60); //random entre 20 - 60
    }
    getEdadAleatorio(min, max) {
        let random_edad = Math.floor(Math.random() * (max - min + 1)) + min;
        return random_edad;
    }
}

class Cliente extends Persona {
    constructor(dinero) {
        super();
        this._dinero = this.getDineroAleatorio(0, 1500); // Dinero Random 0 -- 1500
    }
    getDineroAleatorio() {
        let random_dinero = Math.floor(Math.random() * (max - min + 1)) + min;
        return random_dinero;
    }
}

class Camarero extends Persona {
    constructor() {
        super();
        this._cargo = getElementoAleatorio(cargo);
    }
}

class Carta {
    constructor() {
        this.bebidas = this.setBebidas();
        this._comidas = this.setComidas();
    }
    setBebidas(beidas) {


    }
    setComidas(comidas) {

    }
    getRowForTableCarta() {
        let fila = "";
        fila = fila + '<div class="wrapper">';
        fila = fila + '<div class="square"> Mesa ' + this.bebida + '<p>' + this._comida + '</div>';
        fila = fila + '</div>';
        return fila;
    }
}

class Producto {
    constructor(id,
        nombre,
        nroExistencias = getIntRandom(10, 100),
        calorias = getIntRandom(50, 500),
        precio = getIntRandom(5, 100)
    ) {
        this._id = id;
        this._nombre = nombre;
        this._nroExistencias = nroExistencias;
        this._calorias = calorias;
        this._precio = precio;
    }

/*<div class="Table">  
        <div class="Title">  
            <p>  
                Esta es la tabla</p>  
        </div>  
        <div class="Heading">  
            <div class="Cell">  
                <p>  
                    Primer Nombre</p>  
            </div>  
            <div class="Cell">    
                <p>  
                    Segundo Nombre</p>  
            </div>  
  
            <div class="Cell">  
                <p>  
                    Edad</p>  
            </div>  
        </div>  
  
        <div class="Row">  
            <div class="Cell">  
                <p>  
                    Juan</p>  
            </div>  
  
            <div class="Cell">  
                <p>  
                    Escutia</p>  
            </div>  
  
            <div class="Cell">  
                <p>  
                    28</p>  
            </div>  
  
        </div>  
  
        <div class="Row">  
  
            <div class="Cell">  
  
                <p>  
  
                    Pedro</p>  
  
            </div>  
  
            <div class="Cell">  
  
                <p>  
  
                    Infante</p>  
  
            </div>  
  
            <div class="Cell">  
  
                <p>  
  
                    27</p>  
  
            </div>  
  
        </div>  
  
    </div>  */


    getRowForDivProducto() {
        let fila = "";
        fila = fila + '<div class="wrapper">';
        fila = fila + '<div class="square"> id ' + this._id+ '<p>' + this._nombre+ '</div>';
        fila = fila + '</div>';
        return fila;
    }
}

class Bebida extends Producto {
    constructor(id,
        esAlcoholica = getIntRandom(0, 1) == 1 ? true : false,
        gradosAlcohol = esAlcoholica ? getIntRandom(1, 100) : 0,
        nombre = esAlcoholica ? getElementoAleatorio(bebidaAlcohilica) : getElementoAleatorio(bebidaNoAlcoholica)
    ) {
        super(id, nombre);
        this._nombre = nombre;
        this._esAlcoholica = esAlcoholica;
        this._gradosAlcohol = gradosAlcohol;
    }
    getRowForDivBebida() {
        let fila = "";
        fila = fila + '<div class="wrapper">';
        fila = fila + '<div class="square">' + this._nombre+ '<p>  Bebida  ' + this._esAlcoholica + '<p> º Alcohol  ' + this._gradosAlcohol + '</div>';
        fila = fila + '</div>';
        return fila;
    }
}

class Comida extends Producto {
    constructor(id, 
        tipo = getElementoAleatorio(tipoArray),
        nombre = tipoAleatorio(tipo)
    ) {
        super(id, nombre);
        this._nombre = nombre;
        this._tipo = tipo; // Entrante/Principal/Postre 
    }
    getRowForDivComida() {
        let fila = "";
        fila = fila + '<div class="wrapper">';
        fila = fila + '<div class="square">'  + this._nombre + '<p> Tipo ' + this._tipo + '</div>';
        fila = fila + '</div>';
        return fila;
    }
}

class Mesa {
    constructor(id) {
        this._capacidad = getIntRandom(2, 10); //(aleatorio entre 2 y 10)
        this._id = id;
        this._ocupada = getRandomTrueFalse(); // true/false
        this._personasSentadas = []; //personasSentadas;
        this._ordenesRealizadas = []; //ordenesRealizadas;
    }
    getRowForTableMesa() {
        let fila = "";
        fila = fila + '<div class="wrapper">';
        fila = fila + '<div class="square"> Mesa ' + this._id + '<p>' + this._capacidad + '<p>' + this._ocupada + '</div>';
        fila = fila + '</div>';
        return fila;
    }
}

class Restaurante {
    constructor(nombre) {
        this._nombre = nombre;
        this._mesas = [];
        this._camareros = [];
        this._productos = [];
        this._idsProductos = 0;
        this._idsMesas = 0;
        this._cartas = null;

    }
    getMesas(nroMesas) {
        for (let i = 0; i < nroMesas; i++) {
            let id = this._idsMesas;
            this._idsMesas++;
            let mesa = new Mesa(id);
            this._mesas.push(mesa);
        }
    }
    getCamareros(nroCamareros) {
        for (let i = 0; i < nroCamareros; i++) {
            let camarero = new Camarero();
            this._camareros.push(camarero);
        }

    }
    getProductos(nroBebidas, nroComidas) {
        for (let i = 0; i < nroBebidas; i++) {
            let id = this._idsProductos;
            this._idsProductos++;
            let bebida = new Bebida(id)
            this._productos.push(bebida)
        }

        for (let i = 0; i < nroComidas; i++) {
            let id = this._idsProductos;
            this._idsProductos++;
            let comida = new Comida(id);
            this._productos.push(comida);
        }
    }

    pintarCarta() {
        document.getElementById("tbodyCartas").innerHTML = "";
        let tbodyInner = "";
        /*fila='<div class="Table">';  
        fila = filas + '<div class="Title">'; */ 

        for (let i = 0; i < this._productos.length; i++) {
            let producto = this._productos[i];
            if (producto instanceof Bebida) {
                tbodyInner = tbodyInner + producto.getRowForDivBebida();
            }
            if (producto instanceof Comida) {
                tbodyInner = tbodyInner + producto.getRowForDivComida();
            }
        }
        /*fila='</div>';  
        fila = filas + '</div>';  */

        document.getElementById("tbodyCartas").innerHTML = tbodyInner;
    }

    pintarMesa() {
        document.getElementById("tbodyMesas").innerHTML = "";
        let tbodyInner = "";

        for (let i = 0; i < this._mesas.length; i++) {
            let mesa = this._mesas[i];
            tbodyInner = tbodyInner + mesa.getRowForTableMesa(i);
        }
        document.getElementById("tbodyMesas").innerHTML = tbodyInner;
    }

    inciarRestaurant(nroMesas, nroCamareros, nroBebidas, nroComidas) {
        this.getMesas(nroMesas);
        this.getCamareros(nroCamareros);
        this.getProductos(nroBebidas, nroComidas);
        this.pintarMesa();
        this.pintarCarta();
    }
}

var restarurante;

window.onload = function() {
    var restaurante = new Restaurante("ComoPoco");
    restaurante.inciarRestaurant(30, 5, 5, 5);
    console.log(restaurante);
    restaurante.inciarRestaurant
}
