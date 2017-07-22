class Usuario {
    constructor(apellidos, email, nombre, username, password, v, id) {

        this.apellidos = apellidos;
        this.email = email;
        this.nombre = nombre;
        this.username = username;
        this.password = password;
        this.__v = v;
        this._id = id;


    }

    _getRowForTable() {
        let fila = '';

        fila += '<tr>';
        //fila += '<td>' + this.apellidos + '</td>';
        //fila += '<td>' + this.email + '</td>';
        fila += '<td>' + this.apellidos + '</td>';
        //fila += '<td>' + this.grados + '</td>';
        fila += '<td>' + this.email + '</td>';
        fila += '<td>' + this.nombre + '</td>';
        //fila += '<td>' + this._id + '</td>';
        fila += '<button id="btDetalle' + this._id + '" class="btn btn-primary btn1" data-toggle="modal" data-target="#myModal">Detalle</button>';
        fila += '<button id="btModificar' + this._id + '" class="btn btn-primary btn1" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal1">Modificar</button>';
        fila += '<button id="btBorrar' + this._id + '" class="btn btn-primary btn1">Borrar</button></td>';

        return fila;
    }

}



class PageUsuarios extends InnerPages {
    constructor(urlname, urlPage) {
        super(urlname, urlPage);
        this._usuarios = [];
        this._almacenUsers = [];
        this._usuarioClient = new UsuarioClient();
        //this.pintarEstructura();
        //this.pintarHeader();
        //this.pintarFooter();
        //this.pintarPaginaBebidas();
    }


    getEstructuraTablaUsuarios() {
        let divfila = "";
        divfila += '<div class="col-sm-12 col-md-12 col-lg-12 bloque minferior">';
        divfila += '<h2>Listado de Usuarios</h2>';
        divfila += '<table>';
        divfila += '<thead>';
        divfila += '<tr>';
        //divfila += '<td>apellidos</td>';
        //divfila += '<td>email</td>';
        divfila += '<td>Apellidos</td>';
        //divfila += '<td>Grados</td>';
        divfila += '<td>Email</td>';
        divfila += '<td>Nombre</td>';
        //divfila += '<td>Id</td>';
        divfila += '<td>Accion</td>';
        divfila += '</tr>';
        divfila += '</thead>';
        divfila += '<tbody id="tbodyusuarios">';
        divfila += '</tbody>';
        divfila += '</table>';
        divfila += '</div>';

        return divfila;
    }


    pintarPaginaUsuarios(miDiv) {
        let main = '<p><strong>Administrador Usuarios</strong></p>';
        main += '<div class="datosForm"><label for="apellidos">Apellidos: </label><input id="apellidos" type="text" placeholder="apellidos"/></div>';
        main += '<div class="datosForm"><label for="email">Email: </label><input id="email" type="text" placeholder="email"/></div>';
        main += '<div class="datosForm"><label for="nombre">Nombre: </label><input id="nombre" type="text" placeholder="nombre"/></div>';
        main += '<div class="datosForm"><label for="username">Username: </label><input id="username" type="text" placeholder="username"/></div>';
        main += '<div class="datosForm"><label for="password">Password: </label><input id="password" type="text" placeholder="password"/></div>';

        main += '<div class="datosForm"><button id="btCreate" class="btn btn-primary btn1">Crear</button></div>';
        main += this.getEstructuraTablaUsuarios();

        miDiv.querySelector(".divMain").innerHTML = main;
        // Agregar evento click
        miDiv.querySelector("#btCreate").addEventListener("click", this.getUsuarioAndInsert.bind(this));

        return miDiv
    }

    pintarListaUsuarios(arrayUsuarios) {
        this._usuarios = arrayUsuarios;
        let tbodyusuarios = document.querySelector("#tbodyusuarios");
        tbodyusuarios.innerHTML = "";
        this._usuarios.forEach((usuario) => {
            let tr = document.createElement("TR");
            tr.innerHTML = usuario._getRowForTable();
            tbodyusuarios.appendChild(tr);
            document.querySelector("#btBorrar" + usuario._id).addEventListener("click", this.borrarUsuario.bind(this, usuario._id));
            document.querySelector("#btModificar" + usuario._id).addEventListener("click", this.modificarUsuario.bind(this, usuario._id));
            document.querySelector("#btDetalle" + usuario._id).addEventListener("click", this.detalleUsuario.bind(this, usuario._id));
        });

    }

