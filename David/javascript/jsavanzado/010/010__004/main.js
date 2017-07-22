/*

*/

let nombre = ["David", "Vlaimer", "Esteban", "Matias", "Omar", "Lucy", "Karen"]
let cliente = ["Varela", "Moreno", "Perez", "Sanchez", "Medel", "Rojas", "Cisternas"]
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
        this._edad = getIntRandom(20, 60); //random entre 20 - 60
    }
}

class Cliente extends Persona {
    constructor(dinero) {
        super();
        this._dinero = getIntRandom(0, 1500); // Dinero Random 0 -- 1500
    }
}

class Camarero extends Persona {
    constructor(nroCamareros) {
        super();
        this._cargo = getElementoAleatorio(cargo);
        this._camareros = [];
        this.setCamareros(nroCamareros);
    }
    setCamareros(nroCamareros) {
        for (let i = 0; i < nroCamareros; i++) {
            let camarero = new Camarero();
            this._camareros.push(camarero);
        }
    }
}

class Carta{
    constructor(nroBebidas, nroComidas) {
        this._bebidas = [];
        this._comidas = [];
        this._idsProductos=0;
        this.setProductos(nroBebidas, nroComidas);
    }

    setProductos(nroBebidas, nroComidas) {
        for (let i = 0; i < nroBebidas; i++) {
            let id = this._idsProductos;
            this._idsProductos++;
            let bebida = new Bebida(id)
            this._bebidas.push(bebida)
        }

        for (let i = 0; i < nroComidas; i++) {
            let id = this._idsProductos;
            this._idsProductos++;
            let comida = new Comida(id);
            this._comidas.push(comida);
        }
    }

    pintarCarta(){
        document.getElementById("tbodyCartas").innerHTML = "";
        let tbodyInner = "";

        for (let i = 0; i < this._bebidas.length; i++) {
            let bebida = this._bebidas[i];
                tbodyInner = tbodyInner + bebida.getRowForDivBebida();
        }

        for (let i = 0; i < this._comidas.length; i++) {
            let comida = this._comidas[i];
                tbodyInner = tbodyInner + comida.getRowForDivComida();
        }

        document.getElementById("tbodyCartas").innerHTML = tbodyInner;
    }
}

class Producto{
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

    getRowForDivProducto() {
        let fila = "";
        fila = fila + '<div class="wrapper">';
        fila = fila + '<div class="square squarePorcentajeProductos"> id ' + this._id + '<p>' + this._nombre + '<p>' + this._calorias + '<p>$' + this._precio + '</div>';
        fila = fila + '</div>';
        return fila;
    }
}

class Bebida extends Producto{
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
        fila = fila + '<div class="square squarePorcentajeProductos">' + this._nombre + '<p>  Bebida  ' + this._esAlcoholica + '<p>' + this._gradosAlcohol + 'º</div>';
        fila = fila + '</div>';
        return fila;
    }
}

class Comida extends Producto{
    constructor(id,
        tipo = getElementoAleatorio(tipoArray),
        nombre = tipoAleatorio(tipo)
    ) {
        super(id, nombre);
        this._nombre = nombre;
        this._tipo = tipo; // Entrante/Principal/Postre 
    }
    getRowForDivComida(){
        let fila = "";
        fila = fila + '<div class="wrapper">';
        fila = fila + '<div class="square">' +  this._nombre + '<p>' + this._tipo +'<p>Kcal ' + this._calorias + '<p>$' + this._precio + '</div>';
        fila = fila + '</div>';
        return fila;
    }
}

