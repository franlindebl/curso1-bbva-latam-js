/*
Vamos a hacer un restaurante:

1) Modela la clase persona (haz uso de clases de ES6). Haz que las clases Cliente y Camarero hereden de Persona.
Una Persona deberá tener:

- Nombre (Generar aleatorio)
- Edad (Aleatorio entre 20 y 60)

Un Camarero deberá tener:

- Cargo (Aleatorio: encargado/mozo)

Un Cliente deberá tener: 

- Dinero (Aleatorio: entre 0 y 1500)

2) Modela la clase Mesa que deberá tener:

- Capacidad (aleatorio entre 2 y 10)
- Un ID
- Un booleano ocupada: true/false
- Un array de personas que estén sentadas
- Un array de órdenes realizadas (ya crearemos las órdenes después)

3) Modela una clase Producto que tendrá:
- id
- Número de existencias
- Calorías
- Precio

La clase Bebida y la clase Comida heredarán de Producto. 

Bebida tendrá:

- Booleano esAlcoholica: true/false
- Grados de alcohol random 0-100

Comida tendrá:

Tipo: Entrante/Principal/Postre

4) Modela la clase Restaurante que deberá tener:

- Nombre
- Array de mesas (30 mesas)
- Array de camareros (5 camareros)
- Carta de productos (Al menos 5 bebidas y 5 Comidas)


5) Crea una instancia de Restaurante y comprueba que contiene todo lo necesario.*/

let nombre = ["David", "Vlaimer", "Esteban", "Matias", "Omar", "Lucy", "Karen"]
let comida = ["Porotos", "Lentejas", "Garbanzos", "Porotos", "Lentejas", "Garbanzos"];
let bebidaAlcohilica = ["Wiskey", "Pisco", "Tequila"];
let bebidaNoAlcoholica = ["Coca", "Fanta", "Jugo", "H20"];
let cargo = ["Encargado", "Mozo"];
let tipoArray = ["Entrante", "Principal", "Postre"];
let entrante = ["Camaron", "Palmitos", "Esparragos"];
let principal = ["Bifee", "Pure", "Chorrillana"];
let postre = ["Mote", "Helado", ""];

//dato tipo de comida elija 
function tipoAleatorio(tipo){
    var tipoVar;
    if (tipo=="Entrante"){
         tipoVar = getElementoAleatorio(entrante);
    }

    if (tipo=="Principal"){
         tipoVar = getElementoAleatorio(principal);
    }

    if (tipo=="Postre"){
         tipoVar = getElementoAleatorio(postre);
    }
    return tipoVar;
}

function getElementoAleatorio(elemento){
    return elemento[Math.floor(Math.random() * (elemento.length))];
}

function getIntRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTrueFalse(){
        return Math.random() >= 0.5;  
}


class Persona{
    constructor(){
        this._nombre = getElementoAleatorio(nombre); // random arrya nombre
        this._edad = this.getEdadAleatorio(20, 60); //random entre 20 - 60
    }
    getEdadAleatorio(min, max){
        let random_edad = Math.floor(Math.random() * (max - min + 1)) + min;
        return random_edad;
    }
}

class Cliente extends Persona{
    constructor(dinero){
        super();
        this._dinero = this.getDineroAleatorio(0, 1500); // Dinero Random 0 -- 1500
    } 
    getDineroAleatorio(){
        let random_dinero = Math.floor(Math.random() * (max - min + 1)) + min;
        return random_dinero;    
    } 
}

class Camarero extends Persona{
   constructor(){
        super();
        this._cargo = getElementoAleatorio(cargo);
   } 
}

class Carta{
    constructor(comida, bebida){
        this._comida = comida;
        this.bebida = bebida;
    }
}

class Producto{
    constructor(id, nombre,  nroExistencias=getIntRandom(10, 100), calorias=getIntRandom(50, 500), precio=getIntRandom(5, 100)){
        this._id = id;
        this._nroExistencias = nroExistencias;
        this._calorias = calorias;
        this._precio = precio;
        this._nombre = nombre;
    }
}

class Bebida extends Producto{
    constructor(id, esAlcoholica = getIntRandom(0, 1)==1 ?  true:false, gradosAlcohol = esAlcoholica? getIntRandom(1, 100): 0,  nombre=esAlcoholica? getElementoAleatorio(bebidaAlcohilica): getElementoAleatorio(bebidaNoAlcoholica)){
        super(id, nombre);
        this._esAlcoholica = esAlcoholica;
        this._gradosAlcohol = gradosAlcohol;

    }
}

class Comida extends Producto{
    constructor(id, tipo =  getElementoAleatorio(tipoArray), nombre = tipoAleatorio(tipo)){
        super(id, nombre);
        this._tipo = tipo; // Entrante/Principal/Postre 
    }
}

class Mesa{
    constructor(id){
        this._capacidad = getIntRandom(2, 10); //(aleatorio entre 2 y 10)
        this._id = id;
        this._ocupada = getRandomTrueFalse(); // true/false
        this._personasSentadas =  []; //personasSentadas;
        this._ordenesRealizadas = []; //ordenesRealizadas;
    }

}

class Restaurante{
    constructor(nombre){
        this._nombre = nombre;
        this._mesas = [];
        this._camareros = [];
        this._productos = [];
        this._idsProductos = 0; 
        this._idsMesas = 0; 

    }
    getMesas(nroMesas){
        for (let i = 0; i < nroMesas; i++) {
            let id = this._idsMesas;
            this._idsMesas++;
            let mesa = new Mesa(id);     
            this._mesas.push(mesa); 
            //this.pintarMesas();
        }
    }
    getCamareros(nroCamareros){
        for (let i = 0 ; i < nroCamareros; i++) {
             let camarero = new Camarero();
             this._camareros.push(camarero);
        }

    }
    getProductos(nroBebidas, nroComidas){
        for (let i = 0 ; i < nroBebidas; i++) {
            let id = this._idsProductos;
            this._idsProductos++;          
            let bebida = new Bebida(id)
            this._productos.push(bebida) 
        }

        for (let i = 0 ; i < nroComidas; i++) {
            let id = this._idsProductos;
            this._idsProductos++;             
            let comida = new Comida(id);
            this._productos.push(comida);
            //this.pintarProductos();
        }
    }

    inciarRestaurant(nroMesas, nroCamareros, nroBebidas, nroComidas){
        this.getMesas(nroMesas);
        this.getCamareros(nroCamareros);
        this.getProductos(nroBebidas, nroComidas); 
    }
}


var restaurante = new Restaurante("ComoPoco");
restaurante.inciarRestaurant(30, 5, 5, 5);
console.log(restaurante);