    pintarUsuarios() {
        let promise = this._usuarioClient.getDeUsuarios().then(
            (arrayUsuarios) => {
                console.log("hola", arrayUsuarios);
                this.pintarListaUsuarios(arrayUsuarios);

            });
    }

    pintar() {

        let miDiv = this.pintarEstructura();
        miDiv = this.pintarHeader(miDiv);
        miDiv = this.pintarPaginaUsuarios(miDiv);
        miDiv = this.pintarFooter(miDiv);
        document.body.innerHTML = "";
        document.body.appendChild(miDiv);
        // traer bebidas
        this.pintarUsuarios();

    }


    getUsuariojeDataAndCreate() {
        let usuario = null;
        let apellidos = document.getElementById("apellidos").value;
        let email = document.getElementById("email").value;
        let nombre = document.getElementById("nombre").value;
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        console.log("este es el pass", password);

        usuario = new Usuario(apellidos, email, nombre, username, password);
        console.log(usuario);

        return usuario;
    }


    //funcion que se trae el producto del formulario y lo añade
    getUsuarioAndInsert(event) {
        event.preventDefault();
        event.stopPropagation();
        var usuario = this.getUsuariojeDataAndCreate();
        this._almacenUsers.push(usuario);
        console.log("usuario añadida", this._almacenUsers);
        this._usuarioClient.postDeUsuarios(usuario, this.pintar.bind(this));

    }


    borrarUsuario(id) {
        console.log("entro a borrar");
        console.log("almacen", this._almacenUsers);
var password2 = this._almacenUsers[0].password;
console.log("pruebade datos", password2)

    for(let a = 0; a < this._usuarios.length; a++){
        if (id == this._usuarios[a]._id){
            var nombre = this._usuarios[a].nombre;
                for (let i = 0; i < this._almacenUsers.length; i++) {
                    if(nombre ==this._almacenUsers[i].nombre){
                    var valorpass = this._almacenUsers[i].password;
                    }
                } 
        }
    }
            var pass ={
                password : valorpass
            };

        this._usuarioClient.deleteUsuario(id, pass, this.pintar.bind(this));
    }



    detalleUsuario(id) {

        console.log("entro al detalle");

        for (let i = 0; i < this._usuarios.length; i++) {
            if (id == this._usuarios[i]._id) {
                var id = this._usuarios[i]._id;
                var apellidos = this._usuarios[i].apellidos;
                var email = this._usuarios[i].email;
                var nombre = this._usuarios[i].nombre;
                var username = this._usuarios[i].username;

            }
        }
        this.estructuraModalDetalle(id, apellidos, email, nombre, username);


    }

