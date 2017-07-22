/*

1) 1 Punto

Modela la clase Pokedex, la cual será nuestra enciclopedia de pokemons.
La clase Pokedex deberá tener:

- Array de Pokemons (contendrá solo los pokemons de la página en la que nos encontremos)
- Página actual (numérico)
- Número total de pokemons

Modela la clase Pokemon. Pokemon deberá tener:

- Nombre
- UrlDetalle

2) 1 Punto

Modela la clase ApiClient que se encargue de realizar peticiones get genéricas.
Sólo recibirá la URL sobre la que ejecutará la petición y debe devoler el body de respuesta ya parseado.
Se valorará el uso de Promesas en vez de callbacks.

*/


class Pokemon {
    constructor(nombre, urlDetalle) {
        this._nombre = nombre;
        this._urlDetalle = urlDetalle;

        //this._imagen = imagen;
        //this._altura = altura;
        //this._peso = peso;
    }

    getRowForTable() {

        let fila = "";
        fila = fila + '<tr>';
        fila = fila + '<td>' + this._nombre + '</td>';
        //fila = fila + '<td>' + this._urlDetalle + '</td>';
        fila = fila + '<td>';
        fila = fila + '<button name="' + this._nombre + '" class="button-main" id ="' +this._id+ '">Ver Detalles</button>';
        fila = fila + '</td>';
        fila = fila + '<tr>';

        return fila;


    }

}



class Pokedex {
    constructor(pagActual, total) {
        this._pokemones = [];
        this._pagActual = pagActual;
        this._total = total;
        this._pokemonApi = new PokemonApi();


    }


pintarEstructura() {

        let miDiv = document.createElement("div");

        let estructura = '';
        estructura += '<div class="container">';
        estructura += '<div class="container1">';
        estructura += '<div class="row">';
        estructura += '<div class="col-sm-12 col-md-12 col-lg-12 bloque superior">';
        estructura += '<div class="divHeader"></div>';
        estructura += '</div>';
        estructura += '</div>';
        estructura += '</div>';
        estructura += '<div class="container2">';
        estructura += '<div class="row">';
        estructura += '<div class="col-sm-12 col-md-12 col-lg-12 bloque medio">';
        estructura += '<div class="divMain"></div>';
        estructura += '<div class="divModal">';
        estructura += '</div>';
        estructura += '</div>';
        estructura += '</div>';
        estructura += '</div>';  
        estructura += '</div>';
        estructura += '</div>';

        miDiv.innerHTML = estructura;

        document.querySelector("body").appendChild(miDiv);
    }






    getEstructuraTablaPersonaje() {
        let divfila = "";

        divfila += '<h2>Listado de Pokemones</h2>';
        divfila += '<table>';
        divfila += '<thead>';
        divfila += '<tr>';
        divfila += '<td>Nombre</td>';
        divfila += '<td>Acciones</td>';
        divfila += '</tr>';
        divfila += '</thead>';
        divfila += '<tbody id="tbodypokemones">';
        divfila += '</tbody>';
        divfila += '</table>';

        return divfila;
    }

//reemplazar por Modal
    getDetallePersonaje() {
        let divfila = "";

        divfila += '<h2>Detalle de Pokemones</h2>';
        divfila += '<image src="" id="tdimage"/>';
        divfila += '<table>';
        divfila += '<tr>';
        divfila += '<td>Nombre</td>';
        divfila += '<td id="tdnombre"></td>';
        divfila += '</tr>';
        divfila += '<tr>';
        divfila += '<td>Altura</td>';
        divfila += '<td id="tdaltura"></td>';
        divfila += '</tr>';
        divfila += '<tr>';
        divfila += '<td>Peso</td>';
        divfila += '<td id="tdpeso"></td>';
        divfila += '</tr>';
        divfila += '</table>';


        return divfila;
    }

////////


///// HEADER
    pintarEstructura() {

        let estructura = "";
        estructura += '<div class="fila-superior" id="divBoton">';
        estructura += '<h1>La Pokedex Xanxa!</h1>';
        estructura += '<p id="pagina"></p>';
        estructura += '<button class="button-main" onclick="" id="boton1">Pagina Actual</button>';
        estructura += '<button class="button-main" onclick="" id="boton2">Pagina Siguiente</button>';
        estructura += '</div>';
        estructura += '<div class="columna-izq">';
        estructura += this.getEstructuraTablaPersonaje();
        estructura += '</div>';
        estructura += '<div class="columna-der">';
        estructura += this.getDetallePersonaje();
        estructura += '</div>';
        document.getElementById("pokemon").innerHTML = estructura;


    }

     
/////////

