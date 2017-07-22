//1.-ESTA FUNCION RECIBE UN STRING Y DEBE DEVOLVER TODAS LAS LETRAS EN MAYUSCULAS

function ponerTodasLasLetrasEnMayusculas(string1){
	console.log(string1);

var mayusculas = string1.toUpperCase();
return mayusculas;

}

var string1 = "hola como estas";
console.log(ponerTodasLasLetrasEnMayusculas(string1));


//2.-ESTA FUNCION DEBE RECIBIR UN STRING Y DEVUELVE EL STRING INVERSO
//POR EJEMPLO: PARA EL STRING "Hola clase!" debe devolver "!esalc aloH"

function stringInverso(string2){
	
	console.log(string2);
var valor = string2.length;
var cadenaInvertida = "";

	while (valor >= 0) {
    cadenaInvertida = cadenaInvertida + string2.charAt(valor);
    valor--;
  }
  return cadenaInvertida;
}

var string2 = 'hola como estas';
console.log(stringInverso(string2));


//3.-Esta funciòn debe recibir un syring y devolver el mismo string sin espacios

function eliminarEspacios(string3){

	console.log(string3);

var espacios = string3.replace(/ /g, "");

return espacios;
}

var string3 = 'hola como estas';
console.log(eliminarEspacios(string3));



//3.-Esta funciòn debe rcalcular el palindromo

function calculapalindromo(string4){

console.log(string4);

var eliminar = eliminarEspacios(string4);
var y  = ponerTodasLasLetrasEnMayusculas(x);
var z = stringInverso(y);
var resultado = "";

if(y == z){
	resultado = "palindromo";
}else{
	resultado = "no lo es";
}

return resultado;
}

var string4 = 'somos';
console.log(calculapalindromo(string4));



