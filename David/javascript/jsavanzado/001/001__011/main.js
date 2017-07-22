var log = x => console.log(x);
var nombresPersonas = ["Victor", "Omar", "Karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairmer", "Lucy"];

var zoo = {
	nombre: "El último zoológico",
	ubicacion: {},
	areas: [],
	aforo: 70,
	numeroVisitantes : 0,
	caja : 1000000
};

var ubicacion = {
	dirreccion: "Calle de los animalitos 123",
	ciudad: "Ciudad de México",
	pais: "México",
	telefono: 999888777
}

function area(nombre, aforo, recintos, animales){
	return {
		nombre: nombre,
		aforoMaximo: aforo,
		recintos: recintos,
	};
}

function recintoDetalles(nombre, animales, capacidad, detalle){
	return {
		nombre: nombre,
		animales: animales,
		capacidad: capacidad,
		detalle: detalle,
		visitantes: []
	};
}

function animales(nombre, especie, salud, hambre, pais){
	return {
		nombre: nombre,
		especie: especie,
		salud: salud,
		hambre: hambre,
		pais: pais
	};
}

var enfermeria = {
	animal: [],
	recinto: 0
}


var tigreBlanco = animales("Tigre Blanco", "Felino", 100, 80, "Egipto");
var tigreNormal = animales("Tigre", "Felino", 90, 60, "Africa");

var palomas = animales("Palomas", "Avis Chilensis", 100, 100, "Chile");
var flamencos = animales("Flamenco", "Phoenicopteridae", 10, 0, "Colombia");

var tigres = [];
tigres.push(tigreBlanco, tigreNormal);

var aves = [];
aves.push(palomas, flamencos);

var recinto1 = recintoDetalles("Jaula de tigres", tigres, 80, "Jaula super reforzada con titanium");
var recinto2 = recintoDetalles("Baños", [], 100, "Baños para hombres y mujeres, aptos para personas con discapacidad");
var recinto3 = recintoDetalles("Jaula para aves", aves, 100, "Algunas aves que se pelean a seguido");

var recintoTigres = [];
recintoTigres.push(recinto1, recinto2);

var recintoAves = [];
recintoAves.push(recinto3);

var area1 = area("Mamíferos", 5000, recintoTigres);
var area2 = area("Aves", 200, recintoAves);

zoo.ubicacion = ubicacion;
zoo.areas.push(area1, area2);

log(zoo);


function ejecutarCiclo(){
	addPersona();
	console.log("Ciclo Ejecutado");		

	//modificar salud aleatoria
    modificarSaludAleatoria();

    //recupera animales en enfermeria
    recuperarEnfermeria();

}

//añade una Persona al Parque
function addPersona(){
	if(zoo.numeroVisitantes < zoo.aforo){
		//creamos una personanueva, le coramos y le introduciomos en el parque
		var persona = crearPersona(generasNombreAleatorio(), 500, generasEdadAleatoria(), esEstudianteAleatorio());
		cobrarEntrada(persona);
		var recintoLibre = primerRecintoLibre();
		recintoLibre.visitantes.push(persona);
		zoo.numeroVisitantes++;
	}else{	
		console.error("El ZOO esta lleno!");
	}
}

function primerRecintoLibre(){
	var recintoLibre = null;
	for(var a=0; a < zoo.areas.length; a++){
		var area = zoo.areas[a];

		for(var r=0; r < area.recintos.length; r++ ){
			var recinto = area.recintos[r];

			if(recinto.visitantes.length < recinto.capacidad){
				recintoLibre = recinto;
			}
		}

	}
	return recintoLibre;
}

function crearPersona(nombre, cartera, edad, estudiante){
	var persona = {
		nombre: nombre,
		cartera: cartera,
		edad: edad,
		estudiante: estudiante
	}
    return persona;
}

function generasNombreAleatorio(){
	var numeroAleatorio = Math.floor(Math.random() * nombresPersonas.length);
	return nombresPersonas[numeroAleatorio];
}

