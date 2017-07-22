class NavigationController {
    constructor() {
        this._pages = [];
    }
    addPage(page) {
        this._pages.push(page);
    }
    navigateToUrl(string) {
        for (var i = 0; i < this._pages.length; i++) {
            if (this._pages[i]._nombre == string) {
                this._pages[i].pintarEstructura();
                window.history.pushState("", string, this._pages[i]._url);
            }
        }
    }
    navigateCerrarSesion() {
        if (this._pages[0]._auth.preguntarPorSesion()) {
            this._pages[0]._auth.cerrarSesion();
        }
        this._pages[0].pintarEstructura();
        window.history.pushState("", "login", this._pages[0]._url);
    }
}
class ModalController {
    constructor() {

    }
    launchModal(titulo, contenido, textoBoton, functionOnClick) {
        let modal = "";

        let miDiv = document.createElement("div");

        modal = modal + '<div class="modal fade in modal-control" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">';
        modal = modal + '<div class="modal-dialog" role="document">';
        modal = modal + '<div class="modal-content">';
        modal = modal + '<div class="modal-header">';
        modal = modal + '<h5 class="modal-title" id="exampleModalLabel">' + titulo + '</h5>';
        modal = modal + '<button id="botonCerrar" type="button" class="close" data-dismiss="modal" aria-label="Close">';
        modal = modal + '<span aria-hidden="true">&times;</span></button></div>';
        modal = modal + '<div class="modal-body">';
        modal = modal + contenido;
        modal = modal + '</div>';
        modal = modal + '<div class="modal-footer">';
        modal = modal + '<button id="botonAceptar" type="button" class="btn btn-success">' + textoBoton + '</button>';
        modal = modal + '</div></div></div></div>';

        miDiv.innerHTML = modal;

        miDiv.querySelector("#botonCerrar").addEventListener("click", () => this.closeModal());
        miDiv.querySelector("#botonAceptar").addEventListener("click", functionOnClick);

        document.getElementById("main").appendChild(miDiv);
    }
    closeModal() {
        let modal = document.getElementById("myModal");
        modal.parentElement.removeChild(modal);
    }
}

class App {
    constructor() {
        this._navigation = new NavigationController();
        this._modal = new ModalController();
        this._auth = new AuthenticationController();

        let login = new Login("login", "/login", false, false, this._navigation, this._modal, this._auth);
        let cuenta = new CrearCuenta("cuenta", "/cuenta", false, false, this._navigation, this._modal);
        let home = new Home("home", "/home", true, true, this._navigation, "");
        let comida = new ComidaPagina("comida", "/comida", true, true, this._navigation, this._modal);
        let bebida = new BebidaPagina("bebida", "/bebida", true, true, this._navigation, this._modal);
        let perfil = new PerfilPagina("perfil", "/perfil", true, true, this._navigation, this._modal, this._auth);

        this._navigation.addPage(login);
        this._navigation.addPage(cuenta);
        this._navigation.addPage(home);
        this._navigation.addPage(comida);
        this._navigation.addPage(bebida);
        this._navigation.addPage(perfil);
    }
    validarSesion() {
        if (this._navigation._pages[0]._auth.preguntarPorSesion()) {
            this._navigation.navigateToUrl("home");
        } else {
            this._navigation.navigateToUrl("login");
        }
    }
}

class Pagina {
    constructor(nombre, url, hasHeader, hasFooter, referencia, referenciaModal, referenciaAuth) {
        this._nombre = nombre;
        this._url = url;
        this._hasHeader = hasHeader;
        this._hasFooter = hasFooter;
        this._navigation = referencia;
        this._modal = referenciaModal;
        this._auth = referenciaAuth;

    }
    pintarEstructura() {
        if (this._hasHeader) {
            this.pintarHeader();
        }
        if (this._hasHeader) {
            this.pintarFooter();
        }
        this.pintarBody();
    }
}

