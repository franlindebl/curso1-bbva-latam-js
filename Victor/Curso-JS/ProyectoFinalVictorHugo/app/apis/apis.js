class APIClient {
    constructor() {
    }

    static _get(url) {
        Utils._pintaModalLoading();

        var misCabeceras = new Headers();

        var miInit = {
            method: 'GET',
            headers: misCabeceras
        };

        var promise = fetch(url, miInit).then(
            (response) => {

                return response.json();
            }
        );


        return promise;
    }

    static _getSinModal(url) {
        var misCabeceras = new Headers();

        var miInit = {
            method: 'GET',
            headers: misCabeceras
        };

        var promise = fetch(url, miInit).then(
            (response) => {

                return response.json();
            }
        );


        return promise;
    }

    static _post(url, datos) {
        Utils._pintaModalLoading();

        var misCabeceras = new Headers();
        misCabeceras.append('Content-Type', 'application/json');

        var miInit = {
            method: 'POST',
            headers: misCabeceras,
            body: JSON.stringify(datos)
        };

        var promise = fetch(url, miInit).then(
            (response) => {

                return response.json();
            }
        );


        return promise;
    }

    static _put(url, datos) {
        Utils._pintaModalLoading();

        var misCabeceras = new Headers();
        misCabeceras.append('Content-Type', 'application/json');

        var miInit = {
            method: 'PUT',
            headers: misCabeceras,
            body: JSON.stringify(datos)
        };

        var promise = fetch(url, miInit).then(
            (response) => {

                return response.json();
            }
        );


        return promise;
    }

    static _delete(url) {
        Utils._pintaModalLoading();

        var misCabeceras = new Headers();
        misCabeceras.append('Content-Type', 'application/json');

        var miInit = {
            method: 'DELETE',
            headers: misCabeceras
        };

        var promise = fetch(url, miInit).then(
            (response) => {

                return response.json();
            }
        );


        return promise;
    }

    static _deleteParametros(url, datos) {
        Utils._pintaModalLoading();

        var misCabeceras = new Headers();
        misCabeceras.append('Content-Type', 'application/json');

        var miInit = {
            method: 'DELETE',
            headers: misCabeceras,
            body: JSON.stringify(datos)
        };

        var promise = fetch(url, miInit).then(
            (response) => {

                return response.json();
            }
        );


        return promise;
    }
}