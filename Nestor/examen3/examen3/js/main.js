class Pokedex {
    constructor() {
        this._arrayPokemoActual = [];
        this._paginaActual = 1;
        this._numeroTotalPokemon = 811;
        this._pokemonApi = new PokemonApi();
        this._paginaEstado = 0;
    }

    obtenerTotalPokemos(paginaEstado) {
        this._arrayPokemoActual.length = 0;
        this._pokemonApi.getPokemonsAtPage(paginaEstado, this).then((data) => {
            this._arrayPokemoActual = data;
        })
    }

    //Pintado de HTML

    pintarEstructuraPokedex() {

        let botonesTop = "";
        let presentaPokemon
        let presentaPokemonsDetalle = "";
        let innerBodyNuevo = "";

        botonesTop = this.obtenerDivBotonesTop();
        presentaPokemon = this.obtenerDivCajaPresentaPokemons();
        presentaPokemonsDetalle = this.obtenerDivpresentaPokemonsDetalle();
        innerBodyNuevo = innerBodyNuevo + botonesTop + presentaPokemon + presentaPokemonsDetalle;
        document.getElementsByClassName("container")[0].innerHTML = innerBodyNuevo;
        this.agregarBotones();
        this.obtenerTotalPokemos();

    }
    obtenerDivBotonesTop() {
        let fila = "";
        fila = fila + '<div class="row botonesNavegacion" id="BotonesAccion">';
        //fila = fila + '<button class="button-main" onclick="this.ingresaNuevoGrupo()">Traer Clientes </button>';
        fila = fila + '</div>';
        return fila;
    }

    agregarBotones() {

        let divButtonsBox = "";
        divButtonsBox = document.querySelector("div.botonesNavegacion");

        let divBotones = document.createElement("div");

        let btnAnterior = document.createElement("button");
        var t = document.createTextNode("Anterior");
        btnAnterior.appendChild(t);
        divButtonsBox.appendChild(btnAnterior);
        btnAnterior.addEventListener('click', () => this.obtenerAnteriorPagina());
        btnAnterior.setAttribute("class", 'btn-primary button-main');
        divButtonsBox.appendChild(btnAnterior);

        let textPaginaActual = document.createElement("P");
        var textP = document.createTextNode("Pagina Actual " + this._paginaActual);
        textPaginaActual.appendChild(textP);
        divButtonsBox.appendChild(textPaginaActual);

        let btnSiguiente = document.createElement("button");
        var t = document.createTextNode("siguiente");
        btnSiguiente.appendChild(t);
        divButtonsBox.appendChild(btnSiguiente);
        btnSiguiente.addEventListener('click', () => this.obtenerSiguientePagina());
        btnSiguiente.setAttribute("class", 'btn-primary button-main');
        divButtonsBox.appendChild(btnSiguiente);

    }
    obtenerSiguientePagina() {

        //this.obtenerDivCajaPresentaPokemons();
        if (this._paginaEstado >= 0 && this._paginaEstado < this._numeroTotalPokemon) {
            document.getElementsByClassName("presentaPokemonsTabla")[0].innerHTML = "";
            this._paginaEstado = this._paginaEstado + 20;
            //this._paginaActual = this._paginaEstado / 20;
            this.obtenerTotalPokemos(this._paginaEstado);

            console.log(this._paginaEstado);
        }
    }
    obtenerAnteriorPagina() {
        //this.obtenerDivCajaPresentaPokemons();
        if (this._paginaEstado > 0 && this._paginaEstado < this._numeroTotalPokemon) {
            document.getElementsByClassName("presentaPokemonsTabla")[0].innerHTML = "";

            this._paginaEstado = this._paginaEstado - 20;
            this.obtenerTotalPokemos(this._paginaEstado);

            console.log(this._paginaEstado);
        }
    }

    obtenerDivCajaPresentaPokemons() {
        let fila = "";
        fila = fila + '<div class="row">';
        fila = fila + '<div class="col-sm-4 presentaPokemons" id="CajasPresentaPokemons">';
        //fila = fila + '<button class="button-main" onclick="this.ingresaNuevoGrupo()">Traer Clientes </button>';
        fila = fila + '<table class="table">';
        fila = fila + '<tbody class="presentaPokemonsTabla"  id="tableCajasPresentaPokemons">';
        fila = fila + '<tr>';
        fila = fila + '<th> Nombre';
        fila = fila + '</th>';
        fila = fila + '<th> Accion';
        fila = fila + '</th>';
        fila = fila + '</tr>';

        fila = fila + '</tbody>';
        fila = fila + '</table>';
        fila = fila + '</div>';

        return fila;
    }
    obtenerDivpresentaPokemonsDetalle() {
        let fila = "";
        fila = fila + '<div class=" col-sm-8 presentaPokemonsDetalle" id="CajaPresentaPokemonsDetalle">';
        //fila = fila + '<button class="button-main" onclick="this.ingresaNuevoGrupo()">Traer Clientes </button>';

        fila = fila + '</div>';
        fila = fila + '</div>';
        return fila;
    }

}

