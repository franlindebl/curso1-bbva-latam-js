var marcas = ['volvo', 'saab', 'mercedes', 'audi'];
var modelos = ['A1', 'A2', 'A3', 'T1', 'BB'];
var imgVehiculos = ['vehiculo1.png', 'vehiculo2.png', 'vehiculo3.png', 'vehiculo4.png', 'vehiculo5.png', 'vehiculo6.png'];

var Vehiculo = function () {
    this._idVehiculo = null;
    this._marca = null;
    this._modelo = null;
    this._velocidadMaxima = null;
    this._imagen = null;
    this._distanciaRecorrida = 0;
};

Vehiculo.prototype.creaVehiculo = function (idVehiculo, marca, modelo, velocidadMaxima, imagen) {
    this._idVehiculo = idVehiculo;
    this._marca = marca;
    this._modelo = modelo;
    this._velocidadMaxima = velocidadMaxima;
    this._imagen = imagen;
};

var Carrera = function () {
    this._tamaniopista = 200;
    this._vehiculos = [];
};

Carrera.prototype.KMxHaMXS = function (velocidad) {
    return (velocidad * 1000) / 3600;
};

Carrera.prototype.cicloCarrera = function () {
    // Calcular distancia recorrida todos los vehiculos
    for (var v = 0; v < this._vehiculos.length; v++) {
        this._vehiculos[v]._distanciaRecorrida += Math.round(this.KMxHaMXS(this._vehiculos[v]._velocidadMaxima));
        console.info(this._vehiculos[v]);
        document.getElementById(this._vehiculos[v]._idVehiculo).style.transform = "translate("+(this._vehiculos[v]._distanciaRecorrida * 5)+"px)";

        // console.log(document.getElementById(this._vehiculos[v]._idVehiculo));
    }

    this._vehiculos.sort(function (a, b) {
        if (a._distanciaRecorrida > b._distanciaRecorrida) {
            return 1;
        }
        if (a._distanciaRecorrida < b._distanciaRecorrida) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

    if (this._vehiculos[this._vehiculos.length - 1]._distanciaRecorrida >= this._tamaniopista) {
        console.info("El vehiculo: ", this._vehiculos[this._vehiculos.length - 1], ' a ganado !!!');
        this.terminarCarrera();
    }
};

Carrera.prototype.terminarCarrera = function () {
    clearInterval(intervalID);
    console.info('La carrera termino!!!');
};

Carrera.prototype.iniciarCarrera = function () {
    var imgVh1 = document.getElementById("imgVehiculo1");
    var imgVh2 = document.getElementById("imgVehiculo1");

    intervalID = setInterval(function () { miCarrera.cicloCarrera(); }, 1000);
};

function addElement() {
    var newDiv = document.createElement("div");
    var newContent = document.createTextNode("Hola!¿Qué tal?");
    newDiv.appendChild(newContent); //añade texto al div creado. 

    // añade el elemento creado y su contenido al DOM 
    var currentDiv = document.getElementById("div1");
    document.body.insertBefore(newDiv, currentDiv);
}

Carrera.prototype.agregarVehiculo = function () {
    var marca = obtenTextSelect("marca");
    var modelo = obtenTextSelect("modelo");
    var velocidadMaxima = obtenValueInput("velocidadMaxima");
    var imagen = obtenTextSelect("imagen");
    var idVehiculo = marca + modelo + velocidadMaxima + getRandomInteger(0, 1000);

    var vehiculo = new Vehiculo();
    vehiculo.creaVehiculo(idVehiculo, marca, modelo, velocidadMaxima, imagen);
    this._vehiculos.push(vehiculo);

    var clonVehiculo = document.getElementById("vehiculo").cloneNode(true);
    var pista = document.getElementById("pista");
    pista.style.height = (this._vehiculos.length * 80) + "px";
    document.getElementById("meta").style.height = (this._vehiculos.length * 80) + "px";

    clonVehiculo.id = this._vehiculos[this._vehiculos.length - 1]._idVehiculo;
    clonVehiculo.style.display = "block";
    clonVehiculo.getElementsByTagName("img")[0].src = "./img/vehiculos/"+this._vehiculos[this._vehiculos.length - 1]._imagen;

    pista.appendChild(clonVehiculo);

    console.log(this);
}

var intervalID = null;

window.onload = function () {
    // Agregando elementos a combo marca
    cargaSelect(marcas, "marca");
    cargaSelect(modelos, "modelo");
    cargaSelect(imgVehiculos, "imagen");
};

var miCarrera = new Carrera();