class Login extends Pagina {
    constructor(nombre, url, hasHeader, hasFooter, referencia, referenciaModal, referenciaAuth) {
        super(nombre, url, hasHeader, hasFooter, referencia, referenciaModal, referenciaAuth);
        this._usuarios = [];
        this._usuarioAPI = new UsuarioAPI();

    }
    pintarBody() {
        this.getListadoUsuarios();
        var utilerias = new Utilerias();

        document.getElementById("main").innerHTML = "";

        let divContainer = utilerias.constriurDiv("container", "contenedor");
        divContainer.appendChild(utilerias.constriurH("h3", "Login"));

        let divRow = utilerias.constriurDiv("", "row1 col-md-4 col-md-offset-4");

        let formLogin = utilerias.constriurForm("", "form-horizontal formulario");

        let formu = this.pintarFormulario();


        formLogin.appendChild(formu);
        divRow.appendChild(formLogin);
        divContainer.appendChild(divRow);
        document.body.appendChild(divContainer);


    }
    pintarFormulario() {
        let formu = "";
        let utilerias = new Utilerias();
        let botonLogin = utilerias.constriurButton("", "btn btn-success", "", "Login", (event) => this.validarFormulario(event));
        let botonCrearCuenta = utilerias.constriurButton("", "btn btn-link", "", "Crear Cuenta", () => this._navigation.navigateToUrl("cuenta"));

        let formObj = utilerias.constriurDiv("", "form-grou");

        formu = formu + '<div class="form-group">';
        formu = formu + '<label for="inputEmail3" class="col-sm-2 control-label">Usuario</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="text" class="form-control" id="inputEmail3" placeholder="Usuario">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group">';
        formu = formu + '<label for="inputPassword3" class="col-sm-2 control-label">Password</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="password" class="form-control" id="inputPassword3" placeholder="Password">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group">';
        formu = formu + '<div class="col-sm-offset-2 col-sm-10">';
        formu = formu + '<div class="checkbox">';
        formu = formu + '<label><input type="checkbox" id="recordarCheck"> Recordar contraseña</label>';
        formu = formu + '</div>';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group">';
        formu = formu + '<div id="botonContainer"class="col-sm-offset-2 col-sm-10">';
        formu = formu + '</div>';

        formObj.innerHTML = formu;
        formObj.querySelector("#botonContainer").appendChild(botonCrearCuenta);
        formObj.querySelector("#botonContainer").appendChild(botonLogin);

        return formObj;
    }
    validarFormulario(event) {


        event.preventDefault();

        let user = document.getElementById("inputEmail3").value;
        let password = document.getElementById("inputPassword3").value;
        let checkbox = document.getElementById("recordarCheck").checked;

        if (user == "" || password == "")
            alert("Favor de llenar todos los campos");
        else {
            this.logearUsuario(user, password, checkbox);
        }
    }
    construyeUsuarioConObjeto(usuario, contraseña) {
        let user = new Usuario(usuario, contraseña);

        return user
    }
    getListadoUsuarios() {
        this._usuarioAPI.getUsuario().then(
            (data) => {
                this._usuarios = data;
            }
        );
    }
    logearUsuario(user, password, checkbox) {
        this._usuarioAPI.postUsuario(user, password, "login").then(
            (data) => {

                if (data.message == "User no encontrado!") {
                    alert(data.message);
                } else if (data.message == "Contraseña incorrecta!") {
                    alert(data.message);
                } else if (user == data.username && checkbox) {
                    this._navigation.navigateToUrl("home");
                    this._auth.guardarSesion(data, checkbox);

                } else if (user == data.username) {
                    this._navigation.navigateToUrl("home");
                    this._auth.guardarSesion(data, checkbox);
                }
            }
        );
    }
}
class PerfilPagina extends Pagina {
    constructor(nombre, url, hasHeader, hasFooter, referencia, referenciaModal, referenciaAuth) {
        super(nombre, url, hasHeader, hasFooter, referencia, referenciaModal, referenciaAuth);

        this._usuarioAPI = new UsuarioAPI();
    }
    pintarHeader() {
        document.getElementById("main").innerHTML = "";
        let header = "";

        var utilerias = new Utilerias();
        let divContainer = utilerias.constriurDiv("containerHeader", "");
        let botonInicio = utilerias.constriurButton("button", "boton botones", "", "Inicio", () => this._navigation.navigateToUrl("home"));
        let botonComida = utilerias.constriurButton("button", "boton botones", "", "Comida", () => this._navigation.navigateToUrl("comida"));
        let botonBebida = utilerias.constriurButton("button", "boton botones", "", "Bebida", () => this._navigation.navigateToUrl("bebida"));
        let botonPerfil = utilerias.constriurButton("button", "boton botones", "", "Perfil", () => this._navigation.navigateToUrl("perfil"));
        let botonLogout = utilerias.constriurButton("button", "boton botones", "", "Logout", () => this._navigation.navigateCerrarSesion());

        header = header + '<div class="row" id="headerId">';
        header = header + '<div class="col-md-12 row2"><h3>Perfil<h3/></div>';
        header = header + '</div>';
        header = header + '<div class="row row3">';
        header = header + '<div class="col-md-6 ">';
        header = header + '<div class="row">';
        header = header + '<div class="col-xs-6 col-md-2" id="botonInicio">';
        header = header + '</div>';
        header = header + '<div class="col-xs-6 col-md-2" id="botonComida">';
        header = header + '</div>';
        header = header + '<div class="col-xs-6 col-md-2" id="botonBebida">';
        header = header + '</div>';
        header = header + '<div class="col-xs-6 col-md-2" id="botonPerfil">';
        header = header + '</div>';
        header = header + '</div>';
        header = header + '</div>';
        header = header + '<div class="col-md-6 ">';
        header = header + '<div class="col-md-4 col-md-offset-8" id="botonLogout"></div>';
        header = header + '</div>';
        header = header + '</div>';
        header = header + this.pintarBody();
        header = header + this.pintarFooter();

        divContainer.innerHTML = header;
        divContainer.querySelector("#botonInicio").appendChild(botonInicio);
        divContainer.querySelector("#botonComida").appendChild(botonComida);
        divContainer.querySelector("#botonBebida").appendChild(botonBebida);
        divContainer.querySelector("#botonPerfil").appendChild(botonPerfil);
        divContainer.querySelector("#botonLogout").appendChild(botonLogout);
        document.body.appendChild(divContainer);
        this.getListadoUsuarios();


    }
    pintarBody() {
        let body = "";

        body = body + '<div class="row" id="bodyId">';
        body = body + '</div>';
        body = body + '<div id="tablaPerfil" class="col-md-8 col-md-offset-1 row4">';
        body = body + this.getCabeceraFor() + this.getFooterFor();
        body = body + '</div>';
        body = body + '</div>';

        return body;

    }
    getCabeceraFor() {
        let cabecera = "";

        cabecera = cabecera + '<table>';
        cabecera = cabecera + '<thead>';
        cabecera = cabecera + '<tr>';
        cabecera = cabecera + '<td>Nombre</td>';
        cabecera = cabecera + '<td>Apellidos</td>';
        cabecera = cabecera + '<td>Email</td>';
        cabecera = cabecera + '<td>Usuario</td>';
        cabecera = cabecera + '<td>Acciones</td>';
        cabecera = cabecera + '</tr>';
        cabecera = cabecera + '</thead>';
        cabecera = cabecera + '<tbody id="tbody">'

        return cabecera;
    }
    getFooterFor() {
        let footer = "";

        footer = footer + '</tbody>';
        footer = footer + '</table>';

        return footer;
    }
    pintarFooter() {
        let footer = "";

        footer = footer + '<div class="row" id="footerId">';
        footer = footer + '<div class="col-md-12 row5"></div>';
        footer = footer + '</div>';

        return footer;
    }
    getListadoUsuarios() {
        let usuarioLogeado = this._auth.traerUsuario();
        document.getElementById("tbody").innerHTML = usuarioLogeado.getRowBody();
        this.crearBotones();


    }
    crearBotones() {
        let tdParent = document.getElementById("boton" + this._auth._usuario._id);

        let btnEditar = document.createElement("button");
        btnEditar.setAttribute("class", "btn-traer");
        btnEditar.innerHTML = "Editar";
        btnEditar.addEventListener("click", (() => this.editarPerfil(this._auth._usuario._id)));
        tdParent.appendChild(btnEditar);

        let btnBorrar = document.createElement("button");
        btnBorrar.setAttribute("class", "btn-traer");
        btnBorrar.innerHTML = "Borrar";
        btnBorrar.addEventListener("click", (() => this.armaModalBorrarPerfil(this._auth._usuario._id)));
        tdParent.appendChild(btnBorrar);
    }
    editarPerfil(id) {
        let usuario = this._auth._usuario;

        this.armaModalEdicionPerfil(usuario._email, usuario._nombre, usuario._apellidos, usuario._usuario, id);

    }
    armaModalEdicionPerfil(email, nombre, apellidos, usuario, id) {
        let formu = "";

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputEmail" class="col-sm-2 control-label">Email</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="text" class="form-control" id="inputEmail" value="' + email + '">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputNombre" class="col-sm-2 control-label">Nombre</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="text" class="form-control" id="inputNombre" value="' + nombre + '">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputApellidos" class="col-sm-2 control-label">Apellidos</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="text" class="form-control" id="inputApellidos" value="' + apellidos + '">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputUsername" class="col-sm-2 control-label">Username</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="text" class="form-control" id="inputUsername" value="' + usuario + '">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputPassword" class="col-sm-2 control-label">Password</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="password" class="form-control" id="inputPassword" placeholder="Ingresa tu contraseña para hacer el cambio">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '</div>';
        formu = formu + '<div class="form-group">';
        formu = formu + '<div id="botonContainer"class="col-sm-offset-2 col-sm-10">';
        formu = formu + '</div>';

        this._modal.launchModal("Cambiar Usuario", formu, "Guardar", () => this.getDatosFormulario(id));
    }

    getDatosFormulario(id) {
        let email = document.getElementById("inputEmail").value;
        let nombre = document.getElementById("inputNombre").value;
        let apellidos = document.getElementById("inputApellidos").value;
        let usuario = document.getElementById("inputUsername").value;
        let password = document.getElementById("inputPassword").value;

        if (password) {
            this.cambiarPerfil(email, nombre, apellidos, usuario, password, id);
        } else {
            alert("Debes ingesar el campo password para hacer el cambio");
        }


    }
    armaModalBorrarPerfil(id) {
        let formu = "";

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputPassword" class="col-sm-2 control-label">Password</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="password" class="form-control" id="inputPassword" placeholder="Ingresa tu contraseña para borrar el usuario">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '</div>';
        formu = formu + '<div class="form-group">';
        formu = formu + '<div id="botonContainer"class="col-sm-offset-2 col-sm-10">';
        formu = formu + '</div>';

        this._modal.launchModal("Borrar Usuario", formu, "Borrar", () => this.getPassword(id));
    }

