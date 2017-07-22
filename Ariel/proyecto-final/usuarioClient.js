class Usuario {
    constructor(nombre, apellidos, username, email, password, id) {
        this._apellidos = apellidos;
        this._username = username;
        this._nombre = nombre;
        this._email = email;
        this._password = password;
        this._id = id;
    }
}

class UsuarioClient {
    constructor() {
        this._urlBase = "http://formacion-indra-franlindebl.com/api/users";
        this._apiClient = new APIClient();
    }

    getUsuario() {
        let urlCompleta = this._urlBase;
        let promise = this._apiClient.get(urlCompleta).then(
            (data) => {
                let arrayUsuarios = [];
                for (let i = 0; i < data.length; i++) {
                    let elem = data[i];
                    let usuario = new Usuario(elem.nombre, elem.apellidos, elem.username, elem.email, elem.password, elem._id);
                    arrayUsuarios.push(usuario);
                }
                return arrayUsuarios;
            }
        );
        return promise;
    }

    postUsuario(data) {
        let urlCompleta = this._urlBase;

        let promise = this._apiClient.post(urlCompleta, data);
        return promise;
    }

    deleteUsuario(id) {
        let urlCompleta = this._urlBase + '/' + id;

        let promise = this._apiClient.delete(urlCompleta);
        return promise;
    }
    putUsuario(id, data) {
        let urlCompleta = this._urlBase + '/' + id;

        let promise = this._apiClient.put(urlCompleta, data);
        return promise;
    }
}

class BodyUsuario {
    constructor() {
        this._usuarios = [];
        this._usuarioClient = new UsuarioClient();
    }

    addUser() {
        let userLocalStorage = this.getLocalStorage();
        document.getElementById('name').value = userLocalStorage.nombre;
        document.getElementById('lastname').value = userLocalStorage.apellidos;
        document.getElementById('username').value = userLocalStorage.username;
        document.getElementById('email').value = userLocalStorage.email;
        document.getElementById('password').value = "";
    }

    getDatosDelForm() {
        let nombre = document.getElementById('name').value;
        let apellidos = document.getElementById('lastname').value;
        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        let usuario = {
            apellidos: apellidos,
            username: username,
            nombre: nombre,
            email: email,
            password: password
        }
        return usuario;
    }
    postUsuarioDelForm (nav) {
        let usuario = this.getDatosDelForm();
        let promise = this._usuarioClient.postUsuario(usuario).then(
            (data) => {
                if (!data.message){
                    console.log(data);
                    let body = document.body || document.getElementsByTagName('body')[0];
                    body.removeChild(body.childNodes[0])
                    nav.navigateToUrl("/login/");
                    let alertusercreado = document.getElementById('alertusercreado');
                    alertusercreado.classList.remove('btn-deactive');
                    alertusercreado.innerHTML = 'Se creo el usuario: ' + data.username;
                    
                } else {
                    let alertsingup = document.getElementById('alertsingup');
                    alertsingup.classList.remove('btn-deactive');
                    alertsingup.innerHTML = data.message;
                }
            }
        );
    }
    deleteUsuarioDelForm(id) {
        let promise = this._usuarioClient.deleteUsuario(id).then(
            (data) => {
                    if (!data.message){
                    console.log(data);
                    let body = document.body || document.getElementsByTagName('body')[0];
                    body.removeChild(body.childNodes[0])
                    nav.navigateToUrl("/login/");
                } else {
                    console.error(data);
                }
                }
        );
    }
    putUsuarioDelForm(id) {
        let usuario = this.getDatosDelForm();
        let promise = this._usuarioClient.putUsuario(id, usuario).then(
            (data) => {
                if (!data.message){
                console.log(data);
                this.setLocalStorage(data);
                this.addUser();
                } else {
                    console.error(data);
                }
                }
        );
    }

    buttonGuardar() {
        let userLocalStorage = this.getLocalStorage();
        let button = document.getElementById('guardar');
        let click = () => {
            this.putUsuarioDelForm(userLocalStorage._id);
        }
        button.addEventListener("click", click);
    }

    buttonEliminar() {
        let userLocalStorage = this.getLocalStorage();
        let button = document.getElementById('eliminar');
        let click = () => {
            this.deleteUsuarioDelForm(userLocalStorage._id);
        }
        button.addEventListener("click", click);
    }

    setLocalStorage(data) {
        localStorage.setItem("user", JSON.stringify(data));
    }
    getLocalStorage() {
        let userLocalStorage = JSON.parse(localStorage.getItem("user"));
        return userLocalStorage;
    }

    initUsuario() {
        this.addUser();
        this.buttonGuardar();
        this.buttonEliminar();
    }

    pintarEstructura() {
        let bodyPerfil = '<body><div class="container"><div class="row"><div class="col-md-6 col-md-offset-3"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">Modificar Perfil</h3></div><div class="panel-body"><div class="form-group"><input type="text" class="form-control" id="name" placeholder="Your Name"></div><div class="form-group"><input type="text" class="form-control" id="lastname" placeholder="Your Last Name"></div><div class="form-group"><input type="text" class="form-control" id="username" placeholder="Your Username"></div><div class="form-group"><input type="text" class="form-control" id="email" placeholder="Your Email"></div><div class="form-group"><input type="password" class="form-control" id="password" placeholder="Your Password"></div><button class="btn btn-primary btn-block" id="guardar">Guardar</button> <button class="btn btn-danger btn-block" id="eliminar">Eliminar Cuenta</button> </div></div></div></div></div></body>';
        window.setTimeout(() => this.initUsuario(), 800);  
        return bodyPerfil;
    }
}



