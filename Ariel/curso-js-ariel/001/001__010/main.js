var zoo = {
    nombre: "El ultimo zoologico",
    ubicacion: {},
    areas: [],
    aforo: 120
}

zoo.ubicacion = {
    direccion: "Calle de los animales 5",
    ciudad: "Paris",
    pais: "Francia"
}

var area1 = {
    nombre: "Reptiles",
    aforoMaximoZonas: 30,
    recintos: []
}

var area2 = {
    nombre: "Mamiferos",
    aforoMaximoZonas: 40,
    recintos: []
}

var area3 = {
    nombre: "Aves",
    aforoMaximoZonas: 10,
    recintos: []
}

var area4 = {
    nombre: "Anfibios",
    aforoMaximoZonas: 20,
    recintos: []
}

zoo.areas.push(area2);
zoo.areas.push(area3);
zoo.areas.push(area4);
zoo.areas.push(area1);


function serpientes(){

    var recinto1 = {
        nombre: "Serpinte",
        animales: []

    };

    zoo.areas[0].recintos.push(recinto1);

    var animal1 = {
        nombre: "Leo",
        salud: 100,
        especie: "Serpinte Africana"
    }

    zoo.areas[0].recintos[0].animales.push(animal1);

    var animal2 = {
        nombre: "Doki",
        salud: 100,
        especie: "Serpinte China"
    }

    zoo.areas[0].recintos[0].animales.push(animal2);

    var recinto2 = {
        nombre: "Cocodrilo",
        animales: []

    };

    zoo.areas[0].recintos.push(recinto2);

    var animal3 = {
        nombre: "Alexis",
        salud: 100,
        especie: "Cocodrilo dorado"
    }

    zoo.areas[0].recintos[0].animales.push(animal3);

    var animal4 = {
        nombre: "Mauricio",
        salud: 100,
        especie: "Cocodrilo lomo plateado"
    }

    zoo.areas[0].recintos[0].animales.push(animal4);

}


function mamiferos(){

    var recinto1 = {
        nombre: "Leones",
        animales: []

    };

    zoo.areas[1].recintos.push(recinto1);

    var animal1 = {
        nombre: "Marco",
        salud: 100,
        especie: "Leon real"
    }

    zoo.areas[1].recintos[0].animales.push(animal1);

    var animal2 = {
        nombre: "Ana",
        salud: 100,
        especie: "Leona cazadora"
    }

    zoo.areas[1].recintos[0].animales.push(animal2);

    var recinto2 = {
        nombre: "Elefantes",
        animales: []

    };

    zoo.areas[1].recintos.push(recinto2);

    var animal3 = {
        nombre: "Oscar",
        salud: 100,
        especie: "Elefante marfil"
    }

    zoo.areas[1].recintos[0].animales.push(animal3);

    var animal4 = {
        nombre: "Ricardo",
        salud: 100,
        especie: "Elefante gris"
    }

    zoo.areas[1].recintos[0].animales.push(animal4);

}

serpientes();
mamiferos();
