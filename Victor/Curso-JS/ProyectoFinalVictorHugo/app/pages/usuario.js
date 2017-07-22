class PerfilPage extends InnerPage {
    constructor() {
        super('Perfil', '/perfil.html', 'Perfil de Usuario');

        this._apiUsuario = new UsuarioApi();
        this._navBar = null;
    }

    // btnPerfilUsuario

    pintarSection(divContent) {
        let divRow = document.createElement("DIV");
        divRow.className = 'row';

        let divColL = document.createElement("DIV");
        divColL.className = 'col-sm-0 col-md-1';
        divRow.appendChild(divColL);

        let divCol = document.createElement("DIV");
        divCol.className = 'divTable col-sm-12 col-md-10';
        divRow.appendChild(divCol);

        let divColR = document.createElement("DIV");
        divColR.className = 'col-sm-0 col-md-1';
        divRow.appendChild(divColR);

        divContent.appendChild(divRow);
    }

    pintar(navBar) {
        this._navBar = navBar;

        this.pintarEstructura(navBar, this._name);

        // Pintamos pagina completa
        let divContent = document.querySelector('.divContent');
        this.pintarSection(divContent);

        let divTable = document.querySelector('.divTable');

        divTable.innerHTML = this.getFormularioUsuario();

        this.setFormularioUsuario();


    }

    getFormularioUsuario() {
        let htmlUsuario = '';
        htmlUsuario += '<form>';
        htmlUsuario += '<div id="divmensajes"></div>';

        htmlUsuario += '<div class="form-group">';
        htmlUsuario += '<label for="email">Email:</label>';
        htmlUsuario += '<input type="email" class="form-control" id="email" disabled>';
        htmlUsuario += '</div>';

        htmlUsuario += '<div class="form-group">';
        htmlUsuario += '<label for="apellidos">Apellidos:</label>';
        htmlUsuario += '<input type="text" class="form-control" id="apellidos" disabled>';
        htmlUsuario += '</div>';

        htmlUsuario += '<div class="form-group">';
        htmlUsuario += '<label for="nombre">Nombre:</label>';
        htmlUsuario += '<input type="text" class="form-control" id="nombre" step=1 disabled>';
        htmlUsuario += '</div>';

        htmlUsuario += '<div class="form-group">';
        htmlUsuario += '<label for="username">Usuario:</label>';
        htmlUsuario += '<input type="text" class="form-control" id="username" disabled>';
        htmlUsuario += '</div>';

        htmlUsuario += '<div class="form-group">';
        htmlUsuario += '<button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo" id="btnActivaModifica">Modificar</button>';
        htmlUsuario += '<div id="demo" class="collapse">';
        htmlUsuario += '<div class="form-group">';
        htmlUsuario += '<label for="password">Para continuar es necesario indique su contraseña:</label>';
        htmlUsuario += '<input type="password" class="form-control" id="password">';
        htmlUsuario += '</div>';
        htmlUsuario += '<div class="form-group modal-footer">';
        htmlUsuario += '<button type="button" class="btn btn-primary" data-dismiss="modal" id="btnBorrarUsuario"><span class="glyphicon glyphicon-floppy-saved"></span> Eliminar Cuenta</button>';
        htmlUsuario += '<button type="button" class="btn btn-primary" data-dismiss="modal" id="btnGuardaUsuario"><span class="glyphicon glyphicon-floppy-saved"></span> Guardar</button>';
        htmlUsuario += '</div>';
        htmlUsuario += '</div>';

        htmlUsuario += '</form>';

        return htmlUsuario;
    }

    setFormularioUsuario() {
        document.querySelector('#email').value = this._usuario._email;
        document.querySelector('#apellidos').value = this._usuario._apellidos;
        document.querySelector('#nombre').value = this._usuario._nombre;
        document.querySelector('#username').value = this._usuario._username;

        document.querySelector('#btnActivaModifica').addEventListener('click', this.setModificar.bind(this));
        document.querySelector('#btnGuardaUsuario').addEventListener('click', this.modificarUsuario.bind(this));
        document.querySelector('#btnBorrarUsuario').addEventListener('click', this.borrarUsuario.bind(this));
    }

    setModificar(){
        document.querySelector('#email').disable = false;
        document.querySelector('#apellidos').disabled = false;
        document.querySelector('#nombre').disabled = false;
        document.querySelector('#username').disabled = false;
    }

    modificarUsuario(){
        let jsonUsuario = {};

        jsonUsuario.email = document.querySelector('#email').value;
        jsonUsuario.apellidos = document.querySelector('#apellidos').value;
        jsonUsuario.nombre = document.querySelector('#nombre').value;
        jsonUsuario.username = document.querySelector('#username').value;
        jsonUsuario.password = document.querySelector('#password').value;

        this._apiUsuario.putUsuario(this._usuario._id, jsonUsuario).then(
            (dato) => {
                Utils._quitarModalLoading();

                if (dato.hasOwnProperty('message')) {
                    let divMesg = document.querySelector('#divmensajes');
                    let mensaje = dato.message;
                    Utils._msg('Warning', mensaje, divMesg);
                } else {
                    let divMesg = document.querySelector('#divmensajes');
                    let mensaje = 'Modificación exitosa.';
                    Utils._msg('Success', mensaje, divMesg);

                    this._usuario._id = dato._id;
                    this._usuario._email = dato.email;
                    this._usuario._apellidos = dato.apellidos;
                    this._usuario._nombre = dato.nombre;
                    this._usuario._username = dato.username;

                    this._navController._addUsuario(this._usuario);
                    this.pintar(this._navBar);
                }
            }
        );
    }

    borrarUsuario(){
        let objPassword = { "password": document.querySelector('#password').value };
        this._apiUsuario.deleteUsuario(this._usuario._id, objPassword).then(
            (dato) => {
                Utils._quitarModalLoading();

                if (dato.hasOwnProperty('message')) {
                    let divMesg = document.querySelector('#divmensajes');
                    let mensaje = dato.message;
                    Utils._msg('Warning', mensaje, divMesg);
                } else {
                    let divMesg = document.querySelector('#divmensajes');
                    let mensaje = 'Cuenta de usuario eliminada del registro.';
                    Utils._msg('Success', mensaje, divMesg);

                    this._navController._addUsuario(this._usuario);
                }
            }
        );
    }
}

