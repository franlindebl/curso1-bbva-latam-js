var contCaract = function (texto) {
    var res = {};
	var aux = texto.split("");
	for (i = 0; i < aux.length; i++) {
	    if (res.hasOwnProperty(aux[i])){
	        res[aux[i]]++;
	    }else{
	        res[aux[i]] = 1;
	    }
	};
	return res;
};
