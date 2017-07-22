class Persona {
	constructor() {
		this._nombre = getNombreAleatorio(nombresPersonas);
		this._edad = getRandomInteger(20, 60);
	}
}

class Camarero extends Persona {
	constructor() {
		super();
		this._cargo = getNombreAleatorio(cargoPersonal);
	}
}

class Cliente extends Persona {
	constructor() {
		super();
		this._dinero = getRandomInteger(0, 1500);
	}
}

class Mesa {
	constructor(idMesa) {
		this._idMesa = idMesa;
		this._ocupada = false;
		this._capacidad = getRandomInteger(2, 10);
		this._personas = [];
		this._ordenes = [];
	}

	_getMesa() {
		let mesa = '';
		mesa += '<div class="divMesa">';
		mesa += '<p><strong>ID:</strong> ' + this._idMesa + '</p>';
		mesa += '<p><strong>Ocupado:</strong> ' + this._ocupada + '</p>';
		mesa += '<p><strong>Numero Personas: </strong>' + this._personas.length + '</p>';
		mesa += '</div>';

		return mesa;
	}
}

class Producto {
	constructor(nombre, numeroExistencias, calorias, precio) {
		this._nombre = nombre;
		this._numeroExistencias = numeroExistencias;
		this._calorias = calorias;
		this._precio = precio;
	}
}

class Bebida extends Producto {
	constructor(nombre, numeroExistencias, calorias, precio, esAlcoholica, gradosAlcohol) {
		super(nombre, numeroExistencias, calorias, precio);
		this._esAlcoholica = esAlcoholica;
		this._gradosAlcohol = gradosAlcohol;
	}

	_getRowForTable() {
		let fila = '';
		fila += '<tr>'
		fila += '<td>' + this._nombre + '</td>';
		fila += '<td>' + this._numeroExistencias + '</td>';
		fila += '<td>' + this._calorias + '</td>';
		fila += '<td>' + this._precio + '€</td>';
		fila += '<td>' + this._gradosAlcohol + '</td>';
		fila += '</tr>'

		return fila;
	}
}

class Comida extends Producto {
	constructor(nombre, numeroExistencias, calorias, precio, tipo) {
		super(nombre, numeroExistencias, calorias, precio);
		this._tipo = tipo;
	}

	_getRowForTable() {
		let fila = '';
		fila += '<tr>'
		fila += '<td>' + this._nombre + '</td>';
		fila += '<td>' + this._numeroExistencias + '</td>';
		fila += '<td>' + this._calorias + '</td>';
		fila += '<td>' + this._precio + '€</td>';
		fila += '<td>' + this._tipo + '</td>';
		fila += '</tr>'

		return fila;
	}
}

class CartaProductos {
	constructor(bebidas, comidas) {
		this._bebidas = bebidas;
		this._comidas = comidas;
	}
}

class Restaurante {
	constructor(nombre) {
		this._nombre = nombre;
		this._mesas = [];
		this._camareros = [];
		this._cartaProductos = {};
	}

	_inicializaRestaurante(numeroMesas, numeroCamareros, numeroBebidas, numeroComidas) {
		for (let m = 0; m < numeroMesas; m++) {
			this._mesas.push(new Mesa(m));
		}

		for (let c = 0; c < numeroCamareros; c++) {
			this._camareros.push(new Camarero());
		}

		let bebidas = [];
		for (let b = 0; b < numeroBebidas; b++) {
			let gradoAlcohol = getRandomInteger(0, 20);
			bebidas.push(new Bebida("Bebida " + (b + 1), getRandomInteger(0, 100), getRandomInteger(15, 150), getRandomInteger(50, 1500), (gradoAlcohol == 0 ? false : true), gradoAlcohol));
		}

		let comidas = [];
		for (let c = 0; c < numeroComidas; c++) {
			comidas.push(new Comida("Comida " + (c + 1), getRandomInteger(0, 100), getRandomInteger(15, 1500), getRandomInteger(50, 1500), getNombreAleatorio(tipoComida)));
		}

		this._cartaProductos = new CartaProductos(bebidas, comidas);
	}

	_pintarEstructura() {
		document.getElementById("divCarta").innerHTML = "";

		let divCarta = "";
		divCarta += '<h2>Restaurante de Fran</h2>';
		divCarta += '<div class="divProductos">';
		divCarta += '<h4>#Carta</h4>';
		divCarta += '<table>';
		divCarta += '<thead>';
		divCarta += '<th>Nombre</th>';
		divCarta += '<th>Num. existencias</th>';
		divCarta += '<th>Calorias</th>';
		divCarta += '<th>Precio</th>';
		divCarta += '<th>Tipo</th>';
		divCarta += '</thead>';
		divCarta += '<tbody id="tbodyComida">';
		divCarta += '</tbody>';
		divCarta += '</table>';
		divCarta += '</div>';
		divCarta += '<div class="divProductos">';
		divCarta += '<h4>#Bebida</h4>';
		divCarta += '<table>';
		divCarta += '<thead>';
		divCarta += '<th>Nombre</th>';
		divCarta += '<th>Num. existencias</th>';
		divCarta += '<th>Calorias</th>';
		divCarta += '<th>Precio</th>';
		divCarta += '<th>% Alcohol</th>';
		divCarta += '</thead>';
		divCarta += '<tbody id="tbodyBebida">';
		divCarta += '</tbody>';
		divCarta += '</table>';

		document.getElementById("divCarta").innerHTML = divCarta;
	}

	_pintarRestaurante() {
		// Limpiamos el contenido de seccion Comida.
		document.getElementById("tbodyComida").innerHTML = "";

		// Limpiamos el contenido de seccion Bebidas.
		document.getElementById("tbodyBebida").innerHTML = "";

		let tbodyComida = "";
		for (let p = 0; p < this._cartaProductos._comidas.length; p++) {
			// console.info(this._cartaProductos._comidas[p]);
			tbodyComida += this._cartaProductos._comidas[p]._getRowForTable();
		}
		document.getElementById("tbodyComida").innerHTML = tbodyComida;

		let tbodyBebida = "";
		for (let p = 0; p < this._cartaProductos._bebidas.length; p++) {
			// console.info(this._cartaProductos._bebidas[p]);
			tbodyBebida += this._cartaProductos._bebidas[p]._getRowForTable();
		}
		document.getElementById("tbodyBebida").innerHTML = tbodyBebida;

		/* ****************** */

		document.getElementById("divRestaurante").innerHTML = "";
		let divRestaurante = "<p><h3>RESTAURANTE</h3></p>";
		console.info('this._mesas:', this._mesas);
		for (let m = 0; m < this._mesas.length; m++) {
			divRestaurante += this._mesas[m]._getMesa();
		}
		document.getElementById("divRestaurante").innerHTML = divRestaurante;
	}
}

var miRestaurante = new Restaurante('Restaurante de Fran');
miRestaurante._inicializaRestaurante(30, 5, 5, 5);

miRestaurante._pintarEstructura();
miRestaurante._pintarRestaurante();

console.info('miRestaurante:', miRestaurante);