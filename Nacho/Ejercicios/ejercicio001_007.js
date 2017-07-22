
var buscarParejas = function(array) {
	var parejas = [];

	for (var i = 0; i < array.length; i++) {
		for(var j = 0; j < array.length; j++) {
			if(i <= j && (array[i] + array[j] == 0) ) {
				parejas.push(i+", " +j);
			}
		}
	}

	return parejas;
}

console.log(buscarParejas([2, -5, 10, 5, 4, -10, 0, -5]));