    estructuraModalDetalle(id, apellidos, email, nombre, username) {

        let divModal = document.querySelector(".divModal");
        divModal.innerHTML = "";
        let div1 = document.createElement("DIV");
        div1.setAttribute("class", 'modal fade');
        div1.setAttribute("id", 'myModal');
        div1.setAttribute("role", 'dialog');
        divModal.appendChild(div1);
        let div2 = document.createElement("DIV");
        div2.setAttribute("class", 'modal-dialog');
        div1.appendChild(div2)
        let div3 = document.createElement("DIV");
        div3.setAttribute("class", 'modal-content');
        div2.appendChild(div3);
        let div4 = document.createElement("DIV");
        div4.setAttribute("class", 'modal-header');
        div3.appendChild(div4);
        let boton1 = document.createElement("button");
        let textoBoton1 = document.createTextNode('X');
        boton1.setAttribute("class", 'close');
        boton1.setAttribute("data-dismiss", 'modal');
        boton1.appendChild(textoBoton1);
        let h3 = document.createElement("H3");
        let t1 = document.createTextNode("DETALLE USUARIO");
        h3.appendChild(t1);
        div4.appendChild(boton1);
        div4.appendChild(h3);
        let div5 = document.createElement("DIV");
        div5.setAttribute("class", 'modal-body');


        let ul1 = document.createElement("UL");
        ul1.setAttribute("class", 'listas');


        let l1 = document.createElement("LI");
        let info1 = document.createTextNode("id: ");
        let valor1 = document.createTextNode(id);
        l1.appendChild(info1);
        l1.appendChild(valor1);


        let l2 = document.createElement("LI");
        let info2 = document.createTextNode("Apellidos: ");
        let valor2 = document.createTextNode(apellidos);
        l2.appendChild(info2);
        l2.appendChild(valor2);


        let l3 = document.createElement("LI");
        let info3 = document.createTextNode("email: ");
        let valor3 = document.createTextNode(email);
        l3.appendChild(info3);
        l3.appendChild(valor3);


        let l4 = document.createElement("LI");
        let info4 = document.createTextNode("nombre: ");
        let valor4 = document.createTextNode(nombre);
        l4.appendChild(info4);
        l4.appendChild(valor4);

        let l5 = document.createElement("LI");
        let info5 = document.createTextNode("Username: ");
        let valor5 = document.createTextNode(username);
        l5.appendChild(info5);
        l5.appendChild(valor5);



        ul1.appendChild(l1);
        ul1.appendChild(l2);
        ul1.appendChild(l3);
        ul1.appendChild(l4);
        ul1.appendChild(l5);


        div5.appendChild(ul1);
        div3.appendChild(div5);
        let div6 = document.createElement("DIV");
        div6.setAttribute("class", 'modal-footer');
        let boton2 = document.createElement("button");
        let t3 = document.createTextNode("Cerrar");
        boton2.setAttribute("class", 'btn btn-default');
        boton2.setAttribute("data-dismiss", 'modal');
        boton2.appendChild(t3);
        div6.appendChild(boton2);
        div3.appendChild(div6);
    }



    getUsuarioModValidacion(id) {
        var usuarioMod = null;

        var apellidos1 = document.getElementById("apellidos1").value;
        var email1 = document.getElementById("email1").value;
        var nombre1 = document.getElementById("nombre1").value;
        var username1 = document.getElementById("username1").value;
        //var password1 = document.getElementById("password1").value;

        console.log(apellidos1, email1, nombre1, username1);

        for (let i = 0; i < this._usuarios.length; i++) {
            if (id == this._usuarios[i]._id) {
                this._usuarios[i].apellidos = apellidos1;
                this._usuarios[i].email = email1;
                this._usuarios[i].nombre = nombre1;
                this._usuarios[i].username = username1;
                //this._usuarios[i].password = password1;


                usuarioMod = this._usuarios[i];
            }
        }
        console.log("valor de bebida modificada", usuarioMod);

        return usuarioMod;
    }





    getUsuarioModificacion(id) {
        //event.preventDefault(); 
        //event.stopPropagation();
        console.log(id);
        var usuarioMod = this.getUsuarioModValidacion(id);
        console.log("Usuario añadida", usuarioMod);

        this._usuarioClient.putDeUsuario(id, usuarioMod, this.pintar.bind(this));

    }


    modificarUsuario(id) {

        console.log("id", id);
        console.log("this.usuarios", this._usuarios.length);

        for (let i = 0; i < this._usuarios.length; i++) {
            if (id == this._usuarios[i]._id) {
                var id = this._usuarios[i]._id;
                var apellidos = this._usuarios[i].apellidos;
                var email = this._usuarios[i].email;
                var nombre = this._usuarios[i].nombre;
                var username = this._usuarios[i].username;
                var password = this._usuarios[i].password;
            }
        }

        console.log("entro a Modificar");
        this.estructuraModalModificacion(id, apellidos, email, nombre, username, password);
    }


