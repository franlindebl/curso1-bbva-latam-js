/*

Ejercicio: 001_009
*/


/*
funtion recibe string y debe devolver todas las letras en mayusculas
*/

function ponerTodasLasLetrasMayusculas(string){
  var resultado = string.toUpperCase()
  return resultado
}

/*
Esta funcion recibe un string y devuelve el string inverso
ejemplo:

"hola clase!" debe devolver "!esalc aloh"
*/

function stringInverso(string){
  var resultado = "";
  var res = string.split("");
  for(var i = res.lenght; i >= 0 ; i--){  
      resultado += res[i];
  }

  return resultado
}


/* Esta funcion debe recibir string y regresar sin espacios*/
function eliminarEspacio(string){
  var resultado = string.replace(/\s/g,'');
  return resultado
}

/* */
function esPalindromo(){

}


