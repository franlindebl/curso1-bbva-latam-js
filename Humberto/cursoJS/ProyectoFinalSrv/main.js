/*Header
	Control de Flujo
		Navegacion
	Content
		Secciones
	Footer
		Firma
*/

class Aplicacion {
	constructor() {
		this._id = "xApp";
		
		this._flujo = new Flujo(this._id);
		this._flujo._paginaActual = new Login(this._id);
		this._flujo.agregarPagina(this._flujo._paginaActual, ["/registro"], "login", false, true);
		this._flujo.agregarPagina(new Home(this._id), ["/home", "/comidas", "/bebidas", "/usuario", "/salir"], "home", true, false);
		this._flujo.agregarPagina(new Comidas(this._id), ["/home", "/bebidas", "/usuario", "/salir"], "comidas", false, false);
		this._flujo.agregarPagina(new Bebidas(this._id), ["/home", "/comidas", "/usuario", "/salir"], "bebidas", false, false);
		this._flujo.agregarPagina(new Usuarios(this._id), ["/home", "/comidas", "/bebidas", "/salir"], "usuario", false, false);
		this._flujo.agregarPagina(new Registro(this._id), ["/login"], "registro", false, true);
		this._flujo.agregarPagina(new Logout(this._id), ["/login"], "salir", false, true);
	}

	iniciar() {
		let elemento = document.createElement("DIV");
		elemento.innerHTML = "<div id='" + this._id + "' class='container'></div><div id='divCarga' class='loader'><div class='carga'></div></div>";
		document.body.appendChild(elemento);
		document.getElementById("divCarga").style.display = "none";
		this._flujo.iniciar();
	}
}	

class Flujo {
	constructor(idApp) {
		this._idApp = idApp;
		this._paginas = [];
		this._paginaActual;
	}

	agregarPagina(pagina, menu, url, eshome, sesion) {
		pagina._flujo = this;
		pagina._id = url;
		pagina._url = "/" + url;
		pagina._rutas = menu;
		pagina._esHome = eshome;
		pagina._inicioSinSesion = sesion;
		this._paginas.push(pagina);
	}

	iniciar() {
		let apiUsuario = new UsuariosApi();
		let usuario = apiUsuario.getUsuarioFormLocalStorage();

		if(!usuario) {
			this.presentarPagina();
		} else {
			this.irHome();
		}
	}

	presentarPagina() {
		let apiUsuario = new UsuariosApi();
		this._paginaActual._usuario = apiUsuario.getUsuarioFormLocalStorage();
		this._paginaActual.pintar();
		this.setDisparadores();
	}

	irHome() {
		let paginaDestino;

		for(let i=0; i<this._paginas.length; i++) {
			if(!paginaDestino && this._paginas[i]._esHome) {
					paginaDestino = this._paginas[i];
			}
		}

		this._paginaActual = paginaDestino;
		this.presentarPagina();
	}

	irURL(url) {
		let apiUsuario = new UsuariosApi();
		let paginaDestino;

		for(let i=0; i<this._paginas.length; i++) {
			if(!paginaDestino && url == this._paginas[i]._url) {
				paginaDestino = this._paginas[i];
			}
		}

		if(paginaDestino) {
			if(apiUsuario.getUsuarioFormLocalStorage() || paginaDestino._inicioSinSesion) {
				this._paginaActual.salir();
				this._paginaActual = paginaDestino;
				this.presentarPagina();
				window.history.pushState("", this._paginaActual._id, this._paginaActual._url);
			} else {
				alert("No puede accederse al recurso!");
			}
		} else {
			alert("Página no existe");	
		}
	}

	setDisparadores() {
		console.log("Disparadores 2 " + this._paginaActual._objsDisparadores.length);
		for(let i=0; i<this._paginaActual._objsDisparadores.length; i++) {
			let disparador = this._paginaActual._objsDisparadores[i];
			disparador._objeto.addEventListener("click", () => this.irURL(disparador._url));
		}
	}
}

class Disparador {
	constructor(objeto, url) {
		this._objeto = objeto;
		this._url = url;
	}
}

class ApiClient {
	constructor() {
	}

	get(url) {
		let cabeceras = new Headers();
		let init = {
			method: 'GET',
			headers: cabeceras
		};

		let promise = fetch(url, init).then(
			(response) => {
				return response.json();
			}
		);

		return promise;
	}

	post(url, params) {
		let cabeceras = new Headers();
		cabeceras.append('Content-Type', 'application/json');

		let init = {
			method: 'POST',
			headers: cabeceras,
			body: JSON.stringify(params)
		};

		let promise = fetch(url, init).then(
			(response) => {
				return response.json();
			}
		);

		return promise;
	}

	del(url) {
		let cabeceras = new Headers();

		let init = {
			method: 'DELETE',
			headers: cabeceras,
		};

		let promise = fetch(url, init).then(
			(response) => {
				return response.json();
			}
		);

		return promise;
	}

