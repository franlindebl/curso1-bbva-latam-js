function getNombreFromlocalStorage(){
	let nombre = localStorage.getItem("nombre");
	console.log(nombre);	
}

function setNombreAtlocalStorage(nombre){
	localStorage.setItem("nombre", "fran");
	console.log(nombre);	
}

setNombreAtlocalStorage();
getNombreFromlocalStorage();