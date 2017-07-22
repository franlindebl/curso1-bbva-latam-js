class APIClient {
    constructor() {}
    get(url) {
        // var url = "http://tuabogadodeaccidentes.es/api/";
        let misCabeceras = new Headers();
        let miInit = {
            method: 'GET',
            headers: misCabeceras
        };

        var promesa = fetch(url, miInit).then(
            (response) => {
                console.log("Se hizo la conexion");

                return response.json();
            }
        );
        return promesa;
    }

    delete(url, pass) {
        // var url = "http://tuabogadodeaccidentes.es/api/";
        let misCabeceras = new Headers();
        misCabeceras.append('Content-Type', 'application/json');    
        let miInit = {};
        if (!pass) {
            miInit = {
                method: 'DELETE',
                headers: misCabeceras
            };
            //Borrado de Usuario pasandole password
        } else {
            miInit = {
                method: 'DELETE',
                headers: misCabeceras,
                body: JSON.stringify(pass)
            };
        }
        var promesa = fetch(url, miInit).then(
            (response) => {
                console.log("Se hizo la conexion y borrado");

                return response.json();
            }
        );
        return promesa;
    }

    put(datos, url) {

       let misCabeceras = new Headers();
        misCabeceras.append('Content-Type', 'application/json');
        let miInit = {
            method: 'PUT',
            headers: misCabeceras,
            body: JSON.stringify(datos)
        };
        var promesa = fetch(url, miInit).then(
            (response) => {
                console.log("Se hizo la conexion Modificacion");

                return response.json();
            }
        );
        return promesa;
    }

    post(datos, url) {
        let misCabeceras = new Headers();
        misCabeceras.append('Content-Type', 'application/json');
        let miInit = {
            method: 'POST',
            headers: misCabeceras,
            body: JSON.stringify(datos)
        };
        var promesa = fetch(url, miInit).then(
            (response) => {
                console.log("Se hizo la conexion y se Agrego Registro");

                return response.json();
            }
        );
        return promesa;
    }
}
