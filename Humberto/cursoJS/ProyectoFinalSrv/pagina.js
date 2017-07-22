class Pagina {
	constructor(idApp) {
		this._idApp = idApp;
		this._flujo = null;
		this._usuario = null;
		this._rutas = [];
		this._id = "";
		this._url = "";
		this._esHome = false;
		this._inicioSinSesion = false;

		this._cabecera = new Cabecera(this._idApp, "cabecera");
		this._contenido = new Contenido(this._idApp, "contenido");
		this._pie = new Pie(this._idApp, "pie");

		this._verEncabezado = true;
		this._verContenido = true;
		this._verPie = true;

		this._objsDisparadores = [];
	}

	pintar() {
		this._cabecera._rutas = this._rutas;
		this._cabecera._flujo = this._flujo;
		this._pie._usuario = this._usuario;
		if(this._verEncabezado) {
			this._cabecera.pintar();
		} else {
			this._cabecera.limpiar();
		}
		if(this._verContenido) this._contenido.pintar();
		if(this._verPie) this._pie.pintar();
	}

	salir() {
		document.getElementById(this._id).innerHTML = "";
	}

	espera(esperando) {
		if(esperando) {
			document.getElementById("divCarga").style.display = "";	
		} else {
			document.getElementById("divCarga").style.display = "none";
		}
	}

	/*setDisparadores() {
		console.log("Disparadores " + this._rutas.length);
		for(let i=0; i<this._rutas.length; i++) {
			this._objsDisparadores.push(new Disparador(document.getElementById("btnOpc"+i), this._rutas[i]));
		}
	}*/
}

class Login extends Pagina {
	constructor(idApp) {
		super(idApp);
		this._verEncabezado = false;
		this._usuariosApi = new UsuariosApi();
	}

	pintar() {
		super.pintar();

		console.log(this._flujo);

		if(!document.getElementById(this._id)) {
			let est = new Estructura();
			est.creaContenedor(this._id, this._contenido._idSeccion, "row");
		}

		document.getElementById(this._id).innerHTML = this.plantillaContenido();

		let forma = new Formulario();
		forma.creaButton("btnLogin", "ingresoId", "btn btn-primary", "Ingresar");
		forma.creaButton("btnOpc0", "registroId", "btn btn-default", "Registrarse");

		document.getElementById("btnLogin").addEventListener("click", () => this.loguearUsuario());
		document.getElementById("btnOpc0").addEventListener("click", () => this._flujo.irURL(this._rutas[0]));
		//this.setDisparadores();
	}

	loguearUsuario() {
   		let usuario = new Usuario("", "", "", "", document.getElementById("txtLUsuario").value,
   								document.getElementById("txtLContrasenia").value);

		this.espera(true);
		this._usuariosApi.loginDeUsuario(usuario).then(
			(data) => {
				if(data.message) {
					document.getElementById("mensajeId").innerHTML = "<div class='alert alert-danger' role='alert'>"+ data.message + "</div>";
				} else {
					let usuario = this._usuariosApi.getUsuarioDeObjeto(data);
					//usuario._password = document.getElementById("txtLContrasenia").value;
					this._usuariosApi.setUsuarioAtLocalStorage(usuario);
					this.salir();
					this._flujo.irHome();
				}
				this.espera(false);
			}
		);
   	}

	plantillaContenido() {
		let resp = "";

		resp += "<div class='row'>";
		resp += "<div class='col-xs-12'><h1>App Alimentos</h1></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-1'></div>";
		resp += "<div class='col-xs-4'><h3>App para control de inventarios de comidas y bebidas</h3></div>";
		resp += "<div class='col-xs-6'>";
		resp += "<div class='panel panel-default'>";
		resp += "<div class='panel-heading'>";
		resp += "<h3 class='panel-title'>Ingreso a la App</h3>";
		resp += "</div>";
		resp += "<div class='panel-body'>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-4'><p class='text-right'><label>Usuario</label></p></div>";
		resp += "<div class='col-xs-8'><input type='text' class='form-control' id='txtLUsuario' placeholder='Usuario'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-4'><p class='text-right'><label>Contraseña</label></p></div>";
		resp += "<div class='col-xs-8'><input type='password' class='form-control' id='txtLContrasenia' placeholder='Contraseña'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-12' id='mensajeId'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-6'><p class='text-right' id='ingresoId'></p></div>";
		resp += "<div class='col-xs-6'><p class='text-left' id='registroId'></p></div>";
		resp += "</div>";
		resp += "</div>";
		resp += "</div>";
		resp += "</div>";
		resp += "<div class='col-xs-1'></div>";
		resp += "</div>";

		return resp;
	}
}