    getPassword(id) {
        let password = document.getElementById("inputPassword").value;

        if (password) {
            this.borrarPerfil(password, id);
        } else {
            alert("Debes ingesar el campo password para hacer el cambio");
        }


    }
    cambiarPerfil(email, nombre, apellidos, usuario, password, id) {
        this._usuarioAPI.putUsuario(email, nombre, apellidos, usuario, password, id).then(
            (data) => {
                if (this._auth.preguntarPorSesion()) {
                    this._auth.guardarSesion(data, true);
                } else {
                    this._auth.guardarSesion(data, false);
                }
                this._modal.closeModal();
                this.getListadoUsuarios();
            }
        );
    }
    borrarPerfil(password, id) {
        this._usuarioAPI.deleteUsuario(password, id).then(
            (data) => {
                if (data == "User borrado") {
                    if (this._auth.preguntarPorSesion()) {
                        this._auth.cerrarSesion();
                    }
                    this._navigation.navigateToUrl("login");

                } else {
                    this._modal.closeModal();
                    alert(data);
                }
            }
        );

    }
}
class AuthenticationController {
    constructor() {
        this._usuario = null;
    }
    guardarSesion(usuario, persistir) {
        let usuarioTemp = new Usuario(usuario.apellidos, usuario.email, usuario.nombre, usuario.username, usuario._id);
        this._usuario = usuarioTemp;
        let usuarioObj = usuarioTemp;

        if (persistir) {
            let usuarioAsString = JSON.stringify(usuarioObj);
            localStorage.setItem("usuario", usuarioAsString);
        }
    }
    cerrarSesion() {
        localStorage.removeItem("usuario");
    }
    preguntarPorSesion() {

        let usuarioAsString = localStorage.getItem("usuario");
        if (usuarioAsString != "") {
            let usuario = JSON.parse(usuarioAsString);
            if (usuario != "undefined" && usuario != null) {
                this._usuario = new Usuario(usuario._apellidos, usuario._email, usuario._nombre, usuario._usuario, usuario._id);
                return true;
            }
        } else {
            return false;
        }
    }
    traerUsuario() {
        return this._usuario;
    }
}

