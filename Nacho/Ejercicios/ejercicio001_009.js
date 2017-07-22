function stringInverso(string) {
	return string.split('').reverse().join('').toString();
}

console.log(stringInverso("hola mundo"));


function eliminarEspacios(string) {
	return string.replace(/\s/g, '');
}

console.log(eliminarEspacios("hola mundo"));

function ponerTodasLasLetrasMayusculas(string){
	return string.toUpperCase();
}

console.log(ponerTodasLasLetrasMayusculas("hola mundo"));

function esPalindromo(string) {

	var stringTrasnformado = eliminarEspacios(string);
	stringTrasnformado = stringInverso(stringTrasnformado);
	stringTrasnformado = ponerTodasLasLetrasMayusculas(stringTrasnformado);

	string = eliminarEspacios(string)
	string = ponerTodasLasLetrasMayusculas(string);

	if(string == stringTrasnformado) return true;
		else return false;
}

console.log(esPalindromo("Arde ya la yedra"));
console.log(esPalindromo("Ana lava lana"));
console.log(esPalindromo("Anita lava la tina"));
console.log(esPalindromo("hola mundo")); // no es palindrome