class Funcionalidad extends Pagina {
	constructor(idApp) {
		super(idApp);
	}
}

class Comidas extends Funcionalidad {
	constructor(idApp) {
		super(idApp);
		this._comidaApi = new ComidasApi();
	}

	pintar() {
		super.pintar();
   		//this.setDisparadores();

		this.espera(true);
		this._comidaApi.getDeAlimentos().then(
			(data) => {
    			this.pintaDatos(data);
    			this.espera(false);
			}
		);
   	}

   	pintaDatos(arrayDeComidas) {
   		if(!document.getElementById(this._id)) {
			let est = new Estructura();
			est.creaContenedor(this._id, this._contenido._idSeccion, "row");
		}

   		let idContenedor = "listaComidas";
   		document.getElementById(this._id).innerHTML = this.pintaTabla(idContenedor);
   		this.pintarModal();

   		for(let i=0; i<arrayDeComidas.length; i++) {
   			let comida = arrayDeComidas[i];
   			comida.pintar(idContenedor);

   			document.getElementById("btnEdit" + comida._id).addEventListener("click", () => this.llenarModal(comida));
   			document.getElementById("btnElim" + comida._id).addEventListener("click", () => this.eliminarComida(comida));
   		}
   	}

   	pintarModal() {
		let forma = new Formulario();
		document.getElementById(this._id).innerHTML += this.plantillaEdicion();

		forma.creaInput("txtComNombre", "divbtnNombre", "form-control");
		forma.creaInput("txtComTipo", "divbtnTipo", "form-control");
		forma.creaInput("txtComPrecio", "divbtnPrecio", "form-control");
		forma.creaInput("txtComCalorias", "divbtnCalorias", "form-control");
		forma.creaInput("txtComExistencias", "divbtnExistencias", "form-control");
		forma.creaHidden("hidIDComida", "btnsModal");

		document.getElementById("btnComGuardar").addEventListener("click", () => this.guardarComida());
   	}

   	llenarModal(comida) {
   		if(comida) {
   			document.getElementById("txtComNombre").value = comida._nombre;
   			document.getElementById("txtComTipo").value = comida._tipo;
   			document.getElementById("txtComPrecio").value = comida._precio;
   			document.getElementById("txtComCalorias").value = comida._calorias;
   			document.getElementById("txtComExistencias").value = comida._existencias;
   			document.getElementById("hidIDComida").value = comida._id;
   		}
   	}

   	guardarComida() {
   		let comida = new Comida(document.getElementById("hidIDComida").value,
   								document.getElementById("txtComNombre").value,
   								document.getElementById("txtComPrecio").value,
   								document.getElementById("txtComCalorias").value,
   								document.getElementById("txtComExistencias").value,
   								document.getElementById("txtComTipo").value);

   		this.espera(true);
   		if(!comida._id) {
   			this._comidaApi.postDeAlimentos(comida).then(
   				(data) => {
    				this.pintar();
    				this.espera(false);
				}
   			);
   		} else {
   			this._comidaApi.putDeAlimentos(comida).then(
   				(data) => {
    				this.pintar();
    				this.espera(false);
				}
   			);
   		}
   	}

   	eliminarComida(comida) {
   		this.espera(true);
   		this._comidaApi.deleteDeAlimentos(comida._id).then(
   			(data) => {
    			this.pintar();
    			this.espera(false);
			}
   		);
   		this.pintar();
   	}

