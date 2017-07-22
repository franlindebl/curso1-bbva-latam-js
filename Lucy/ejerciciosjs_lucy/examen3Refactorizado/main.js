class Pokedex {
    constructor() {
        this._pokemons = [];
        this._paginaActual = 1;
        this._numeroTotal = 0;

        this._pokemonAPI = new PokemonAPI();
    }
    traerPokemonsDeLaPagina(number) {

        this._pokemonAPI.getPokemonsAtPage(number).then(
            (data) => {

                this._pokemons = data;
                this.pintarEstructura();
            }
        );
    }
    traerDetallePokemos(urlDePokemon) {

        this._pokemonAPI.getPokemonByUrl(urlDePokemon).then(
            (data) => {
                let detalle = document.getElementById("detalle");
                let htmlDetalle = '<div>Detalle del Pokemon</div>';
                htmlDetalle = htmlDetalle + '<div><img src="' + data.imagen + '"></div>';
                htmlDetalle = htmlDetalle + '<div>Nombre: ' + data.nombre + '</div>';
                htmlDetalle = htmlDetalle + '<div>Peso: ' + data.peso + '</div>';
                htmlDetalle = htmlDetalle + '<div>Altura: ' + data.altura + '</div>';
                detalle.innerHTML = htmlDetalle;

            }
        );

    }
    anteriorPersonajes() {
        if (this._paginaActual > 0) {
            this._paginaActual = this._paginaActual - 1;
            this.traerPokemonsDeLaPagina(this._paginaActual);
        }
    }
    siguientePersonajes() {
        this._paginaActual = this._paginaActual + 1;
        this.traerPokemonsDeLaPagina(this._paginaActual);
    }
    pintarEstructura() {
        document.getElementById("main").innerHTML = "";

        let miDiv = document.createElement("div");
        miDiv.id = "añadirPersonaje";
        miDiv.setAttribute("class", "columna-der");
        document.body.appendChild(miDiv);

        let iAñadir = document.createElement("h3");
        iAñadir.innerHTML = "La Pokedex Xanxa";
        document.getElementById(miDiv.id).appendChild(iAñadir);

        let divAgrPersonajes = document.createElement("div");
        divAgrPersonajes.setAttribute("class", "agregar-veh");
        miDiv.appendChild(divAgrPersonajes);

        let btnAnterior = document.createElement("button");
        btnAnterior.setAttribute("class", "btn-traer");
        btnAnterior.setAttribute("id", "anterior");
        btnAnterior.innerHTML = "< Anterior";
        btnAnterior.addEventListener("click", (() => this.anteriorPersonajes()));
        divAgrPersonajes.appendChild(btnAnterior);


        let divNombre = document.createElement("div");
        divNombre.setAttribute("class", "vel-veh");
        let i = document.createElement("i");
        i.setAttribute("id", "paginaAct");
        i.innerHTML = "Pagina actual:" + this._paginaActual;
        divNombre.appendChild(i);
        divAgrPersonajes.appendChild(divNombre);

        let btnSiguiente = document.createElement("button");
        btnSiguiente.setAttribute("class", "btn-traer");
        btnSiguiente.setAttribute("id", "siguiente");
        btnSiguiente.innerHTML = "Siguiente >";
        btnSiguiente.addEventListener("click", (() => this.siguientePersonajes()));
        divAgrPersonajes.appendChild(btnSiguiente);

        let parteMedia = document.createElement("div");
        parteMedia.id = "row";
        parteMedia.setAttribute("class", "col-xs-6 col-sm-6 col-md-6 col-lg-6 listado");
        document.body.appendChild(parteMedia);

        let carta = "<h3>Listado de Pokemons:</h3>";
        carta = carta + this.getCabeceraFor() + this.getFooterFor();

        let divDetalles = document.createElement("div");
        divDetalles.id = "detalle";
        divDetalles.setAttribute("class", "col-xs-6 col-sm-6 col-md-6 col-lg-6");
        document.body.appendChild(divDetalles);

        document.getElementById("row").innerHTML = carta;

        document.getElementById("tbody").innerHTML = this.getTBodyFor();
        this.crearBotones();
    }
    getCabeceraFor() {
        let cabecera = "";

        cabecera = cabecera + '<table class="table-striped">';
        cabecera = cabecera + '<thead>';
        cabecera = cabecera + '<tr>';
        cabecera = cabecera + '<td>Nombre</td>';
        cabecera = cabecera + '<td>Acciones</td>';
        cabecera = cabecera + '</tr>';
        cabecera = cabecera + '</thead>';
        cabecera = cabecera + '<tbody id="tbody">'

        return cabecera;
    }
    getTBodyFor() {
        let tbodyInner = "";

        for (var i = 0; i < this._pokemons.length; i++) {
            let pokemon = this._pokemons[i];
            tbodyInner = tbodyInner + pokemon.getRowForPokemon(i);
        }

        return tbodyInner;
    }
    getFooterFor() {
        let footer = "";

        footer = footer + '</tbody>';
        footer = footer + '</table>';

        return footer;
    }
    crearBotones() {
        for (var i = 0; i < this._pokemons.length; i++) {
            let btnDetalle = document.createElement("button");
            let pokemon = this._pokemons[i];
            let tdParent = document.getElementById("boton" + i);
            btnDetalle.setAttribute("class", "btn-traer");
            btnDetalle.innerHTML = "Detalle";
            btnDetalle.addEventListener("click", (() => this.traerDetallePokemos(pokemon._urlDetalle)));
            tdParent.appendChild(btnDetalle);
        }
    }
}

class Pokemon {
    constructor(name, url) {
        this._nombre = name;
        this._urlDetalle = url;
    }
    getRowForPokemon(i) {

        let fila = "";

        fila = fila + '<tr>';
        fila = fila + '<td>' + this._nombre + '</td>';
        fila = fila + '<td id="boton' + i + '"></td>';
        fila = fila + '</tr>';

        return fila;
    }
}

class ApiClient {
    constructor() {

    }
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
}

class PokemonAPI {
    constructor() {
        this._urlBase = "http://pokeapi.co/api/v2/pokemon/?";
        this._apiClient = new ApiClient();
    }
    getPokemonsAtPage(numeroPagina) {
        let calculoOffset = (numeroPagina -1)*20;
        let urlCompleta = this._urlBase + 'offset=' + calculoOffset;
        let promise = this._apiClient.get(urlCompleta).then((data) => {
            let arrayPokemons = [];

            for (let i = 0; i < data.results.length; i++) {
                let elem = data.results[i];
                let pokemon = new Pokemon(elem.name, elem.url);
                arrayPokemons.push(pokemon);
            }
            return arrayPokemons;
        });
        return promise;

    }
    getPokemonByUrl(urlDePokemon) {

        let promise = this._apiClient.get(urlDePokemon).then((data) => {
            let pokemon = {
                nombre: data.name,
                imagen: data.sprites.back_default,
                peso: data.weight,
                altura: data.height
            };
            return pokemon;
        });
        return promise;

    }
}
var pokedex = null;

window.onload = () => {

    pokedex = new Pokedex();
    pokedex.traerPokemonsDeLaPagina(1);
}