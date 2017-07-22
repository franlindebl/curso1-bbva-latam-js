class LoginPage extends Page {
    constructor(navController) {
        super('Login', '/login.html', 'Login');

        this._apiLogin = new LoginApi();
        this._apiUsuario = new UsuarioApi();
    }

    pintar() {
        let body = document.querySelector('body');
        body.innerHTML = "";

        let divContainer = document.createElement("DIV");
        divContainer.className = 'divLoginPrincipal container-fluid';

        let divColL = document.createElement("DIV");
        divColL.className = 'col-md-3';
        let divColR = document.createElement("DIV");
        divColR.className = 'col-md-3';

        let divCol = document.createElement("DIV");
        divCol.className = 'divColLogin col-sm-12 col-md-6';

        let divLogin = document.createElement("DIV");
        divLogin.className = 'divLogin';

        divCol.appendChild(divLogin);

        let htmlLogin = '';
        htmlLogin += '<form>';
        htmlLogin += '<div id="divmensajes"></div>';
        htmlLogin += '<div class="form-group">';
        htmlLogin += '<label for="usuario">Usuario</label>';
        htmlLogin += '<input type="text" class="form-control" id="usuarioAcceso" placeholder="user">';
        htmlLogin += '</div>';
        htmlLogin += '<div class="form-group">';
        htmlLogin += '<label for="password">Password</label>';
        htmlLogin += '<input type="password" class="form-control" id="passwordAcceso" placeholder="password">';
        htmlLogin += '</div>';
        htmlLogin += '<div class="checkbox">';
        htmlLogin += '<label>';
        htmlLogin += '<input type="checkbox" id="recordarPass"> Recordar';
        htmlLogin += '</label>';
        htmlLogin += '</div>';
        htmlLogin += '<div class="form-group">';
        htmlLogin += '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalRegistro"><span class="glyphicon glyphicon-user"></span> Registrarse</button>';
        htmlLogin += '<button type="button" id="btnlogin" class="btn btn-primary"><span class="glyphicon glyphicon-log-in"></span> Login</button>';
        htmlLogin += '</div>';
        htmlLogin += '</form>';

        divLogin.innerHTML = htmlLogin;

        let divRow = document.createElement("DIV");
        divRow.className = 'row';
        divRow.appendChild(divColL);
        divRow.appendChild(divCol);
        divRow.appendChild(divColR);

        divContainer.appendChild(divRow);

        body.appendChild(divContainer);

        this.pintaModalRegistro();

        Utils._addEventClick("#btnlogin", this.login.bind(this));

        let credenciales = Api_LS._getJsonAtLocalStorage("credenciales");

        if (credenciales) {
            document.querySelector('#usuarioAcceso').value = credenciales.usuario;
            document.querySelector('#passwordAcceso').value = credenciales.password;
            document.querySelector('#recordarPass').checked = true;
        }
    }

    pintaModalRegistro() {
        let divModal = '';
        divModal += '<div id="modalRegistro" class="modal fade" role="dialog">';
        divModal += '<div class="modal-dialog">';
        divModal += '<div class="modal-content">';
        divModal += '<div class="modal-header">';
        divModal += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
        divModal += '<h4 class="modal-title">Indique los siguientes datos para realizar su registro</h4>';
        divModal += '</div>';
        divModal += '<div class="modal-body">';
        divModal += '<form>';

        divModal += '<div class="form-group">';
        divModal += '<label for="email">Email:</label>';
        divModal += '<input type="email" class="form-control" id="email">';
        divModal += '</div>';

        divModal += '<div class="form-group">';
        divModal += '<label for="apellidos">Apellidos:</label>';
        divModal += '<input type="text" class="form-control" id="apellidos">';
        divModal += '</div>';

        divModal += '<div class="form-group">';
        divModal += '<label for="nombre">Nombre:</label>';
        divModal += '<input type="text" class="form-control" id="nombre" step=1>';
        divModal += '</div>';

        divModal += '<div class="form-group">';
        divModal += '<label for="username">Usuario:</label>';
        divModal += '<input type="text" class="form-control" id="username">';
        divModal += '</div>';

        divModal += '<div class="form-group">';
        divModal += '<label for="password">Password:</label>';
        divModal += '<input type="password" class="form-control" id="password">';
        divModal += '</div>';

        divModal += '</form>';
        divModal += '</div>';
        divModal += '<div class="modal-footer">';
        divModal += '<button type="button" class="btn btn-primary" data-dismiss="modal" id="btnRegistrar"><span class="glyphicon glyphicon-floppy-saved"></span> Guardar</button>';
        divModal += '</div>';
        divModal += '</div>';
        divModal += '</div>';
        divModal += '</div>';

        let div = document.createElement("DIV");
        div.innerHTML = divModal;

        document.querySelector('body').appendChild(div);

        Utils._addEventClick('#btnRegistrar', this.registrarUsuario.bind(this));
    }

    registrarUsuario() {
        let jsonUsuario = {};

        jsonUsuario.email = document.querySelector("#email").value;
        jsonUsuario.apellidos = document.querySelector("#apellidos").value;
        jsonUsuario.nombre = document.querySelector("#nombre").value;
        jsonUsuario.username = document.querySelector("#username").value;
        jsonUsuario.password = document.querySelector("#password").value;

        this._apiUsuario.postUsuario(jsonUsuario).then(
            (dato) => {
                Api_LS._removeParam("credenciales");

                if (dato.hasOwnProperty('username')) {
                    document.querySelector('#usuario').value = dato.username;
                    document.querySelector('#password').value = null;

                    let divMesg = document.querySelector('#divmensajes');
                    let mensaje = 'Registro de usuario correcto.';
                    Utils._msg('Success', mensaje, divMesg);
                } else {
                    let divMesg = document.querySelector('#divmensajes');
                    let mensaje = dato.errmsg;
                    Utils._msg('Warning', mensaje, divMesg);
                }
                Utils._quitarModalLoading();
            }
        ).catch((e) => { Utils._quitarModalLoading(); });
    }

    login() {
        let user = document.querySelector('#usuarioAcceso').value;
        let pass = document.querySelector('#passwordAcceso').value;
        let recordarPass = document.querySelector('#recordarPass').checked;

        if (user && pass) {
            this._apiLogin.getLogin(new Login(user, pass)).then(
                (dato) => {
                    if ( dato.hasOwnProperty('message') ) {
                        let divMesg = document.querySelector('#divmensajes');
                        let mensaje = dato.message;
                        Utils._msg('Warning', mensaje, divMesg);

                        Utils._quitarModalLoading();
                    } else {
                        this.guardarLS(user, pass, recordarPass);
                        this._navController._addUsuario(new Usuario(dato._id, dato._email, dato._apellidos, dato._nombre, dato._username));

                        Utils._quitarModalLoading();

                        this._navController.navigateToHome();
                    }
                }
            ).catch((e) => { Utils._quitarModalLoading(); });
        } else {
            let divMesg = document.querySelector('#divmensajes');
            let mensaje = 'Por favor indique usuario y contraseña.';
            Utils._msg('Warning', mensaje, divMesg);
        }
    }

    guardarLS(user, pass, recordarPass) {
        let credenciales = { usuario: user, password: pass };

        if (recordarPass) {
            Api_LS._setJsonAtLocalStorage("credenciales", credenciales);
        } else {
            Api_LS._removeParam("credenciales");
        }
    }
}

class Login {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

class LoginApi {
    constructor() {
        this._urlBase = "http://formacion-indra-franlindebl.com/api/users/login";
    }

    getLogin(datos) {
        let promise = APIClient._post(this._urlBase, datos).then(
            (data) => {
                if (data.hasOwnProperty('message')) {
                    return data;
                } else {
                    return new Usuario(data._id, data.email, data.apellidos, data.nombre, data.username);
                }
            }
        );

        return promise;
    }
}