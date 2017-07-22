/*
1) Realiza la modelización de un parque natural. Empieza con el siguiente código.

var parqueNatural = {
    areas = [],
    parqueDeBomberos = {}
}

En cada una de las áreas (añade 10 áreas) encontraremos un array de árboles 
(100 por área) y un array de visitantes (100 en todo el parque).
En el parque de bomberos encontraremos un array de bomberos (10) y 
posiblemente más propiedades que se te puedan ocurrir.
Los bomberos y los visitantes deberán heredar de la clase Persona.

2) Añade un método ejecutar ciclo que represente el paso de 1h en el parque.
Cada ciclo que pase debemos llamar a ejecutar ciclo de los visitantes que se irán cambiando de recinto de forma aleatoria.
Haz que el método se ejecute cada segundo.

3) En cada paso de un ciclo se puede originar un fuego (probabilidad del 5%) 
que empezaría quemando un arbol aleatorio dentro del parque.
Cada ciclo que pase el fuego se extenderá al arbol al arbol siguiente, 
si no hay arbol siguiente, deberá saltar al primer arbol del área siguiente.
Asi sucesivamente hasta expandirse por todo el parque. 
Cada ciclo que pase el fuego en los arboles, estos estarán un 10% más quemados.
Cuando lleguen al 100% de quemados, se habrá perdido el arbol. (Quitarlo del área).​
*/

function ParqueNatural(){
    this.areas = [];
    this.parqueDeBomberos = new ParqueDeBombero();
    for(var i = 0 ; i < 10; i++){
       this.areas.push( new Area(i));
    }
}
ParqueNatural.prototype.addVisitante = function(visitantes){
    var areaAleatoria = Math.floor(Math.random() * (this.areas.length-1)); //generaNumeroAleatorio(0, this.areas.length-1);
    this.areas[areaAleatoria].visitantes.push(visitantes);
}
ParqueNatural.prototype.nroVisitantes = function(){
    var totalVisitantes = 0;
    for(var i=0; i < this.areas.length; i++){
        totalVisitantes += this.areas[i].visitantes.length;
    }
    console.log("Total Visitantes  : ",  this.areas[0].visitantes.length);

    if (totalVisitantes==100){
        cerrarParque();
    } 
    return totalVisitantes;
}
ParqueNatural.prototype.ejecutarCiclo = function(){
    this.addVisitante(new Visitante());
    console.log("Se ha ejecutado un ciclo....");
}
ParqueNatural.prototype.quemarArbolAleatorio = function(){
    var nrodeAreaAletorio = generaNumeroAleatorio(0, this.areas.length-1);
    var areaAleatoria = this.areas[nrodeAreaAletorio];
    var nrodeArbolesAletorio = generaNumeroAleatorio(0, areaAleatoria.arboles.length-1);
    var arbolAleatoria = areaAleatoria.arboles[nrodeArbolesAletorio];
    areaAleatoria.arboles[nrodeArbolesAletorio].procentajequemado = 10;
    return arbolAleatoria;
}
ParqueNatural.prototype.quemarSiguienteArbol = function(x, y){
    var areaActual = this.areas[x];
    var y = parseInt(y) + 1;
    var arbolSiguiente = areaActual.arboles[y];

    console.log("areaActual : ", areaActual );
    console.log(`arbolSiguiente :  ${y} `,  arbolSiguiente );

    if (areaActual && arbolSiguiente){
        areaActual.arboles[y].procentajequemado += 10;
    }
    else{
        // pasa a siguiente area
        if(!arbolSiguiente){
            var x = x + 1; 
            if (x < 10){
                var areaSiguiente = this.areas[x];
                var arbolSiguiente = areaSiguiente.arboles[0];
                arbolSiguiente.procentajequemado += 10;
                console.log("Quema primer Arbol siguiete Area : ",  arbolSiguiente);
            }
        }
    }
    console.log("Siguiente  :  ", areaActual);
}

function Persona(){
    this.nombre = "";
    this.edad = "";
    this.sexo = "";
} 

function Bombero(id){
    this.IdBombero = id;
    this.nrocompania = "";
    this.ciudad = "";
}
function ParqueDeBombero(){
    this.bomberos = [];
    for(var i = 0; i <10; i++){
        this.bomberos.push(new Bombero(i));
    }
}
Bombero.prototype = new Persona();

function Visitante(){

}
Visitante.prototype = new Persona();

function Arbol(id){
    this.idArbol = id; 
    this.quemando = false;
    this.procentajequemado=0; 
}

function Area(id){
    this.areaId = id;
    this.arboles = [];
    this.visitantes = [];
    for(var i = 0; i <100; i++){
        var nuevoIDdeArbol = this.areaId + "_" + i;
        this.arboles.push(new Arbol(nuevoIDdeArbol));
    }
}
Area.prototype.imprimirEstadoArea = function(){
    var estadoArea = "";
    for(var i=0; i<this.arboles.length; i++){
        var estadoArbol = "🌲";

        if(this.arboles[i].estaArdiendo){
            estadoArbol = "🔥";
        }
        estadoArea = estadoArea + estadoArbol + ", ";
    }
    console.log("Estado del área " + this.areaId);
    console.log("======================");
    console.log(estadoArea);
    console.log("======================");
}

function generaNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var parque = new ParqueNatural();
console.log(parque);  

function ParqueCiclo(){

    parque.ejecutarCiclo();

    var nroquemado = generaNumeroAleatorio(1, 100);
    if (nroquemado <= 5){
        var quemarArboles = parque.quemarArbolAleatorio();
        console.log("Se quema Arbol : ", quemarArboles);

        var x = quemarArboles.idArbol.substr(0, 1);
        var y = quemarArboles.idArbol.substr(2, 2);

        console.log("X : " + x + " : y : " + y  );   
        parque.quemarSiguienteArbol(x, y);

    }
}

function abrirParque() {
    intervalID = setInterval(ParqueCiclo, 1000);
}

function cerrarParque() {
    clearInterval(intervalID);
}

abrirParque();

