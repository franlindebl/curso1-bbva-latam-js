class APIClient {
    constructor() {}
    get(url) {

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

    /*
        put(url, data) {
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            
            var init = {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify(data)
            };

            return fetch(url, init);
        }
      */

    delete(url, callback, datos) {
        let peticion = new XMLHttpRequest();
        peticion.open("DELETE", url);
        peticion.setRequestHeader("Content-Type", "application/json");
        peticion.onreadystatechange = function(response) {
            if (peticion.readyState === 4) {
                callback();
            }
        }
        var dataToSend = null;

        if (datos) {
            dataToSend = JSON.stringify(datos);
        }

        peticion.send(dataToSend);

        return true;
    }



    post(url, datos, callback) {

        let peticion = new XMLHttpRequest();
        peticion.open("POST", url);
        peticion.setRequestHeader("Content-Type", "application/json");
        peticion.onreadystatechange = function(response) {

            if (peticion.readyState == 4) {
                console.log(peticion.responseText);
                callback(peticion.responseText);
            }
        }
        var params = JSON.stringify(datos);
        peticion.send(params);

    }





    put(url, datos, callback) {

        let peticion = new XMLHttpRequest();
        peticion.open("PUT", url);
        peticion.setRequestHeader("Content-Type", "application/json");
        peticion.onreadystatechange = function(response) {

            if (peticion.readyState == 4) {
                console.log(peticion.responseText);
                callback();
            }
        }
        var params = JSON.stringify(datos);
        peticion.send(params);

    }



}