   	pintaTabla(id) {
		let sHtml = "";

		sHtml += "<div class='panel panel-default'>";
		sHtml += "<div class='panel-heading'>";
		sHtml += "<h3 class='panel-title'>Inventario de Comidas</h3>";
		sHtml += "</div>";
		sHtml += "<div class='row'><div class='col-md-2'>Nombre</div><div class='col-xs-2'>Tipo</div><div class='col-xs-2'>Precio</div><div class='col-xs-2'>Calorias</div><div class='col-xs-2'>Existencias</div><div class='col-xs-2'>Acciones";
		sHtml += "<button type='button' class='btn btn-default' data-toggle='modal' data-target='#modalComida' id='btnAddComida'>+</button></div></div>";
		sHtml += "<div class='panel panel-default' id='" + id + "'></div>";

		return sHtml;
	}

	plantillaEdicion() {
		let resp = "";

		resp += "<div class='modal fade' id='modalComida' tabindex='-1' role='dialog' aria-labelledby='modalComidaLabel' aria-hidden='true'>";
		resp += "<div class='modal-dialog' role='document'>";
		resp += "<div class='modal-content'>";
		resp += "<div class='modal-header'>";
		resp += "<h5 class='modal-title' id='modalComidaLabel'>Editar Comida</h5>";
		resp += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
		resp += "<span aria-hidden='true'>&times;</span>";
		resp += "</button>";
		resp += "</div>";
		resp += "<div class='modal-body'>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-6'>Nombre</div>";
		resp += "<div class='col-xs-6' id='divbtnNombre'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-6'>Tipo</div>";
		resp += "<div class='col-xs-6' id='divbtnTipo'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-6'>Precio</div>";
		resp += "<div class='col-xs-6' id='divbtnPrecio'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-6'>Calorias</div>";
		resp += "<div class='col-xs-6' id='divbtnCalorias'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-6'>Existencias</div>";
		resp += "<div class='col-xs-6' id='divbtnExistencias'></div>";
		resp += "</div>";
		resp += "</div>";
		resp += "<div class='modal-footer' id='btnsModal'>";
		resp += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
		resp += "<button type='button' class='btn btn-primary' data-dismiss='modal' id='btnComGuardar'>Guardar Cambios</button>";
		resp += "</div>";
		resp += "</div>";
		resp += "</div>";
		resp += "</div>";

		return resp;
	}
}

class Bebidas extends Funcionalidad {
	constructor(idApp) {
		super(idApp);
		this._bebidasApi = new BebidasApi();
	}

	pintar() {
		super.pintar();
   		//this.setDisparadores();

   		this.espera(true);
		this._bebidasApi.getDeAlimentos().then(
			(data) => {
    			this.pintaDatos(data);
    			this.espera(false);
			}
		);
   	}

   	pintaDatos(arrayDeBebidas) {
   		if(!document.getElementById(this._id)) {
			let est = new Estructura();
			est.creaContenedor(this._id, this._contenido._idSeccion, "row");
		}

   		let idContenedor = "listaBebidas";
   		document.getElementById(this._id).innerHTML = this.pintaTabla(idContenedor);
   		this.pintarModal();

   		for(let i=0; i<arrayDeBebidas.length; i++) {
   			let bebida = arrayDeBebidas[i];
   			bebida.pintar(idContenedor);

   			document.getElementById("btnEdit" + bebida._id).addEventListener("click", () => this.llenarModal(bebida));
   			document.getElementById("btnElim" + bebida._id).addEventListener("click", () => this.eliminarBebida(bebida));
   		}
   	}

   	pintarModal() {
		let forma = new Formulario();
		document.getElementById(this._id).innerHTML += this.plantillaEdicion();

		forma.creaInput("txtBebNombre", "divbtnBNombre", "form-control");
		forma.creaInput("txtBebPrecio", "divbtnBPrecio", "form-control");
		forma.creaInput("txtBebCalorias", "divbtnBCalorias", "form-control");
		forma.creaInput("txtBebExistencias", "divbtnBExistencias", "form-control");
		forma.creaInput("txtBebGrado", "divbtnBGrado", "form-control");
		forma.creaHidden("hidIDBebida", "btnsBebModal");

		document.getElementById("btnBebGuardar").addEventListener("click", () => this.guardarBebida());
   	}

