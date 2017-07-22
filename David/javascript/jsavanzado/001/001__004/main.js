/*

Ejercicio: 001_004

var array = ["Hola", "Frase corta", "frase normalita", "Frase muy muy larga"];

*/
var resultados = [];
var arrayDeTest1 = ["Richie", "Joanie", "Greg", "Marcia", "Booby"];
var arrayDeTest2 = ["Blanka", "Zangief", "Chun li", "Guile"];
var arrayDeTest3 = ["Red", "Blue", "Green"];
var arrayDeTest4 = ["Hola", "Frase corta", "frase normalita", "Frase muy muy larga"];

function longitudDelStringMaslargo(arrayDeString){
     var logitudMaxima =0;
     arrayDeString.forEach(function(string)){
          var longitudDeEsteString = string.length;
          if(longitudDeEsteString > logitudMaxima){
             logitudMaxima = longitudDeEsteString;
          }

     }

}

function caalculaMediaDeResultados(arrayDeResultados){
     var suma = 0;

}


var ArrayString = function(myObjeto){

     var objeto = {};

     for (var i=0; i < myObjeto.length; i++){

          console.log(typeof myObjeto[i]);

     	if(typeof myObjeto[i] == 'string' ){
     	  	 objeto = {
     	  	 	mensaje :"todos son string"
     	  	 }
     	  }else{
     	  	 objeto = {
     	  	 	mensaje :"NO todos son string"
     	  	 }
            break
     	} 
     }

	return objeto;

}


console.log(resultados);
media(resultados) ==> 9.5

console.log(ArrayString(array));

