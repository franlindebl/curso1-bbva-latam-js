/*
Vehiculo
- Velocidad 100 - 200

motocicleta 
Coche

Carrera


1) Modela la clase Vehículo, con las siguientes propiedades:

Marca (aleatorio)
Modelo (aleatorio)
VelocidadMaxima (aleatorio entre 100kmh y 200kmh)
Realiza la clase Motocicleta y Coche que hereden de vehículo
*/

var marcas = ['Mercedes', 'Ferrari', 'Audi', 'Mustang'];
var modelos = ['A1', 'A2', 'A3', 'T1', 'BB'];
var imgVehiculos = ['vehiculo1.png','vehiculo2.png','vehiculo3.png','vehiculo4.png','vehiculo5.png','vehiculo6.png','vehiculo7.png','vehiculo8.png','vehiculo9.png','vehiculo10.png'];

var Vehiculo = function () {
    this._marca = null;
    this._modelo = null;
    this._velocidadMaxima = null;
    this._imagen = null;
};

Vehiculo.prototype.creaVehiculo = function (marca, modelo, velocidadMaxima, imagen) {
    this._marca = marca;
    this._modelo = modelo;
    this._velocidadMaxima = velocidadMaxima;
    this._imagen = imagen;
};

Vehiculo.prototype.creaVehiculoAleatorio = function () {
    this.creaVehiculo(getNombreAleatorio(marcas), getNombreAleatorio(modelos), getRandomInteger(100, 200), getNombreAleatorio(imgVehiculos));
};

var Motocicleta = function () {
};
Motocicleta.prototype = new Vehiculo();

var Coche = function () {
};
Coche.prototype = new Vehiculo();

/*
2) Realiza la clase carrera que recibirá dos vehículos en su consctrucción. 
La clase carrera tendrá el método iniciarCarrera() que hará que los dos vehículos 
compitan.
Una carrera consistirá en ver qué vehículo recorre primero 200 metros. 
Para ser realista deberás hacer que los vehículos avancen cada segundo 
los metros correspondientes.

Ganará el que recorra antes los 200 metros. En caso de llegar a la vez, 
quedarán empatados e irán a penales. 

Naaaaaaaaah, no hay penales. Pero sí que pueden empatar.
*/

var Carrera = function (vehiculo1, vehiculo2) {
    this._vehiculo1 = vehiculo1;
    this._vehiculo2 = vehiculo2;
    this._tamaniopista = 200;
    this._distanciaVehiculo1 = 0;
    this._distanciaVehiculo2 = 0;
    this._iniciarCarrera = false;
};

Carrera.prototype.KMxHaMXS = function (velocidad) {
    return (velocidad * 1000) / 3600;
};

Carrera.prototype.cicloCarrera = function () {
    if (this._iniciarCarrera) {
        // console.log('this._vehiculo1: ', this._vehiculo1);
        this._distanciaVehiculo1 += Math.round(this.KMxHaMXS(this._vehiculo1._velocidadMaxima));
        this._distanciaVehiculo2 += Math.round(this.KMxHaMXS(this._vehiculo2._velocidadMaxima));

        console.info(this._vehiculo1, ' a recorrido: ', this._distanciaVehiculo1);
        console.info(this._vehiculo2, ' a recorrido: ', this._distanciaVehiculo2);

        document.getElementById("vehiculo1").style.left = (this._distanciaVehiculo1 * 5) + "px";
        document.getElementById("vehiculo2").style.left = (this._distanciaVehiculo2 * 5) + "px";

        // alert(pista1);

        //pista1.setAttribute("left",(pista1.getAttribute("left") + (this._distanciaVehiculo1 + 5))+"px");

        if (this._distanciaVehiculo1 >= this._tamaniopista || this._distanciaVehiculo2 >= this._tamaniopista) {
            if (this._distanciaVehiculo1 == this._distanciaVehiculo2) {
                console.warn('La carrera fue un empate');
            } else if (this._distanciaVehiculo1 > this._distanciaVehiculo2) {
                console.warn(this._vehiculo1, ' a ganado !!!');
            } else if (this._distanciaVehiculo1 < this._distanciaVehiculo2) {
                console.warn(this._vehiculo2, ' a ganado !!!');
            }
            this.terminarCarrera();
        }
    }
};

Carrera.prototype.terminarCarrera = function () {
    clearInterval(intervalID);
    this._iniciarCarrera = false;
    console.info('La carrera termino!!!');
};

Carrera.prototype.iniciarCarrera = function () {
    var imgVh1 = document.getElementById("imgVehiculo1");
    var imgVh2 = document.getElementById("imgVehiculo1");

    imgVh1.setAttribute("src", ("./img/vehiculos/"+this._vehiculo1._imagen));
    imgVh2.setAttribute("src", ("./img/vehiculos/"+this._vehiculo2._imagen));
    
    //var vh1 = document.createElement("<div>");
    // var t = document.createTextNode("This is a paragraph");
    //pista1.appendChild(t);                                          // Append the text to <p>
    //document.body.appendChild(para); 

    this._iniciarCarrera = true;
};

var vehiculo1 = new Coche();
vehiculo1.creaVehiculoAleatorio();

var vehiculo2 = new Coche();
vehiculo2.creaVehiculoAleatorio();

var miCarrera = new Carrera(vehiculo1, vehiculo2);

var intervalID = setInterval(function () { miCarrera.cicloCarrera(); }, 500);



window.onload = function() {
  miCarrera.iniciarCarrera();
};