class Mesa{
    constructor(nroMesas){
        this._capacidad = getIntRandom(2, 10); //(aleatorio entre 2 y 10)
        this._id = 0;
        this._ocupada = getRandomTrueFalse(); // true/false
        this._personasSentadas = []; //personasSentadas;
        this._ordenesRealizadas = []; //ordenesRealizadas;
        this._mesas = [];
        this.setMesas(nroMesas);
    }
    getRowForTableMesa(){
        let fila = "";
        fila = fila + '<div class="wrapper">';
        fila = fila + '<div class="square squarePorcentajeMesa"> Mesa ' + this._id + '<p>' + this._capacidad + '<p>' + this._ocupada + '</div>';
        fila = fila + '</div>';
        return fila;
    }
    setMesas(nroMesas){
        for (let i = 0; i < nroMesas; i++) {
            let id = this._idsMesas;
            this._idsMesas++;
            let mesa = new Mesa(id);
            this._mesas.push(mesa);
        }
    }
    pintarMesa(){
        document.getElementById("tbodyMesas").innerHTML = "";
        let tbodyInner = "";

        for (let i = 0; i < this._mesas.length; i++) {
            let mesa = this._mesas[i];
            tbodyInner = tbodyInner + mesa.getRowForTableMesa(i);
        }
        document.getElementById("tbodyMesas").innerHTML = tbodyInner;
    }

}
class Recepcion{
    constructor(){
        this._gruposPersonas = [];

    }
    addGrupo(){
        this.setClientesAleatorio();
    }
    setClientesAleatorio(){
        let grupoPersonas = new GrupoPersonas();
        for (let i = 0; i < getIntRandom(1, 20); i++) {
            grupoPersonas._clientes.push(new Cliente());
        }
        this._gruposPersonas.push(grupoPersonas);  
    }
    pintarRacepcion(){
        document.getElementById("recepcion").innerHTML = "";
        let tbodyInner = "";

        for (let i = 0; i < this._gruposPersonas.length; i++) {
            let grupoPersonas = this._gruposPersonas[i];
            tbodyInner = tbodyInner + grupoPersonas.getRowForTableRecepcion(i);
        }
        document.getElementById("recepcion").innerHTML = tbodyInner;
    }
}

class GrupoPersonas{
    constructor(){
        this._clientes = [];
    }

    getRowForTableRecepcion(){
        let fila = "";
        fila = fila + '<div class="wrapper">';
        fila = fila + '<div class="square squarePorcentajeMesa"> Grupo ' + this._clientes.length +'</div>';
        fila = fila + '</div>';
        return fila;
    }
}

class Restaurante{
    constructor(nombre) {
        this._nombre = nombre;
        this._idsMesas = 0;
        this._carta = new Carta(5, 5);
        this._mesa = new Mesa(30);
        this._camarero = new Camarero(5);
        this._recepcion = new Recepcion();
        this.pintarEstructuraPrincipalConBotones()
    }
    pintarEstructuraPrincipalConBotones(){
        document.getElementById("estructura").innerHTML = "";
        var  header = document.getElementById("header");

        let fila = "";
        fila = fila + '<div id="header" class="header"></div>';
        fila = fila + '<div><div class="columna-izq columna"><div id="tbodyCartas"></div></div>';
        fila = fila + '<div class="columna-der columna"> <div id="tbodyMesas"></div> </div><div>';
        fila = fila + '<div id="recepcion" class="footer">Recepcion</div>';

        return document.getElementById("estructura").innerHTML = fila;    
    }
    pintarBoton(){
        document.getElementById("header").innerHTML = "";
        var nuevoBoton = document.createElement('button');
        nuevoBoton.id =  'anadir';
        nuevoBoton.type = 'button';
        nuevoBoton.textContent = 'Añadir Cliente !!!';
        nuevoBoton.onclick =  () => this._recepcion.addGrupo();
        header.appendChild(nuevoBoton);

        var botonRecibirEnMesas = document.createElement('button');
        botonRecibirEnMesas.id =  'anadir';
        botonRecibirEnMesas.type = 'button';
        botonRecibirEnMesas.textContent = 'Acomodar en Mesas !!!';
        botonRecibirEnMesas.onclick =  () => this._recepcion.addGrupo();
        header.appendChild(botonRecibirEnMesas);
    }

    sentarPersonas(){
        for (let i =  0; i < this._mesa.length; i++) {
            if(!this._mesa._ocupada){
                for (let i =  0; i < this._recepcion.length; i++) {
                    
                    /*if (this._recepcion <= this._mesa._ocupada){

                    }*/
                }
            }
        }
    }

    iniciarIntervalo() {
        window.setInterval(() => this.ejecutarCiclo(), 2000);
    }

    ejecutarCiclo() {
        this.pintar();
    }

    pintar() {
        this._carta.pintarCarta();
        this._mesa.pintarMesa();
        this.pintarBoton()
        this._recepcion.pintarRacepcion();

    }
}

let miRestaurante = null;
window.onload = () =>{
    var miRestaurante = new Restaurante();
    console.log(miRestaurante);
    miRestaurante.iniciarIntervalo();
}