class UsuarioAPI {
    constructor() {
        this._urlBase = "http://formacion-indra-franlindebl.com/api/users";
        this._apiClient = new ApiClient();

    }
    getUsuario() {
        let promise = this._apiClient.get(this._urlBase).then((data) => {
            let arrayUsuarios = [];

            for (let i = 0; i < data.length; i++) {
                let elem = data[i];
                let usuario = new Usuario(elem.apellidos, elem.email, elem.nombre, elem.username, elem._id);
                arrayUsuarios.push(usuario);
            }

            return arrayUsuarios;
        });
        return promise;
    }
    postUsuario(email, password, nombre, apellidos, usuarioObj) {
        let urlCompleta = "";
        let usuario = "";
        if (nombre == "login") {
            urlCompleta = this._urlBase + "/" + nombre;
            usuario = {
                username: email,
                password: password
            };
        } else {
            urlCompleta = this._urlBase;
            usuario = {
                email: email,
                apellidos: apellidos,
                nombre: nombre,
                username: usuarioObj,
                password: password
            };
        }

        let promise = this._apiClient.post(urlCompleta, usuario).then((data) => {

            return data;
        });
        return promise;
    }
    putUsuario(email, nombre, apellidos, usuario, password, id) {
        let urlCompleta = this._urlBase + "/" + id;

        let usuarioObj = {
            email: email,
            apellidos: apellidos,
            nombre: nombre,
            username: usuario,
            password: password
        };
        let promise = this._apiClient.put(urlCompleta, usuarioObj).then((data) => {

            return data;
        });
        return promise;
    }
    deleteUsuario(password, id) {
        let urlCompleta = this._urlBase + "/" + id;
        let usuario = {
            password: password
        };
        let promise = this._apiClient.delete(urlCompleta, usuario).then((data) => {

            return data.message;
        });
        return promise;
    }
}
class Usuario {
    constructor(apellidos, email, nombre, usuario, id) {
        this._apellidos = apellidos;
        this._email = email;
        this._nombre = nombre;
        this._usuario = usuario;
        this._id = id;
    }
    getRowBody() {
        let fila = "";

        fila = fila + '<tr>';
        fila = fila + '<td>' + this._nombre + '</td>';
        fila = fila + '<td>' + this._apellidos + '</td>';
        fila = fila + '<td>' + this._email + '</td>';
        fila = fila + '<td>' + this._usuario + '</td>';
        fila = fila + '<td id="boton' + this._id + '"></td>';
        fila = fila + '</tr>';

        return fila;
    }
}
class CrearCuenta extends Pagina {
    constructor(nombre, url, hasHeader, hasFooter, referencia, referenciaModal) {
        super(nombre, url, hasHeader, hasFooter, referencia, referenciaModal);
        this._usuarioAPI = new UsuarioAPI();

    }
    pintarBody() {
        document.getElementById("main").innerHTML = "";
        var utilerias = new Utilerias();

        let divContainer = utilerias.constriurDiv("container", "contenedor");
        divContainer.appendChild(utilerias.constriurH("h3", "Crear Cuenta"));

        let divRow = utilerias.constriurDiv("", "row1 col-md-4 col-md-offset-4");

        let formLogin = utilerias.constriurForm("", "form-horizontal formulario");

        let formu = this.pintarFormulario();


        formLogin.appendChild(formu);
        divRow.appendChild(formLogin);
        divContainer.appendChild(divRow);
        document.body.appendChild(divContainer);

    }
    pintarFormulario() {
        let formu = "";
        let utilerias = new Utilerias();
        let botonCrearCuenta = utilerias.constriurButton("", "btn btn-success", "", "Crear Usuario", (event) => this.validarUsuario(event));
        let botonRegresar = utilerias.constriurButton("", "btn btn-danger", "", "Cancelar", (event) => this._navigation.navigateToUrl("login"));

        let formObj = utilerias.constriurDiv("", "form-grou");

        formu = formu + '<div class="form-group">';
        formu = formu + '<label for="inputEmail" class="col-sm-2 control-label">Email</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="text" class="form-control" id="inputEmail" placeholder="Email">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group">';
        formu = formu + '<label for="inputPassword" class="col-sm-2 control-label">Password</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="password" class="form-control" id="inputPassword" placeholder="Password">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group">';
        formu = formu + '<label for="inputNombre" class="col-sm-2 control-label">Nombre</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="text" class="form-control" id="inputNombre" placeholder="Nombre">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group">';
        formu = formu + '<label for="inputApellidos" class="col-sm-2 control-label">Apellidos</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="text" class="form-control" id="inputApellidos" placeholder="Apellidos">';
        formu = formu + '</div>';
        formu = formu + '</div>';


        formu = formu + '<div class="form-group">';
        formu = formu + '<label for="inputUsername" class="col-sm-2 control-label">Username</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="text" class="form-control" id="inputUsername" placeholder="Username">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '</div>';
        formu = formu + '<div class="form-group">';
        formu = formu + '<div id="botonContainer"class="col-sm-offset-2 col-sm-10">';
        formu = formu + '</div>';

        formObj.innerHTML = formu;
        formObj.querySelector("#botonContainer").appendChild(botonRegresar);
        formObj.querySelector("#botonContainer").appendChild(botonCrearCuenta);

        return formObj;
    }
    validarUsuario(event) {

        event.preventDefault();

        let email = document.getElementById("inputEmail").value;
        let password = document.getElementById("inputPassword").value;
        let nombre = document.getElementById("inputNombre").value;
        let apellidos = document.getElementById("inputApellidos").value;
        let usuario = document.getElementById("inputUsername").value;

        if (email == "" || password == "" || nombre == "" || apellidos == "" || usuario == "")
            alert("Favor de llenar todos los campos");
        else {
            this.crearUsuario(email, password, nombre, apellidos, usuario);
        }
    }
    crearUsuario(email, password, nombre, apellidos, usuario) {
        this._usuarioAPI.postUsuario(email, password, nombre, apellidos, usuario).then(
            (data) => {
                if (data == "User no encontrado!") {
                    alert(data);
                } else if (data == "Contraseña incorrecta!") {
                    alert(data);
                } else {
                    this._navigation.navigateToUrl("login");
                }
            }
        );
    }
}
class Home extends Pagina {
    constructor(nombre, url, hasHeader, hasFooter, referencia, referenciaModal, referenciaAuth) {
        super(nombre, url, hasHeader, hasFooter, referencia, referenciaModal, referenciaAuth);
        this._bebidas = [];
        this._comidas = [];
        this._productos = {};
        this._bebidaAPI = new BebidaAPI();
        this._comidaAPI = new ComidaAPI();
    }
    pintarHeader() {
        this.getListadoBebida();
        this.getListadoComida();
        document.getElementById("main").innerHTML = "";
        let header = "";

        var utilerias = new Utilerias();
        let divContainer = utilerias.constriurDiv("containerHeader", "");
        let botonInicio = utilerias.constriurButton("button", "boton botones", "", "Inicio", () => this._navigation.navigateToUrl("home"));
        let botonComida = utilerias.constriurButton("button", "boton botones", "", "Comida", () => this._navigation.navigateToUrl("comida"));
        let botonBebida = utilerias.constriurButton("button", "boton botones", "", "Bebida", () => this._navigation.navigateToUrl("bebida"));
        let botonPerfil = utilerias.constriurButton("button", "boton botones", "", "Perfil", () => this._navigation.navigateToUrl("perfil"));
        let botonLogout = utilerias.constriurButton("button", "boton botones", "", "Logout", () => this._navigation.navigateCerrarSesion());
        let botonGenerarComidas = utilerias.constriurButton("button", "btn btn-success", "", "Consultar", () => this.getValueSeletoresComida());
        let botonGenerarBebidas = utilerias.constriurButton("button", "btn btn-success", "", "Consultar", () => this.getValueSeletoresBebida());

        header = header + '<div class="row" id="headerId">';
        header = header + '<div class="col-md-12 row2"><h3>Hola<h3/></div>';
        header = header + '</div>';
        header = header + '<div class="row row3">';
        header = header + '<div class="col-md-6 ">';
        header = header + '<div class="row">';
        header = header + '<div class="col-xs-6 col-md-2" id="botonInicio">';
        header = header + '</div>';
        header = header + '<div class="col-xs-6 col-md-2" id="botonComida">';
        header = header + '</div>';
        header = header + '<div class="col-xs-6 col-md-2" id="botonBebida">';
        header = header + '</div>';
        header = header + '<div class="col-xs-6 col-md-2" id="botonPerfil">';
        header = header + '</div>';
        header = header + '</div>';
        header = header + '</div>';
        header = header + '<div class="col-md-6 ">';
        header = header + '<div class="col-md-4 col-md-offset-8" id="botonLogout"></div>';
        header = header + '</div>';
        header = header + '</div>';
        header = header + this.pintarBody();
        header = header + this.pintarFooter();

        divContainer.innerHTML = header;
        divContainer.querySelector("#botonInicio").appendChild(botonInicio);
        divContainer.querySelector("#botonComida").appendChild(botonComida);
        divContainer.querySelector("#botonBebida").appendChild(botonBebida);
        divContainer.querySelector("#botonPerfil").appendChild(botonPerfil);
        divContainer.querySelector("#botonLogout").appendChild(botonLogout);
        divContainer.querySelector("#botonGenerarComidas").appendChild(botonGenerarComidas);
        divContainer.querySelector("#botonGenerarBebidas").appendChild(botonGenerarBebidas);

        document.body.appendChild(divContainer);
    }
    pintarBody() {
        let body = "";

        body = body + '<div class="row" id="bodyId">';
        body = body + '<div class="col-md-10 col-md-offset-1 row4">';
        body = body + '<div class="row6" id="bodyComida">';
        body = body + '<div class="col-md-12"><h4>Puedes consultar la información de Comidas aquí<h4/></div>';
        body = body + '<div class="row">';
        body = body + '<div class="col-md-3">';
        body = body + '<select id="selectTipoComida" class="form-control"><option>Selecciona tipo</option><option>Entrante</option><option>Principal</option><option>Postre</option></select>';
        body = body + '</div>';
        body = body + '<div class="col-md-3">';
        body = body + '<select id="selectOpcionComida" class="form-control"><option>Selecciona opción</option><option>Precio</option><option>Calorias</option><option>Existencias</option></select>';
        body = body + '</div>';
        body = body + '<div id="botonGenerarComidas" class="col-md-3">';
        body = body + '</div>';
        body = body + '</div>';
        body = body + '<div id="printChartComidas" class="row">';
        body = body + '</div>';
        body = body + '</div>';
        body = body + '<div class="row6" id="bodyBebidas">';
        body = body + '<div class="col-md-12"><h4>Puedes consultar la información de Bebidas aquí<h4/></div>';
        body = body + '<div class="row">';
        body = body + '<div class="col-md-3">';
        body = body + '<select id="selectOpcionBebida" class="form-control"><option>Selecciona opción</option><option>Precio</option><option>Calorias</option><option>Existencias</option><option>Grados</option></select>';
        body = body + '</div>';
        body = body + '<div id="botonGenerarBebidas" class="col-md-3">';
        body = body + '</div>';
        body = body + '</div>';
        body = body + '<div id="printChartBebidas" class="row">';
        body = body + '</div>';
        body = body + '</div>';
        body = body + '</div>';
        body = body + '</div>';

        return body;

    }
    pintarFooter() {
        let footer = "";

        footer = footer + '<div class="row" id="footerId">';
        footer = footer + '<div class="col-md-12 row5"></div>';
        footer = footer + '</div>';

        return footer;
    }
    getListadoBebida() {

        this._bebidaAPI.getBebida().then(
            (data) => {
                this._bebidas = data;

            }
        );
    }
    getListadoComida() {

        this._comidaAPI.getComida().then(
            (data) => {
                this._comidas = data;
            }
        );
    }
    getValueSeletoresComida() {
        let tipo = document.getElementById("selectTipoComida");
        let tipoComida = tipo.options[tipo.selectedIndex].value;
        let opcion = document.getElementById("selectOpcionComida");
        let opcionComida = opcion.options[opcion.selectedIndex].value;
        let opcionTexto = opcionComida;
        opcionComida = opcionComida.toLowerCase();
        opcionComida = "_" + opcionComida;
        let data = [];

        for (var i = 0; i < this._comidas.length; i++) {
            let comida = this._comidas[i];
            if (comida._tipo == tipoComida) {
                if (comida.hasOwnProperty(opcionComida)) {
                    let puntoGrafica = {
                        name: comida._nombre,
                        y: comida[opcionComida]
                    };
                    data.push(puntoGrafica);
                }
            }
        }
        this.pintarChartComidas(data, opcionTexto);

    }
    getValueSeletoresBebida() {
        let opcion = document.getElementById("selectOpcionBebida");
        let opcionBebida = opcion.options[opcion.selectedIndex].value;
        let opcionTexto = opcionBebida;
        opcionBebida = opcionBebida.toLowerCase();
        opcionBebida = "_" + opcionBebida;
        let data = [];

        for (var i = 0; i < this._bebidas.length; i++) {
            let bebida = this._bebidas[i];
            if (bebida.hasOwnProperty(opcionBebida)) {
                let puntoGrafica = {
                    name: bebida._nombre,
                    y: bebida[opcionBebida]
                };
                data.push(puntoGrafica);
            }
        }
        this.pintarChartBebidas(data, opcionTexto);
    }
    pintarChartComidas(dataComida, textComida) {
        Highcharts.chart('printChartComidas', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Info de comidas'
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: textComida
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
            },

            series: [{
                name: 'Comida',
                colorByPoint: true,
                data: dataComida
            }]
        });
    }
    pintarChartBebidas(dataBebida, textBebida) {
        Highcharts.chart('printChartBebidas', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Info de bebidas'
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: textBebida
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}'
                    }
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
            },

            series: [{
                name: 'Bebida',
                colorByPoint: true,
                data: dataBebida
            }]
        });
    }
}

