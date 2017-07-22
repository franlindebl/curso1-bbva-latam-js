class PaginaLogin extends Pagina{
	constructor() {
		super('/login');
		this._username = null;
		this._password = null;
		this._guardado = null;

        this._usuarioCliente = new UsuarioCliente();
	}

	obtenerDatosFormulario(event) {
		event.preventDefault();
		this._username = document.getElementById('usuarioInput').value;
		this._password = document.getElementById('passwordInput').value;
		this._guardado =  document.getElementById('checkInput').checked;

		if(this._guardado) {
			this.guardarDatos();
		} else {
			this.eliminarDatos();
		}
		localStorage.setItem("estaAutenticado", "true");
		
	}

    hacerlogin() {
        var promise = this._usuarioCliente.login(this._username, this._password).then(
            (data) => {
               if(data == '200') {
                    this._navigatorController.navigateToHome();
               } else {
                    document.getElementById('idBody').innerHTML += '<div class="alert alert-danger"><strong>Error!</strong> Las credenciales son invalidas</div>';
               }
            }
        );
    }

	guardarDatos() {
		localStorage.setItem("usuario", this._usuario);
		localStorage.setItem("password", this._password);
	}

	eliminarDatos() {
		localStorage.setItem("usuario", "");
		localStorage.setItem("password", "");
	}


	pintar() {
		var texto = "";

		document.getElementById("idBody").innerHTML = ""; 
		// div de formulario
		var divLogin = document.createElement("div");
        divLogin.setAttribute("class", "modal-dialog login");
        divLogin.setAttribute("id", "login");

        document.getElementById("idBody").appendChild(divLogin);

        var cabecera = document.createElement("div");
        cabecera.setAttribute("class", "modal-header");
        cabecera.setAttribute("id", "cabecera");

        document.getElementById("login").appendChild(cabecera);

		var tituloLogin = document.createElement("h2");
		tituloLogin.setAttribute("class", "tituoLogin");
        tituloLogin.setAttribute("id", "tituloLogin");

	    texto = document.createTextNode("LOGIN ");
        tituloLogin.appendChild(texto);

        document.getElementById('cabecera').appendChild(tituloLogin);

        //formulario
        var formulario = document.createElement("form");
        formulario.setAttribute("class", "formulario");
        formulario.setAttribute("id", "formulario");
        divLogin.appendChild(formulario);

        //label usuario
        var usuarioLabel = document.createElement("label");
        usuarioLabel.setAttribute("class", "usuarioLabel");
        usuarioLabel.setAttribute("id", "usuarioLabel");
        usuarioLabel.setAttribute("for", "usuarioInput");

        texto = document.createTextNode("Usuario: ");
        usuarioLabel.appendChild(texto);

        formulario.appendChild(usuarioLabel);

        //label usuarioInput
        var usuarioInput = document.createElement("input");
        usuarioInput.setAttribute("class", "usuarioInput");
        usuarioInput.setAttribute("type", "text");
        usuarioInput.setAttribute("id", "usuarioInput");

        if(localStorage.getItem('usuario') != null) {
        	usuarioInput.setAttribute("value", localStorage.getItem('usuario'));
        }

        formulario.appendChild(usuarioInput);

        //label password
        var passwordLabel = document.createElement("label");
        passwordLabel.setAttribute("class", "passwordLabel");
        passwordLabel.setAttribute("id", "passwordLabel");
        passwordLabel.setAttribute("for", "passwordInput");

        texto = document.createTextNode("Password: ");
        passwordLabel.appendChild(texto);

        formulario.appendChild(passwordLabel);

         //label usuarioInput
        var passwordInput = document.createElement("input");
        passwordInput.setAttribute("class", "passwordInput");
        passwordInput.setAttribute("id", "passwordInput");
        passwordInput.setAttribute("type", "password");

        if(localStorage.getItem('password') != null) {
        	passwordInput.setAttribute("value", localStorage.getItem('password'));
        } /*else if(localStorage.getItem('password') = null){
        	passwordInput.setAttribute("value", "");
        }*/

        formulario.appendChild(passwordInput);

        //Recordar contraseña
        var checkdiv = document.createElement("div");
        checkdiv.setAttribute("id", "checkdiv");
        formulario.appendChild(checkdiv);

        var checkLabel = document.createElement("label");
        checkLabel.setAttribute("class","checkLabel");

        texto = document.createTextNode("Recordar contraseña");
        checkLabel.appendChild(texto);

        checkdiv.appendChild(checkLabel);

        var checkInput = document.createElement("input");
        checkInput.setAttribute("class", "checkInput");
        checkInput.setAttribute("id", "checkInput");
        checkInput.setAttribute("type", "checkbox");
        checkLabel.appendChild(checkInput);

        //Boton
        var boton = document.createElement("button");
        boton.setAttribute("class", "btn btn-success btn-block");
        boton.setAttribute("id", "boton");
        formulario.appendChild(boton);

        texto = document.createTextNode("Ingresar");
        boton.appendChild(texto);

        document.getElementById('login').appendChild(formulario);

        this._button = document.getElementById('boton');
		this._button.addEventListener('click',(event) => {
			this.obtenerDatosFormulario(event);
            this.hacerlogin();
		});
	}

}