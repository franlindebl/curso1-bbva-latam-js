class BebidaCliente {
	constructor() {
		this._urlBase = "http://tuabogadodeaccidentes.es";
		this._apiClient = new APIClient();
	}

	geMenuBebida() {
		let urlCompleta = this._urlBase + '/api/bebidas';

		var promise = this._apiClient.get(urlCompleta).then(
			(data) => {
	    		let menuBebida = [];

	    		for (let i = 0; i < data.length; i++) {
	    			let dato = data[i];
	        		let bebida = new Bebida(dato._id, dato.nombre, dato.precio, dato.calorias, dato.esAlcoholica, dato.existencias, dato.grados);
	        		menuBebida.push(bebida);
	    		}

	    		return menuBebida;
    		}
    	);

    	return promise;
	}

	guardar(bebida) {
		let urlCompleta = this._urlBase + '/api/bebidas';

		let datos = {
			"grados": bebida._grados,
			"esAlcoholica": bebida._esAlcoholica,
			"precio": bebida._precio,
			"calorias": bebida._calorias,
			"existencias": bebida._existencias,
			"nombre": bebida._nombre
		}

		var promise = this._apiClient.post(urlCompleta, datos).then(
				(data) => {
				console.log("guardado desde bebida cliente");

				return data;
			}
		);

		return promise;	
	}

	eliminar(idBebida) {
		let urlCompleta = "http://formacion-indra-franlindebl.com/api/bebidas";

		var promise = this._apiClient.delete(urlCompleta, idBebida).then(
				(data) => {
				console.log("Eliminación de id bebida" + data);

				return data;
			}
		);

		return promise;
	}

	actualizar(bebida, idProducto) {
		let urlCompleta = "http://formacion-indra-franlindebl.com/api/bebidas";
		console.log("dd");
		let datos = {
			"_id" : idProducto,
			"grados": bebida._grados,
			"esAlcoholica": bebida._esAlcoholica,
			"precio": bebida._precio,
			"calorias": bebida._calorias,
			"existencias": bebida._existencias,
			"nombre": bebida._nombre
		}

		var promise = this._apiClient.put(urlCompleta, datos, idProducto).then(
				(data) => {
					console.log("ddm");
				return data;
			}
		);

		return promise;
	}

}