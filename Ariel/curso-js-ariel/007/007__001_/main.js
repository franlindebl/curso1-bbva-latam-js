var marcas = ["Victor", "Omar", "karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Nestor", "Daniel", "Raymundo", "Fran"];
var modelos = ["Chile", "Mexico", "España", "Peru", "Francia", "Inglaterra", "Italia"];
var vehiculos = ["vehiculo1", "vehiculo2","vehiculo3"];

window.onload = function mostrarSelect() {
    var marca = document.getElementById('marca');
    for (var i = 0; i < marcas.length; i++) {
        var ele1 = document.createElement('option');
        ele1.text = marcas[i];
        ele1.value = marcas[i];
        marca.add(ele1);
    }

    var modelo = document.getElementById('modelo');
    for (var a = 0; a < modelos.length; a++) {
        var ele2 = document.createElement('option');
        ele2.text = modelos[a];
        ele2.value = modelos[a];
        modelo.add(ele2);
    }

    var vehiculo = document.getElementById('vehiculo');
    for (var b = 0; b < vehiculos.length; b++) {
        var ele3 = document.createElement('option');
        ele3.text = vehiculos[b];
        ele3.value = vehiculos[b];
        vehiculo.add(ele3);
    }
}

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
    var metros = velocidadEnKmh*30/3600;
    return metros;
}

var Vehiculo = function () {
    this.marca = "";
    this.modelo = "";
    this.velocidadMaxima = 0;

}

Vehiculo.prototype.initVehiculo = function (marca,modelo,velocidad) {
    this.marca = marca;
    this.modelo = modelo;
    this.velocidadMaxima = velocidad;
}

var Coche = function (marca,modelo,velocidad,imagen) {
    this.imagen = imagen;
    this.velocidadPorKm = 0;
    this.initVehiculo(marca,modelo,velocidad);
}

Coche.prototype = new Vehiculo();

var Carrera = function () {
    this.pista = [];
}

Carrera.prototype.iniciarCarrera = function (event) {
    event.stopPropagation();
    console.log("** " + this.pista[0].marca + "  " + this.pista[0].modelo + "  " + this.pista[0].velocidadMaxima + "  ***** VS *****  " + this.pista[1].marca + "  " + this.pista[1].modelo + "  " + this.pista[1].velocidadMaxima + " **");

    intervalID = setInterval(ejecutarCiclo, 30);
}

Carrera.prototype.pintar = function (metros,num) {
    var c = document.getElementById('coche' + num);
    c.style = "left: "+metros/2+"%;";
}

Carrera.prototype.addCarro = function (event) {
    event.stopPropagation();

    var ma = document.getElementById('marca').value;
    var mo = document.getElementById('modelo').value;
    var vel = Number(document.getElementById('velocidad').value);
    var veh = document.getElementById('vehiculo').value;


    // var ma = document.getElementById('carril' + this.cont);
    // marca.add();
    var c = new Coche(ma,mo,vel,veh);
    this.pista.push(c);

    var cont = document.getElementById('contenedor');

    var newEle = document.createElement('section');

    newEle.id = "carril"+this.pista.length;
    newEle.class = "carril";

    var newContent = document.createElement(img); 
    
    newEle.appendChild(newContent); //añade texto al div creado. 

    // añade el elemento creado y su contenido al DOM 
    var currentDiv = document.getElementById("div1"); 
    document.body.insertBefore(newEle, currentDiv); 

}

function ejecutarCiclo() {
    console.log("******** Corren ********");
    for (var i = 0; i < carrera.pista.length; i++) {
    if (carrera.pista[i].velocidadPorKm > 200) {
        console.log("******** GANO P1 ********");
        clearInterval(intervalID);
    } else {
        carrera.pintar(carrera.pista[i].velocidadPorKm,i);
        carrera.pista[i].velocidadPorKm += getMetrosQueAvanzaCadaSegundo(carrera.pista[i].velocidadMaxima);
    }
}
}

/*  Iniciar Carrera  */
var carrera = new Carrera();

