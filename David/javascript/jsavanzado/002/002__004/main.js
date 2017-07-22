var nombreJugadores = ["Bravo", "Sanchez", "Medel", "Vidal", "Hernandez", "Jara", "Fernandez", "Pizarro"];
var posicionJugador = ["portero", "defensa", "mediocentro", "delantero"];
var pais = ["Chile", "Alemania", "Mexico", "Rusia", "Australia", ""]


function Persona(nombre, edad, nacionalidad, altura, peso, enferno){
    this.nombre = "";
    this.edad = edad;
    this.nacionalidad = nacionalidad;
    this.altura = altura;
    this.peso = peso;
    this.enfermo = "";
} 
Persona.prototype.initPersona = function() {
    this.nombre = generarNombreAleatorio();
    this.enfermo = generarEnfermoAleatorio();
};

function Jugador(){
    this.initPersona();
    this.posicion = generarPosicionAleatorio();
    this.numero = Math.floor(Math.random() * 100);
    this.calidad = Math.floor(Math.random() * 100);
}
Jugador.prototype = new Persona();

function Equipo(){
    this.plantilla = [];
    this.entrenador = new Entrenador();

    for(var e=0; e<22; e++){
        this.plantilla.push(new Jugador());  
    }   
} 

function Entrenador(){
    this.initPersona();
}

Entrenador.prototype = new Persona();

Entrenador.prototype.elegirJugadores = function(jugadores){
    var alineacion = {
        portero : [],
        defensas : [],
        mediocentros : [],
        delanteros : []
    }
    //elegir aleatorimente jugadores para cada posicion

    alineacion.portero.push(jugadores.splice(0, 1));
    console.log(`${alineacion.portero[0].length} Portero : `, alineacion.portero);

    alineacion.defensas.push(jugadores.splice(0, 4));
    console.log(`${alineacion.defensas[0].length}  Defensas : `, alineacion.defensas);

    alineacion.mediocentros.push(jugadores.splice(0, 4));
    console.log(`${alineacion.mediocentros[0].length}  mediocentros : `, alineacion.mediocentros);

    alineacion.delanteros.push(jugadores.splice(0, 2));
    console.log(`${alineacion.delanteros[0].length}  delanteros : `, alineacion.delanteros);

    return alineacion;
}

function Partido(){
    this.equipo1 = []; 
    this.equipo2 = []; 
} 

Partido.prototype.ataquesFutbol = function(alineacion1, alineacion2) {
    var cont = 0;
    while(cont < 10){
        ataque(alineacion1, alineacion2);
        ataque(alineacion2, alineacion1);
        cont++;
    }
}

function ataque(alineacion1, alineacion2){
    var A=0;
    var B=0;
    var C=0;
    var calidadMedioCentrosA=0;
    var calidadMedioCentrosB=0;  
    var calidadDelanterosA=0;
    var calidadDelanterosB=0;
    for(var c=0; c < alineacion1.mediocentros[0].length; c++){
        //console.log(alineacion1.mediocentros[0][c].calidad);
        calidadMedioCentrosA+=alineacion1.mediocentros[0][c].calidad;
        if (alineacion1.mediocentros[0][c].posicion!="mediocentro"){
            calidadMedioCentrosA-=10; 
        }
    }

    for(var c=0; c < alineacion2.mediocentros[0].length; c++){
        //console.log(alineacion2.mediocentros[0][c].calidad);
        calidadMedioCentrosB+=alineacion2.mediocentros[0][c].calidad;
        if (alineacion2.mediocentros[0][c].posicion!=="mediocentro"){
            calidadMedioCentrosA+=10; 
        }        
    }

    for(var c=0; c < alineacion1.delanteros[0].length; c++){
        //console.log(alineacion1.delanteros[0][c].calidad);
        calidadDelanterosA+=alineacion1.delanteros[0][c].calidad;
        if (alineacion1.delanteros[0][c].posicion!="delanteros"){
            calidadDelanterosA-=10; 
        }        
    }

    for(var c=0; c < alineacion2.delanteros[0].length; c++){
        //console.log(alineacion2.delanteros[0][c].calidad);
        calidadDelanterosB+=alineacion2.delanteros[0][c].calidad;
        if (alineacion2.delanteros[0][c].posicion!=="delanteros"){
            calidadDelanterosB+=10; 
        }      
    }

    A = (calidadMedioCentrosA - calidadMedioCentrosB); 
    B = (calidadDelanterosA - calidadDelanterosB); 
    C = (A + B) - alineacion1.portero[0][0].calidad;

     var total = C + Math.floor(Math.random() * 200); //TOTAL = C + Fortuna
     if(total > 0){
        console.log("GOOOOOOOL");
     }
     if(total === 0){
        console.log("PALO !!!");
     }
     if(total <= 0){
        console.log("Ná de ná​");
     }
}

function fortuna() {
    var fortuna = Math.floor(Math.random() * 100);
    return fortuna;
}

function generarNombreAleatorio() {
    var numeroAleatorio = Math.floor(Math.random() * nombreJugadores.length);
    return nombreJugadores[numeroAleatorio];
}

function generarEnfermoAleatorio() {
    var numeroAleatorio = Math.floor(Math.random() * 100);
    var enfermo = null;
    if (numeroAleatorio<10){
        enfermo = true;
    }
    else{
        enfermo = false;
    }
    return enfermo;
}

function generarPosicionAleatorio() {
    var numeroAleatorio = Math.floor(Math.random() * posicionJugador.length);
    return posicionJugador[numeroAleatorio];
}

function partidoDeFutbol(){
}


var equipo = new Equipo();
var plantilla1 = equipo.entrenador.elegirJugadores(equipo.plantilla);
var plantilla2 = equipo.entrenador.elegirJugadores(equipo.plantilla);

/*console.log("plantilla1 : ", plantilla1);
console.log("plantilla2 : ", plantilla2);
*/

var ataques = new Partido();
ataques.ataquesFutbol(plantilla1, plantilla2);
