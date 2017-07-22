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

	_pedirOrden(carta) {
		let comida = [];
		comida.push(carta._comidas[getRandomInteger(0, carta._comidas.length - 1)]);
		let bebida = [];
		bebida.push(carta._bebidas[getRandomInteger(0, carta._bebidas.length - 1)]);

		return new Orden(comida, bebida);
	}
}

class Orden {
	constructor(comida, bebida) {
		this._comidas = comida;
		this._bebidas = bebida;
		this._atendida = false;
		this._productosNoAtendidos = [];
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

	_pintar() {
		let mesa = '';
		mesa += '<p><strong>ID:</strong> ' + this._idMesa + '</p>';
		mesa += '<p><strong>Ocupado:</strong> ' + this._ocupada + '</p>';
		mesa += '<p><strong># Personas: </strong>' + this._personas.length + '</p>';
		mesa += '<p><strong># Ordenes: </strong>' + this._ordenes.length + '</p>';

		let divMesas = document.querySelector(".divMesas");
		if (this._idMesa == 0) {
			divMesas.innerHTML = "<p><strong>MESAS</strong></p>";
		}

		let divmesa = document.createElement("DIV");
		divmesa.className = "divMesa" + (this._ocupada ? ' divMesaOcupada' : '') + (this._ordenes.length > 0 ? ' divMesaOrden' : '');
		divmesa.innerHTML = mesa;

		divMesas.appendChild(divmesa);
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
		this._id = "b" + getRandomInteger(1, 1000);
		this._esAlcoholica = esAlcoholica;
		this._gradosAlcohol = gradosAlcohol;
	}

	_getRowForTable() {
		let fila = '';
		fila += '<td>' + this._nombre + '</td>';
		fila += '<td>' + this._numeroExistencias + '</td>';
		fila += '<td>' + this._calorias + '</td>';
		fila += '<td>' + this._precio + '€</td>';
		fila += '<td>' + this._gradosAlcohol + '</td>';

		return fila;
	}
}

class Comida extends Producto {
	constructor(nombre, numeroExistencias, calorias, precio, tipo) {
		super(nombre, numeroExistencias, calorias, precio);
		this._id = "c" + getRandomInteger(1, 1000);
		this._tipo = tipo;
	}

	_getRowForTable() {
		let fila = '';
		fila += '<td>' + this._nombre + '</td>';
		fila += '<td>' + this._numeroExistencias + '</td>';
		fila += '<td>' + this._calorias + '</td>';
		fila += '<td>' + this._precio + '€</td>';
		fila += '<td>' + this._tipo + '</td>';

		return fila;
	}
}

class CartaProductos {
	constructor(bebidas, comidas) {
		this._bebidas = bebidas;
		this._comidas = comidas;
	}

	_pintar() {
		let divCarta = document.querySelector(".divCarta");
		divCarta.innerHTML = "";

		divCarta.appendChild(this._pintarEstructuraComidas());
		divCarta.appendChild(this._pintarEstructuraBebidas());

		this._pintarListaComida();
		this._pintarListaBebidas();
	}

	_pintarEstructuraComidas() {
		let estructuraComidas = "";
		estructuraComidas += '<p><strong>COMIDAS</strong></p>';
		estructuraComidas += '<table>';
		estructuraComidas += '<thead>';
		estructuraComidas += '<th>Nombre</th>';
		estructuraComidas += '<th>Num. existencias</th>';
		estructuraComidas += '<th>Calorias</th>';
		estructuraComidas += '<th>Precio</th>';
		estructuraComidas += '<th>Tipo</th>';
		estructuraComidas += '</thead>';
		estructuraComidas += '<tbody id="tbodyComida">';
		estructuraComidas += '</tbody>';
		estructuraComidas += '</table>';

		let divComidas = document.createElement("DIV");
		divComidas.className = "divComidas divCartas tablaCarta";
		divComidas.innerHTML = estructuraComidas;

		return divComidas;
	}

	_pintarEstructuraBebidas() {
		let estructuraBebidas = "";
		estructuraBebidas += '<p><strong>BEBIDAS</strong></p>';
		estructuraBebidas += '<table>';
		estructuraBebidas += '<thead>';
		estructuraBebidas += '<th>Nombre</th>';
		estructuraBebidas += '<th>Num. existencias</th>';
		estructuraBebidas += '<th>Calorias</th>';
		estructuraBebidas += '<th>Precio</th>';
		estructuraBebidas += '<th>% Alcohol</th>';
		estructuraBebidas += '</thead>';
		estructuraBebidas += '<tbody id="tbodyBebida">';
		estructuraBebidas += '</tbody>';
		estructuraBebidas += '</table>';

		var divBebidas = document.createElement("DIV");
		divBebidas.className = "divBebidas divCartas tablaCarta";
		divBebidas.innerHTML = estructuraBebidas;

		return divBebidas;
	}