class Pokemon {
    constructor(nombre, url, peso, pokedex) {
        this._nombre = nombre;
        this._urlDetalle = url;
        this._peso = "";
        this.pintarHTMLPokemon();
        this._pokedex = pokedex;
        this._imagen = "";
    }

    pintarHTMLPokemon() {

        let body = document.getElementById("tableCajasPresentaPokemons");
        //var tabla = document.createElement("table");
        //var tblBody = document.createElement("tbody");
        var fila = document.createElement("tr");

        var celdaN = document.createElement("td");
        var textoNombre = document.createTextNode(this._nombre);
        var celdaA = document.createElement("td");
        var botonA = document.createElement("button");
        var textoBotonAccion = document.createTextNode("Accion");
        botonA.setAttribute("class", 'btn-primary button-main');

        //botonA.addEventListener('click', () => this.mostrarDetalle());
        botonA.addEventListener('click', () => this.obtenerPokemonPordetalle(this._pokedex._paginaEstado, this._urlDetalle));

        body.appendChild(fila);
        //tabla.appendChild(tblBody);
        //tblBody.appendChild(fila);
        fila.appendChild(celdaN);
        fila.appendChild(celdaA);

        celdaN.appendChild(textoNombre);
        celdaA.appendChild(botonA);
        botonA.appendChild(textoBotonAccion);

        //tabla.setAttribute("border", "2");

    }
    obtenerPokemonPordetalle(paginaEstado, url) {
        //this._arrayPokemoActual.length = 0;
        this._pokedex._pokemonApi.getPokemonByUrl(paginaEstado, url).then((data) => {
            //this._arrayPokemoActual = data;
            this._nombre = data.nombre;
            this._imagen = data.imagenes;
            this._peso = data.peso;
            this.mostrarDetalle();
        })
    }

    mostrarDetalle() {
        document.getElementsByClassName("presentaPokemonsDetalle")[0].innerHTML = "";
        let body = document.getElementById("CajaPresentaPokemonsDetalle");
        var tabla = document.createElement("table");
        var tblBody = document.createElement("tbody");
        var fila = document.createElement("tr");

        var celdaN = document.createElement("p");
        var textoNombre = document.createTextNode("Nombre:--> " + this._nombre);

        var celdaI = document.createElement("img");
        celdaI.src = this._imagen;
        var celdaP = document.createElement("p");
        var textoPeso = document.createTextNode("Peso --> " + this._peso);

        body.appendChild(tabla);
        tabla.appendChild(tblBody);
        tblBody.appendChild(fila);
        fila.appendChild(celdaN);
        fila.appendChild(celdaI);
        fila.appendChild(celdaP);
        celdaN.appendChild(textoNombre);
        celdaP.appendChild(textoPeso);
    }

}

class PokemonApi {
    constructor() {
        this._urlBase = "http://pokeapi.co/api/v2/pokemon";
        this._apiClient = new APIClient();
    }

    getPokemonsAtPage(pagina, pokedex) {
        let urlCompleta = this._urlBase + '/?offset=' + pagina;
        return this._apiClient.get(urlCompleta).then((data) => {
            let arrayPokemons = [];
            let objetoPokemons = "";
            console.log(arrayPokemons);
            for (let i = 0; i < data.results.length; i++) {
                let elem = data.results[i];
                //debugger;
                let nombre = data.results[i].name;
                let url = data.results[i].url;
                let Peso = data.results[i].weight;

                //let pokemon = ;
                arrayPokemons.push(new Pokemon(nombre, url, Peso, pokedex));
            }
            return arrayPokemons;
        });
        // let urlCompleta = this._urlBase + '/?offset=' + pagina;
        // return this._apiClient.get(urlCompleta).then((data) => {
        //     let numeroTotalPokemon = data.count;

        //     // for (let i = 0; i < data.length; i++) {
        //     //     let elem = data[i];
        //     //     let personaje = new Personaje(elem.name, elem.occupation, elem.debt, elem.weapon);
        //     //     arrayPersonajes.push(personaje);
        //     // }
        //     return numeroTotalPokemon;
        // });
    }
    getPokemonByUrl(pagina, url) {
        //let urlCompleta = this._urlBase + '/?offset=' + pagina;
        let urlCompleta = url
        return this._apiClient.get(urlCompleta).then((data) => {
            let arrayDatosPokemon = [];
            let objetoPokemons = {};
            console.log(arrayDatosPokemon);
            // for (let i = 0; i < data.results.length; i++) {
            //let elem = data.results[i];
            let nombre = data.name;
            //let url = data.results[i].url;
            let imagenes = data.sprites.front_default;

            let peso = data.weight;
            objetoPokemons.nombre = nombre;
            objetoPokemons.imagenes = imagenes;
            objetoPokemons.peso = peso
            //}
            return objetoPokemons;
        });
    }

}

class APIClient {
    constructor() {}
    get(url) {
        //var url = "https://ironhack-characters.herokuapp.com/characters";
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
}

let miPokedex = null;

window.onload = () => {
    miPokedex = new Pokedex();
    miPokedex.pintarEstructuraPokedex();
    //miPokedex.obtenerPokemonsPorPagina();
    //alm.pintarPersonajes();
    //alm.pintarEstructura();
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