    estructuraModalModificacion(id, apellidos, email, nombre, username, password) {


        let divModal = document.querySelector(".divModal");
        divModal.innerHTML = "";

        let div1 = document.createElement("DIV");
        div1.setAttribute("class", 'modal fade');
        div1.setAttribute("id", 'myModal1');
        div1.setAttribute("role", 'dialog');
        divModal.appendChild(div1);

        let div0 = document.createElement("DIV");
        div0.setAttribute("class", 'modal-dialog');
        div1.appendChild(div0)



        //modalcontent


        let div2 = document.createElement("DIV");
        div2.setAttribute("class", 'modal-content');
        div0.appendChild(div2);


        let div3 = document.createElement("DIV");
        div3.setAttribute("class", 'modal-header');
        div3.setAttribute("style", 'padding:15px 20px;');


        let boton1 = document.createElement("button");
        let textoBoton1 = document.createTextNode('X');
        boton1.setAttribute("class", 'close');
        boton1.setAttribute("data-dismiss", 'modal');
        boton1.appendChild(textoBoton1);

        let h3 = document.createElement("H3");
        let t1 = document.createTextNode("MODIFICACION");

        let sp1 = document.createElement("SPAN")
            //sp1.setAttribute("class", 'glyphicon glyphicon-user')
        sp1.appendChild(t1);
        h3.appendChild(sp1);
        div3.appendChild(h3);
        div3.appendChild(boton1);

        div2.appendChild(div3);



        let div5 = document.createElement("DIV");
        div5.setAttribute("class", 'modal-body');
        div5.setAttribute("style", 'padding:15px 20px;');

        let form1 = document.createElement("FORM");
        form1.setAttribute("role", 'form');
        div5.appendChild(form1);





        let div6 = document.createElement("DIV");
        div6.setAttribute("class", 'form-group');
        let l1 = document.createElement("label");
        l1.setAttribute("for", 'apellidos1');
        let sp2 = document.createElement("SPAN");
        let t2 = document.createTextNode("apellidos:");
        sp2.setAttribute("class", 'glyphicon');
        sp2.appendChild(t2);
        l1.appendChild(sp2);
        let input1 = document.createElement("input");
        input1.setAttribute("type", 'text');
        input1.setAttribute("class", 'form-control');
        input1.setAttribute("id", 'apellidos1');
        input1.setAttribute("value", apellidos);
        input1.setAttribute("placeholder", apellidos);
        div6.appendChild(l1);
        div6.appendChild(input1);


        let div7 = document.createElement("DIV");
        div7.setAttribute("class", 'form-group');
        let l2 = document.createElement("label");
        l2.setAttribute("for", 'email1');
        let sp3 = document.createElement("SPAN");
        let t3 = document.createTextNode("Email:");
        sp3.setAttribute("class", 'glyphicon');
        sp3.appendChild(t3);
        l2.appendChild(sp3);
        let input2 = document.createElement("input");
        input2.setAttribute("type", 'text');
        input2.setAttribute("class", 'form-control');
        input2.setAttribute("id", 'email1');
        input2.setAttribute("value", email);
        input2.setAttribute("placeholder", email);
        div7.appendChild(l2);
        div7.appendChild(input2);




        let div8 = document.createElement("DIV");
        div8.setAttribute("class", 'form-group');
        let l3 = document.createElement("label");
        l3.setAttribute("for", 'nombre1');
        let sp4 = document.createElement("SPAN");
        let t4 = document.createTextNode("Nombre:");
        sp4.setAttribute("class", 'glyphicon');
        sp4.appendChild(t4);
        l3.appendChild(sp4);
        let input3 = document.createElement("input");
        input3.setAttribute("type", 'text');
        input3.setAttribute("class", 'form-control');
        input3.setAttribute("id", 'nombre1');
        input3.setAttribute("value", nombre);
        input3.setAttribute("placeholder", nombre);
        div8.appendChild(l3);
        div8.appendChild(input3);


        ///NOMBRE
        let div9 = document.createElement("DIV");
        div9.setAttribute("class", 'form-group');
        let l4 = document.createElement("label");
        l4.setAttribute("for", 'username1');
        let sp5 = document.createElement("SPAN");
        let t5 = document.createTextNode("Username:");
        sp5.setAttribute("class", 'glyphicon');
        sp5.appendChild(t5);
        l4.appendChild(sp5);
        let input4 = document.createElement("input");
        input4.setAttribute("type", 'text');
        input4.setAttribute("class", 'form-control');
        input4.setAttribute("id", 'username1');
        input4.setAttribute("value", username);
        input4.setAttribute("placeholder", username);
        div9.appendChild(l4);
        div9.appendChild(input4);

        /*
                ///PRECIO
                let div10 = document.createElement("DIV");
                div10.setAttribute("class", 'form-group');
                let l5 = document.createElement("label");
                l5.setAttribute("for", 'password1');
                let sp6 = document.createElement("SPAN");
                let t6 = document.createTextNode("Password:");
                sp6.setAttribute("class", 'glyphicon');
                sp6.appendChild(t6);
                l5.appendChild(sp6);
                let input5 = document.createElement("input");
                input5.setAttribute("type", 'text');
                input5.setAttribute("class", 'form-control');
                input5.setAttribute("id", 'precio1');
                input5.setAttribute("value", password);
                input5.setAttribute("placeholder", password);
                div10.appendChild(l5);
                div10.appendChild(input5);
        */
        //ID

        let div11 = document.createElement("DIV");
        div11.setAttribute("class", 'form-group');
        let l6 = document.createElement("label");
        l6.setAttribute("for", 'id1');
        let sp7 = document.createElement("SPAN")
        let t7 = document.createTextNode("ID:");
        sp7.setAttribute("class", 'glyphicon');
        sp7.appendChild(t7);
        l6.appendChild(sp7);
        let l7 = document.createElement("label");
        l7.setAttribute("for", 'id1');
        let sp8 = document.createElement("SPAN");
        let t8 = document.createTextNode(id);
        sp8.appendChild(t8);
        l7.appendChild(sp8);
        div11.appendChild(l6);
        div11.appendChild(l7);



        form1.appendChild(div11);
        form1.appendChild(div6);
        form1.appendChild(div7);
        form1.appendChild(div8);
        form1.appendChild(div9);


        div2.appendChild(div5);

        let div20 = document.createElement("DIV");
        div20.setAttribute("class", 'modal-footer');


        let boton20 = document.createElement("button");
        let t30 = document.createTextNode("Cerrar");
        boton20.setAttribute("class", 'btn btn-default');
        boton20.setAttribute("data-dismiss", 'modal');
        boton20.appendChild(t30);

        let botonAceptar = document.createElement("button");
        let textoBotonace = document.createTextNode("Aceptar");
        botonAceptar.setAttribute("class", 'btn btn-primary btn-sm');
        botonAceptar.setAttribute("id", 'btnAceptar');
        botonAceptar.setAttribute("data-dismiss", 'modal');
        botonAceptar.addEventListener('click', () => this.getUsuarioModificacion(id));
        botonAceptar.appendChild(textoBotonace);

        div20.appendChild(boton20);
        div20.appendChild(botonAceptar);
        div2.appendChild(div20);

    }

}


