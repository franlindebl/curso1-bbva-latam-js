class Perfil extends InnerPagina {
    constructor(nombre, ruta, navega, contexto, modalController) {
        super(nombre, ruta, navega, contexto);
        this._usuariosApi = new UsuariosApi();
        this._modalController = modalController;
        this._navega=navega;
    }

    pinta() {
        this.pintaEstructuraBasePagina();
        this.pintaContexto();
        this.pintarEstructuraPerfil();
        this.obtenerPerfil();
    }

    pintarEstructuraPerfil() {
        let presentaPerfil = "";
        let presentaDetalleModal = "";

        let innerBodyNuevo = "";
        presentaPerfil = this.obtenerDivCajaPresentaPerfil();
        innerBodyNuevo = innerBodyNuevo + presentaPerfil + presentaDetalleModal;
        document.getElementsByClassName("text-left")[0].innerHTML = innerBodyNuevo;
    }

    obtenerDivCajaPresentaPerfil() {
        let fila = "";
        fila = fila + '<div class="row">';
        fila = fila + '<div class="col-sm-2 InsertaPerfil" id="CajasInsertaPerfil">';
        fila = fila + '</div>';

        fila = fila + '<div class="col-sm-10 presentaPerfil" id="CajasPresentaPerfil">';
        fila = fila + '<table class="table">';
        fila = fila + '<tbody class="presentaPerfilTabla"  id="tableCajasPresentaPerfil">';
        fila = fila + '<tr>';
        fila = fila + '<th> Username';
        fila = fila + '</th>';
        fila = fila + '<th> Email';
        fila = fila + '</th>';
        fila = fila + '<th> Acciones';
        fila = fila + '</th>';
        fila = fila + '</tr>';
        fila = fila + '</tbody>';
        fila = fila + '</table>';
        fila = fila + '</div>';
        fila = fila + '</div>';
        return fila;
    }
    obtenerPerfil() {
        this._usuariosApi.getPerfilUsuarios().then((data) => {

            for (let dat = 0; dat < data.length; dat++) {
                this.pintarHTMLPerfil(data[dat].email, data[dat].apellidos, data[dat].nombre, data[dat].username, data[dat]._id);
                console.log(data[dat])
            }
        })
    }

    pintarHTMLPerfil(email, apellidos, nombre, username, id) {
        let body = document.getElementById("tableCajasPresentaPerfil");
        var fila = document.createElement("tr");

        var celdaN = document.createElement("td");
        var textoNombre = document.createTextNode(username);

        var celdaP = document.createElement("td");
        var textoPr = document.createTextNode(email);

        var celdaA = document.createElement("td");
        var botonA = document.createElement("button");
        var textoBotonAccion = document.createTextNode("Detalle");
        botonA.setAttribute("class", 'btn btn-primary btn-sm');
        celdaA.setAttribute("class", 'campoPerfilAcciones');
        //var celdaBorra = document.createElement("td");
        var botonBorrar = document.createElement("button");
        var textoBotonBorrar = document.createTextNode("Borrar");
        botonBorrar.setAttribute("class", 'btn btn-primary btn-sm');
        botonBorrar.addEventListener('click', () => this.borrarUsuarioById(id));
        //var celdaModifica = document.createElement("td");
        var botonModificar = document.createElement("button");
        var textoBotonModifica = document.createTextNode("Modificar");
        botonModificar.setAttribute("class", 'btn btn-primary btn-sm');
        botonModificar.addEventListener('click', () => this.construyeModalInsertarUsuario(email, apellidos, nombre, username, id));
        botonA.addEventListener('click', () => this.pintaModalPerfil(email, apellidos, nombre, username, id));

        body.appendChild(fila);
        fila.appendChild(celdaN);

        fila.appendChild(celdaP);
        fila.appendChild(celdaA);


        celdaN.appendChild(textoNombre);

        celdaP.appendChild(textoPr);

        celdaA.appendChild(botonA);
        botonA.appendChild(textoBotonAccion);

        celdaA.appendChild(botonModificar);
        botonModificar.appendChild(textoBotonModifica);

        celdaA.appendChild(botonBorrar);
        botonBorrar.appendChild(textoBotonBorrar);
    }

    borrarUsuarioById(id) {
       
        this.pintaObtinenPass(id);

    }

    pintaObtinenPass(id) {
        let divModalBody = document.createElement('div');
        divModalBody.setAttribute("class", "md-form");
        let inputModalBodyPass = document.createElement('input');
        inputModalBodyPass.setAttribute("type", "text");
        inputModalBodyPass.setAttribute("class", "form-control");
        inputModalBodyPass.setAttribute("id", "PassUsrBorrar");

        let pModalBodyPass = document.createElement('label');
        pModalBodyPass.setAttribute("id", "form41");
        divModalBody.appendChild(pModalBodyPass);
        divModalBody.appendChild(inputModalBodyPass);
        let texModalBodyPass = document.createTextNode("Password para borrar Registro: ");
        pModalBodyPass.appendChild(texModalBodyPass);
        let botonGuardarInfoModal = document.createElement('button');
        divModalBody.appendChild(botonGuardarInfoModal);
        botonGuardarInfoModal.setAttribute("type", "button");
        botonGuardarInfoModal.setAttribute("class", "btn btn-default");
        botonGuardarInfoModal.setAttribute("data-dismiss", "modal");
        let textoBorrar = document.createTextNode("Borrar");
        botonGuardarInfoModal.appendChild(textoBorrar);
        botonGuardarInfoModal.addEventListener('click', () => this.enviaPassModalUsuarioBorrar(id));
        let title = "Password de usuario a Borrar de ID " + id;
        this._modalController.openModalWithChild(divModalBody, title);
    }
    enviaPassModalUsuarioBorrar(id) {

        let Password = document.getElementById('PassUsrBorrar').value;
        let datosPassUsuario = {};
        let pasPrueba={"password": Password};
        datosPassUsuario.password = toString(Password);

        this._usuariosApi.deleteUsuarioById(id, pasPrueba).then((data) => {

            this._navega.navegarPrimerPagina(this._ruta);
        })

    }

    pintaModalPerfil(email, apellidos, nombre, username, id) {
        let divModalBody = document.createElement('div');
        let parrafModalBodyID = document.createElement('p');
        let parrafModalBodyNombre = document.createElement('p');
        let parrafModalBodyExistencia = document.createElement('p');
        let parrafModalBodyCalorias = document.createElement('p');
        let parrafModalBodyTipo = document.createElement('p');
        let parrafModalBodyPrecio = document.createElement('p');

        divModalBody.appendChild(parrafModalBodyID);
        divModalBody.appendChild(parrafModalBodyNombre);
        divModalBody.appendChild(parrafModalBodyExistencia);
        divModalBody.appendChild(parrafModalBodyCalorias);
        divModalBody.appendChild(parrafModalBodyTipo);
        divModalBody.appendChild(parrafModalBodyPrecio);

        let texModalBodyID = document.createTextNode("ID--> " + id);
        parrafModalBodyID.appendChild(texModalBodyID);

        let texModalBodyNombre = document.createTextNode("Email--> " + email);
        parrafModalBodyNombre.appendChild(texModalBodyNombre);

        let texModalBodyExistencia = document.createTextNode("Apellidos-->  " + apellidos);
        parrafModalBodyExistencia.appendChild(texModalBodyExistencia);

        let texModalBodyCaloria = document.createTextNode("Nombre--> " + nombre);
        parrafModalBodyCalorias.appendChild(texModalBodyCaloria);

        let texModalBodyTipo = document.createTextNode("Username--> " + username);
        parrafModalBodyTipo.appendChild(texModalBodyTipo);



        let title = "Detalle Usuarios ";

        this._modalController.openModalWithChild(divModalBody, title);
    }

    construyeModalInsertarUsuario(email, apellidos, nombre, username, _id) {

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
        inputModalBodyPassword.setAttribute("placeholder", "Ingresa psssword de Confirmacion");

        inputModalBodyEmail.setAttribute("class", "form-control");
        inputModalBodyApellidos.setAttribute("class", "form-control");
        inputModalBodyNombre.setAttribute("class", "form-control");
        inputModalBodyUsername.setAttribute("class", "form-control");
        inputModalBodyPassword.setAttribute("class", "form-control");

        inputModalBodyEmail.setAttribute("id", "EmailNuevo");
        inputModalBodyApellidos.setAttribute("id", "ApellidosNuevo");
        inputModalBodyNombre.setAttribute("id", "NombreNuevo");
        inputModalBodyUsername.setAttribute("id", "UsernameNuevo");
        inputModalBodyPassword.setAttribute("id", "Password");

        inputModalBodyEmail.setAttribute("value", email);
        inputModalBodyApellidos.setAttribute("value", apellidos);
        inputModalBodyNombre.setAttribute("value", nombre);
        inputModalBodyUsername.setAttribute("value", username);
        inputModalBodyPassword.setAttribute("value", "");


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


        botonGuardarInfoModal.addEventListener('click', () => this.guardarNuevosDatosModalUsuario(_id));
        let title = "Nuevo Usuario ";


        this._modalController.openModalWithChild(divModalBody, title, this._rutaLogin);


    }
    guardarNuevosDatosModalUsuario(id) {
        let nuevoEmail = document.getElementById('EmailNuevo').value;
        let nuevoApellidos = document.getElementById('ApellidosNuevo').value;
        let nuevoNombre = document.getElementById('NombreNuevo').value;
        let nuevoUsername = document.getElementById('UsernameNuevo').value;
        let Password = document.getElementById('Password').value;
        let datosNuevoUsuario = {};

        datosNuevoUsuario.email = nuevoEmail;
        datosNuevoUsuario.apellidos = nuevoApellidos;
        datosNuevoUsuario.nombre = nuevoNombre;
        datosNuevoUsuario.username = nuevoUsername;
        datosNuevoUsuario.password = Password;

        this._usuariosApi.PUTUsuario(datosNuevoUsuario, id).then((data) => {

            alert("Usuario Actualizado");
            this._modalController.removeModale();
            this._navega.navegarPrimerPagina(this._ruta);

        })
    }

}