   	llenarModal(bebida) {
   		if(bebida) {
   			document.getElementById("txtBebNombre").value = bebida._nombre;
   			document.getElementById("txtBebPrecio").value = bebida._precio;
   			document.getElementById("txtBebCalorias").value = bebida._calorias;
   			document.getElementById("txtBebExistencias").value = bebida._existencias;
   			document.getElementById("txtBebGrado").value = bebida._gradoAlcohol;
   			document.getElementById("hidIDBebida").value = bebida._id;
   		}
   	}

   	guardarBebida() {
   		let bebida = new Bebida(document.getElementById("hidIDBebida").value,
   								document.getElementById("txtBebNombre").value,
   								document.getElementById("txtBebPrecio").value,
   								document.getElementById("txtBebCalorias").value,
   								document.getElementById("txtBebExistencias").value,
   								false,
   								document.getElementById("txtBebGrado").value);

   		this.espera(true);
   		if(!bebida._id) {
   			this._bebidasApi.postDeAlimentos(bebida).then(
   				(data) => {
    				this.pintar();
    				this.espera(false);
				}
   			);
   		} else {
   			this._bebidasApi.putDeAlimentos(bebida).then(
   				(data) => {
    				this.pintar();
    				this.espera(false);
				}
   			);
   		}
   	}

   	eliminarBebida(bebida) {
   		this.espera(true);
   		this._bebidasApi.deleteDeAlimentos(bebida._id).then(
   			(data) => {
    			this.pintar();
    			this.espera(false);
			}
   		);
   	}

   	pintaTabla(id) {
		let sHtml = "";

		sHtml += "<div class='panel panel-default'>";
		sHtml += "<div class='panel-heading'>";
		sHtml += "<h3 class='panel-title'>Inventario de Bebidas</h3>";
		sHtml += "</div>";
		sHtml += "<div class='row'><div class='col-xs-2'>Nombre</div><div class='col-xs-2'>Precio</div><div class='col-xs-2'>Calorias</div><div class='col-xs-2'>Existencias</div><div class='col-xs-2'>Grado Alcóhol</div><div class='col-xs-2'>Acciones";
		sHtml += "<button type='button' class='btn btn-default' data-toggle='modal' data-target='#modalBebida' id='btnAddBebida'>+</button></div></div>";
		sHtml += "<div class='panel panel-default' id='" + id + "'></div>";

		return sHtml;
	}

	plantillaEdicion() {
		let resp = "";

		resp += "<div class='modal fade' id='modalBebida' tabindex='-1' role='dialog' aria-labelledby='modalBebidaLabel' aria-hidden='true'>";
		resp += "<div class='modal-dialog' role='document'>";
		resp += "<div class='modal-content'>";
		resp += "<div class='modal-header'>";
		resp += "<h5 class='modal-title' id='modalBebidaLabel'>Editar Bebida</h5>";
		resp += "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>";
		resp += "<span aria-hidden='true'>&times;</span>";
		resp += "</button>";
		resp += "</div>";
		resp += "<div class='modal-body'>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-6'>Nombre</div>";
		resp += "<div class='col-xs-6' id='divbtnBNombre'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-6'>Precio</div>";
		resp += "<div class='col-xs-6' id='divbtnBPrecio'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-6'>Calorias</div>";
		resp += "<div class='col-xs-6' id='divbtnBCalorias'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-6'>Existencias</div>";
		resp += "<div class='col-xs-6' id='divbtnBExistencias'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-6'>Grado Alcóhol</div>";
		resp += "<div class='col-xs-6' id='divbtnBGrado'></div>";
		resp += "</div>";
		resp += "</div>";
		resp += "<div class='modal-footer' id='btnsBebModal'>";
		resp += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>";
		resp += "<button type='button' class='btn btn-primary' data-dismiss='modal' id='btnBebGuardar'>Guardar Cambios</button>";
		resp += "</div>";
		resp += "</div>";
		resp += "</div>";
		resp += "</div>";

		return resp;
	}
}

