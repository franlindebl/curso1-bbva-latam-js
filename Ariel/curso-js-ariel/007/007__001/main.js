var marcas = ["Victor", "Omar", "karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Nestor", "Daniel", "Raymundo", "Fran"];
var modelos = ["Chile", "Mexico", "España", "Peru", "Francia", "Inglaterra", "Italia"];

function generarMarcaAleatorio() {
    return marcas[Math.floor(Math.random() * marcas.length)];
}

function generarModeloAleatorio() {
    return modelos[Math.floor(Math.random() * modelos.length)];
}

function generarVelocidadAleatoria(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMetrosQueAvanzaCadaSegundo(velocidadEnKmh){
    var metros = velocidadEnKmh*1000/3600;
    return metros;
}

var Vehiculo = function () {
    this.marca = "";
    this.modelo = "";
    this.velocidadMaxima = 0;

}

Vehiculo.prototype.initVehiculo = function () {
    this.marca = generarMarcaAleatorio();
    this.modelo = generarModeloAleatorio();
    this.velocidadMaxima = generarVelocidadAleatoria(100, 200);
}

var Motocicleta = function () {
    this.initVehiculo();
}

Motocicleta.prototype = new Vehiculo();

var Coche = function () {
    this.velocidadPorKm = 0;
    this.initVehiculo();
}

Coche.prototype = new Vehiculo();



var Carrera = function (p1,p2) {
    this.pista = [new Coche (),new Coche ()];
}

Carrera.prototype.iniciarCarrera = function () {
    console.log("** " + this.pista[0].marca + "  " + this.pista[0].modelo + "  " + this.pista[0].velocidadMaxima + "  ***** VS *****  " + this.pista[1].marca + "  " + this.pista[1].modelo + "  " + this.pista[1].velocidadMaxima + " **");

    intervalID = setInterval(ejecutarCiclo, 1000);
}

Carrera.prototype.pintar = function (metros,num) {
    var c = document.getElementById('coche' + num);
    c.style = "left: "+metros/2+"%;";
}

function ejecutarCiclo() {
    console.log("******** Corren ********");
    
    if (carrera.pista[0].velocidadPorKm > 200) {
        console.log("******** GANO P1 ********");
        clearInterval(intervalID);
    } else {
        carrera.pintar(carrera.pista[0].velocidadPorKm,1);
        carrera.pista[0].velocidadPorKm += getMetrosQueAvanzaCadaSegundo(carrera.pista[0].velocidadMaxima);
    }
    if (carrera.pista[1].velocidadPorKm > 200) {
        console.log("******** GANO P2 ********");
        clearInterval(intervalID);
    } else {
        carrera.pintar(carrera.pista[1].velocidadPorKm,2);
        carrera.pista[1].velocidadPorKm += getMetrosQueAvanzaCadaSegundo(carrera.pista[1].velocidadMaxima);
    }
    
}

/*  Iniciar Carrera  */

var carrera = new Carrera();

carrera.iniciarCarrera();