	delParams(url, params) {
		let cabeceras = new Headers();
		cabeceras.append('Content-Type', 'application/json');

		console.log(url + JSON.stringify(params));

		let init = {
			method: 'DELETE',
			headers: cabeceras,
			body: JSON.stringify(params)
		};

		let promise = fetch(url, init).then(
			(response) => {
				return response.json();
			}
		);

		return promise;
	}

	put(url, params) {
		let cabeceras = new Headers();
		cabeceras.append('Content-Type', 'application/json');

		let init = {
			method: 'PUT',
			headers: cabeceras,
			body: JSON.stringify(params)
		};

		let promise = fetch(url, init).then(
			(response) => {
				return response.json();
			}
		);

		return promise;
	}
}

class AlimentosApi {
	constructor() {
		this._urlBase = "http://formacion-indra-franlindebl.com/api";
		this._apiClient = new ApiClient();
		this._url = "";
	}

	getDeAlimentos() {
		let urlCompleta = this._urlBase + this._url;
		let promise = this._apiClient.get(urlCompleta).then(
			(respuesta) => {
				let arrayAlimentos = [];

				for(let i=0; i<respuesta.length; i++) {
					arrayAlimentos.push(this.getAlimentoDeObjeto(respuesta[i]));
				}

				return arrayAlimentos;
			}
		);

		return promise;
	}

	postDeAlimentos(alimento) {
		let urlCompleta = this._urlBase + this._url;
		let params = this.armaParametros(alimento);
		let promise = this._apiClient.post(urlCompleta, params).then(
			(respuesta) => {
				return respuesta;
			}
		);

		return promise;
	}

	deleteDeAlimentos(id) {
		let urlCompleta = this._urlBase + this._url + "/" + id;

		let promise = this._apiClient.del(urlCompleta).then(
			(respuesta) => {
				return respuesta;
			}
		);

		return promise;
	}

	putDeAlimentos(alimento) {
		let urlCompleta = this._urlBase + this._url + "/" + alimento._id;
		let params = this.armaParametros(alimento);
		let promise = this._apiClient.put(urlCompleta, params).then(
			(respuesta) => {
				return respuesta;
			}
		);

		return promise;
	}

	armaParametros(alimento) {}
	getAlimentoDeObjeto(objeto) {}
}

class ComidasApi extends AlimentosApi {
	constructor() {
		super();
		this._url = "/comidas";
	}

	armaParametros(comida) {
		return {
			tipo: comida._tipo,
	        precio: Number(comida._precio),
	        calorias: Number(comida._calorias),
	        existencias: Number(comida._existencias),
	        nombre: comida._nombre
		}
	}

	getAlimentoDeObjeto(objeto) {
		return new Comida(objeto._id, objeto.nombre, objeto.precio, objeto.calorias, objeto.existencias, objeto.tipo);
	}
}

class BebidasApi extends AlimentosApi {
	constructor() {
		super();
		this._url = "/bebidas";
	}

	armaParametros(bebida) {
		return {
			grados: bebida._gradoAlcohol,
			esAlcoholica: bebida._esAlcoholica,
			precio: bebida._precio,
			calorias: bebida._calorias,
			existencias: bebida._existencias,
			nombre: bebida._nombre
		}
	}

	getAlimentoDeObjeto(objeto) {
		return new Bebida(objeto._id, objeto.nombre, objeto.precio, objeto.calorias, objeto.existencias, objeto.esAlcoholica, objeto.grados);
	}
}

class Sesion {
	constructor() {
		this._usuario = "";
		this._sesionId = "";
	}
}

class Alimento {
	constructor(id, nombre, precio, calorias, existencias) {
		this._id = id;
		this._nombre = nombre;
		this._precio = precio;
		this._calorias = calorias;
		this._existencias = existencias;
	}
}

class Comida extends Alimento {
	constructor(id, nombre, precio, calorias, existencias, tipo) {
		super(id, nombre, precio, calorias, existencias);
		this._tipo = tipo;
	}

	pintar(idContenedor) {
		let sId = "item" + this._id;
		let est = new Estructura();
		let forma = new Formulario();

		est.creaContenedor(sId, idContenedor, "row");
		est.creaContenedorTexto("", sId, "col-xs-2", this._nombre);
		est.creaContenedorTexto("", sId, "col-xs-2", this._tipo);
		est.creaContenedorTexto("", sId, "col-xs-2", this._precio);
		est.creaContenedorTexto("", sId, "col-xs-2", this._calorias);
		est.creaContenedorTexto("", sId, "col-xs-2", this._existencias);
		est.creaContenedor("control" + this._id, sId, "col-xs-2");
		document.getElementById("control" + this._id).innerHTML = "<button type='button' class='btn btn-default' data-toggle='modal' data-target='#modalComida' id='btnEdit" + this._id + "'>Editar</button>";
		forma.creaButton("btnElim" + this._id, "control" + this._id, "btn button-default", "-");
	}
}