class Usuarios extends Funcionalidad {
	constructor(idApp) {
		super(idApp);
		this._usuariosApi = new UsuariosApi();
	}

	pintar() {
		super.pintar();
   		//this.setDisparadores();

   		this.espera(true);
		this._usuariosApi.getDeUsuarios().then(
			(data) => {
    			this.pintaDatos(data);
    			this.espera(false);
			}
		);
   	}

   	pintaDatos(arrayDeUsuarios) {
   		let usuario;

   		if(!document.getElementById(this._id)) {
			let est = new Estructura();
			est.creaContenedor(this._id, this._contenido._idSeccion, "row");
		}

		document.getElementById(this._id).innerHTML = "";

   		for(let i=0; i<arrayDeUsuarios.length; i++) {
   			if(this._usuario) {
   				if(!usuario && arrayDeUsuarios[i]._usuario == this._usuario._usuario) {
   					usuario = arrayDeUsuarios[i];
   				}
   			}
   		}

   		this.pintarForma(usuario);
   	}

   	pintarForma(usuario) {
   		let idContenedor = "perfilUsuario";
   		let forma = new Formulario();
		document.getElementById(this._id).innerHTML += this.plantillaEdicion(idContenedor);

		forma.creaHidden("txtIDUsuario", "divbtnUsuGuardar");
		forma.creaButton("btnUsuGuardar", "divbtnUsuGuardar", "btn btn-primary", "Guardar Cambios");
		forma.creaButton("btnUsuEliminar", "divbtnUsuEliminar", "btn btn-danger", "Eliminar Usuario");

		document.getElementById("btnUsuGuardar").addEventListener("click", () => this.guardarUsuario());
		document.getElementById("btnUsuEliminar").addEventListener("click", () => this.eliminarUsuario());

		this.llenarForma(usuario);
   	}

   	llenarForma(usuario) {
   		if(usuario) {
   			document.getElementById("txtIDUsuario").value = usuario._id;
   			document.getElementById("txtNombre").value = usuario._nombre;
   			document.getElementById("txtApellidos").value = usuario._apellidos;
   			document.getElementById("txtEmail").value = usuario._email;
   			document.getElementById("txtUsuario").value = usuario._usuario;
   			document.getElementById("txtPassword").value = "";
   		}
   	}

   	guardarUsuario() {
   		let usuario = new Usuario(
   								document.getElementById("txtIDUsuario").value,
   								document.getElementById("txtNombre").value,
   								document.getElementById("txtApellidos").value,
   								document.getElementById("txtEmail").value,
   								document.getElementById("txtUsuario").value,
   								document.getElementById("txtPassword").value);
   								//this._usuario._password);

		this.espera(true);
		this._usuariosApi.putDeUsuarios(usuario).then(
			(data) => {
				if(data.message) {
					document.getElementById("mensajeId").innerHTML = "<div class='alert alert-danger' role='alert'>"+ data.message + "</div>";
				} else {
					this.pintar();
					alert("Informacion actualizada!");
				}
				this.espera(false);
			}
		);
   	}

   	eliminarUsuario() {
   		let usuario = new Usuario(
   								document.getElementById("txtIDUsuario").value,
   								"", "", "", "", 
   								document.getElementById("txtPassword").value);

   		this.espera(true);
   		this._usuariosApi.deleteDeUsuarios(usuario).then(
   			(data) => {
   				console.log(data);
   				if(data.message == "User borrado") {
   					this.pintar();
    				this._usuariosApi.setLimpiarSesion();
					this._usuario = null;
					this._pie._usuario = null;
    				alert("Usuario eliminado, fin de sesión!");
				} else {
    				document.getElementById("mensajeId").innerHTML = "<div class='alert alert-danger' role='alert'>"+ data.message + "</div>";
    			}
    			this.espera(false);
			}
   		);
   	}