class ComidaPagina extends Pagina {
    constructor(nombre, url, hasHeader, hasFooter, referencia, referenciaModal) {
        super(nombre, url, hasHeader, hasFooter, referencia, referenciaModal);
        this._comidas = [];
        this._comidaAPI = new ComidaAPI();
    }
    pintarHeader() {
        this.getListadoComida();

        document.getElementById("main").innerHTML = "";

        var utilerias = new Utilerias();
        let divContainer = utilerias.constriurDiv("containerHeader", "");
        let botonInicio = utilerias.constriurButton("button", "boton botones", "", "Inicio", () => this._navigation.navigateToUrl("home"));
        let botonComida = utilerias.constriurButton("button", "boton botones", "", "Comida", () => this._navigation.navigateToUrl("comida"));
        let botonBebida = utilerias.constriurButton("button", "boton botones", "", "Bebida", () => this._navigation.navigateToUrl("bebida"));
        let botonPerfil = utilerias.constriurButton("button", "boton botones", "", "Perfil", () => this._navigation.navigateToUrl("perfil"));
        let botonLogout = utilerias.constriurButton("button", "boton botones", "", "Logout", () => this._navigation.navigateCerrarSesion());
        let botonAgregar = utilerias.constriurButton("button", "btn btn-success", "", "+", () => this.mostrarModalComida());
        let header = "";

        header = header + '<div class="row" id="headerId">';
        header = header + '<div class="col-md-12 row2"><h3>Comida<h3/></div>';
        header = header + '</div>';
        header = header + '<div class="row row3">';
        header = header + '<div class="col-md-6 ">';
        header = header + '<div class="row">';
        header = header + '<div class="col-xs-6 col-md-2" id="botonInicio">';
        header = header + '</div>';
        header = header + '<div class="col-xs-6 col-md-2" id="botonComida">';
        header = header + '</div>';
        header = header + '<div class="col-xs-6 col-md-2" id="botonBebida">';
        header = header + '</div>';
        header = header + '<div class="col-xs-6 col-md-2" id="botonPerfil">';
        header = header + '</div>';
        header = header + '</div>';
        header = header + '</div>';
        header = header + '<div class="col-md-6 ">';
        header = header + '<div class="col-md-4 col-md-offset-8" id="botonLogout"></div>';
        header = header + '</div>';
        header = header + '</div>';
        header = header + this.pintarBody();
        header = header + this.pintarFooter();

        divContainer.innerHTML = header;
        divContainer.querySelector("#botonInicio").appendChild(botonInicio);
        divContainer.querySelector("#botonComida").appendChild(botonComida);
        divContainer.querySelector("#botonBebida").appendChild(botonBebida);
        divContainer.querySelector("#botonPerfil").appendChild(botonPerfil);
        divContainer.querySelector("#botonLogout").appendChild(botonLogout);
        document.body.appendChild(divContainer);
        document.body.querySelector("#botonAgregar").appendChild(botonAgregar);

    }
    pintarBody() {
        let body = "";

        body = body + '<div class="row" id="bodyId">';
        body = body + '<div class="col-md-1" id="botonAgregar">';
        body = body + '</div>';
        body = body + '<div id="tablaComida" class="col-md-8 col-md-offset-1 row4">';
        body = body + this.getCabeceraFor() + this.getFooterFor();
        body = body + '</div>';
        body = body + '</div>';

        return body;

    }
    getCabeceraFor() {
        let cabecera = "";

        cabecera = cabecera + '<table>';
        cabecera = cabecera + '<thead>';
        cabecera = cabecera + '<tr>';
        cabecera = cabecera + '<td>Nombre</td>';
        cabecera = cabecera + '<td>Tipo</td>';
        cabecera = cabecera + '<td>Precio</td>';
        cabecera = cabecera + '<td>Calorias</td>';
        cabecera = cabecera + '<td>Acciones</td>';
        cabecera = cabecera + '</tr>';
        cabecera = cabecera + '</thead>';
        cabecera = cabecera + '<tbody id="tbody">'

        return cabecera;
    }
    getFooterFor() {
        let footer = "";

        footer = footer + '</tbody>';
        footer = footer + '</table>';

        return footer;
    }
    pintarFooter() {
        let footer = "";

        footer = footer + '<div class="row" id="footerId">';
        footer = footer + '<div class="col-md-12 row5"></div>';
        footer = footer + '</div>';

        return footer;
    }
    getListadoComida() {

        this._comidaAPI.getComida().then(
            (data) => {
                this._comidas = data;

                document.getElementById("tbody").innerHTML = this.getRowBody();
                this.crearBotones();
            }
        );
    }
    getRowBody() {
        let tbodyInner = "";

        for (var i = 0; i < this._comidas.length; i++) {
            let comida = this._comidas[i];
            tbodyInner = tbodyInner + comida.getRowForComidas();
        }

        return tbodyInner;
    }
    crearBotones() {
        for (var i = 0; i < this._comidas.length; i++) {
            let comida = this._comidas[i];
            let tdParent = document.getElementById("boton" + comida._id);

            let btnVer = document.createElement("button");
            btnVer.setAttribute("class", "btn-traer");
            btnVer.innerHTML = "Ver";
            btnVer.addEventListener("click", (() => this.verComida(comida._id)));
            tdParent.appendChild(btnVer);

            let btnEditar = document.createElement("button");
            btnEditar.setAttribute("class", "btn-traer");
            btnEditar.innerHTML = "Editar";
            btnEditar.addEventListener("click", (() => this.editarComida(comida._id)));
            tdParent.appendChild(btnEditar);

            let btnBorrar = document.createElement("button");
            btnBorrar.setAttribute("class", "btn-traer");
            btnBorrar.innerHTML = "Borrar";
            btnBorrar.addEventListener("click", (() => this.borrarComida(comida._id)));
            tdParent.appendChild(btnBorrar);
        }
    }
    mostrarModalComida() {

        let formu = "";

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputNombre" class="col-sm-2 control-label">Nombre</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="text" class="form-control" id="inputNombre" placeholder="Nombre">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputTipo" class="col-sm-2 control-label">Tipo</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="text" class="form-control" id="inputTipo" placeholder="Tipo">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputPrecio" class="col-sm-2 control-label">Precio</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="number" class="form-control" id="inputPrecio" placeholder="Precio">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputCalorias" class="col-sm-2 control-label">Calorias</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="number" class="form-control" id="inputCalorias" placeholder="Calorias">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputExistencias" class="col-sm-2 control-label">Existencias</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="number" class="form-control" id="inputExistencias" placeholder="Existencias">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        this._modal.launchModal("Agregar Comida", formu, "OK", () => this.crearComida(null));
    }
    crearComida(id) {

        let nombre = document.getElementById("inputNombre").value;
        let tipo = document.getElementById("inputTipo").value;
        let precio = Number(document.getElementById("inputPrecio").value);
        let calorias = Number(document.getElementById("inputCalorias").value);
        let existencias = Number(document.getElementById("inputExistencias").value);

        let comida = {
            nombre: nombre,
            tipo: tipo,
            precio: precio,
            calorias: calorias,
            existencias: existencias,
        };

        if (id != null) {
            this.cambiarComida(comida, id);
        } else {
            this.agregarComida(comida);
        }
    }
    agregarComida(comida) {
        this._comidaAPI.postComida(comida).then(
            (data) => {
                if (data == "Comida creada!") {
                    this._modal.closeModal();
                    this.pintarEstructura();
                }
            }
        );
    }
    verComida(id) {
        let tableDetalle = "";
        let comida = "";

        tableDetalle = tableDetalle + '<table class="table table-condensed">';
        tableDetalle = tableDetalle + '<tr>';
        tableDetalle = tableDetalle + '<th>Nombre</th>';
        tableDetalle = tableDetalle + '<th>Tipo</th>';
        tableDetalle = tableDetalle + '<th>Precio</th>';
        tableDetalle = tableDetalle + '<th>Calorias</th>';
        tableDetalle = tableDetalle + '<th>Existencias</th>';
        tableDetalle = tableDetalle + '</tr>';
        tableDetalle = tableDetalle + '<tr>';
        for (var i = 0; i < this._comidas.length; i++) {
            comida = this._comidas[i]
            if (id == comida._id) {
                tableDetalle = tableDetalle + '<th>' + comida._nombre + '</th>';
                tableDetalle = tableDetalle + '<th>' + comida._tipo + '</th>';
                tableDetalle = tableDetalle + '<th>' + comida._precio + '</th>';
                tableDetalle = tableDetalle + '<th>' + comida._calorias + '</th>';
                tableDetalle = tableDetalle + '<th>' + comida._existencias + '</th>';
            }
        }
        tableDetalle = tableDetalle + '</tr>';
        tableDetalle = tableDetalle + '</table>';

        this._modal.launchModal("Ver Detalle Comida", tableDetalle, "OK", () => this._modal.closeModal());
    }
    editarComida(id) {
        let comida = "";
        for (var i = 0; i < this._comidas.length; i++) {
            comida = this._comidas[i];
            if (id == comida._id) {
                this.armaModalEdicionComida(comida._nombre, comida._tipo, comida._precio, comida._calorias, comida._existencias, comida._id);
            }
        }
    }
    armaModalEdicionComida(nombre, tipo, precio, calorias, existencias, id) {
        let formu = "";

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputNombre" class="col-sm-2 control-label">Nombre</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="text" class="form-control" id="inputNombre" value="' + nombre + '">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputTipo" class="col-sm-2 control-label">Tipo</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="text" class="form-control" id="inputTipo" value="' + tipo + '">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputPrecio" class="col-sm-2 control-label">Precio</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="number" class="form-control" id="inputPrecio" value="' + precio + '">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputCalorias" class="col-sm-2 control-label">Calorias</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="number" class="form-control" id="inputCalorias" value="' + calorias + '">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputExistencias" class="col-sm-2 control-label">Existencias</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="number" class="form-control" id="inputExistencias" value="' + existencias + '">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        this._modal.launchModal("Cambiar Comida", formu, "Guardar", () => this.crearComida(id));
    }
    cambiarComida(comida, id) {

        this._comidaAPI.putComida(comida, id).then(
            (data) => {
                if (data == "Comida actualizada!") {
                    this._modal.closeModal();
                    this.pintarEstructura();
                }
            }
        );
    }
    borrarComida(id) {

        this._comidaAPI.deleteComida(id).then(
            (data) => {
                if (data == "Comida borrada") {
                    this.pintarEstructura();
                }
            }
        );
    }
}
class Comida {
    constructor(nombre, tipo, precio, calorias, existencias, id) {
        this._nombre = nombre;
        this._tipo = tipo;
        this._precio = precio;
        this._calorias = calorias;
        this._existencias = existencias;
        this._id = id;
    }
    getRowForComidas() {

        let fila = "";

        fila = fila + '<tr>';
        fila = fila + '<td>' + this._nombre + '</td>';
        fila = fila + '<td>' + this._tipo + '</td>';
        fila = fila + '<td>' + this._precio + '</td>';
        fila = fila + '<td>' + this._calorias + '</td>';
        fila = fila + '<td id="boton' + this._id + '"></td>';
        fila = fila + '</tr>';

        return fila;
    }
}
class ComidaAPI {
    constructor() {
        this._urlBase = "http://formacion-indra-franlindebl.com/api/comidas";
        this._apiClient = new ApiClient();
    }
    getComida() {
        let promise = this._apiClient.get(this._urlBase).then((data) => {
            let arrayComidas = [];

            for (let i = 0; i < data.length; i++) {
                let elem = data[i];
                let comida = new Comida(elem.nombre, elem.tipo, elem.precio, elem.calorias, elem.existencias, elem._id);
                arrayComidas.push(comida);
            }

            return arrayComidas;
        });
        return promise;
    }
    postComida(comida) {
        let promise = this._apiClient.post(this._urlBase, comida).then((data) => {

            return data.message;
        });
        return promise;
    }
    putComida(comida, id) {
        let urlCompleta = this._urlBase + "/" + id;
        let promise = this._apiClient.put(urlCompleta, comida).then((data) => {

            return data.message;
        });
        return promise;
    }
    deleteComida(id) {
        let urlCompleta = this._urlBase + "/" + id;
        let promise = this._apiClient.delete(urlCompleta).then((data) => {

            return data.message;
        });
        return promise;
    }
}