class Bebida extends Alimento {
	constructor(id, nombre, precio, calorias, existencias, esAlcoholica, gradoAlcohol) {
		super(id, nombre, precio, calorias, existencias);
		this._esAlcoholica = (gradoAlcohol > 0);
		this._gradoAlcohol = gradoAlcohol;
	}

	pintar(idContenedor) {
		let sId = "item" + this._id;
		let est = new Estructura();
		let forma = new Formulario();

		est.creaContenedor(sId, idContenedor, "row");
		est.creaContenedorTexto("", sId, "col-xs-2", this._nombre);
		est.creaContenedorTexto("", sId, "col-xs-2", this._precio);
		est.creaContenedorTexto("", sId, "col-xs-2", this._calorias);
		est.creaContenedorTexto("", sId, "col-xs-2", this._existencias);
		est.creaContenedorTexto("", sId, "col-xs-2", this._gradoAlcohol);
		est.creaContenedor("control" + this._id, sId, "col-xs-2");
		document.getElementById("control" + this._id).innerHTML = "<button type='button' class='btn btn-default' data-toggle='modal' data-target='#modalBebida' id='btnEdit" + this._id + "'>Editar</button>";
		forma.creaButton("btnElim" + this._id, "control" + this._id, "btn button-default", "-");
	}
}

class Usuario {
	constructor(id, nombre, apellidos, email, usuario, password) {
		this._id = id;
		this._nombre = nombre;
		this._apellidos = apellidos;
		this._email = email;
		this._usuario = usuario;
		this._password = password;
	}
}

class UsuariosApi {
	constructor() {
		this._urlBase = "http://formacion-indra-franlindebl.com/api";
		this._apiClient = new ApiClient();
		this._url = "/users";
	}

	getDeUsuarios() {
		let urlCompleta = this._urlBase + this._url;
		let promise = this._apiClient.get(urlCompleta).then(
			(respuesta) => {
				let arrayUsuarios = [];

				for(let i=0; i<respuesta.length; i++) {
					arrayUsuarios.push(this.getUsuarioDeObjeto(respuesta[i]));
				}

				return arrayUsuarios;
			}
		);

		return promise;
	}

	postDeUsuarios(usuario) {
		let urlCompleta = this._urlBase + this._url;
		let params = this.armaParametros(usuario);
		let promise = this._apiClient.post(urlCompleta, params).then(
			(respuesta) => {
				return respuesta;
			}
		);

		return promise;
	}

	deleteDeUsuarios(usuario) {
		let urlCompleta = this._urlBase + this._url + "/" + usuario._id;
		let params = this.armaParametrosDelete(usuario);

		let promise = this._apiClient.delParams(urlCompleta, params).then(
			(respuesta) => {
				return respuesta;
			}
		);

		return promise;
	}

	putDeUsuarios(usuario) {
		let urlCompleta = this._urlBase + this._url + "/" + usuario._id;
		let params = this.armaParametros(usuario);

		let promise = this._apiClient.put(urlCompleta, params).then(
			(respuesta) => {
				return respuesta;
			}
		);

		return promise;
	}

	loginDeUsuario(usuario) {
		let urlCompleta = this._urlBase + this._url + "/login";
		let params = this.armaParametrosLogin(usuario);
		let promise = this._apiClient.post(urlCompleta, params).then(
			(respuesta) => {
				return respuesta;
			}
		);

		return promise;
	}

	armaParametros(usuario) {
		return {
			email: usuario._email,
			apellidos: usuario._apellidos,
			nombre: usuario._nombre,
			username: usuario._usuario,
			password: usuario._password
		}
	}

	armaParametrosLogin(usuario) {
		return {
			username: usuario._usuario,
			password: usuario._password
		}
	}

	armaParametrosDelete(usuario) {
		return {
			password: usuario._password
		}
	}

	getUsuarioDeObjeto(objeto) {
		return new Usuario(objeto._id, objeto.nombre, objeto.apellidos, objeto.email, objeto.username, objeto.password);
	}

	getUsuarioFormLocalStorage() {
		let usuario = null;
		let usuarioAsString = localStorage.getItem("usuario");
		if(usuarioAsString) {
			usuario = JSON.parse(usuarioAsString);
		}
		return usuario;
	}

	setUsuarioAtLocalStorage(usuario) {
		let usuarioAsString = JSON.stringify(usuario);
		localStorage.setItem("usuario", usuarioAsString);
	}

	setLimpiarSesion() {
		localStorage.setItem("usuario", "");
	}
}

window.onload = function() {
	app = new Aplicacion();
	app.iniciar();
}