   	plantillaEdicion(id) {
		let resp = "";

		resp += "<div class='row' id='" + id + "''>";
		resp += "<div class='panel panel-default'>";
		resp += "<div class='panel-heading'>";
		resp += "<h3 class='panel-title'>Perfil de usuario</h3>";
		resp += "</div>";
		resp += "<div class='panel-body'>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-4'><p class='text-right'><label>Nombre</label></p></div>";
		resp += "<div class='col-xs-8'><input type='text' class='form-control' id='txtNombre'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-4'><p class='text-right'><label>Apellidos</label></p></div>";
		resp += "<div class='col-xs-8'><input type='text' class='form-control' id='txtApellidos'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-4'><p class='text-right'><label>Email</label></p></div>";
		resp += "<div class='col-xs-8'><input type='email' class='form-control' id='txtEmail'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-4'><p class='text-right'><label>Usuario</label></p></div>";
		resp += "<div class='col-xs-8'><input type='text' class='form-control' id='txtUsuario'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-4'><p class='text-right'><label>Contraseña</label></p></div>";
		resp += "<div class='col-xs-8'><input type='passord' class='form-control' id='txtPassword' placeholder='Ingrese Contraseña'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-12' id='mensajeId'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-6'><p class='text-right' id='divbtnUsuGuardar'></p></div>";
		resp += "<div class='col-xs-6'><p class='text-left' id='divbtnUsuEliminar'></p></div>";
		resp += "</div>";
		resp += "</div>";
		resp += "</div>";
		resp += "</div>";

		return resp;
	}
}

class Registro extends Funcionalidad {
	constructor(idApp) {
		super(idApp);
		this._verEncabezado = false;
		this._usuariosApi = new UsuariosApi();
	}

   	pintar() {
   		super.pintar();
   		if(!document.getElementById(this._id)) {
			let est = new Estructura();
			est.creaContenedor(this._id, this._contenido._idSeccion, "row");
		}

   		let idContenedor = "registroUsuario";
   		let forma = new Formulario();
		document.getElementById(this._id).innerHTML = this.plantillaEdicion(idContenedor);

		forma.creaButton("btnRUsuGuardar", "divbtnRUsuGuardar", "btn btn-primary", "Guardar Cambios");
		forma.creaButton("btnOpc0", "divbtnRUsuCancelar", "btn btn-default", "Cancelar");

		document.getElementById("btnRUsuGuardar").addEventListener("click", () => this.guardarUsuario());
		document.getElementById("btnOpc0").addEventListener("click", () => this._flujo.irURL(this._rutas[0]));
		//this.setDisparadores();
   	}

   	guardarUsuario() {
   		let usuario = new Usuario("",
   								document.getElementById("txtRNombre").value,
   								document.getElementById("txtRApellidos").value,
   								document.getElementById("txtREmail").value,
   								document.getElementById("txtRUsuario").value,
   								document.getElementById("txtRPassword").value);

   		this.espera(true);
		this._usuariosApi.postDeUsuarios(usuario).then(
			(data) => {
				this.espera(false);
				if(data.message) {
					document.getElementById("mensajeId").innerHTML = "<div class='alert alert-danger' role='alert'>"+ data.message + "</div>";
				} else {
					this.pintar();
					document.getElementById("btnOpc0").innerHTML = "Ir a Login";
					document.getElementById("btnOpc0").className = "btn btn-primary";
					document.getElementById("divbtnRUsuGuardar").removeChild(document.getElementById("btnRUsuGuardar"));
					alert("Registro exitoso, favor de ir a Login!");
				}
			}
		);
   	}

