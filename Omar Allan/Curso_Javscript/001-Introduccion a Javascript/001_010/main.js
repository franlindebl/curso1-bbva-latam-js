

var zoo = {
	nombre: "zoo",
	ubicacion: {},
	areas:[],
	aforo: 120
};

var ubicacion = {
	dirreccion: "Calle de los animalitos 123",
	ciudad: "Ciudad de México",
	pais: "México",
	telefono: 999888777
}

			var area1 = {
				nombre: "Reptiles",
				aforoMaximaZona: 30,
				recintos:[],
			}


			var area2 = {
				nombre: "Mamiferos",
				aforoMaximaZona: 20,
				recintos:[],
			}


			var area3 = {
				nombre: "Aves",
				aforoMaximaZona:60,
				recintos:[],
			}

			var area4 = {
				nombre: "Anfibios",
				aforoMaximaZona: 10,
				recintos:[],
			}


function recintoDetalles(nombre, animales, capacidad, detalle){
	return {
		nombre: nombre,
		animales: animales,
		capacidad: capacidad,
		detalle: detalle
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

				var animal1 = createAnimales("simba","leon",5)
				var animal2 = createAnimales("cas","tigre",4)
				area1.recinto1.animales.push(animal1,animal2);



area1.recintos.push(recinto1);

		zoo.areas.push(area1);
		zoo.areas.push(area2);
		zoo.areas.push(area3);
		zoo.areas.push(area4);
console.log(zoo);



var recinto1 = recintoDetalles("Jaula de tigres", tigres, 100, "caàcidad");
var recinto2 = recintoDetalles("Jaula de osos", osos, 100, "capacidad");


var tigreBlanco = animales("Tigre Blanco", "Felino", 100, 80, "Egipto");

var tigres = [];
tigres.push(tigreBlanco);