            pintaListaPokemones(arrayPokemones) {
            this._pokemones = arrayPokemones;
            let tbodypokemones = document.querySelector("#tbodypokemones");
            tbodypokemones.innerHTML = "";
            console.log(this._pokemones);
             this._pokemones.forEach((pokemon) => {
                let tr = document.createElement("TR");
                tr.innerHTML = pokemon.getRowForTable();
                tbodypokemones.appendChild(tr);
                document.querySelector("#btDetalle" + pokemon._urlDetalle).addEventListener("click", this.detalleUsuario.bind(this, pokemon._urlDetalle));
/*
                console.log("entro aqui", this._pokemones[0]._url_adelante);
                var y = this._pokemones[0]._url_adelante;
                let next = "";
                next = document.getElementById("boton2");
                next.addEventListener("click", this.pintarPagina.bind(this, y));

                console.log("entro aqui", this._pokemones[0]._url_atras);
                var d = this._pokemones[0]._url_atras;
                let back = "";
                back = document.getElementById("boton1");
                back.addEventListener("click", this.pintarPagina.bind(this, d));
*/
           
            });


        }
    



    pintar() {
        this.pintarEstructura();
        //this.pintarHeader();
        this.pintaListaPokemones();
        //this.pintarPokemones();

    }




    /*
    pintarPagina(url) {

        if(url != null){

        let promise = this._pokemonApi.getPokemonsAtPage(url).then(
            (arrayPokemones) => {

                document.getElementById("tbodypokemones").innerHTML = ""; //primero borra
                let tbodyInner = "";


                for (let i = 0; i < arrayPokemones.length; i++) {
                    let pokemon = arrayPokemones[i];
                    //tbodyInner = tbodyInner + pokemon.getRowForTable(i);
                }
                document.getElementById("tbodypokemones").innerHTML = tbodyInner;
                
                this._pokemones = arrayPokemones;

                this.pintaListaPokemones(arrayPokemones);


            });
    }else {
        console.log("no hay mas");
    }


    }
*/





    mostrarDetalle(url) {
    console.log("entros", url);
        var url1 = url;
        var promise = this._pokemonApi.getPokemonByUrl(url1).then(
            (arrayPokemones1) => {

                console.log("datos iniciales", arrayPokemones1);
                //document.getElementById("tbodypokemones1").innerHTML = ""; //primero borra
                //let tbodyInner = "";
                //console.log(arrayPokemones1.length);
                /*for (var i = 0; i < arrayPokemones1.length; i++) {
                    let pokemon = arrayPokemones1[i];
                    tbodyInner = tbodyInner + pokemon.getRowForTable2(i);
                    tbodyInner = arrayPokemones1[0];
                }
                document.getElementById("tbodypokemones1").innerHTML = tbodyInner;
                */
               let tbodyInner = arrayPokemones1[0];
                let tbodyInner1 = arrayPokemones1[1];
                let tbodyInner2 = arrayPokemones1[2];
                let tbodyInner3 = arrayPokemones1[3];

                document.getElementById("tdimage").src = tbodyInner;
                document.getElementById("tdnombre").innerHTML = tbodyInner1;
                document.getElementById("tdaltura").innerHTML = tbodyInner2;
                document.getElementById("tdpeso").innerHTML = tbodyInner3;


            });

    }



}



class PokemonApi {
    constructor() {
        this._urlBase = "http://pokeapi.co/api/v2/pokemon/";
        this._apiClient = new APIClient();
    }

    getPokemonsAtPage(url) {
        let urlCompleta = url;
        var promise = this._apiClient.get(urlCompleta).then(
            (data) => {
                let arrayPokemones = [];
                console.log("datos recuperados", data.results);
                var url_adelante = data.next;
                var url_atras = data.previous;

                for (let i = 0; i < data.results.length; i++) {
                    let elem = data.results[i];
                    let id = i+1;
                    let pokemon = new Pokemon(elem.name, elem.url);
                    arrayPokemones.push(pokemon);

                }
                return arrayPokemones;
            }
        );

        return promise;

    }




    getPokemonByUrl(url) {

        //let urlCompleta = "http://pokeapi.co/api/v2/pokemon/2/";
        let urlCompleta = url;


        var promise = this._apiClient.get(urlCompleta).then(
            (data) => {
                console.log("datos recuperados");
                let arrayPokemones1 = [];
                console.log("datos recuperados", data);
                console.log("datos name", data.name);
                console.log("datos height", data.height);
                console.log("datos weight", data.weight);
                console.log("datos image", data.sprites.back_default);


                // let pokemon = new Pokemon(data.name, data.height, data.name, data.weight);
                //arrayPokemones1.push(pokemon);

                let name = data.name;
                let height = data.height;
                let weight = data.weight;
                let image = data.sprites.back_default;
                arrayPokemones1.push(image, name, height, weight, );



                console.log("allan", arrayPokemones1);

                return arrayPokemones1;
            }
        );

        return promise;

    }

}



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
}


let pokedex = null;
window.onload = () => {
    var url = "http://pokeapi.co/api/v2/pokemon/";
    var pokedex = new Pokedex();
    pokedex.pintar(url);
};