   	plantillaEdicion(id) {
		let resp = "";

		resp += "<div class='row' id='" + id + "''>";
		resp += "<div class='col-xs-12'><h1>App Alimentos</h1></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-1'></div>";
		resp += "<div class='col-xs-4'><h3>Registro de Usuarios</h3></div>";
		resp += "<div class='col-xs-6'>";
		resp += "<div class='panel panel-default'>";
		resp += "<div class='panel-heading'>";
		resp += "<h3 class='panel-title'>Ingreso a la App</h3>";
		resp += "</div>";
		resp += "<div class='panel-body'>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-4'><p class='text-right'><label>Nombre</label></p></div>";
		resp += "<div class='col-xs-8'><input type='text' class='form-control' id='txtRNombre' placeholder='Nombre'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-4'><p class='text-right'><label>Apellidos</label></p></div>";
		resp += "<div class='col-xs-8'><input type='text' class='form-control' id='txtRApellidos' placeholder='Apellidos'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-4'><p class='text-right'><label>Email</label></p></div>";
		resp += "<div class='col-xs-8'><input type='email' class='form-control' id='txtREmail' placeholder='Usuario'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-4'><p class='text-right'><label>Usuario</label></p></div>";
		resp += "<div class='col-xs-8'><input type='text' class='form-control' id='txtRUsuario' placeholder='Usuario'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-4'><p class='text-right'><label>Contraseña</label></p></div>";
		resp += "<div class='col-xs-8'><input type='text' class='form-control' id='txtRPassword' placeholder='Contraseña'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-12' id='mensajeId'></div>";
		resp += "</div>";
		resp += "<div class='row'>";
		resp += "<div class='col-xs-6'><p class='text-right' id='divbtnRUsuGuardar'></p></div>";
		resp += "<div class='col-xs-6'><p class='text-left' id='divbtnRUsuCancelar'></p></div>";
		resp += "</div>";
		resp += "</div>";
		resp += "</div>";
		resp += "</div>";
		resp += "<div class='col-xs-1'></div>";
		resp += "</div>";

		return resp;
	}
}

class Home extends Funcionalidad {
	constructor(idApp) {
		super(idApp);
		this._comidaApi = new ComidasApi();
		this._bebidaApi = new BebidasApi();
	}

	pintar() {
		super.pintar();

		if(!document.getElementById(this._id)) {
			let est = new Estructura();
			est.creaContenedor(this._id, this._contenido._idSeccion, "row");
		}

		document.getElementById(this._id).innerHTML = "";

   		let comidas;
   		let bebidas;

   		this.espera(true);
		this._comidaApi.getDeAlimentos().then(
			(data) => {
    			comidas = data;
    			this._bebidaApi.getDeAlimentos().then(
					(data) => {
		    			bebidas = data;
		    			this.pintaDatos(comidas, bebidas);
		    			this.espera(false);
					}
				);
			}
		);
   	}

   	pintaDatos(comidas, bebidas) {
   		let sHtml = "";
   		let entradas = 0;
   		let principal = 0;
   		let postres = 0;
   		let alcoholicas = 0;
   		let noalcoholicas = 0;

   		if(!document.getElementById(this._id)) {
			let est = new Estructura();
			est.creaContenedor(this._id, this._contenido._idSeccion, "row");
		}

		for(let i=0; i<comidas.length; i++) {
			if(comidas[i]._tipo == "Entrante") entradas++;
			if(comidas[i]._tipo == "Principal") principal++;
			if(comidas[i]._tipo == "Postre") postres++;
		}

		for(let i=0; i<bebidas.length; i++) {
			if(bebidas[i]._esAlcoholica == true) alcoholicas++;
			if(bebidas[i]._esAlcoholica == false) noalcoholicas++;
		}

		sHtml += "<h4>Concentrado de existencias</h4>";
   		sHtml += "<div class='list-group'>";
		sHtml += "<button type='button' class='list-group-item list-group-item-success'>Total de Comidas<span class='badge'>"+comidas.length+"</span></button>";
		sHtml += "<button type='button' class='list-group-item'>Entradas<span class='badge'>"+entradas+"</span></button>";
		sHtml += "<button type='button' class='list-group-item'>Principal<span class='badge'>"+principal+"</span></button>";
		sHtml += "<button type='button' class='list-group-item'>Postres<span class='badge'>"+postres+"</span></button>";
		sHtml += "<button type='button' class='list-group-item list-group-item-success'>Total de Bebidas<span class='badge'>"+bebidas.length+"</span></button>";
		sHtml += "<button type='button' class='list-group-item'>Con Alcohol<span class='badge'>"+alcoholicas+"</span></button>";
		sHtml += "<button type='button' class='list-group-item'>Sin Alcohol<span class='badge'>"+noalcoholicas+"</span></button>";
		sHtml += "</div>";
		document.getElementById(this._id).innerHTML = sHtml;
   	}
}

