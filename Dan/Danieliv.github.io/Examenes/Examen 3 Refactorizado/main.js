class Pokemon {
    constructor(nombre, urlDetalles) {
        this._nombre = nombre;
        this._urlDetalles = urlDetalles;
    }

    getRowForTable() {
        let fila = '';
        fila = fila + '<tr>';;
        fila = fila + '<td>' + this._nombre + '</td>';
        // FALLO
        fila = fila + '<td><button class="btn btn-warning"><a role="button" href="' + this._urlDetalles + '">Ver Detalles</a></button></td>';
        fila = fila + '</tr>';

        return fila;
    }
}

class PokemonApi {
    constructor() {
        this._urlBase = "http://pokeapi.co/api/v2/pokemon";
        this._apiClient = new APIClient();
    }

    calculaPagina() {

// Página n: offset = (n-1)*20
    }



    getPokemonsAtPage(offset) {
        let urlCompleta = this._urlBase + '/?offset='+offset;

        let promise = this._apiClient.get(urlCompleta).then((data) => {
            var arrayPokemon = [];
            for (let i = 0; i < data.results.length; i++) {
                let elem = data.results[i];
                // console.log(data.next);
                let pokemon = new Pokemon(elem.name, elem.url);
                arrayPokemon.push(pokemon);
            }
            // console.log(arrayPokemon);
            return arrayPokemon;
        });
        return promise;
    }

    getPokemonByUrl(urlDePokemon) {
        let urlCompleta = urlDePokemon;
        var promise = this._apiClient.get(urlCompleta).then((data) => {
            let arrayPokemones = [];
                let elem = data;
                let pokemon = new PokemonDetalle(elem.name, elem.sprites.back_default, elem.weight, elem.height);
                arrayPokemones.push(pokemon);
            return arrayPokemones;
        });
        return promise;
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


class Pokedex {
    constructor(totalPokemons, anterior, siguiente, paginaActual = 1) {
        this._totalPokemons = totalPokemons;
        this._anterior = anterior;
        this._siguiente = siguiente;
        this._pokemons = [];
        this._paginaActual = paginaActual;
        this._pokemonApi = new PokemonApi;
        // this.pintarEstructura();
        this._offset=0;
    }

    getPokemon() {
            this._pokemonApi.getPokemonsAtPage(this._offset).then((data) => {
            this._pokemons = data;
            this.pintarPokemon(this._pokemons);
        });
    }

    getUrlPokemons(url) {
        this._pokemonApi.getPokemonByUrl(url).then((data) => {
            this._pokemons = data;
            this.pintarDetallePokemones(this._pokemons);
        });
    }

    pintarDetallePokemones(pokemons) {
        document.getElementById("rigth").innerHTML = "";
        let tbodyInner = document.createElement("tbody");
        for (let i = 0; i < pokemons.length; i++) {
            let pokemondetalle = pokemons[i];
            tbodyInner.appendChild(pokemondetalle.pintarPagina());
        }
        document.getElementById("rigth").appendChild(tbodyInner)
    }

    pintarEstructura() {
        var body = document.getElementById('body');

        let container = document.createElement('DIV');
        container.setAttribute("id", "container");
        container.setAttribute("class", "container text-center");
        document.getElementById('body').appendChild(container);

        let titulo = document.createElement('h1');
        let title = document.createTextNode("La Pokedex Xanxa!");
        titulo.appendChild(title);
        document.getElementById('container').appendChild(titulo);

        let menu = document.createElement('DIV');
        menu.setAttribute("id", "menu");
        document.getElementById('container').appendChild(menu);
        
        let left = document.createElement('DIV');
        left.setAttribute("id", "left");
        left.setAttribute("class", "col-md-6");
        document.getElementById('container').appendChild(left);

        let rigth = document.createElement('DIV');
        rigth.setAttribute("id", "rigth");
        rigth.setAttribute("class", "col-md-6");
        document.getElementById('container').appendChild(rigth);

        let divTable = document.createElement('DIV');
        divTable.setAttribute("id", "divTable");
        divTable.setAttribute("class", "table-responsive");
        document.getElementById('left').appendChild(divTable);

        let tablePokemon = document.createElement('table');
        tablePokemon.setAttribute("id", "tablePokemon");
        tablePokemon.setAttribute("class", "table table-hover");
        document.getElementById('divTable').appendChild(tablePokemon);

        let thead = document.createElement('thead');
        thead.setAttribute("id", "thead");
        document.getElementById('tablePokemon').appendChild(thead);

        let tbody = document.createElement('tbody');
        tbody.setAttribute("id", "tbody");
        document.getElementById('tablePokemon').appendChild(tbody);

        let tr = document.createElement('tr');
        tr.setAttribute("id", "tr");
        document.getElementById('thead').appendChild(tr); 

        let tdName = document.createElement('td');
        tdName.setAttribute("id", "tdName");
        let textTDName = document.createTextNode("Nombre");
        tdName.appendChild(textTDName);
        document.getElementById('tr').appendChild(tdName);

        let tdAction = document.createElement('td');
        tdAction.setAttribute("id", "tdAction");
        let textTDAction = document.createTextNode("Acción");
        tdAction.appendChild(textTDAction);
        document.getElementById('tr').appendChild(tdAction);

        let previousButton = document.createElement("BUTTON");
        previousButton.setAttribute("class", "btn btn-info btn-sm");
        let textPreviousButton = document.createTextNode("< Anterior");
        previousButton.appendChild(textPreviousButton);

        let node = document.createElement("H4");
        let textnode = document.createTextNode("Página actual " + this._paginaActual);
        node.appendChild(textnode);

        let nextButton = document.createElement("BUTTON");
        nextButton.setAttribute("id", "next");
        nextButton.setAttribute("class", "btn btn-info btn-sm");
        let textnextButtont = document.createTextNode("Siguiente >");
        nextButton.appendChild(textnextButtont);

        document.getElementById("menu").appendChild(previousButton);
        document.getElementById("menu").appendChild(node);
        document.getElementById("menu").appendChild(nextButton);

        previousButton.addEventListener("click", () => {
            this.getPokemon();
            document.getElementById("rigth").innerHTML = "";
            this._offset = this._offset-20;
            if (this._offset < 0 ){
                this._offset = 0;
            }
            this.getPokemon(this._offset);
        });       

         nextButton.addEventListener("click", () => {
                 this.getPokemon();
                document.getElementById("rigth").innerHTML = "";
                this._offset = this._offset+20;
                this.getPokemon(this._offset);
            });
    }

    pintarPokemon(pokemon) {
        var verDetalles = (url) => this.getUrlPokemones(url);
        document.getElementById("tbody").innerHTML = "";
        let tbodyInner = " ";
        for (let i = 0; i < pokemon.length; i++) {
            let pokemons = pokemon[i];
            tbodyInner = tbodyInner + pokemons.getRowForTable(verDetalles);
            // console.log(pokemon[i]);
        }
        document.getElementById("tbody").innerHTML = tbodyInner;
    }

    startPokedex() {
        this.pintarEstructura();
        this.getPokemon();
    }

}
let miPokedex = null;
window.onload = function() {
    miPokedex = new Pokedex;
    miPokedex.startPokedex();
    // console.log(miPokedex);
}