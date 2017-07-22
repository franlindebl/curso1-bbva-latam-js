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
    post(url, data) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        
        var miInit = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data)
        };

        var promise = fetch(url, miInit).then(
            (response) => {
                console.log(response);
                return response.json();
            }
        );

        return promise;
    }

    delete(url) {
        var misCabeceras = new Headers();
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

    put(url, data) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        
        var miInit = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(data)
        };

        var promise = fetch(url, miInit).then(
            (response) => {
                return response.json();
            }
        );

        return promise;
    }
}
