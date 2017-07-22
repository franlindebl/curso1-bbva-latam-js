class UsuarioCliente  {
	constructor() {
		this._urlBase = "http://tuabogadodeaccidentes.es";
		this._apiClient = new APIClient();
	}

	geMenu() {
		let urlCompleta = "http://formacion-indra-franlindebl.com/api/users";

		var promise = this._apiClient.get(urlCompleta).then(
			(data) => {
	    		let usuarios = [];

	    		for (let i = 0; i < data.length; i++) {
	    			let dato = data[i];
	        		let usuario = new Usuario(dato._id, dato.email, dato.apellidos, dato.nombre, dato.username,"");
	        		usuarios.push(usuario);
	    		}
	    		return usuarios;
    		}
    	);

    	return promise;
	}

	guardar(usuario) {
		let urlCompleta = "http://formacion-indra-franlindebl.com/api/users";;

		let datos = {
			"email": usuario._email,
			"apellidos": usuario._apellidos,
			"nombre": usuario._nombre,
			"username": usuario._username,
			"password": usuario._password
		}

		var promise = this._apiClient.post(urlCompleta, datos).then(
				(data) => {
				
				console.log("guardado desde usuario cliente");
			}
		);	

		return promise;	
	}

	actualizar(usuario, idUsaurio) {
		let urlCompleta = "http://formacion-indra-franlindebl.com/api/users";

		let datos = {
			"email": usuario._email,
			"apellidos": usuario._apellidos,
			"nombre": usuario._nombre,
			"username": usuario._username,
			"password": usuario._password
		}

		var promise = this._apiClient.put(urlCompleta, datos, idUsaurio).then(
				(data) => {
				
				console.log("Actualización del usuario");
			}
		);

		return promise;
	}

	eliminar(idUsuario,password) {
		let urlCompleta = "http://formacion-indra-franlindebl.com/api/users";

		let datos = {
			"password": password
		}

		var promise = this._apiClient.delete(urlCompleta, idUsuario, datos).then(
				(data) => {
				
				console.log("Eliminación de usuario");
			}
		);

		return promise;
	}

	login(username, password) {
		let urlCompleta = "http://formacion-indra-franlindebl.com/api/users/login"

		let datos = {
			"username": username,
			"password": password
		}

		var promise = this._apiClient.post(urlCompleta, datos).then(
				(data) => {
				console.log("data "+ data)
				return data;
			}
		);

		return promise;	
	}
}

