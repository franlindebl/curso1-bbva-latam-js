// Ejercicio 001__010

function crearArea(nombre, aforo){
    return {nombre: nombre, aforoMaximoZona: aforo, recintos: []};
}

function crearRecinto(nombre, poblacion){
    return {nombre: nombre, poblacion: poblacion, animales: []};
}

function crearAnimal(nombre, tipo, edad, distancia, salud){
    return {nombre: nombre, tipo: tipo, edad: edad, distancia: distancia, salud: salud};
}

var zoo = {
    nombre: "Jurasico Parque",
    ubicacion: {},
    areas: [],
    aforo: 120
};

zoo.ubicacion = {
    direccion: "Calle de los animales 5",
    ciudad: "París",
    pais: "Francia",
    codigoPostal: "00000"
};

// Area Reptiles

var area1 = crearArea("Reptiles", 30);

var recinto = crearRecinto("Serpiente", 2);
recinto.animales.push(crearAnimal("Serp1", "Cobra", 5, 1.5, 90));
recinto.animales.push(crearAnimal("Serp2", "Cascabel", 1, 1, 100));
area1.recintos.push(recinto);

var recinto = crearRecinto("Lagartos", 2);
recinto.animales.push(crearAnimal("Lagar 1", "A", 8, 3, 80));
recinto.animales.push(crearAnimal("Lagar 2", "B", 10, 2.5, 95));
area1.recintos.push(recinto);

zoo.areas.push(area1);

/*
area1.recintos.push({   nombre: "Serpiente", 
                        poblacion: 2, 
                        animales: [ { id: 100234, tipo: "Cobra", edad: 5, distancia: 1.5, salud: 90 },
                                    { id: 100240, tipo: "Cascabel", edad: 1, distancia: 1, salud: 100 }  ] 
                    });


area1.recintos.push({   nombre: "Lagartos", 
                        poblacion: 2, 
                        animales: [ { id: 101001, tipo: "Tipo A", edad: 8, distancia: 3, salud: 80 }, 
                                    { id: 101030, tipo: "Tipo B", edad: 10, distancia: 2.5, salud: 95 } ] 
                    });

zoo.areas.push(area1);
*/
// Area Aves

area1 = {
    nombre: "Aves",
    aforoMaximoZona: 25,
    recintos: []
};

area1.recintos.push("Tropicales");
area1.recintos.push("Desierto");

area1.recintos.push({   nombre: "Tropicales", 
                        poblacion: 2, 
                        animales: [ { nombre: "Trop 1", tipo: "Pelicano", edad: 0.5, distancia: 1.40, salud: 90 },
                                    { nombre: "Trop 2", tipo: "Gabiota", edad: 1, distancia: 0.50, salud: 100 }  ] 
                    });

area1.recintos.push({   nombre: "Desierto", 
                        poblacion: 2, 
                        animales: [ { nombre: "Desc 1", tipo: "Buitre", edad: 2.5, distancia: 1.4, salud: 90 }, 
                                    { nombre: "Desc 2", tipo: "Condor", edad: 1, distancia: 1, salud: 100 } ] 
                    });

zoo.areas.push(area1);


console.log(zoo);