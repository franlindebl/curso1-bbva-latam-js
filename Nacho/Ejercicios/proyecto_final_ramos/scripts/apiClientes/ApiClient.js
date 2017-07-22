class APIClient {
	constructor() {
	}

	get(url) {
		let datosCabecera = new Headers();
		let miInit = {
			method: 'GET',
			headers: datosCabecera
		};

		var promise = fetch(url, miInit).then((response) => {
			return response.json();
		});

		return promise;
	}

	post(url,datos) {
		var datosCabecera = new Headers();
        datosCabecera.append('Content-Type', 'application/json');
        
        var init = {
            method: 'POST',
            headers: datosCabecera,
            body: JSON.stringify(datos)
        };

        var promise = fetch(url, init).then((response) => {
			return response.status;
		});

        return promise;
	}

	delete(url,idProducto,datos) {
		var datosCabecera = new Headers();
		datosCabecera.append('Content-Type', 'application/json');

		var init = {
            method: 'DELETE',
            headers: datosCabecera,
            body: JSON.stringify(datos)
        };

        var urlConDato = url + '/' + idProducto;

       	var promise = fetch(urlConDato, init).then((response) => {
			return response.json();
		});

       	return promise;
	}

	put(url, datos, idDato) {
		var datosCabecera = new Headers();
		datosCabecera.append('Content-Type', 'application/json');

		var init = {
            method: 'PUT',
            headers: datosCabecera,
            body: JSON.stringify(datos)
        };

        var urlConDato = url + '/' + idDato;

		var promise = fetch(urlConDato, init).then((response) => {

			return response;
		});

       	return promise;        
	}
}