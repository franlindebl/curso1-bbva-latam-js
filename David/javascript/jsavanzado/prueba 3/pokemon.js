class Pokemon {
    constructor(nombre, url) {
        this._nombre = nombre;
        this._urlDetalle = url;
    }

    pintarPagina(funcionverDetalle) {

        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');

        var btoVerDetalle = document.createElement('button');

        tr.appendChild(td1);
        tr.appendChild(td3);
        
        td3.appendChild(btoVerDetalle);

        btoVerDetalle.id = 'botonTomarNota';
        btoVerDetalle.type = 'button';
        btoVerDetalle.textContent = 'Ver Detalles';
        btoVerDetalle.className = "btn btn-primary btn-sm";
        btoVerDetalle.addEventListener("click", () => funcionverDetalle(this._urlDetalle));

        td1.textContent = this._nombre;
        return tr;
    }
}

class PokemonDetalle {
    constructor(nombre, imagen, peso, altura) {
        this._nombre = nombre;
        this._imagen = imagen;
        this._peso = peso;
        this._altura = altura;
    }

    pintarPagina() {

        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var imgPokemon = document.createElement('img');
        imgPokemon.className = "img-circle";


        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        td2.appendChild(imgPokemon);

        imgPokemon.src = this._imagen;
        td1.textContent = this._nombre;
        td3.textContent = this._peso;
        td4.textContent = this._altura;
        return tr;
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

class PokemonApi {
    constructor() {
        this._urlBase = "http://pokeapi.co/api/v2/pokemon";
        this._apiClient = new ApiClient();
    }

    getPokemonsAtPage(numeroPagina) {
        let urlCompleta = this._urlBase + '/?offset=' + numeroPagina;
        var promise = this._apiClient.get(urlCompleta).then((data) => {
            let arrayPokemones = [];
            for (let i = 0; i < data.length; i++) {
                let elem = data[i];
                let pokemon = new Pokemon(elem.count, elem.next, elem.previous);
                arrayPokemones.push(pokemon);
            }
            return arrayPokemones;
        });
        return promise;
    }

    getPokemonsAtPage(numeroPagina) {
        let urlCompleta = this._urlBase + '/?offset=' + numeroPagina;
        var promise = this._apiClient.get(urlCompleta).then((data) => {
            let arrayPokemones = [];
            for (let i = 0; i < data.results.length; i++) {
                let elem = data.results[i];
                let pokemon = new Pokemon(elem.name, elem.url);
                arrayPokemones.push(pokemon);
            }
            return arrayPokemones;
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

class Pokedex {
    constructor(count, next, previous) {
        this._count = count;
        this._next = next;
        this._previous = previous;
        this._pokemones = [];
        this._pokemonClient = new PokemonApi();
        this.pintarEstructura();
        this._nro=0;
    }

    pintarEstructura() {
        document.getElementById("estructura").innerHTML = "";
        var header = document.getElementById("header");
        let fila = "";
        fila = fila + '<div id="header" class="row">La Pokedek Xanxa!!!<p></div>';
        fila = fila + '<div class="row"><div class="col-xs-6 col-md-4"><table id="pokemones" class="table table-striped"></table></div>';
        fila = fila + '<div class="col-xs-6 col-md-4"><table id="pokemonesDetalle" class="table table-striped"></table></div>';
        fila = fila + '</div>';
        return document.getElementById("estructura").innerHTML = fila;
    }

    getPokemones() {
        this._pokemonClient.getPokemonsAtPage(this._nro).then((data) => {
            this._pokemones = data;
            this.pintarPokemones(this._pokemones);
        });
    }

    getUrlPokemones(url) {
        console.log("url", url);
        this._pokemonClient.getPokemonByUrl(url).then((data) => {
            this._pokemones = data;
            this.pintarDetallePokemones(this._pokemones);
        });
    }

    pintarDetallePokemones(pokemones) {
        document.getElementById("pokemonesDetalle").innerHTML = "";
        let tbodyInner = document.createElement("tbody");
        for (let i = 0; i < pokemones.length; i++) {
            let pokemondetalle = pokemones[i];
            tbodyInner.appendChild(pokemondetalle.pintarPagina());
        }
        document.getElementById("pokemonesDetalle").appendChild(tbodyInner)
    }

    pintarPokemones(pokemones) {
        var funcionVerDetalle = (url) => this.getUrlPokemones(url);
        document.getElementById("pokemones").innerHTML = "";
        let tbodyInner = document.createElement("tbody");
        for (let i = 0; i < pokemones.length; i++) {
            let pokemon = pokemones[i];
            tbodyInner.appendChild(pokemon.pintarPagina(funcionVerDetalle));
        }
        document.getElementById("pokemones").appendChild(tbodyInner)
    }

    pintar() {
        var botonAnterior = document.createElement('button');
        botonAnterior.id = 'botonTomarNota';
        botonAnterior.type = 'button';
        botonAnterior.textContent = 'Anterior';
        botonAnterior.className = "btn btn-primary btn-sm";
        botonAnterior.onclick = () => this.getPokemones(this.anterior());
        header.appendChild(botonAnterior);

        var spamText = document.createElement('spam');
        spamText.textContent = '    Pagina Actual :' ;
        header.appendChild(spamText);

        var spamNro = document.createElement('spam');
        spamNro.id = 'nropagina';
        header.appendChild(spamNro);

        var botonSiguiente = document.createElement('button');
        botonSiguiente.id = 'botonTomarNota';
        botonSiguiente.type = 'button';
        botonSiguiente.textContent = 'Siguiente';
        botonSiguiente.className = "btn btn-primary btn-sm";
        botonSiguiente.onclick = () => this.getPokemones(this.siguiente());
        header.appendChild(botonSiguiente);

    }
    siguiente(){
        document.getElementById("pokemonesDetalle").innerHTML = "";
        this._nro = this._nro+20;
        this.getPokemones(this._nro);
        document.getElementById("nropagina").innerHTML = this._nro;

    }
    anterior(){
        document.getElementById("pokemonesDetalle").innerHTML = "";
        this._nro = this._nro-20;
        if (this._nro < 0 ){
            this._nro = 0;
        }
        this.getPokemones(this._nro);
        document.getElementById("nropagina").innerHTML = this._nro;
    }
    IniciarPokemones() {
        this.pintar();
        this.getPokemones()
    }
}

let misPokemones = null;
window.onload = () => {
    var misPokemones = new Pokedex();
    console.log(misPokemones);
    misPokemones.IniciarPokemones();
}