	_pintarListaComida() {
		let tBodyComida = document.querySelector("#tbodyComida");

		tBodyComida.innerHTML = "";

		for (let p = 0; p < this._comidas.length; p++) {
			let tr = document.createElement("TR");
			tr.innerHTML = this._comidas[p]._getRowForTable();
			tBodyComida.appendChild(tr);
		}
	}

	_pintarListaBebidas() {
		let tBodyBebida = document.querySelector("#tbodyBebida");

		tBodyBebida.innerHTML = "";

		for (let b = 0; b < this._bebidas.length; b++) {
			let tr = document.createElement("TR");
			tr.innerHTML = this._bebidas[b]._getRowForTable();
			tBodyBebida.appendChild(tr);
		}
	}

	_obtenerProducto(tipo, id) {
		if (tipo == 'bebida') {
			for (let p = 0; p < this._bebidas.length; p++) {
				if (id == this._bebidas[p]._id) {
					if (this._bebidas[p]._numeroExistencias > 0) {
						this._bebidas[p]._numeroExistencias--;
						return true;
					} else {
						return false;
					}
				}
			}
		} else if (tipo == 'comida') {
			for (let p = 0; p < this._comidas.length; p++) {
				if (id == this._comidas[p]._id) {
					if (this._comidas[p]._numeroExistencias > 0) {
						this._comidas[p]._numeroExistencias--;
						return true;
					} else {
						return false;
					}
				}
			}
		}

		return false;
	}
}

class Recepcion {
	constructor() {
		this._grupoPersonas = [];
	}

	_traerGrupoClientes() {
		this._grupoPersonas.push(new GrupoPersonas);
		// console.info(this._grupoPersonas);
	}

	_pintar() {
		let divRecepcion = document.querySelector(".divRecepcion");
		divRecepcion.innerHTML = "<p><strong>RECEPCION</strong></p>";

		for (let gp = 0; gp < this._grupoPersonas.length; gp++) {
			let grupoClientes = '<p><strong>Num. Clientes:</strong> ' + this._grupoPersonas[gp]._clientes.length + '</p>';

			let divGrupoClientes = document.createElement("DIV");
			divGrupoClientes.className = "divGrupoClientes";
			divGrupoClientes.innerHTML = grupoClientes;

			divRecepcion.appendChild(divGrupoClientes);
		}
	}

	_siguienteGrupo() {
		if (this._grupoPersonas.length > 0) {
			let tmpGrupo = null;

			tmpGrupo = this._grupoPersonas[0]._clientes;
			this._grupoPersonas.splice(0, 1);

			return tmpGrupo;
		}

		return null;
	}
}

class GrupoPersonas {
	constructor() {
		this._clientes = [];

		this._creaGrupo();
	}

	_creaGrupo() {
		let numeroAleatorioClientesGrupo = getRandomInteger(1, 20);
		for (let c = 0; c < numeroAleatorioClientesGrupo; c++) {
			this._clientes.push(new Cliente());
		}
	}
}

class Restaurante {
	constructor(nombre) {
		this._id = this._generaIdAleatorio();
		this._nombre = nombre;
		this._mesas = [];
		this._camareros = [];
		this._cartaProductos = {};
		this._recepcion = new Recepcion();

		// Generando datos del restaurante
		this._generaMesasAleatorio();
		this._generarCamarerosAleatorio();
		this._generarCartaAleatorio();

		// Pintando restaurante
		this._pintarEstructuraPrincipalConBotones();

		this._addEventClick("#btTraerGrupoClientes", this._recepcion._traerGrupoClientes.bind(this._recepcion));
		this._addEventClick("#btRecibirGrupoClientes", this._recibirGrupoClientes.bind(this));
		this._addEventClick("#btTomarNota", this._tomarNota.bind(this));
		this._addEventClick("#btAtenderOrdenes", this._atenderOrdenes.bind(this));
	}

	_addEventClick(nombreButton, funcion) {
		document.querySelector(nombreButton).addEventListener("click", funcion);
	}

	_generaIdAleatorio() {
		return "idRestaurante_" + getRandomInteger(0, 1000);
	}

	_generaMesasAleatorio() {
		for (let m = 0; m < 30; m++) {
			this._mesas.push(new Mesa(m));
		}
	}

	_generarCamarerosAleatorio() {
		for (let c = 0; c < 5; c++) {
			this._camareros.push(new Camarero());
		}
	}

