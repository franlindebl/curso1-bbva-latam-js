class ComidaCliente {
	constructor() {
		this._urlBase = "http://tuabogadodeaccidentes.es";
		this._apiClient = new APIClient();
	}

	geMenu() {
		let urlCompleta = this._urlBase + '/api/comidas';

		var promise = this._apiClient.get(urlCompleta).then(
			(data) => {
				console.log("then");
	    		let menuComida = [];

	    		for (let i = 0; i < data.length; i++) {
	    			let dato = data[i];
	        		let comida = new Comida(dato._id, dato.nombre, dato.precio, dato.calorias, dato.tipo, dato.existencias);
	        		menuComida.push(comida);
	    		}
	    		return menuComida;
    		}
    	);

    	return promise;
	}

	guardar(comida) {
		let urlCompleta = this._urlBase + '/api/comidas';
		//id, nombre, precio, calorias, tipo, existencias
		let datos = {
			"tipo": comida._tipo,
			"precio": comida._precio,
			"calorias": comida._calorias,
			"existencias": comida._existencias,
			"nombre": comida._nombre
		}

		var promise = this._apiClient.post(urlCompleta, datos).then(
				(data) => {
				console.log("guardado desde comidas cliente");
			}
		);

		return promise;
	}

	eliminar(idComida) {
		let urlCompleta = "http://formacion-indra-franlindebl.com/api/comidas";

		var promise = this._apiClient.delete(urlCompleta, idComida).then(
				(data) => {
				console.log("Eliminación de id comida");
			}
		);

		return promise;
	}

	actualizar(comida, idProducto) {
		let urlCompleta = "http://formacion-indra-franlindebl.com/api/comidas";
		let datos = {
			"_id" : comida._idProducto,
			"tipo": comida._tipo,
			"precio": comida._precio,
			"calorias": comida._calorias,
			"existencias": comida._existencias,
			"nombre": comida._nombre
		}

		var promise = this._apiClient.put(urlCompleta, datos, idProducto).then(
				(data) => {
				console.log("Actualización de la comida");
			}
		);
		return promise;
	}
}