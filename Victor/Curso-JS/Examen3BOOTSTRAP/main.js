class Pokemon {
    constructor(nombre, UrlDetalle) {
        this._nombre = nombre;
        this._UrlDetalle = UrlDetalle;

        this._comun = new Comun();
    }

    _getRowForTable() {
        let fila = '';
        fila += '<td>' + this._nombre + '</td>';
        let id = this._UrlDetalle.split("/");
        fila += '<td><button id="btVerDetalle_' + id[6] + '" class="btn btn-primary">Ver Detalle</button>';

        return fila;
    }

    pintarRowPokemon(tbodyLista) {
        this._comun._pintarTR(tbodyLista, this._getRowForTable());
    }
}

class Pokedex {
    constructor() {
        this._pokemons = [];
        this._paginaActual = 1;
        this._numeroTotalPokemons = 0;

        this._pokemonApi = new PokemonApi();

        this._comun = new Comun();
        this._comun._pintarEstructura();
    }

	/*
    pintarEstructura() debe pintar la estructura básica de la Pokedex:
	En la parte superior tendremos un paginador que tendrá:
		- Número de página actual.
		- Botón de página siguiente y página anterior

	En la parte media mostrará una tabla con los pokemons. La tabla tendrá 2 columnas: 
		- Nombre: tendrá el nombre del pokemon
		- Acciones. tendrá un botón ver detalles cuya acción implementaremos más tarde
*/
    pintarEstructura() {
        this.pintarHeader();

        this._comun._addEventClick("#btnSiguiente", this.siguientePagina.bind(this));
        this._comun._addEventClick("#btnAnterior", this.anteriorPagina.bind(this));

        this.pintarTabla();
    }

    pintarHeader() {
        let estructura = '';
        estructura += '<div class="row"><div class="col-xs-6"><p><h1>La Pokedex Xanxa!</h1></p></div></div>';
        estructura += '<div class="row"><div class="col-xs-6"><div class="row">';
        estructura += '<div class="col-md-4"><button id="btnAnterior" class="btn btn-primary">< Anterior</button></div>';
        estructura += '<div id="paginaActual" class="col-md-4"><p class="text-center">Página actual: ' + this._paginaActual + '</p></div>';
        estructura += '<div class="col-md-4"><button id="btnSiguiente" class="btn btn-primary">Siguiente ></button></div>';
        estructura += '</div></div></div>';

        document.querySelector(".divHeader").innerHTML = estructura;
    }

    pintarTabla() {
        this._comun._pintarDivTabla(".divMain", "divLista");

        // Pintamos Tabla
        let divDestino = document.querySelector(".divLista");
        let tituloColumnas = ["Nombre", "Acciones"];
        this._comun._pintarEstructuraTabla(divDestino, null, tituloColumnas, "tbodyLista");
    }
    /*
        pintarPagina() debe rellenar la tabla con los pokemons de la página actual.
    */
    pintarPagina() {
        this._pokemonApi.getPokemonsAtPage(this._paginaActual).then(
            (data) => {
                this._pokemons = [];

                // pokemons, paginaActual, numeroTotalPokemons
                data.pokemons.forEach((pokemon) => {
                    this._pokemons.push(new Pokemon(pokemon._nombre, pokemon._UrlDetalle));
                });

                let tbodyLista = document.querySelector("#tbodyLista");
                tbodyLista.innerHTML = "";
                this._pokemons.forEach((pokemon) => pokemon.pintarRowPokemon(tbodyLista));

                this._numeroTotalPokemons = data.numeroTotalPokemons;

                let paginaActual = document.querySelector("#paginaActual");
                paginaActual.innerHTML = '<p class="text- center">Página actual: '+ (this._paginaActual) + '</p>';
            }
        );
    }

    pintarPokedex() {
        this.pintarEstructura();
        this.pintarPagina();
    }

    siguientePagina() {
        let n = this._paginaActual + 1;
        let siguientePagina = (n - 1) * 20;

        if (this._numeroTotalPokemons >= siguientePagina) {
            this._paginaActual += 1;
            this.pintarPagina();
        }
    }

    anteriorPagina() {
        let n = this._paginaActual - 1;
        let siguientePagina = (n - 1) * 20;

        console.info('siguientePagina:', siguientePagina);

        if (n > 0) {
            this._paginaActual -= 1;
            this.pintarPagina();
        }
    }
}

class APIClient {
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

class PokemonApi {
    constructor() {
        this._urlBase = "http://pokeapi.co/api/v2/pokemon";
        this._apiClient = new APIClient();
    }

    // - El método getPokemonsAtPage(numeroPagina): que devuelva el array de Pokemon de esa página.
    getPokemonsAtPage(numeroPagina) {
        let urlCompleta = this._urlBase + '/?offset=' + numeroPagina;

        let promise = this._apiClient.get(urlCompleta).then(
            (data) => {
                let arrayPokemons = [];

                data.results.forEach((pokemon) => {
                    arrayPokemons.push(new Pokemon(pokemon.name, pokemon.url));
                });

                return this.getObjPokedex(arrayPokemons, data.count);
            }
        );

        return promise;
    }

    getObjPokedex(arrayPokemon, numeroTotalPokemons) {
        return { "pokemons": arrayPokemon, "numeroTotalPokemons": numeroTotalPokemons };
    }

    // - El método getPokemonByUrl(urlDePokemon): que devuelva el Pokemon de esa URL.
    getPokemonByUrl(urlDePokemon) {
        let urlCompleta = urlDePokemon;

        let promise = this._apiClient.get(urlCompleta).then(
            (data) => {
                // Como no se indica algun parametro a devolver se retorna todo el objecto.

                return data;
            }
        );

        return promise;
    }
}

let miPokedex = new Pokedex();

miPokedex.pintarPokedex();