class UsuarioClient {
    constructor() {
        this._urlBase = "http://formacion-indra-franlindebl.com/api/users/";
        this._apiClient = new APIClient();
    }

    getDeUsuarios() {
        let urlCompleta = this._urlBase;
        let promise = this._apiClient.get(urlCompleta).then((data) => {
            let arrayUsuarios = [];
            console.log("como", data);

            for (let i = 0; i < data.length; i++) {
                let elem = data[i];
                let usuario = new Usuario(elem.apellidos, elem.email, elem.nombre, elem.username, elem.password, elem.__v, elem._id);
                arrayUsuarios.push(usuario);
            }
            return arrayUsuarios;

        });
        return promise;
    }

    deleteUsuario(id, pass, callback) {
        console.log("entro a borrar2" , pass);
        let urlCompleta = this._urlBase + id;
        console.log("valor enviado", pass);
        this._apiClient.delete(urlCompleta, callback, pass);
    }

    postDeUsuarios(usuario, callback) {

        let urlCompleta = this._urlBase;
        this._apiClient.post(urlCompleta, usuario, callback);
    }

    putDeBebida(id, usuario, callback) {
        console.log("entro a ACTUALIZAR");
        let urlCompleta = this._urlBase + id;
        this._apiClient.put(urlCompleta, usuario, callback);
    }

}