function generasEdadAleatoria(){
	var edad = Math.floor(Math.random() * 100);
	return edad;
}

function esEstudianteAleatorio(){
	var esEstudiante = Math.round(Math.random() * 1);
	return esEstudiante;
}

function cobrarEntrada(persona){
	var importeEntrada = 5;
	if(persona.edad > 65 || persona.edad < 14){
		importeEntrada = 0;	
	}else{
		if(persona.estudiante){
			importeEntrada = 5;
		}
	}
	persona.cartera = persona.cartera - importeEntrada;
	zoo.caja = zoo.caja + importeEntrada;
}

//Parar el intervalo
function stopEjecutarCiclo() {
    clearTimeout(intervalID);
}

function sacarPersonasDelZoo(){
	if (zoo.numeroVisitantes > 0 ){
	    zoo.numeroVisitantes = 0;
	    for(var a = 0; a < zoo.areas.length; a++){
           for(var r = 0; r < zoo.areas[a].recintos.length; r++){
           		zoo.areas[a].recintos[r].visitantes = [];
           	}	
	    }	
	}
}

function modificarSaludAleatoria(){
	var indices = [];
    for(var a = 0; a < zoo.areas.length; a++){
       for(var r = 0; r < zoo.areas[a].recintos.length; r++){
       	   console.log("recintos : ", zoo.areas[a].recintos[r] );
       		for(var z = 0; z < zoo.areas[a].recintos[r].animales.length; z++){
       				var nro = Math.floor(Math.random() * 40) - 20;
	                var nuevasalud = zoo.areas[a].recintos[r].animales[z].salud + nro ; 
	                if(nuevasalud < 100){
	                    zoo.areas[a].recintos[r].animales[z].salud = nuevasalud ; 
	                    console.log("Salud cambia : ", zoo.areas[a].recintos[r].animales[z].salud );
	                    // salud menor 50 a enfermeria
                        if(zoo.areas[a].recintos[r].animales[z].salud < 50){
                           enfermeria.animal.push(zoo.areas[a].recintos[r].animales[z]);
                           console.log("recinto : ", r)
                           enfermeria.recinto = r;
                           indices.push(zoo.areas[a].recintos[r].animales);
                           //zoo.areas[a].recintos[r].splice(r);
                        }

	                }
       		}
       	}	
    }

 	/*for(var i = 0; i < indices.length; i++){

        zoo.areas[a].recintos[r].animales.splice(indices[i], 1);

 	}*/	

}

function recuperarEnfermeria(){
	for(var i=0; i<enfermeria.animales.length; i++){

		enfermeria.animales[i].salud = enfermeria.animales[i].salud + 10;
		var estadosalud = enfermeria.animales[i].salud;
		if(estadosalud == 100){
			//vuelve a su recinto

		} 
	}     
} 

var intervalID = setInterval(ejecutarCiclo, 1000);

/*
1) Crear function cerrar zoo:  			OK
- Parar el intervalo
- Sacar todas las personas del zoo

2) crear function modificarSaludAleatoria(animal) de que manera sume o reste  OK
salud a un animal:
alatorios entre -20 y +20 (maximo de salud 100)

3) En cada ciclo ejecutar la function de modificarSaludAleatoria(), para todos los animales, 
si alguno baja de salud 50 de salud, debera ir a la enfermeria

4) En la enfermeria en cada ciclo los animales recuperan 10 de salud  (no se aplica modificarSaludAleatoria())

5) Si el animal llega a 100 de salud debera volver a su area (debera saber a que area pertenecia)

6) Crear funtion addhambre() que en cada ciclo sume 10 als hambre d eun animal. 
Cuando llegue a 100 el animal estara muy hambriento y debera ser alimentado.
Al alimentar un animal su hambre pasa a 0 y al ZOO le cuesta 1000

7) si el ZOO no tiene dinero para alimentar a los animales, no podra hacerlo. Cuando un animal
tenga mas de 150 de hambre, se comera a un visitante. El ZOO se quedara con su cartera.

8) en cada ciclo de visitantes debera cambiar al siguiente  

*/

