class Usser {
    constructor(username, password) {

        this.username = password;
        this.password = password;

    
    }
  }


class LoginPage extends Page {
    constructor(urlname, urlPage) {
        super(urlname, urlPage, );
        this._users = [];
        this._loginClient = new LoginClient();
        this._navigationController = null;
    }

    getEstructura() {

        let miEstructura = document.createElement("div");

        let estructura = '';
        estructura += '<div class="container">';
        estructura += '<div class="container1">';
        estructura += '<div class="row">';
        estructura += '<div class="col-sm-12 col-md-12 col-lg-12 bloque superior">';
        estructura += '<div class="divHeader"></div>';
        estructura += '</div>';
        estructura += '</div>';
        estructura += '</div>';
        estructura += '<div class="container2">';
        estructura += '<div class="row">';
        estructura += '<div class="col-sm-12 col-md-12 col-lg-12 bloque medio">';
        estructura += '<div class="divMain"></div>';
        estructura += '<div class="divModal">';
        estructura += '</div>';
        estructura += '</div>';
        estructura += '</div>';
        estructura += '</div>';
        estructura += '</div>';
        estructura += '</div>';

        miEstructura.innerHTML = estructura;

        return miEstructura;
    }

    getPaginaLogin(miEstructura) {
        let main = '<p><strong>Login</strong></p>';
        main += '<div class="datosForm1"><label for="username">Username: </label><input id="username" type="text" placeholder="username"/></div>';
        main += '<div class="datosForm1"><label for="password">Password: </label><input id="password" type="text" placeholder="password"/></div>';
        main += '<div class="datosForm1"><button id="btAccept" class="btn btn-primary btn1">Iniciar Sesion</button></div>';
        let miDiv = document.createElement("div");
        miDiv.innerHTML = main;

        miDiv.querySelector("#btAccept").addEventListener("click", () => this.getUsuarioValidar1());

        miEstructura.querySelector(".divMain").appendChild(miDiv);

        return miEstructura;


        // Agregar evento click
        //document.querySelector("#btAccept").addEventListener("click", this._navigationController.navigateToUrl("#Bebidas"));

        // para navegar entre paginas
        //this._navigationController.navigateToUrl("#Home");

    }


    checkLogin(valo2) {
//console.log(x);
var x = JSON.parse(valo2);
console.log(x);
if (x.username != null){
this._navigationController.navigateToUrl("#Home");

}else{
  console.log("error en acceso");
}

//        this._navigationController.navigateToUrl("#Bebidas");

    }

    getValores() {
        let usser = null;
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        usser = new Usser(username, password);
        console.log("esto devuelve", usser);

        return usser;
    }


    getUsuarioValidar1(event) {
        //event.preventDefault();
        //event.stopPropagation();
        var usser = this.getValores();
        console.log("usuario a validar", usser);
        this._loginClient.postDeLogin(usser, this.checkLogin.bind(this));

    }



    pintar() {
        console.log("sdfsdfsde");
        var miEstructura = this.getEstructura();
        miEstructura = this.getPaginaLogin(miEstructura);
        document.body.innerHTML = "";
        document.body.appendChild(miEstructura);
        //this._navigationController.navigateToUrl("#Bebidas");
    }




}




class LoginClient {
    constructor() {
        this._urlBase = "http://formacion-indra-franlindebl.com/api/users/login";
        this._apiClient = new APIClient();
    }

        postDeLogin(usser, callback) {
        console.log("datos de usser", usser);
        let urlCompleta = this._urlBase;
        

          this._apiClient.post(urlCompleta, usser, callback);

        //this._apiClient.post(urlCompleta, usser, callback);



    }

  }






class LoginClient1 {
    constructor() {
        this._urlBase = "http://formacion-indra-franlindebl.com/api/users/login";
        this._apiClient = new APIClient();
    }

        postDeLogin(usser, callback) {
        console.log("datos de usser", usser);
        let urlCompleta = this._urlBase;
        //this._apiClient.post1(urlCompleta, usser, callback);


   

    }

  }















    /*estructuraLogin() {

        let login = '<p><strong>Datos de Logeo</strong></p>';

        login += '<div><label for="nombre">Nombre: </label><input id="nombre" type="text" name="login" placeholder="Nombre"/></div>';
        login += '<div><label for="password">Password: </label><input id="password" type="password" name="password" placeholder="Password"/></div>';
        login += '<div class="btn btn-primary"><button class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Ingresar</button></div>';
    
        document.querySelector(".divMain").innerHTML = login;
        //document.querySelector("#btlogin").addEventListener("click", this.validarAcceso.bind(this));
        //document.querySelector("#myModal").addEventListener("click", this.pintarLogin2.bind(this));

    }
*/








/*
    estructuraModalLogin() {

        let divModal = document.querySelector(".divModal");
        divModal.innerHTML = "";

        let div1 = document.createElement("DIV");
        div1.setAttribute("class", 'modal fade');
        div1.setAttribute("id", 'myModal1');
        div1.setAttribute("role", 'dialog');
        divModal.appendChild(div1);

        let div0 = document.createElement("DIV");
        div0.setAttribute("class", 'modal-dialog');
        div1.appendChild(div0);



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
        l1.setAttribute("for", 'username');
        let sp2 = document.createElement("SPAN");
        let t2 = document.createTextNode("username:");
        sp2.setAttribute("class", 'glyphicon');
        sp2.appendChild(t2);
        l1.appendChild(sp2);
        let input1 = document.createElement("input");
        input1.setAttribute("type", 'text');
        input1.setAttribute("class", 'form-control');
        input1.setAttribute("id", 'username');
        input1.setAttribute("value", );
        input1.setAttribute("placeholder", );
        div6.appendChild(l1);
        div6.appendChild(input1);


        let div7 = document.createElement("DIV");
        div7.setAttribute("class", 'form-group');
        let l2 = document.createElement("label");
        l2.setAttribute("for", 'username');
        let sp3 = document.createElement("SPAN");
        let t3 = document.createTextNode("username");
        sp3.setAttribute("class", 'glyphicon');
        sp3.appendChild(t3);
        l2.appendChild(sp3);
        let input2 = document.createElement("input");
        input2.setAttribute("type", 'text');
        input2.setAttribute("class", 'form-control');
        input2.setAttribute("id", 'username');
        input2.setAttribute("value", );
        input2.setAttribute("placeholder", );
        div7.appendChild(l2);
        div7.appendChild(input2);



        form1.appendChild(div11);
        form1.appendChild(div6);
        form1.appendChild(div7);



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
        //botonAceptar.addEventListener('click', () => this.getUsuarioModificacion(id));
        botonAceptar.appendChild(textoBotonace);

        div20.appendChild(boton20);
        div20.appendChild(botonAceptar);
        div2.appendChild(div20);

    }

*/
