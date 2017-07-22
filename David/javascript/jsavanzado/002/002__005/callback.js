//callback

/*function loadScript(src, callback){
	var elem =document.createElement('script');
	elem.setAttribute('type', 'text/javascript');
	elem.setAttribute('src', src);
	elem.onload = function(){ callback(src)};
	document.documentElement.insertBefore(elem, null);	
}

function miCallBack(src){
	console.log("Genial, hemos cargado : " + src);
	console.log(jQuery)
}*/


/*function loadScript(src, callback){
	var elem =document.createElement('script');
	elem.setAttribute('type', 'text/javascript');
	elem.setAttribute('src', src);
	document.documentElement.insertBefore(elem, null);	
	console.log("Genial, hemos cargado : " + src);
	console.log(jQuery)
}*/

/*function testCallBack(){
	loadScript('https://code.jquery.com/jquery-3.2.1.slim.min.js', miCallBack);
}
*/

//Control de errores

/*function loadScript(src, callback){
	var elem =document.createElement('script');
	elem.setAttribute('type', 'text/javascript');
	elem.setAttribute('src', src);
	elem.onload = function(){ callback(null, src)};
	elem.onerror = function(){ callback("Error al cargar" + src, null)};
	document.documentElement.insertBefore(elem, null);	
}

function miCallBackConErrorHandling(error, data){
	if(error){
		console.error(error);
	}else{
		console.log("Genial hemos cargado : " + data);
		console.log(jQuery);
	}
}

function testCallBack(){
	loadScript('https://code.jquery.com/jquery-3.2.1.slim.min.js', miCallBackConErrorHandling);
}

function testCallBackConError(){
	loadScript('https://ullnoexistes', miCallBackConErrorHandling);
}*/

//promesas

/*function loadScript(src, callback){
	var promesa = new Promise(function(resolve, reject){	
		var elem = document.createElement('script');
		elem.setAttribute('type', 'text/javascript');
		elem.setAttribute('src', src);
		elem.onload = function(){ resolve(src)};
		elem.onerror = function(){ reject("Error al cargar" + src)};
		document.documentElement.insertBefore(elem, null);	
    });
    return promesa;
}

function testPromesa(){
	loadScript('https://code.jquery.com/jquery-3.2.1.slim.min.js').then(
		function(result){
			console.log("Genial hemos cargado : " + result);
			console.log(jQuery);			
		}
	).catch(
		function(error){
			console.log(error);
		}
	);
}*/

//promesas 2.0

/*function loadScript(src, callback){
	var promesa = new Promise(function(resolve, reject){	
		var elem = document.createElement('script');
		elem.setAttribute('type', 'text/javascript');
		elem.setAttribute('src', src);
		elem.onload = function(){ resolve(src)};
		elem.onerror = function(){ reject("Error al cargar" + src)};
		document.documentElement.insertBefore(elem, null);	
    });
    return promesa;
}

function testPromesa(){
	loadScript('https://code.jquery.com/jquery-3.2.1.slim.min.js').then(
		function(result){
			console.log("Genial hemos cargado : " + result);
			console.log(jQuery);			
		},
		function(error){
			console.log(error);
		}
	);
}*/

//promesas 3.0

function loadScript(src, callback){
	var promesa = new Promise(function(resolve, reject){	
		var elem = document.createElement('script');
		elem.setAttribute('type', 'text/javascript');
		elem.setAttribute('src', src);
		elem.onload = function(){ resolve(src)};
		elem.onerror = function(){ reject("Error al cargar : " + src)};
		document.documentElement.insertBefore(elem, null);	
    });
    return promesa;
}

function testMultiplesPromesas(){
    var promesa1 =  loadScript('https://code.jquery.com/jquery-3.2.1.slim.min.js.back').catch(
    	function(){
    		console.log("Ha ocurrido un error en promesa 1");
    		throw(error);
    	});

    var promesa2 =  loadScript('https://lodash.com/vendor/cdn.jsdelivr.net/lodash/4.17.4/lodash.min.js.back')

	Promise.all([promesa1, promesa2]).then(
		function(result){
			console.log("Todas las promesas se han cargado correctamente ");
			console.log(result);			
		},
		function(error){
			console.log("Alguna de las promesas a fallado");
			console.error(error);
		}
	);
}



 