class BebidaPagina extends Pagina {
    constructor(nombre, url, hasHeader, hasFooter, referencia, referenciaModal) {
        super(nombre, url, hasHeader, hasFooter, referencia, referenciaModal);
        this._bebidas = [];

        this._bebidaAPI = new BebidaAPI();
    }
    pintarHeader() {
        this.getListadoBebida();
        document.getElementById("main").innerHTML = "";

        var utilerias = new Utilerias();
        let divContainer = utilerias.constriurDiv("containerHeader", "");
        let botonInicio = utilerias.constriurButton("button", "boton botones", "", "Inicio", () => this._navigation.navigateToUrl("home"));
        let botonComida = utilerias.constriurButton("button", "boton botones", "", "Comida", () => this._navigation.navigateToUrl("comida"));
        let botonBebida = utilerias.constriurButton("button", "boton botones", "", "Bebida", () => this._navigation.navigateToUrl("bebida"));
        let botonPerfil = utilerias.constriurButton("button", "boton botones", "", "Perfil", () => this._navigation.navigateToUrl("perfil"));
        let botonLogout = utilerias.constriurButton("button", "boton botones", "", "Logout", () => this._navigation.navigateCerrarSesion());
        let botonAgregar = utilerias.constriurButton("button", "btn btn-success", "", "+", () => this.mostrarModalBebida());
        let header = "";

        header = header + '<div class="row" id="headerId">';
        header = header + '<div class="col-md-12 row2"><h3>Bebida<h3/></div>';
        header = header + '</div>';
        header = header + '<div class="row row3">';
        header = header + '<div class="col-md-6 ">';
        header = header + '<div class="row">';
        header = header + '<div class="col-xs-6 col-md-2" id="botonInicio">';
        header = header + '</div>';
        header = header + '<div class="col-xs-6 col-md-2" id="botonComida">';
        header = header + '</div>';
        header = header + '<div class="col-xs-6 col-md-2" id="botonBebida">';
        header = header + '</div>';
        header = header + '<div class="col-xs-6 col-md-2" id="botonPerfil">';
        header = header + '</div>';
        header = header + '</div>';
        header = header + '</div>';
        header = header + '<div class="col-md-6 ">';
        header = header + '<div class="col-md-4 col-md-offset-8" id="botonLogout"></div>';
        header = header + '</div>';
        header = header + '</div>';
        header = header + this.pintarBody();
        header = header + this.pintarFooter();

        divContainer.innerHTML = header;
        divContainer.querySelector("#botonInicio").appendChild(botonInicio);
        divContainer.querySelector("#botonComida").appendChild(botonComida);
        divContainer.querySelector("#botonBebida").appendChild(botonBebida);
        divContainer.querySelector("#botonPerfil").appendChild(botonPerfil);
        divContainer.querySelector("#botonLogout").appendChild(botonLogout);
        document.body.appendChild(divContainer);
        document.body.querySelector("#botonAgregar").appendChild(botonAgregar);

    }
    pintarBody() {
        let body = "";

        body = body + '<div class="row" id="bodyId">';
        body = body + '<div class="col-md-1" id="botonAgregar">';
        body = body + '</div>';
        body = body + '<div id="tablaBebida" class="col-md-8 col-md-offset-1 row4">';
        body = body + this.getCabeceraFor() + this.getFooterFor();
        body = body + '</div>';
        body = body + '</div>';

        return body;

    }
    getCabeceraFor() {
        let cabecera = "";

        cabecera = cabecera + '<table>';
        cabecera = cabecera + '<thead>';
        cabecera = cabecera + '<tr>';
        cabecera = cabecera + '<td>Nombre</td>';
        cabecera = cabecera + '<td>Precio</td>';
        cabecera = cabecera + '<td>Calorias</td>';
        cabecera = cabecera + '<td>Alcoholica</td>';
        cabecera = cabecera + '<td>Acciones</td>';
        cabecera = cabecera + '</tr>';
        cabecera = cabecera + '</thead>';
        cabecera = cabecera + '<tbody id="tbody">'

        return cabecera;
    }
    getFooterFor() {
        let footer = "";

        footer = footer + '</tbody>';
        footer = footer + '</table>';

        return footer;
    }
    pintarFooter() {
        let footer = "";

        footer = footer + '<div class="row" id="footerId">';
        footer = footer + '<div class="col-md-12 row5"></div>';
        footer = footer + '</div>';

        return footer;
    }
    getListadoBebida() {

        this._bebidaAPI.getBebida().then(
            (data) => {
                this._bebidas = data;
                document.getElementById("tbody").innerHTML = this.getRowBody();
                this.crearBotones();
            }
        );
    }
    getRowBody() {
        let tbodyInner = "";

        for (var i = 0; i < this._bebidas.length; i++) {
            let bebida = this._bebidas[i];
            tbodyInner = tbodyInner + bebida.getRowForBebida();
        }

        return tbodyInner;
    }
    crearBotones() {
        for (var i = 0; i < this._bebidas.length; i++) {
            let bebida = this._bebidas[i];
            let tdParent = document.getElementById("boton" + bebida._id);

            let btnVer = document.createElement("button");
            btnVer.setAttribute("class", "btn-traer");
            btnVer.innerHTML = "Ver";
            btnVer.addEventListener("click", (() => this.verBebida(bebida._id)));
            tdParent.appendChild(btnVer);

            let btnEditar = document.createElement("button");
            btnEditar.setAttribute("class", "btn-traer");
            btnEditar.innerHTML = "Editar";
            btnEditar.addEventListener("click", (() => this.editarBebida(bebida._id)));
            tdParent.appendChild(btnEditar);

            let btnBorrar = document.createElement("button");
            btnBorrar.setAttribute("class", "btn-traer");
            btnBorrar.innerHTML = "Borrar";
            btnBorrar.addEventListener("click", (() => this.borrarBebida(bebida._id)));
            tdParent.appendChild(btnBorrar);
        }
    }
    mostrarModalBebida() {
        let formu = "";

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputNombre" class="col-sm-2 control-label">Nombre</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="text" class="form-control" id="inputNombre" placeholder="Nombre">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputPrecio" class="col-sm-2 control-label">Precio</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="number" class="form-control" id="inputPrecio" placeholder="Precio">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputCalorias" class="col-sm-2 control-label">Calorias</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="number" class="form-control" id="inputCalorias" placeholder="Calorias">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputExistencias" class="col-sm-2 control-label">Existencias</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="number" class="form-control" id="inputExistencias" placeholder="Existencias">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputGrados" class="col-sm-2 control-label">Grados</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="text" class="form-control" id="inputGrados" placeholder="Grados">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<div class="checkbox">';
        formu = formu + '<label>';
        formu = formu + '<input id="inputAlcoholica" type="checkbox"> Es Alcoholica';
        formu = formu + '</label>';
        formu = formu + '</div>';
        formu = formu + '</div>';


        this._modal.launchModal("Agregar Bebida", formu, "OK", () => this.crearBebida(null));
    }
    crearBebida(id) {

        let nombre = document.getElementById("inputNombre").value;
        let precio = Number(document.getElementById("inputPrecio").value);
        let calorias = Number(document.getElementById("inputCalorias").value);
        let existencias = Number(document.getElementById("inputExistencias").value);
        let esAlcoholica = (document.getElementById("inputAlcoholica").checked == 'true');
        let grados = Number(document.getElementById("inputGrados").value);

        let bebida = {
            nombre: nombre,
            precio: precio,
            calorias: calorias,
            existencias: existencias,
            grados: grados,
            esAlcoholica: esAlcoholica
        };

        if (id != null) {
            this.cambiarBebida(bebida, id);
        } else {
            this.agregarBebida(bebida);
        }
    }
    agregarBebida(bebida) {

        this._bebidaAPI.postBebida(bebida).then(
            (data) => {
                if (data == "Bebida creada!") {
                    this._modal.closeModal();
                    this.pintarEstructura();
                }
            }
        );
    }
    verBebida(id) {
        let tableDetalle = "";
        let bebida = "";

        tableDetalle = tableDetalle + '<table class="table table-condensed">';
        tableDetalle = tableDetalle + '<tr>';
        tableDetalle = tableDetalle + '<th>Nombre</th>';
        tableDetalle = tableDetalle + '<th>Precio</th>';
        tableDetalle = tableDetalle + '<th>Calorias</th>';
        tableDetalle = tableDetalle + '<th>Existencias</th>';
        tableDetalle = tableDetalle + '<th>Grados</th>';
        tableDetalle = tableDetalle + '<th>Alcoholica</th>';
        tableDetalle = tableDetalle + '</tr>';
        tableDetalle = tableDetalle + '<tr>';
        for (var i = 0; i < this._bebidas.length; i++) {
            bebida = this._bebidas[i]
            if (id == bebida._id) {
                tableDetalle = tableDetalle + '<th>' + bebida._nombre + '</th>';
                tableDetalle = tableDetalle + '<th>' + bebida._precio + '</th>';
                tableDetalle = tableDetalle + '<th>' + bebida._calorias + '</th>';
                tableDetalle = tableDetalle + '<th>' + bebida._existencias + '</th>';
                tableDetalle = tableDetalle + '<th>' + bebida._grados + '%' + '</th>';
                tableDetalle = tableDetalle + '<th>' + bebida._esAlcoholica + '</th>';
            }
        }
        tableDetalle = tableDetalle + '</tr>';
        tableDetalle = tableDetalle + '</table>';

        this._modal.launchModal("Ver Detalle Bebida", tableDetalle, "OK", () => this._modal.closeModal());
    }
    editarBebida(id) {
        let bebida = "";
        for (var i = 0; i < this._bebidas.length; i++) {
            bebida = this._bebidas[i];
            if (id == bebida._id) {
                this.armaModalEdicionBebida(bebida._nombre, bebida._precio, bebida._calorias, bebida._existencias, bebida._grados, bebida._esAlcoholica, bebida._id);
            }
        }
    }
    armaModalEdicionBebida(nombre, precio, calorias, existencias, grados, alcohol, id) {
        let formu = "";

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputNombre" class="col-sm-2 control-label">Nombre</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="text" class="form-control" id="inputNombre" value="' + nombre + '">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputPrecio" class="col-sm-2 control-label">Precio</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="number" class="form-control" id="inputPrecio" value="' + precio + '">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputCalorias" class="col-sm-2 control-label">Calorias</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="number" class="form-control" id="inputCalorias" value="' + calorias + '">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputExistencias" class="col-sm-2 control-label">Existencias</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="number" class="form-control" id="inputExistencias" value="' + existencias + '">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<label for="inputGrados" class="col-sm-2 control-label">Grados</label>';
        formu = formu + '<div class="col-sm-10">';
        formu = formu + '<input type="text" class="form-control" id="inputGrados" value="' + grados + '">';
        formu = formu + '</div>';
        formu = formu + '</div>';

        formu = formu + '<div class="form-group form-altura">';
        formu = formu + '<div class="checkbox">';
        formu = formu + '<label>';
        if (alcohol == "Si")
            formu = formu + '<input id="inputAlcoholica" type="checkbox" checked> Es Alcoholica';
        else if (alcohol == "No")
            formu = formu + '<input id="inputAlcoholica" type="checkbox"> Es Alcoholica';
        formu = formu + '</label>';
        formu = formu + '</div>';
        formu = formu + '</div>';

        this._modal.launchModal("Cambiar Bebida", formu, "Guardar", () => this.crearBebida(id));
    }
    cambiarBebida(bebida, id) {
        this._bebidaAPI.putBebida(bebida, id).then(
            (data) => {
                if (data == "Bebida actualizada!") {
                    this._modal.closeModal();
                    this.pintarEstructura();
                }
            }
        );
    }
    borrarBebida(id) {
        this._bebidaAPI.deleteBebida(id).then(
            (data) => {
                if (data == "Bebida borrada") {
                    this.pintarEstructura();
                }
            }
        );
    }
}
class Bebida {
    constructor(nombre, precio, calorias, esAlcoholica, existencias, grados, id) {
        this._nombre = nombre;
        this._precio = precio;
        this._calorias = calorias;
        this._esAlcoholica = esAlcoholica;
        this._existencias = existencias;
        this._grados = grados;
        this._id = id;
    }
    getRowForBebida() {

        let fila = "";

        fila = fila + '<tr>';
        fila = fila + '<td>' + this._nombre + '</td>';
        fila = fila + '<td>' + this._precio + '</td>';
        fila = fila + '<td>' + this._calorias + '</td>';
        fila = fila + '<td>' + this._esAlcoholica + '</td>';
        fila = fila + '<td id="boton' + this._id + '"></td>';
        fila = fila + '</tr>';

        return fila;
    }
}
class BebidaAPI {
    constructor() {
        this._urlBase = "http://formacion-indra-franlindebl.com/api/bebidas";
        this._apiClient = new ApiClient();
    }
    getBebida() {
        let promise = this._apiClient.get(this._urlBase).then((data) => {
            let arrayBebidas = [];

            for (let i = 0; i < data.length; i++) {
                let elem = data[i];
                if (elem.esAlcoholica) {
                    elem.esAlcoholica = "Si";
                } else {
                    elem.esAlcoholica = "No";
                }
                let bebida = new Bebida(elem.nombre, elem.precio, elem.calorias, elem.esAlcoholica, elem.existencias, elem.grados, elem._id);
                arrayBebidas.push(bebida);
            }

            return arrayBebidas;
        });
        return promise;
    }
    postBebida(bebida) {
        let promise = this._apiClient.post(this._urlBase, bebida).then((data) => {
            return data.message;
        });
        return promise;
    }
    putBebida(bebida, id) {
        let urlCompleta = this._urlBase + "/" + id;
        let promise = this._apiClient.put(urlCompleta, bebida).then((data) => {

            return data.message
        });
        return promise;
    }
    deleteBebida(id) {
        let urlCompleta = this._urlBase + "/" + id;
        let promise = this._apiClient.delete(urlCompleta).then((data) => {

            return data.message;
        });
        return promise;
    }
}


class ApiClient {
    constructor() {

    }
    get(url) {
        let misCabeceras = new Headers();
        let miInit = {
            method: 'GET',
            headers: misCabeceras
        };

        let promise = fetch(url, miInit).then(
            (response) => {
                return response.json();
            }
        );
        return promise;

    }
    post(url, data) {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let init = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data)
        };

        let promise = fetch(url, init).then(
            (data) => {
                return data.json();
            }
        );

        return promise;
    }
    put(url, data) {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        let init = {
            method: 'PUT',
            headers: myHeaders,
            body: JSON.stringify(data)
        };

        let promise = fetch(url, init).then(
            (data) => {
                return data.json();
            }
        );

        return promise;
    }
    delete(url, data) {
        let misCabeceras = new Headers();
        misCabeceras.append('Content-Type', 'application/json');

        let miInit = {
            method: 'DELETE',
            headers: misCabeceras,
            body: JSON.stringify(data)
        };

        let promise = fetch(url, miInit).then(
            (response) => {
                return response.json();
            }
        );
        return promise;
    }

}

var app = null;

window.onload = () => {
    app = new App();
    app.validarSesion();
}