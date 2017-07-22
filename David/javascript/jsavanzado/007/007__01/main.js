//velocidad en 0-90
var vehiculos = ["", ""];

var Vehiculo = function(idvehiculo, velocidad){
	this.id = idvehiculo;
	this.marca = "";
	this.modelo = "";
	this.velocidad = velocidad;
	this.icon = "";
	this.posicion= 0;
}

var Coche = function(){
}

var Motocicleta = function(){
}

var Carrera = function(vehiculo1, vehiculo2){
	this.vahiculoA = vehiculo1;
	this.vahiculoB = vehiculo2;

}
Carrera.prototype.iniciarCarrera = function() {
		pintaHtml(this.vahiculoA);
		pintaHtml(this.vahiculoB);
};

function getMetrosQueAvanzaCadaSegundo(velocidadEnKmh){
    var metros = velocidadEnKmh*1000/3600;
    return metros;
}

function finCarrera(){
	    clearInterval(intervalID);
}

 function getRandomInteger(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

var velocidad_a = getRandomInteger(100, 200);
var velocidad_b = getRandomInteger(100, 200);

var vehiculo_a = "vehiculo" + getRandomInteger(1, 2);
var vehiculo_b = "vehiculo" + getRandomInteger(1, 2);


var coche1 = new Vehiculo(vehiculo_a, velocidad_a);
var coche2 = new Vehiculo(vehiculo_b, velocidad_b);


var carrea = new Carrera(coche1, coche2)


function inicioCarrera(){
		intervalID = setInterval(function(){carrea.iniciarCarrera()}, 100);
}

//vehiculo_a  vehiculo_b
function pintaHtml(vehiculo){
	console.log("vehiculo : " + vehiculo.id + " velocidad : "+ vehiculo.velocidad)
	var x = document.getElementById(vehiculo.id); 
	x.style = "left: " + vehiculo.posicion + "px;"; 
	vehiculo.posicion += getMetrosQueAvanzaCadaSegundo(vehiculo.velocidad);
	if(vehiculo.posicion >= 950){
		finCarrera();
		console.log("ganador " + vehiculo.id)
		if (vehiculo.id==="vehiculo1"){
		    var x = document.getElementById("ganador1"); 
		}else{
		    var x = document.getElementById("ganador2"); 

		}
 	     x.style = "display: block";		
	}
}


window.onload = inicioCarrera;

