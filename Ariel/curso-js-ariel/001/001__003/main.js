var calculoString = function (arreglo) {
    var mayor = 0;
 
	for(i = 0; i < arreglo.length; i++){
	    if (arreglo[i].length > mayor) {
	        mayor = arreglo[i].length;
	    };
	}
	return mayor;	
};