class Logout extends Funcionalidad {
	constructor(idApp) {
		super(idApp);
		this._usuariosApi = new UsuariosApi();
	}

	pintar() {
		this._usuariosApi.setLimpiarSesion();
		this._usuario = null;
		this._pie._usuario = null;
		super.pintar();

		if(!document.getElementById(this._id)) {
			let est = new Estructura();
			est.creaContenedor(this._id, this._contenido._idSeccion, "row");
		}

		document.getElementById(this._id).innerHTML = "<div class='alert alert-info' role='alert'>Gracias por su visita...</div>";
   	}
}

class Seccion {
	constructor(idApp, idSeccion) {
		this._idApp = idApp;
		this._idSeccion = idSeccion;
	}

	pintar() {}
	refrescar() {}
}

class Cabecera extends Seccion {
	constructor(idApp, idSeccion) {
		super(idApp, idSeccion);
		this._rutas = [];
		this._flujo = null;
	}

	pintar() {
		let sHtml = "";
		let est = new Estructura();

		if(!document.getElementById(this._idSeccion)) {
			est.creaContenedor(this._idSeccion, this._idApp, "contenedorCabecera");
		}

		est.creaContenedor("menu", this._idSeccion, "row");

		sHtml +="<nav class='navbar navbar-default navbar-static-top'>";
		sHtml +="<div class='container'>";

		for(let i=0; i<this._rutas.length; i++) {
			if(i==0) {
				sHtml += "<button type='button' class='btn btn-primary navbar-btn' id='btnOpc" + i + "'>" + this._rutas[i] + "</button>";
			} else {
				sHtml += "<button type='button' class='btn btn-default navbar-btn' id='btnOpc" + i + "'>" + this._rutas[i] + "</button>";
			}
		}

		sHtml +="</div></nav>";

		document.getElementById("menu").innerHTML = sHtml;

		for(let i=0; i<this._rutas.length; i++) {
			document.getElementById("btnOpc" + i).addEventListener("click", () => this._flujo.irURL(this._rutas[i]));
		}
	}

	limpiar() {
		if(!document.getElementById(this._idSeccion)) {
			let est = new Estructura();
			est.creaContenedor(this._idSeccion, this._idApp, "contenedorCabecera");
		}

		document.getElementById(this._idSeccion).innerHTML = "";
	}
}

class Contenido extends Seccion {
	pintar() {
		if(!document.getElementById(this._idSeccion)) {
			let est = new Estructura();
			est.creaContenedor(this._idSeccion, this._idApp, "contenedorContenido");
		}
	}
}

class Pie extends Seccion {
	constructor(idApp, idSeccion) {
		super(idApp, idSeccion);
		this._usuario = null;
	}

	pintar() {
		let est = new Estructura();
		let sHtml = "";
		
		if(!document.getElementById(this._idSeccion)) {
			est.creaContenedor(this._idSeccion, this._idApp, "contenedorPie");
		}

		est.creaContenedor("pie", this._idSeccion, "row");

		sHtml += "<nav class='navbar navbar-default navbar-fixed-bottom'>";
		sHtml += "<div class='container'><p class='text-right'><label>";
		if(this._usuario) {
			sHtml += "Usuario: " + this._usuario._apellidos + "," + this._usuario._nombre;
		} else {
			sHtml += "Sin sesión iniciada";
		}
		sHtml += "</label></p></div></nav>";

		document.getElementById("pie").innerHTML = sHtml;
	}
}