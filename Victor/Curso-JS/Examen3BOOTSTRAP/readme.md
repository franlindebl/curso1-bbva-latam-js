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

3) 2 Puntos

Modela la clase PokemonApi que ofrezca:

- El método getPokemonsAtPage(numeroPagina): que devuelva el array de Pokemon de esa página.
- El método getPokemonByUrl(urlDePokemon): que devuelva el Pokemon de esa URL.

Esta clase deberá hacer uso de la clase ApiClient para pedir que haga el get de las URLs que necesite.
Al igual que en el anterior se valorará el uso de Promesas en vez de callbacks.

4) 2 Puntos 

Implementa las funciones pintarEstructura() y pintarPagina() en la clase pokedex .
Por ahora solo HTML y CSS, la funcionalidad de los botones puedes hacerla más tarde.

	pintarEstructura() debe pintar la estructura básica de la Pokedex:
	
		En la parte superior tendremos un paginador que tendrá:
			- Número de página actual.
			- Botón de página siguiente y página anterior

		En la parte media mostrará una tabla con los pokemons. La tabla tendrá 2 columnas: 
			- Nombre: tendrá el nombre del pokemon
			- Acciones. tendrá un botón ver detalles cuya acción implementaremos más tarde

	pintarPagina() debe rellenar la tabla con los pokemons de la página actual.


5) 1 Puntos

Haz que al cargar la página:
	- Se pinte la estructura de la pokedex.
	- Se pida la página 1
	- Se pinte la página actual

6) 1 Puntos

Implementa el paginador.
Cuando pulsemos en siguiente o anterior deberás pedir la página que corresponda al PokemonClient y posteriormente pintarla.

7) 2 Puntos

Implementa la funcionalidad del botón ver detalles:

	- Deberás pedir los detalles de ese Pokemon llamando a la función getPokemonByUrl de PokemonApi.
	- Deberás mostrar los detalles de ese pokemon, al menos:
		- Nombre
		- Una imagen (cualquiera dentro del array sprites)
		- Peso (weight)
		- Altura (height)

	Puedes hacer uso de una modal o mostrar los detalles debajo de la propia tabla.



INFO DE LA API:

URL de la API: http://pokeapi.co/api/v2/pokemon
URL de la API paginada: http://pokeapi.co/api/v2/pokemon/?offset=0

El offset en la API paginada es el número de pokemons que nos "saltamos", 
puesto que esta API devuelve los resultados de 20 en 20 para paginar debemos saltar de 20 en 20

Por ejemplo:

Página 1: http://pokeapi.co/api/v2/pokemon/?offset=0
Página 2: http://pokeapi.co/api/v2/pokemon/?offset=20
Página 3: http://pokeapi.co/api/v2/pokemon/?offset=40
..
..
..
Página n: offset = (n-1)*20


*/