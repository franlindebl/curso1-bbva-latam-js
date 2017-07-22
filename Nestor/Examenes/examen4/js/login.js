class Login extends Pagina {
    constructor(nombre, ruta, app, contexto, modalController) {
        super(nombre, ruta, app, contexto);
        this._id = "";
        this._usuarioLogin = "";
        this._contraseña = "";
        this._recordadContraseña = false;
        this._modalController = modalController;
        this._rutaLogin = ruta;
        this._usuariosApi = new UsuariosApi();
    }
    pinta() {
        this.pintaEstructuraLogin();
    }

    pintaEstructuraLogin() {
        let navegacionPadreLogin = document.getElementsByClassName("containerBody")[0];
        let divLogin = document.createElement("div");
        navegacionPadreLogin.appendChild(divLogin);
        divLogin.className = 'card card-container';

        let h2Login = document.createElement("h2");
        divLogin.appendChild(h2Login);
        let textInputTitleLogin = document.createTextNode("Login");
        h2Login.appendChild(textInputTitleLogin);

        h2Login.className = 'login_title text-center';
        let hrLogin = document.createElement("hr");
        divLogin.appendChild(hrLogin);

        let formLogin = document.createElement("form");
        divLogin.appendChild(formLogin);
        formLogin.className = 'form-signin';

        let textUser = document.createElement("p");
        formLogin.appendChild(textUser);
        textUser.className = 'input_title';
        let textInputNameLoginU = document.createTextNode("Usuario");
        textUser.appendChild(textInputNameLoginU);

        let inputUser = document.createElement("input");
        formLogin.appendChild(inputUser);
        inputUser.setAttribute("type", "text");
        inputUser.setAttribute("id", "inputEmail");
        inputUser.setAttribute("class", "login_box inputUsuario");
        inputUser.setAttribute("placeholder", "Usuario");
        inputUser.setAttribute("required", "");
        inputUser.setAttribute("autofocus", "");

        let textPass = document.createElement("p");
        formLogin.appendChild(textPass);
        textPass.className = 'input_title';
        let textInputPassLogin = document.createTextNode("Password");
        textPass.appendChild(textInputPassLogin);


        let inputPass = document.createElement("input");
        formLogin.appendChild(inputPass);
        inputPass.setAttribute("type", "password");
        inputPass.setAttribute("id", "inputPassword");
        inputPass.setAttribute("class", "login_box inputPasswd");
        inputPass.setAttribute("placeholder", "Password");
        inputPass.setAttribute("required", "");

        let botonLogin = document.createElement("button");
        formLogin.appendChild(botonLogin);
        botonLogin.setAttribute("class", "btn btn-lg btn-primary");
        let textButtonLogin = document.createTextNode("Login");
        botonLogin.appendChild(textButtonLogin);

        botonLogin.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();
            this.validaCamposLogin();
        });

        let divRegistroNuevo = document.createElement('div');
        divLogin.appendChild(divRegistroNuevo);
        let aRegristroNuevo = document.createElement('a');
        divRegistroNuevo.appendChild(aRegristroNuevo);
        let textARegistroNuevo = document.createTextNode("Registro nuevo Usuario");
        aRegristroNuevo.appendChild(textARegistroNuevo);
        aRegristroNuevo.setAttribute("href", "#");
        aRegristroNuevo.setAttribute("class", "registroNuevo");
        aRegristroNuevo.addEventListener('click', () => this.agregaNuevoUsuario());
        divRegistroNuevo.setAttribute("class", "divRegistroNuevo");
    }
    agregaNuevoUsuario() {
        //alert("Se va a agregar Usuario, esperate que aun no esta construido!!!!");
        this.construyeModalInsertarUsuario();
    }
    obtenUsuarios() {
        this._usuariosApi.getUsuario().then((data) => {

            for (let dat = 0; dat < data.length; dat++) {
                //this.pintarHTMLComida(data[dat]._nombre, data[dat]._existencias, data[dat]._calorias, data[dat]._tipo, data[dat]._precio, data[dat]._id);
                console.log(data[dat])
            }
        });
    }

    validaCamposLogin() {
        let usuarioFirmado = {}
        this._usuario = document.getElementById('inputEmail').value;

        if (document.getElementById('inputEmail').value && document.getElementById('inputPassword').value) {
            usuarioFirmado.username = document.getElementById('inputEmail').value;
            usuarioFirmado.password = document.getElementById('inputPassword').value;

            this._usuariosApi.validaUsuarioPOST(usuarioFirmado).then((data) => {
                console.log(data);
                if (data.username == this._usuario) {
                    localStorage.setItem("Nombre", this._usuario);
                    this._contexto._usuarioContexto = this._usuario;
                    this._navega.navegarPrimerPagina("/inicio");
                } else {
                    alert("Usuario o password Invalido");
                }
                return data;
            });
        }

    }

    construyeModalInsertarUsuario(email, apellidos, nombre, username, id) {

        let divModalBody = document.createElement('div');
        divModalBody.setAttribute("class", "md-form")

        let inputModalBodyEmail = document.createElement('input');
        let inputModalBodyApellidos = document.createElement('input');
        let inputModalBodyNombre = document.createElement('input');
        let inputModalBodyUsername = document.createElement('input');
        let inputModalBodyPassword = document.createElement('input');

        inputModalBodyEmail.setAttribute("type", "text");
        inputModalBodyApellidos.setAttribute("type", "text");
        inputModalBodyNombre.setAttribute("type", "text");
        inputModalBodyUsername.setAttribute("type", "text");
        inputModalBodyPassword.setAttribute("type", "text");

        inputModalBodyEmail.setAttribute("placeholder", "xxx@ness.com");
        inputModalBodyApellidos.setAttribute("placeholder", "Apellidos");
        inputModalBodyNombre.setAttribute("placeholder", "Nombre");
        inputModalBodyUsername.setAttribute("placeholder", "Username");
        inputModalBodyPassword.setAttribute("placeholder", "Password");

        inputModalBodyEmail.setAttribute("class", "form-control");
        inputModalBodyApellidos.setAttribute("class", "form-control");
        inputModalBodyNombre.setAttribute("class", "form-control");
        inputModalBodyUsername.setAttribute("class", "form-control");
        inputModalBodyPassword.setAttribute("class", "form-control");

        inputModalBodyEmail.setAttribute("id", "EmailNuevo");
        inputModalBodyApellidos.setAttribute("id", "ApellidosNuevo");
        inputModalBodyNombre.setAttribute("id", "NombreNuevo");
        inputModalBodyUsername.setAttribute("id", "UsernameNuevo");
        inputModalBodyPassword.setAttribute("id", "PasswordNuevo");


        let pModalBodyEmail = document.createElement('label');
        let pModalBodyApellidos = document.createElement('label');
        let pModalBodyNombre = document.createElement('label');
        let pModalBodyUsername = document.createElement('label');
        let pModalBodyPassword = document.createElement('label');

        pModalBodyEmail.setAttribute("id", "form41");
        pModalBodyApellidos.setAttribute("id", "form41");
        pModalBodyNombre.setAttribute("id", "form41");
        pModalBodyUsername.setAttribute("id", "form41");
        pModalBodyPassword.setAttribute("id", "form41");

        divModalBody.appendChild(pModalBodyEmail);
        divModalBody.appendChild(inputModalBodyEmail);
        divModalBody.appendChild(pModalBodyApellidos);
        divModalBody.appendChild(inputModalBodyApellidos);
        divModalBody.appendChild(pModalBodyNombre);
        divModalBody.appendChild(inputModalBodyNombre);
        divModalBody.appendChild(pModalBodyUsername);
        divModalBody.appendChild(inputModalBodyUsername);
        divModalBody.appendChild(pModalBodyPassword);

        divModalBody.appendChild(inputModalBodyPassword);


        let texModalBodyEmail = document.createTextNode("Email: ");
        pModalBodyEmail.appendChild(texModalBodyEmail);

        let texModalBodyApellidos = document.createTextNode("Apellidos:  ");
        pModalBodyApellidos.appendChild(texModalBodyApellidos);

        let texModalBodyNombre = document.createTextNode("Nombre: ");
        pModalBodyNombre.appendChild(texModalBodyNombre);

        let texModalBodyUsername = document.createTextNode("Username: ");
        pModalBodyUsername.appendChild(texModalBodyUsername);

        let texModalBodyPassword = document.createTextNode("Password:  ");
        pModalBodyPassword.appendChild(texModalBodyPassword);

        let botonGuardarInfoModal = document.createElement('button');
        divModalBody.appendChild(botonGuardarInfoModal);
        botonGuardarInfoModal.setAttribute("type", "button");
        botonGuardarInfoModal.setAttribute("class", "btn btn-default");
        botonGuardarInfoModal.setAttribute("data-dismiss", "modal");
        let textoGuardar = document.createTextNode("Guardar");
        botonGuardarInfoModal.appendChild(textoGuardar);


        botonGuardarInfoModal.addEventListener('click', () => this.guardarNuevosDatosModalUsuario());
        let title = "Nuevo Usuario ";


        this._modalController.openModalWithChild(divModalBody, title, this._rutaLogin);


    }
    guardarNuevosDatosModalUsuario() {
        let nuevoEmail = document.getElementById('EmailNuevo').value;
        let nuevoApellidos = document.getElementById('ApellidosNuevo').value;
        let nuevoNombre = document.getElementById('NombreNuevo').value;
        let nuevoUsername = document.getElementById('UsernameNuevo').value;
        let nuevoPassword = document.getElementById('PasswordNuevo').value;
        let datosNuevoUsuario = {};

        datosNuevoUsuario.email = nuevoEmail;
        datosNuevoUsuario.apellidos = nuevoApellidos;
        datosNuevoUsuario.nombre = nuevoNombre;
        datosNuevoUsuario.username = nuevoUsername;
        datosNuevoUsuario.password = nuevoPassword;

        this._usuariosApi.POSTUsuarios(datosNuevoUsuario).then((data) => {

            alert("Usuario dado de Alta");
            this._modalController.removeModale();
        })
    }
}
class Usuario {
    constructor(email, apellidos, nombre, username, password) {
        this._email = email;
        this._apellidos = apellidos;
        this._nombre = nombre;
        this._username = username;
        this._password = password;
    }
}

class UsuariosApi {
    constructor() {
        this._urlBase = "http://formacion-indra-franlindebl.com/api/users";
        this._apiClient = new APIClient();
    }
    POSTUsuarios(datos) {
        let urlCompleta = this._urlBase;

        return this._apiClient.post(datos, urlCompleta).then((datos) => {
            console.log(datos);
            return datos;
        });
    }

    PUTUsuario(datos, id) {
        let urlCompleta = this._urlBase+"/"+ id;

        return this._apiClient.put(datos, urlCompleta).then((datos) => {
            return datos;
        });
    }

    validaUsuarioPOST(datos) {
        let urlCompleta = this._urlBase + "/login";

        return this._apiClient.post(datos, urlCompleta).then((data) => {
            console.log(data);
            return data;
        });
    }

  getPerfilUsuarios(datos) {
        let urlCompleta = this._urlBase;

        return this._apiClient.get(urlCompleta).then((datos) => {
            console.log(datos);
            return datos;
        });
    }

    deleteUsuarioById(idBorrar, pass){
         let urlCompleta = this._urlBase + "/"+ idBorrar;
        return this._apiClient.delete(urlCompleta, pass).then((data) => {
            console.log(data);
             return data;
        });

    }
}
