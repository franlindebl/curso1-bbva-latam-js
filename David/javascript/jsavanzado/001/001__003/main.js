/*

Ejercicio: 001_003

Realiza una funcion que reciba un array de string y devuelva la 
logitud del string mas largo

por ejemplo dado el siguiente array:

var array = ["Hola", "Frase corta", "frase normalita", "Frase muy muy larga"];

debera devolver: 19

Bonus

1) Comprobar que todos los valores son e tipo string
2) Devolver un objeto que contenga el string y el numero de caracteres 
ejemplo 
{
	longitud: 19,
	string: "Frase ,muy mmuy larga"
}

*/

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


var array = ["aloha", "Frase corta", "frase normalita", "Frase muy muy larga", 22];


console.log(ArrayString(array));

