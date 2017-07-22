function hacerGetDePersonajes() {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://ironhack-characters.herokuapp.com/characters");
    xhr.onreadystatechange = function (response) {
        console.log(xhr.responseText);
    }

    xhr.send();

    return true;
}

function hacerPostDePersonajes() {
    var peticion = new XMLHttpRequest();

    peticion.open("POST", "https://ironhack-characters.herokuapp.com/characters");
    peticion.onreadystatechange = function (response) {
        if (peticion.readyState === 4) {
            console.log(peticion.responseText);
        }
    }

    var data = new FormData();

    data.append("name", "Nuevo Personaje de Fran");
    data.append("occupation", "Asesinar alumnos");
    data.append("debt", true);
    data.append("weapon", "Tengo un cuchillo xanxo");

    console.log('data:', data);

    peticion.send(data);

    return true;
}

// Usando Fech

function hacerGetDePersonajesConFetch() {
    var url = "https://ironhack-characters.herokuapp.com/characters";
    var misCabeceras = new Headers();

    var miInit = {
        method: 'GET',
        headers: misCabeceras,
        mode: 'cors',
        cache: 'default'
    };
    /*
        fetch(url, miInit)
            .then(
            (response) => {
                console.log(response);
                response.json().then(
                    (dataEnJson) => console.log(dataEnJson)
                );
            });
    */

    var prueba = fetch(url, miInit).then(
        (response) => response.json()
    ).then(
        (dataEnJson) => {
            console.log(dataEnJson);
            return true;
        }
    );
}

hacerGetDePersonajesConFetch();