	_generarCartaAleatorio() {
		let bebidas = [];
		for (let b = 0; b < 5; b++) {
			let gradoAlcohol = getRandomInteger(0, 20);
			bebidas.push(new Bebida("Bebida " + (b + 1), getRandomInteger(0, 100), getRandomInteger(15, 150), getRandomInteger(50, 1500), (gradoAlcohol == 0 ? false : true), gradoAlcohol));
		}

		let comidas = [];
		for (let c = 0; c < 5; c++) {
			comidas.push(new Comida("Comida " + (c + 1), getRandomInteger(0, 100), getRandomInteger(15, 1500), getRandomInteger(50, 1500), getNombreAleatorio(tipoComida)));
		}

		this._cartaProductos = new CartaProductos(bebidas, comidas);
	}

	_pintarEstructuraPrincipalConBotones() {
		let estructura = '';
		estructura += '<div id="Restaurante" class="divRestaurante">';
		estructura += '<div class="divBotones">';
		estructura += '<button id="btTraerGrupoClientes">Traer Clientes</button>';
		estructura += '<button id="btRecibirGrupoClientes">Recibir</button>';
		estructura += '<button id="btTomarNota">Tomar Nota</button>';
		estructura += '<button id="btAtenderOrdenes">Atender Ordenes</button>';
		estructura += '</div>';
		estructura += '<div class="divCarta"></div>';
		estructura += '<div class="divMesas"></div>';
		estructura += '<div class="divRecepcion"></div>';
		estructura += '</div>';

		document.querySelector("body").innerHTML = estructura;
	}

	_iniciarIntervalo() {
		window.setInterval(() => this._ejecutarCiclo(), 1000);
	}

	_ejecutarCiclo() {
		this._pintar();
	}

	_pintar() {
		this._cartaProductos._pintar();
		this._mesas.forEach((mesa) => mesa._pintar());
		this._recepcion._pintar();
	}

	_recibirGrupoClientes() {
		// Obtener el grupo a sentar
		let grupo = this._recepcion._siguienteGrupo();

		let copyMesas = this._copyOrderMesas();
		// console.log('copyMesas:', copyMesas);

		let idMesa = null;

		if (copyMesas.length > 0) {
			let continuar = true;
			// for (let m = (copyMesas.length - 1); (m >= 0 && continuar); m--) {
			for (let m = 0; (m < copyMesas.length && continuar); m++) {
				if (copyMesas[m]._capacidad >= grupo.length) {
					idMesa = copyMesas[m]._idMesa;
					continuar = false;
				}
			}

			if (idMesa == null) {
				console.warn('El grupo se a retirado por que no tenemos mesa disponible.');
			} else {
				let continuar = true;
				for (let m = 0; (m < this._mesas.length && continuar); m++) {
					if (this._mesas[m]._idMesa == idMesa) {
						this._mesas[m]._personas = grupo;
						this._mesas[m]._ocupada = true;
						continuar = false;
					}
				}
			}
		} else {
			console.error('No tenemos mesas disponibles.');
		}
	}

	_copyOrderMesas() {
		let tmpMesas = [];
		this._mesas.forEach((mesa) => {
			if (!mesa._ocupada) {
				tmpMesas.push(mesa);
			}
		});

		if (tmpMesas.length > 0) {
			tmpMesas.sort(function (a, b) {
				if (a._capacidad > b._capacidad) {
					return 1;
				}
				if (a._capacidad < b._capacidad) {
					return -1;
				}
				// a must be equal to b
				return 0;
			});
		}

		return tmpMesas;
	}

	_tomarNota() {
		this._mesas.forEach((mesa) => {
			if ( mesa._ordenes.length == 0 || this._notasPendientes(mesa)) {
				mesa._personas.forEach((cliente) => {
					mesa._ordenes.push(cliente._pedirOrden(this._cartaProductos));
				});
			}
		});
	}

	_notasPendientes(mesa) {
		console.log('');
		mesa._ordenes.forEach((orden) => {
			if (orden._atendida == false) {
				return true;
			}
		});

		return false;
	}

	_atenderOrdenes() {
		this._mesas.forEach((mesa) => {
			mesa._ordenes.forEach((orden) => {
				if (orden._atendida == false) {
					orden._comidas.forEach((producto, index) => {
						// Producto obtenido de carta
						if (this._cartaProductos._obtenerProducto("comida", producto._id) == false) {
							// En caso de no ser entregado el producto se mueve a _productosNoAtendido[]
							orden._productosNoAtendido.push(orden._comida.splice(index, 1));
						}
					});


					// orden._bebida;
					orden._bebidas.forEach((producto, index) => {
						// Producto obtenido de carta
						if (this._cartaProductos._obtenerProducto("bebida", producto._id) == false) {
							// En caso de no ser entregado el producto se mueve a _productosNoAtendido[]
							orden._productosNoAtendido.push(orden._bebidas.splice(index, 1));
						}
					});
				}

				orden._atendida = true;
			});
		});
	}
}

let miRestaurante = null;

window.onload = () => {
	miRestaurante = new Restaurante('Restaurante de Fran');
	miRestaurante._iniciarIntervalo();
};