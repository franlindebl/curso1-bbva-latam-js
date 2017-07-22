// clase vehiculo tendran velocidad entre 0 y 200 
// heredan motos y coches
// clase carrera - > instancia que recibe 2 autos

function start() {
    var setInervalID = setInterval(function() { ejecutarCiclo(bikerExtreme, rider666) }, 50);
}

function Vehiculo(name, marca, modelo) {

    this.name = name;
    this.marca = marca;
    this.modelo = modelo;
    this.velocidad = 0;
    this.metrosAvanzados = 0;
}

function Carrera(vehiculo1, vehiculo2) {

}

function ejecutarCiclo(vehiculo1, vehiculo2) {
    var distanciaAuto1 = getDistanciaRecorrida(getRandomInteger(50, 200));
    var distanciaAuto2 = getDistanciaRecorrida(getRandomInteger(50, 200));

    vehiculo1.metrosAvanzados = vehiculo1.metrosAvanzados + distanciaAuto1;
    // console.log("Auto 1 " + metrosAvanzadosAuto1);
    vehiculo2.metrosAvanzados = vehiculo2.metrosAvanzados + distanciaAuto2;
    // console.log("Auto 2 " + metrosAvanzadosAuto2);

    if (vehiculo1.metrosAvanzados > 2000) {
        console.log("Gano " + vehiculo1.name);
        finish();
    } else {
        if (vehiculo2.metrosAvanzados > 2000) {
            console.log("Gano " + vehiculo2.name);
            finish();
        } else {
            if (vehiculo1.metrosAvanzados == vehiculo2.metrosAvanzados) {
                console.log("Empate");
            }
        }
    }
    pintarCarrera(vehiculo1.metrosAvanzados, vehiculo2.metrosAvanzados);
}

function pintarCarrera(metrosAvanzadosAuto1, metrosAvanzadosAuto2) {
    var x = document.getElementById("rider666").style.left = metrosAvanzadosAuto1 / 2 + "px";
    var y = document.getElementById("bikerExtreme").style.left = metrosAvanzadosAuto2 / 2 + "px";

}

// Finaliza carrera
function finish() {
    clearInterval(setInervalID);
    console.log("Carrera terminada");
}

function Auto(idAuto) {
    this.idAuto = idAuto;
}

function Moto(idMoto) {
    this.idMoto = idMoto;
}

Auto.prototype = new Vehiculo();
Moto.prototype = new Vehiculo();

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var marcas = ["Audi", "BMW", "Chevrolet", "Dodge", "Fiat", "Ford", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Mazda", "MercedesBenz", "MINI", "Nissan", "Peugeot", "Porsche", "RAM", "Renault", "SEAT", "Subaru", "Suzuki", "Toyota", "Volkswagen", "Volvo"];
var modelos = ["90", "70", "780", "95", "2000", "2017"];

// var rider666 = new Vehiculo("rider666",  mdeloSeleccionado, generarModelosAleatorio(modelos));
// var bikerExtreme = new Vehiculo("bikerExtreme", generarMarcasAleatorio(marcas), generarModelosAleatorio(modelos));

function generarMarcasAleatorio(marcas) {
    var marcaAleatoria = Math.floor(Math.random() * marcas.length);
    return marcas[marcaAleatoria];
}

//Modelos Aleatorios
function generarModelosAleatorio(modelos) {
    var modeloAleatorio = Math.floor(Math.random() * modelos.length);
    return modelos[modeloAleatorio];
}

//Numero aleatorio 
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Calcula metros avanzados
function getDistanciaRecorrida(velocidad) {
    var metrosRecorridos = velocidad * 1000 / 3600;
    return metrosRecorridos;
}



function obtenerSeleccion() {
    var modeloSeleccionado = document.getElementById("modelo").value;
    var marcaSelecionada = document.getElementById("marca").value;
     var rider666 = new Vehiculo("rider666", marcaSelecionada, modeloSeleccionado);
     var bikerExtreme = new Vehiculo("bikerExtreme", generarMarcasAleatorio(marcas), generarModelosAleatorio(modelos));

    console.log(modeloSeleccionado);
    console.log(marcaSelecionada);
}

window.onload = function() {
    var options = '';
    var options2 = '';
    for (var i = 0; i < marcas.length; i++) {
        options += '<option id=' + marcas[i] + ' value=' + marcas[i] + ' />';
        document.getElementById('marca').innerHTML = options;
    }
    for (var i = 0; i < marcas.length; i++) {
        document.getElementById(marcas[i]).innerHTML = marcas[i];
    }

    for (var j = 0; j < modelos.length; j++) {
        options2 += '<option id=' + modelos[j] + ' value=' + modelos[j] + ' />';
        document.getElementById('modelo').innerHTML = options2;
    }
    for (var j = 0; j < modelos.length; j++) {
        document.getElementById(modelos[j]).innerHTML = modelos[j];
    }
}