class Usuario {
    constructor(id, email, apellidos, nombre, username) {
        this._id = id;
        this._email = email;
        this._apellidos = apellidos;
        this._nombre = nombre;
        this._username = username;
    }
}

class UsuarioApi {
    constructor() {
        this._urlBase = "http://formacion-indra-franlindebl.com/api/users";
    }

    getUsuarioID(id) {
        let promise = APIClient._get(this._urlBase + `/${id}`).then(
            (data) => {
                let infoDato = {};

                data.forEach((dato) => {
                    infoDato = new Usuario(dato._id, dato.email, dato.apellidos, dato.nombre, dato.username, dato.password);
                });

                return infoDato;
            }
        );

        return promise;
    }

    getUsuarios() {
        let promise = APIClient._get(this._urlBase).then(
            (data) => {
                let arrayData = [];

                data.forEach((dato) => {
                    arrayData.push(new Usuario(dato._id, dato.email, dato.apellidos, dato.nombre, dato.username, dato.password));
                });

                return arrayData;
            }
        );

        return promise;
    }

    postUsuario(datos) {
        let promise = APIClient._post(this._urlBase, datos).then(
            (data) => {
                return data;
            }
        );

        return promise;
    }

    putUsuario(id, datos) {
        let promise = APIClient._put(this._urlBase + `/${id}`, datos).then(
            (data) => {
                return data;
            }
        );

        return promise;
    }

    deleteUsuario(id, password) {
        let promise = APIClient._deleteParametros(this._urlBase + `/${id}`, password).then(
            (data) => {
                return data;
            }
        );

        return promise;
    }
}