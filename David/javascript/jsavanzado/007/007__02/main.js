/*
Ejercicio 007__002

Partiendo del ejercicio anterior...

En primer lugar vamos a olvidar la parte de Motocicleta: usaremos directamente la clase Coche. Puedes eliminar las imágenes de las motocicletas.

Realiza un formulario para recoger los datos de un vehículo. Añade al formulario un botón añadir que creará un nuevo vehículo a partir de los datos del formulario y lo añadirá a nuestro objeto carrera.

El formulario tendrá:
3 selects: Marca, Modelo, Imagen. 
1 input: VelocidadMaxima
2 Botones: AñadirVehículo e IniciarCarrera

Haz que se puedan añadir tantos vehículos como se deseen (no solo dos).

Añade un botón IniciarCarrera que hará que la carrera comience y se muevan todos los vehículos que se hayan añadido previamente. 
*/
var vehiculos = [];
var marca = ["Audi", "Jeep", "BMW", "Meche"];
var modelo = ["deportivo","Familiar","sedan", "4 Personas", "1000 Personas"];
var imagen = ["vehiculo1.png", "vehiculo2.png", "vehiculo3.png", "vehiculo4.png", "vehiculo5.png"];
var datos = [];
var carrera = [];

var Vehiculo = function(varMarca, varModelo, varMaxima, varImagen){
	this.marca = varMarca;
	this.modelo = varModelo;
	this.velocidad = 100;
	this.posicion= 0;
	this.velocidadmaxima = varMaxima;
	this.imagen = varImagen;
}

var Coche = function(){
}

var Carrera = function(vehiculo){//vehiculo1, vehiculo2){
	this.vehiculo = vehiculo;
	//this.vahiculoB = vehiculo2;

}
Carrera.prototype.iniciarCarrera = function() {
	console.log(this.vehiculo);
		//pintaHtml(this.vehiculo);
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

function cargaSelect(){
	selectMarca();
	selectModelo();
	selectImagen();
}



function inicioCarrera(){
    intervalID = setInterval(function(){carrea.iniciarCarrera()}, 100);
}

function selectMarca(){
	var x = document.getElementById("marca");
	for (var i = 0; i < marca.length; i ++) {
		var option = document.createElement("option");
		option.text = marca[i];
		//console.log("marca : option.text -->" + option.text)
		x.add(option);
	}
}

function selectModelo(){
	var x = document.getElementById("modelo");
	for (var i = 0; i < modelo.length; i ++) {
		var option = document.createElement("option");
		option.text = modelo[i];
		//console.log("marca : option.text -->" + option.text)
		x.add(option);
	}	
}

function selectImagen(){
	var x = document.getElementById("imagen");
	for (var i = 0; i < imagen.length; i ++) {
		var option = document.createElement("option");
		option.text = imagen[i];
		//console.log("marca : option.text -->" + option.text)
		x.add(option);	
	}	
}

//vehiculo_a  vehiculo_b
function pintaHtml(vehiculo){
	console.log("vehiculo : " + vehiculo.id + " velocidad : "+ vehiculo.velocidad)
	var x = document.getElementById(vehiculo.id); 
	vehiculo.style = "left: " + vehiculo.posicion + "px;"; 
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

function btnEditar_Click(event) {
    txtMarca.value = this.elemento.marca;
    txtModelo.value = this.elemento.modelo;
    txtImagen.value = this.elemento.imagen;
}

function btnAgregar(event) {
	/*var combo = document.getElementById("marca").value;
	alert(combo);*/

	var tablaElementos = document.getElementById('tabla-elementos');
	var tablaVehiculos = document.getElementById('tabla-vehiculos');

	var txtMarca = document.getElementById('marca').value;
	var txtModelo = document.getElementById('modelo').value;
	var txtImagen = document.getElementById('imagen').value;
	var txtVelocidad = document.getElementById('velocidadMaxima').value;

	console.log("txtMarca : ", txtMarca);
	console.log("txtModelo : ", txtModelo);
	console.log("txtImagen : ", txtImagen);
	console.log("txtVelocidad : ", txtVelocidad);

	console.log("=============================");

    if (!txtVelocidad || !txtVelocidad.trim().length) {
        alert('debe ingresar un Velocidad Maxima');
        return;
    }

    txtMarca.value = '';
    txtModelo.value = '';

    var item = {
        marca: txtMarca.trim(),
        modelo: txtModelo.trim(),
        imagen: txtImagen,
        maxima: txtVelocidad,
    };

    datos.push(item);
    carrera.push(new Vehiculo(item.marca, item.modelo, item.maxima, item.imagen));

    //tablaElementos.innerHTML = '';

    while (tablaElementos.childElementCount > 0) {
       		 tablaElementos.removeChild(tablaElementos.firstElementChild);
    }

    while (tablaVehiculos.childElementCount > 0) {
       		 tablaVehiculos.removeChild(tablaVehiculos.firstElementChild);
    }

    for (var i = 0; i < datos.length; i++) {
        var elemento = datos[i];

        var tr = document.createElement('tr');
        var trX = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var tdX = document.createElement('td');
        var div = document.createElement('img');

        div.setAttribute("id", elemento.imagen);
        div.setAttribute("src", elemento.imagen);
        div.setAttribute("width", '100');
        div.setAttribute("height", '100');
        //div.setAttribute("class", 'vehiculo');

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td4);
        tdX.appendChild(div);
        trX.appendChild(tdX);

        //tdX.appendChild(trX);

        td1.textContent = elemento.marca;
        td2.textContent = elemento.modelo;
        td3.textContent = elemento.maxima;
        td4.textContent = elemento.imagen;

        tablaElementos.appendChild(tr);

        tablaVehiculos.appendChild(trX);

        /*tablaVehiculos.appendChild(trX);
	    var x = tablaVehiculos.getElementById(img.id); 
	    x.style = "bottom: " + (i +10) + "px;"; */
    }
};

window.onload = cargaSelect;