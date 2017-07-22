class PaginaUsuarios extends Pagina {
	constructor() {
		super('/usuarios');
		this._usuarioCliente = new UsuarioCliente();
	}

	pintar() {
		this.pintarCabecera();
		this.generarAddModal();

		var texto = "";

		var divBoton = document.createElement("div");
        divBoton.setAttribute("class", "divBoton");
        divBoton.setAttribute("id", "divBoton");
        //data-toggle="modal" data-target="#myModal"
		var botonAdd = document.createElement('button');
		botonAdd.setAttribute("class", "btn-success");
		botonAdd.setAttribute("id", "botonAdd");
		botonAdd.setAttribute("data-toggle", "modal");
		botonAdd.setAttribute("data-target", "#divAddUsuarioModal");
		divBoton.appendChild(botonAdd);

		texto = document.createTextNode("Agregar usuario");
        botonAdd.appendChild(texto);

		document.getElementById('idBody').appendChild(divBoton);

		var divContenedor = document.createElement("div");
        divContenedor.setAttribute("class", "container");
        divContenedor.setAttribute("id", "divContenedor");

        var h2Titulo = document.createElement("h2");
        h2Titulo.setAttribute("class", "h2Titulo");
        h2Titulo.setAttribute("id", "h2Titulo");

        texto = document.createTextNode("Listado de usuarios");
        h2Titulo.appendChild(texto);

        divContenedor.appendChild(h2Titulo);

        document.getElementById('idBody').appendChild(divContenedor);

        //tabla
        var tabla = document.createElement("table");
        tabla.setAttribute("class", "table table-striped");
        tabla.setAttribute("id", "tabla");

        var cabeceraTabla = document.createElement("thead");
        cabeceraTabla.setAttribute("class", "cabeceraTabla");
        cabeceraTabla.setAttribute("id", "cabeceraTabla");

        var tr1 = document.createElement("tr");
        tr1.setAttribute("class", "tr1");
        tr1.setAttribute("id", "tr1");

        var td1 = document.createElement("td");
        td1.setAttribute("class", "td1");
        td1.setAttribute("id", "td1");

        texto = document.createTextNode("Nombre");
        td1.appendChild(texto);

        var td2 = document.createElement("td");
        td2.setAttribute("class", "td2");
        td2.setAttribute("id", "td2");

        texto = document.createTextNode("Apellidos");
        td2.appendChild(texto);

        var td3 = document.createElement("td");
        td3.setAttribute("class", "td3");
        td3.setAttribute("id", "td3");

        texto = document.createTextNode("Username");
        td3.appendChild(texto);

        var td4 = document.createElement("td");
        td4.setAttribute("class", "td4");
        td4.setAttribute("id", "td4");

        texto = document.createTextNode("Email");
        td4.appendChild(texto);
        //--

        var td5 = document.createElement("td");
        td5.setAttribute("class", "td5");
        td5.setAttribute("id", "td5");

        texto = document.createTextNode("Acciones");
        td5.appendChild(texto);

        divContenedor.appendChild(tabla);
        tabla.appendChild(cabeceraTabla);
        cabeceraTabla.appendChild(tr1);

        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tr1.appendChild(td3);
        tr1.appendChild(td4);
        tr1.appendChild(td5);

        var tbody = document.createElement("tbody");
        tbody.setAttribute("id", "tbodyTabla");

        tabla.appendChild(tbody);

        this.obtenerProductos();
	}

	obtenerProductos() {
		this._usuarioCliente.geMenu().then(
			(data) => {
    			let lista = data;
    			
    			var texto= "";
		        for (var i = 0; i < lista.length; i++) {

		        	var tr2 = document.createElement("tr");
        			tr2.setAttribute("class", "tr2");
        			tr2.setAttribute("id", "tr2");

		        	var td1 = document.createElement("td");
			        td1.setAttribute("class", "td1Nombre");
			        td1.setAttribute("id", "td1Nombre");
			        tr2.appendChild(td1);

			        texto = document.createTextNode(lista[i]._nombre);
		        	td1.appendChild(texto);

		        	var td2 = document.createElement("td");
			        td2.setAttribute("class", "td2Apellidos");
			        td2.setAttribute("id", "td2Apellidos");
			        tr2.appendChild(td2);

			        texto = document.createTextNode(lista[i]._apellidos);
		        	td2.appendChild(texto);

		        	var td3 = document.createElement("td");
			        td3.setAttribute("class", "td3Username");
			        td3.setAttribute("id", "td3Username");
			        tr2.appendChild(td3);

			        texto = document.createTextNode(lista[i]._username);
		        	td3.appendChild(texto);

		        	var td4 = document.createElement("td");
			        td4.setAttribute("class", "td4Email");
			        td4.setAttribute("id", "td4Email");
			        tr2.appendChild(td4);

			        texto = document.createTextNode(lista[i]._email);
		        	td4.appendChild(texto);

		        	let nombre = lista[i]._nombre;
			        let apellidos = lista[i]._apellidos;
			        let username = lista[i]._username;
			        let email = lista[i]._email;
			        let idUsuario = lista[i]._id;

			        var eliminar = document.createElement("button");
			        eliminar.setAttribute("class","btn btn-warning");
			        eliminar.setAttribute("id","delete"+lista[i]._id);
			        eliminar.setAttribute("data-toggle", "modal");
					eliminar.setAttribute("data-target", "#divDeleteUsuarioModal");
					eliminar.addEventListener('click', (event) => {event.preventDefault(); this.eliminar(idUsuario); });
			        
			        var td5 = document.createElement("td");
			        td5.setAttribute("class", "td5Acciones");
			        td5.setAttribute("id", "td5Acciones");
			        tr2.appendChild(td5);

			        td5.appendChild(eliminar);

			        texto = document.createTextNode("Eliminar ");
		        	eliminar.appendChild(texto);

		        	//editar
		        	var editar = document.createElement("button");
			        editar.setAttribute("class","btn btn-primary");
			        editar.setAttribute("id","edit"+lista[i]._id);
			        editar.setAttribute("data-toggle", "modal");
					editar.setAttribute("data-target", "#divEditUsuarioModal");
					editar.addEventListener('click', (event) => { console.log("des"); this.editar(idUsuario,nombre, apellidos,username, email); });
			        //editar.addEventListener('click', (event) => { this.eliminar(idUsuario) });
			        td5.appendChild(editar);

			        texto = document.createTextNode("Editar ");
		        	editar.appendChild(texto);

		        	document.getElementById('tbodyTabla').appendChild(tr2);
		        }

    		}
		);
	}

	eliminar(idUsuario) {
		this.generarDeleteUsuarioModal(idUsuario);
	}

	editar(idUsuario, nombre, apellidos, username, email) {
		//event.preventDefault();
		console.log("apl " + apellidos);

		let datos = {
			"_id":idUsuario,
			"email": email,
			"apellidos": apellidos,
			"nombre":nombre,
			"username":username
		}

		console.log("u "+ datos.username);

		this.generarEditUsuarioModal(datos);
	}

	generarAddModal() {
		var texto = "";
		let datosModal = Modal.pintarCabecera('divAddUsuarioModal','Agregar Usuario');
		let divContentModal = datosModal.divContentModal;
		let divAddModal = datosModal.divAddModal;

		let datosBodyModal = Modal.pintarBodyFormModal();
		let divBodyModal = datosBodyModal.divBodyModal;
		let formModal = datosBodyModal.formModal;
	
        //form-group
        var formDiv = document.createElement('div');
        formDiv.setAttribute("class", "form-group");
        formModal.appendChild(formDiv);

        var nombreLabel = document.createElement('label');
        nombreLabel.setAttribute("for", "nombreInput");
        nombreLabel.setAttribute("class", "nombreLabel");
        formDiv.appendChild(nombreLabel);

        texto = document.createTextNode("Nombre:");
		nombreLabel.appendChild(texto);

		var nombreInput = document.createElement('input');
		nombreInput.setAttribute("type", "text");
        nombreInput.setAttribute("class", "nombreInput");
        nombreInput.setAttribute("id", "nombreInput");
        formDiv.appendChild(nombreInput);

        ////
        var formDiv2 = document.createElement('div');
        formDiv2.setAttribute("class", "form-group");
        formModal.appendChild(formDiv2);

        var apellidosLabel = document.createElement('label');
        apellidosLabel.setAttribute("for", "apellidosInput");
        apellidosLabel.setAttribute("class", "apellidosLabel");
        formDiv2.appendChild(apellidosLabel);

        texto = document.createTextNode("Apellidos:");
		apellidosLabel.appendChild(texto);

		var apellidosInput = document.createElement('input');
		apellidosInput.setAttribute("type", "text");
        apellidosInput.setAttribute("class", "apellidosInput");
        apellidosInput.setAttribute("id", "apellidosInput")
        formDiv2.appendChild(apellidosInput);
        ///
        var formDiv3 = document.createElement('div');
        formDiv3.setAttribute("class", "form-group");
        formModal.appendChild(formDiv3);

        var usernameLabel = document.createElement('label');
        usernameLabel.setAttribute("for", "usernameInput");
        usernameLabel.setAttribute("class", "usernameLabel");
        formDiv3.appendChild(usernameLabel);

        texto = document.createTextNode("Username:");
		usernameLabel.appendChild(texto);

		var usernameInput = document.createElement('input');
		usernameInput.setAttribute("type", "text");
        usernameInput.setAttribute("class", "usernameInput");
        usernameInput.setAttribute("id", "usernameInput");
        formDiv3.appendChild(usernameInput);
        ///
        var formDiv4 = document.createElement('div');
        formDiv4.setAttribute("class", "form-group");
        formModal.appendChild(formDiv4);

        var emailLabel = document.createElement('label');
        emailLabel.setAttribute("for", "emailInput");
        emailLabel.setAttribute("class", "emailLabel");
        formDiv4.appendChild(emailLabel);

        texto = document.createTextNode("E mail:");
		emailLabel.appendChild(texto);

		var emailInput = document.createElement('input');
		emailInput.setAttribute("type", "text");
        emailInput.setAttribute("class", "emailInput");
        emailInput.setAttribute("id", "emailInput");
        formDiv4.appendChild(emailInput);


        var formDiv5 = document.createElement('div');
        formDiv5.setAttribute("class", "form-group");
        formModal.appendChild(formDiv5);

        var passLabel = document.createElement('label');
        passLabel.setAttribute("for", "passInput");
        passLabel.setAttribute("class", "passLabel");
        formDiv5.appendChild(passLabel);

        texto = document.createTextNode("Password:");
		passLabel.appendChild(texto);

		var passInput = document.createElement('input');
		passInput.setAttribute("type", "text");
        passInput.setAttribute("class", "passInput");
        passInput.setAttribute("id", "passInput");
        formDiv5.appendChild(passInput);

   		Modal.pintarBoton("Guardar", formModal);
        
        divContentModal.appendChild(divBodyModal);

        let divPadre = document.createElement("div");
		divPadre.setAttribute("id", "divPadre");

        document.getElementById('idBody').appendChild(divPadre);
        document.getElementById('divPadre').appendChild(divAddModal);

        this.escucharBoton("guardar","");
	}

	escucharBoton(accion, idProducto) {
		this._botonSave = document.getElementById('botonSave');
		this._botonSave.addEventListener('click',(event) => {
			event.preventDefault();

			let id = idProducto;
			let nombre =  document.getElementById('nombreInput').value;
			let apellidos =  document.getElementById('apellidosInput').value;
			let username = document.getElementById('usernameInput').value;
			let pass =  document.getElementById('passInput').value;
			let email =  document.getElementById('emailInput').value;
			
			console.log("q " +email);

			let usuario = new Usuario(id, email,apellidos,nombre,username,pass);

			if(accion == "guardar") {
				let promise = this._usuarioCliente.guardar(usuario).then(
                    ()=> {
                        this._navigatorController.NavigateToUrl('/usuarios');
                });
			} else if("editar"){
				let promise = this._usuarioCliente.actualizar(usuario,id).then(
                    ()=> {
                        this._navigatorController.NavigateToUrl('/usuarios');
                });
			} 
			//return promise;
		});
	}


	generarDeleteUsuarioModal(idProducto) {
		var texto = "";
		let datosModal = Modal.pintarCabecera('divDeleteUsuarioModal','Borrar Usuario');
		let divContentModal = datosModal.divContentModal;
		let divAddModal = datosModal.divAddModal;

		let datosBodyModal = Modal.pintarBodyFormModal();
		let divBodyModal = datosBodyModal.divBodyModal;
		let formModal = datosBodyModal.formModal;
	
        //form-group
        var formDiv = document.createElement('div');
        formDiv.setAttribute("class", "form-group");
        formModal.appendChild(formDiv);

        var passLabel = document.createElement('label');
        passLabel.setAttribute("for", "passInput");
        passLabel.setAttribute("class", "passLabel");
        formDiv.appendChild(passLabel);

        texto = document.createTextNode("Ingresar password:");
		passLabel.appendChild(texto);

		var passInput = document.createElement('input');
		passInput.setAttribute("type", "text");
        passInput.setAttribute("class", "passInput");
        passInput.setAttribute("id", "passwordInput");
        formDiv.appendChild(passInput);



        Modal.pintarBotonDelete("Eliminar", formModal);
        
        divContentModal.appendChild(divBodyModal);

        let divPadre = document.createElement("div");
		divPadre.setAttribute("id", "divPadre");

        document.getElementById('idBody').appendChild(divPadre);
        document.getElementById('divPadre').appendChild(divAddModal);

        this.escucharBotonEliminar(idProducto);
	}

	escucharBotonEliminar(idProducto) {
		this._botonSave = document.getElementById('botonDelete');
		this._botonSave.addEventListener('click',(event) => {
			event.preventDefault();
					let password =  document.getElementById('passwordInput').value;
					
					let promise = this._usuarioCliente.eliminar(idProducto, password).then(
                    ()=> {
                        this._navigatorController.NavigateToUrl('/usuarios');
                });
			
			//return promise;
		});
	}

	generarEditUsuarioModal(datos) {
		console.log("v" + datos.username);
		let nombre = datos.nombre;
		let apellidos = datos.apellidos;
		let email = datos.email;
		let id = datos._id;
		let username = datos.username;

		var texto = "";
		let datosModal = Modal.pintarCabecera('divEditUsuarioModal','Editar Usuario');
		let divContentModal = datosModal.divContentModal;
		let divAddModal = datosModal.divAddModal;

		let datosBodyModal = Modal.pintarBodyFormModal();
		let divBodyModal = datosBodyModal.divBodyModal;
		let formModal = datosBodyModal.formModal;
	
        //form-group
        var formDiv = document.createElement('div');
        formDiv.setAttribute("class", "form-group");
        formModal.appendChild(formDiv);

        var nombreLabel = document.createElement('label');
        nombreLabel.setAttribute("for", "nombreInput");
        nombreLabel.setAttribute("class", "nombreLabel");
        formDiv.appendChild(nombreLabel);

        texto = document.createTextNode("Nombre:");
		nombreLabel.appendChild(texto);

		var nombreInput = document.createElement('input');
		nombreInput.setAttribute("type", "text");
        nombreInput.setAttribute("class", "nombreInput");
        nombreInput.setAttribute("id", "nombreInput");
        nombreInput.setAttribute("value", nombre);
        formDiv.appendChild(nombreInput);

        ////
        var formDiv2 = document.createElement('div');
        formDiv2.setAttribute("class", "form-group");
        formModal.appendChild(formDiv2);

        var apellidosLabel = document.createElement('label');
        apellidosLabel.setAttribute("for", "apellidosInput");
        apellidosLabel.setAttribute("class", "apellidosLabel");
        formDiv2.appendChild(apellidosLabel);

        texto = document.createTextNode("Apellidos:");
		apellidosLabel.appendChild(texto);

		var apellidosInput = document.createElement('input');
		apellidosInput.setAttribute("type", "text");
        apellidosInput.setAttribute("class", "apellidosInput");
        apellidosInput.setAttribute("id", "apellidosInput");
        apellidosInput.setAttribute("value", apellidos);
        formDiv2.appendChild(apellidosInput);
        ///
        var formDiv3 = document.createElement('div');
        formDiv3.setAttribute("class", "form-group");
        formModal.appendChild(formDiv3);

        var usernameLabel = document.createElement('label');
        usernameLabel.setAttribute("for", "usernameInput");
        usernameLabel.setAttribute("class", "usernameLabel");
        formDiv3.appendChild(usernameLabel);

        texto = document.createTextNode("Username:");
		usernameLabel.appendChild(texto);

		var usernameInput = document.createElement('input');
		usernameInput.setAttribute("type", "text");
        usernameInput.setAttribute("class", "usernameInput");
        usernameInput.setAttribute("id", "usernameInput");
        usernameInput.setAttribute("value", username);
        formDiv3.appendChild(usernameInput);
        ///
        var formDiv4 = document.createElement('div');
        formDiv4.setAttribute("class", "form-group");
        formModal.appendChild(formDiv4);

        var emailLabel = document.createElement('label');
        emailLabel.setAttribute("for", "emailInput");
        emailLabel.setAttribute("class", "emailLabel");
        formDiv4.appendChild(emailLabel);

        texto = document.createTextNode("E mail:");
		emailLabel.appendChild(texto);

		var emailInput = document.createElement('input');
		emailInput.setAttribute("type", "text");
        emailInput.setAttribute("class", "emailInput");
        emailInput.setAttribute("id", "emailInput");
        emailInput.setAttribute("value", email);
        formDiv4.appendChild(emailInput);


        var formDiv5 = document.createElement('div');
        formDiv5.setAttribute("class", "form-group");
        formModal.appendChild(formDiv5);

        var passLabel = document.createElement('label');
        passLabel.setAttribute("for", "passInput");
        passLabel.setAttribute("class", "passLabel");
        formDiv5.appendChild(passLabel);

        texto = document.createTextNode("Password:");
		passLabel.appendChild(texto);

		var passInput = document.createElement('input');
		passInput.setAttribute("type", "text");
        passInput.setAttribute("class", "passInput");
        passInput.setAttribute("id", "passInput");
        formDiv5.appendChild(passInput);

   		Modal.pintarBoton("Guardar", formModal);
        
        divContentModal.appendChild(divBodyModal);

        //let divPadre = document.createElement("div");
		//divPadre.setAttribute("id", "divPadre");
		let divPadre2 = document.getElementById("divPadre");

        if(!divPadre2){
        	divPadre2 = document.createElement("div");
        }

        divPadre2.innerHTML = "";
		divPadre2.setAttribute("id", "divPadre");

        document.getElementById('idBody').appendChild(divPadre);
        document.getElementById('divPadre').appendChild(divAddModal);

        this.escucharBoton("editar",id);
	}
}