var zoologico = {
    nombre: "Chapultepec",
    ubicacion: {
    	direccion: "Av. Chapultepec",
    	ciudad: "México city",
    	cp: "89346"
    },
    areas: [],
    aforo: 120,
    horario: {
    	entrada: "09:00",
    	salida: "18:00"
    },
    visitantes: [],
    caja: 0
};

function crearArea(nombreRecibido, aforoRecibido) {
    return {
        nombre: nombreRecibido,
        aforoMaximoZona: aforoRecibido,
        recintos: []
    }
}

function crearRecinto(nombreRecinto, capacidadMaxima, aforoPersonas) {
    return {
        nombre: nombreRecinto,
        capacidadMaxima: capacidadMaxima,
        aforoPersonas: aforoPersonas
    }
}

function crearVisistante() {
    var nombreAl = generarNombreAleatorio();
    var edadAl = valorAleatorio(0,90);
    var estudianteAl = valorAleatorio(0,1);
    var dineroAl =  valorAleatorio(0, 100);

    return  {
        nombre: nombreAl ,
        edad: edadAl ,
        estudiante: estudianteAl,
        dinero: dineroAl
    }
}

function addVisitante() {
    zoologico.visitantes.push(crearVisistante);
}

function valorAleatorio(valorInicial, valorFinal) {
    return Math.floor(Math.random() * (valorFinal - valorInicial + 1)) + valorInicial;
}

function generarNombreAleatorio() {
    var nombres = ["José", "Juan", "Luis", "Carlos", "Antonio", "Mario", "Pablo", "Diego", "Miguel", 
    "Angel", "Eduardo", "Ricardo", "Ernesto", "David", "Javier", "Abraham", "Sinuhé", "Marco", "Rafael"];

    var valor = valorAleatorio(0, (nombres.length - 1));

    return nombres[valor];
}

var areaReptiles = crearArea("Reptiles", 10);
var areaAves = crearArea("Aves", 10);
var areaAcuaticos = crearArea("Acuáticos", 10);
var areaMamimeros = crearArea("Mamiferos", 10);


recintoSerpientes = crearRecinto("Serpientes", 5, 10);
recintoLagartos = crearRecinto("Lagartos", 5, 10);

recintoAguilas = crearRecinto("Aguilas", 5, 10);
recintoPatos = crearRecinto("Patos", 5 , 10);

recintoDelfines = crearRecinto("Delfin",5, 10);
recintoTiburones = crearRecinto("Tiburones",5, 10);

recintoElefantes = crearRecinto("Elefantes",2, 10);
recintoLeones = crearRecinto("Leones",5, 10);

areaReptiles.recintos.push(recintoSerpientes, recintoLagartos);
areaAves.recintos.push(recintoAguilas, recintoPatos);
areaAcuaticos.recintos.push(recintoDelfines, recintoTiburones);
areaMamimeros.recintos.push(recintoElefantes, recintoLeones);

zoologico.areas.push(areaReptiles, 
	areaAves, 
	areaAcuaticos);

