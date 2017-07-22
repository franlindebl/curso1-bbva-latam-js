class App {
    constructor() {
        this._name = "FInal Test";
        // this._users = [];
        this._navigationController = new NavigationController();
        this._navigationController.addPage(new Home());
        this._navigationController.addPage(new ComidaClient());
        this._navigationController.addPage(new BebidaClient());
        this._navigationController.addPage(new Faq());
        this._navigationController.addPage(new Login());
        this._navigationController.addPage(new Login());
        // this._LoginController.addUser(new User());
    }
}

class User {
    constructor(userName = "admin", pass = "1234") {
        this._userName = userName;
        this._pass = pass;
    }

    static userAsUser(userAsObject) {
        let user = new User(userAsObject._userName, userAsObject._pass);
        return user;
    }
}

  class LoginController{
        constructor() {
          this._users =[];
        }

        addUser(user) {
              user._LoginController = this;
              this._users.push(user);
            }
}

class NavigationController {
    constructor() {
        this._pages = [];
    }

    addPage(page) {
        page._navigationController = this;
        this._pages.push(page);
    }
    navigateToHome() {
        window.history.pushState("", "", "/home");
        document.getElementById('main').innerHTML = "";
        this._pages[0].pintar();

    }

    navigateToUrl(string) {
        for (let i = 0; i < this._pages.length; i++) {
            let page = this._pages[i]._route;
            if (page == string) {
                window.history.pushState("", "", "/" + string);
                document.getElementById("container").innerHTML = "";
                this._pages[i].pintar();
            }
        }
    }
}

class Comida {
    constructor(id, tipo, precio, calorias, existencias, nombre) {
        this._id = id;
        this._tipo = tipo;
        this._precio = precio;
        this._calorias = calorias;
        this._existencias = existencias;
        this._nombre = nombre;
        this._route = "comidas";
    }

    getRowForTable(funcionVer, funcionEditar, funcionBorrar) {

        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var td5 = document.createElement('td');
        var td6 = document.createElement('td');
        var td7 = document.createElement('td');

        var btn1 = document.createElement('button');
        btn1.addEventListener("click", funcionVer);
        btn1.setAttribute("class", "btn btn-default");

        var btn2 = document.createElement('button');
        btn2.setAttribute("class", "btn btn-default");
        btn2.addEventListener("click", () => funcionEditar(this));
        btn2.setAttribute("data-toggle", "modal");
        btn2.setAttribute("data-target", "#modalToEdit");

        var btn3 = document.createElement('button');
        btn3.addEventListener("click", funcionBorrar);
        btn3.setAttribute("class", "btn btn-default");

        var btn4 = document.createElement('button');
        btn4.setAttribute("class", "btn btn-default");
        btn4.setAttribute("data-toggle", "modal");
        btn4.setAttribute("data-target", "#myModal");

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        td7.appendChild(btn1);
        td7.appendChild(btn2);
        td7.appendChild(btn3);
        td7.appendChild(btn4);


        td1.textContent = this._id;
        td2.textContent = this._tipo;
        td3.textContent = this._precio;
        td4.textContent = this._calorias;
        td5.textContent = this._existencias;
        td6.textContent = this._nombre;
        btn1.textContent = "Ver";
        btn2.textContent = "Editar";
        btn3.textContent = "Borrar";
        btn4.textContent = "Añadir";


        return tr;
    }
}

class Bebida {
    constructor(id, grados, esAlcoholica, precio, calorias, existencias, nombre) {
        this._id = id;
        this._grados = grados;
        this._esAlcoholica = esAlcoholica;
        this._precio = precio;
        this._calorias = calorias;
        this._existencias = existencias;
        this._nombre = nombre;
        this._route = "bebidas";
    }

    getRowForTable(funcionVer, funcionEditar, funcionBorrar) {
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
        var td5 = document.createElement('td');
        var td6 = document.createElement('td');
        var td7 = document.createElement('td');
        var td8 = document.createElement('td');
        var btn1 = document.createElement('button');
        var btn2 = document.createElement('button');
        var btn3 = document.createElement('button');
        var btn4 = document.createElement('button');
        var btn1 = document.createElement('button');

        btn1.addEventListener("click", funcionVer);
        btn1.setAttribute("class", "btn btn-default");

        var btn2 = document.createElement('button');
        btn2.setAttribute("class", "btn btn-default");
        btn2.addEventListener("click", () => funcionEditar(this));
        btn2.setAttribute("data-toggle", "modal");
        btn2.setAttribute("data-target", "#modalToEditBebidas");

        var btn3 = document.createElement('button');
        btn3.addEventListener("click", funcionBorrar);
        btn3.setAttribute("class", "btn btn-default");

        btn4.setAttribute("class", "btn btn-default");
        btn4.setAttribute("data-toggle", "modal");
        btn4.setAttribute("data-target", "#myModal");

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        tr.appendChild(td6);
        tr.appendChild(td7);
        tr.appendChild(td8);
        td8.appendChild(btn1);
        td8.appendChild(btn2);
        td8.appendChild(btn3);
        td8.appendChild(btn4);

        td1.textContent = this._id;
        td2.textContent = this._grados;
        td3.textContent = this._esAlcoholica;
        td4.textContent = this._precio;
        td5.textContent = this._calorias;
        td6.textContent = this._existencias;
        td7.textContent = this._nombre;
        btn1.textContent = "Ver";
        btn2.textContent = "Editar";
        btn3.textContent = "Borrar";
        btn4.textContent = "Añadir";

        return tr;
    }
}

class Page {
    constructor() {
        this._route = "";
        this._navigationController = null;
    }
    pintar() {
        alert("Error");
    }
}

class UserAPI {
  constructor(){
        this._urlBase = "http://formacion-indra-franlindebl.com/api/users";
        this._apiClient = new APIClient();
  }

  getUser() {
       let promise = this._apiClient.get(this._urlBase).then((data) => {
          var arrayDeUsers = [];
          for (let i = 0; i < data.length; i++) {
              let elem = data[i];
              debugger;
              let user = new User(elem._id, elem.tipo, elem.precio, elem.calorias, elem.existencias, elem.nombre);
              arrayDeUsers.push(user);
          }
          return arrayDeComidas;
       });
       return promise;
  }

  postUser(email, apellidos, nombre, username, password) {
        let obj = {
            email:email, 
            apellidos:apellidos, 
            nombre:nombre, 
            username:username, 
            password:password
        };
        let urlCompleta = this._urlBase;
        let promise = this._apiClient.post(urlCompleta, obj).then(
            (data) => {
                console.log(data.message);
                return data.message;
            });
        return promise;
  }

  deleteUser(user) {
          let urlCompleta = this._urlBase + '/' + user._id;
          let promise = this._apiClient.delete(urlCompleta).then(
              (data) => {
                  console.log(data.message);
                  return data;
              }
          )

          return promise;
  }

  editUser(id, email, apellidos, nombre, username, password) {
        let obj = {
            tipo: tipo,
            precio: precio,
            calorias: calorias,
            existencias: existencias,
            nombre: nombre
            };
            let urlCompleta = this._urlBase;
            let promise = this._apiClient.put(urlCompleta + "/" + id, obj).then(
                (data) => {
                    console.log(data.message);
                    return data.message;
                }
            )
            return promise;
  }
}

class UserClient{
  constructor() {
        this._users= [];
        this._userAPI  = new UserAPI();
  }

    getUsers(){
        let miCallback = this._userAPI.getUser().then((data) => {
              this._users = data;
              this.pintarComidas(this._users);
          });
      }

      borrarUser(user) {
          this._userApi.deleteUser(user).then((data) => {
              this.pintar();
          });
        }

      editUser(user){
        //Lineas para edirar
        }

      pintarBody() {
            document.getElementById("container").innerHTML = "";

            let divTable = document.createElement('DIV');
            divTable.setAttribute("id", "divTable");
            divTable.setAttribute("class", "table-responsive");
            document.getElementById('container').appendChild(divTable);

            let loader = document.createElement('DIV');
            loader.setAttribute("id", "loader");
            document.getElementById('container').appendChild(loader);

            let table = document.createElement('table');
            table.setAttribute("id", "table");
            table.setAttribute("class", "table table-hover table-striped table-bordered");
            document.getElementById('divTable').appendChild(table);

            let thead = document.createElement('thead');
            thead.setAttribute("id", "thead");
            document.getElementById('table').appendChild(thead);

            let tbody = document.createElement('tbody');
            tbody.setAttribute("id", "tbody");
            document.getElementById('table').appendChild(tbody);

            let tr = document.createElement('tr');
            tr.setAttribute("id", "tr");
            document.getElementById('thead').appendChild(tr);

            let tdId = document.createElement('td');
            tdId.setAttribute("id", "tdId");
            let texttdId = document.createTextNode("ID");
            tdId.appendChild(texttdId);
            document.getElementById('tr').appendChild(tdId);

            let tdTipo = document.createElement('td');
            tdTipo.setAttribute("id", "tdTipo");
            let texttdTipo = document.createTextNode("Tipo");
            tdTipo.appendChild(texttdTipo);
            document.getElementById('tr').appendChild(tdTipo);

            let tdPrecio = document.createElement('td');
            tdPrecio.setAttribute("id", "tdPrecio");
            let texttdPrecio = document.createTextNode("Precio");
            tdPrecio.appendChild(texttdPrecio);
            document.getElementById('tr').appendChild(tdPrecio);

            let tdCalorias = document.createElement('td');
            tdCalorias.setAttribute("id", "tdCalorias");
            let texttdCalorias = document.createTextNode("Calorias");
            tdCalorias.appendChild(texttdCalorias);
            document.getElementById('tr').appendChild(tdCalorias);

            let tdExistencias = document.createElement('td');
            tdExistencias.setAttribute("id", "tdExistencias");
            let texttdExistencias = document.createTextNode("Existencias");
            tdExistencias.appendChild(texttdExistencias);
            document.getElementById('tr').appendChild(tdExistencias);

            let tdNombre = document.createElement('td');
            tdNombre.setAttribute("id", "tdNombre");
            let texttdNombre = document.createTextNode("Nombre");
            tdNombre.appendChild(texttdNombre);
            document.getElementById('tr').appendChild(tdNombre);

            let tdAcciones = document.createElement('td');
            tdAcciones.setAttribute("id", "tdAcciones");
            let texttdAcciones = document.createTextNode("Acción");
            tdAcciones.appendChild(texttdAcciones);
            document.getElementById('tr').appendChild(tdAcciones);

            let myModal = document.createElement('div');
            myModal.setAttribute("class", "modal fade");
            myModal.setAttribute("id", "myModal");
            myModal.setAttribute("tabindex", "-1");
            myModal.setAttribute("role", "dialog");
            myModal.setAttribute("aria-labelledby", "myModalLabel");
            document.getElementById('container').appendChild(myModal);


            let modalDialog = document.createElement('div');
            modalDialog.setAttribute("class", "modal-dialog modal-sm");
            modalDialog.setAttribute("role", "document");
            modalDialog.setAttribute("id", "modalDialog");
            document.getElementById('myModal').appendChild(modalDialog);

            let modalContent = document.createElement('div');
            modalContent.setAttribute("class", "modal-content");
            modalContent.setAttribute("id", "modalContent");
            document.getElementById('modalDialog').appendChild(modalContent);

            let modalHeader = document.createElement('div');
            modalHeader.setAttribute("class", "modal-header");
            modalHeader.setAttribute("id", "modalHeader");
            document.getElementById('modalContent').appendChild(modalHeader);

            let button = document.createElement('button');
            button.setAttribute("type", "button");
            button.setAttribute("class", "close");
            button.setAttribute("data-dismiss", "modal");
            button.setAttribute("aria-label", "Close");
            button.setAttribute("id", "button");
            document.getElementById('modalHeader').appendChild(button);

            let span = document.createElement('span');
            span.setAttribute("aria-hidden", "true");
            span.setAttribute("id", "span");
            document.getElementById('button').appendChild(span);

            let titleModal = document.createElement('h4');
            titleModal.setAttribute("class", "modal-title");
            titleModal.setAttribute("id", "myModalLabel");
            let textTitle = document.createTextNode("Agregar Comida");
            titleModal.appendChild(textTitle);
            document.getElementById('modalHeader').appendChild(titleModal);

            let modalBody = document.createElement('div');
            modalBody.setAttribute("class", "modal-body");
            modalBody.setAttribute("id", "modalBody");
            document.getElementById('modalContent').appendChild(modalBody);

            let myForm = document.createElement('form');
            myForm.setAttribute("id", "myForm");
            document.getElementById('modalBody').appendChild(myForm);

            let formGroup1 = document.createElement("div");
            formGroup1.setAttribute("id", "formGroup1");
            formGroup1.setAttribute("class", "form-group")
            document.getElementById('myForm').appendChild(formGroup1);

            let label1 = document.createElement("label");
            label1.setAttribute("for", "tipo");
            label1.setAttribute("class", "control-label");
            let textLabel1 = document.createTextNode("Tipo");
            label1.appendChild(textLabel1);
            document.getElementById('formGroup1').appendChild(label1);

            let select1 = document.createElement("select");
            // select1.setAttribute("type", "text");
            select1.setAttribute("class", "form-control");
            select1.setAttribute("id", "tipo");
            // select1.setAttribute("value", bebidas);
            document.getElementById('formGroup1').appendChild(label1);

            let option0 = document.createElement("option");
            option0.setAttribute("value", "");
            option0.setAttribute("id", "default");
            document.getElementById('default').appendChild(tipo);

            let option1 = document.createElement("option");
            option1.setAttribute("value", "Entrante");
            option1.setAttribute("id", "Entrante");
            document.getElementById('Entrante').appendChild(tipo);

            let option2 = document.createElement("option");
            option2.setAttribute("value", "Principal");
            option2.setAttribute("id", "Principal");
            document.getElementById('Principal').appendChild(tipo);

            let option3 = document.createElement("option");
            option3.setAttribute("value", "Postre");
            option3.setAttribute("id", "Postre");
            document.getElementById('Postre').appendChild(tipo);

            let formGroup2 = document.createElement("div");
            formGroup2.setAttribute("id", "formGroup2");
            formGroup2.setAttribute("class", "form-group");
            document.getElementById('myForm').appendChild(formGroup2);

            let label2 = document.createElement("label");
            label2.setAttribute("for", "precio");
            label2.setAttribute("class", "control-label");
            let textLabel2 = document.createTextNode("Precio");
            label2.appendChild(textLabel2);
            document.getElementById('formGroup2').appendChild(label2);

            let input2 = document.createElement("input");
            input2.setAttribute("type", "number");
            input2.setAttribute("min", "0");
            input2.setAttribute("max", "10000");
            input2.setAttribute("required");
            input2.setAttribute("class", "form-control");
            input2.setAttribute("id", "precio");
            document.getElementById('formGroup2').appendChild(input2);

            let formGroup3 = document.createElement("div");
            formGroup3.setAttribute("id", "formGroup3");
            formGroup3.setAttribute("class", "form-group")
            document.getElementById('myForm').appendChild(formGroup3);

            let label3 = document.createElement("label");
            label3.setAttribute("for", "calorias");
            label3.setAttribute("class", "control-label");
            let textLabel3 = document.createTextNode("Calorias");
            label3.appendChild(textLabel3);
            document.getElementById('formGroup3').appendChild(label3);

            let input3 = document.createElement("input");
            input3.setAttribute("type", "number");
            input2.setAttribute("min", "0");
            input2.setAttribute("max", "5000");
            input2.setAttribute("required");
            input3.setAttribute("class", "form-control");
            input3.setAttribute("id", "calorias");
            document.getElementById('formGroup3').appendChild(input3);

            let formGroup4 = document.createElement("div");
            formGroup4.setAttribute("id", "formGroup4");
            formGroup4.setAttribute("class", "form-group")
            document.getElementById('myForm').appendChild(formGroup4);

            let label4 = document.createElement("label");
            label4.setAttribute("for", "existencias");
            label4.setAttribute("class", "control-label");
            let textLabel4 = document.createTextNode("Existencias");
            label4.appendChild(textLabel4);
            document.getElementById('formGroup4').appendChild(label4);

            let input4 = document.createElement("input");
            input4.setAttribute("type", "number");
            input4.setAttribute("min", "0");
            input4.setAttribute("max", "1000");
            input4.setAttribute("required");
            input4.setAttribute("class", "form-control");
            input4.setAttribute("id", "existencias");
            document.getElementById('formGroup4').appendChild(input4);

            let formGroup5 = document.createElement("div");
            formGroup5.setAttribute("id", "formGroup5");
            formGroup5.setAttribute("class", "form-group")
            document.getElementById('myForm').appendChild(formGroup5);

            let label5 = document.createElement("label");
            label5.setAttribute("for", "nombre");
            label5.setAttribute("class", "control-label");
            let textLabel5 = document.createTextNode("Nombre");
            label5.appendChild(textLabel5);
            document.getElementById('formGroup5').appendChild(label5);

            let input5 = document.createElement("input");
            input5.setAttribute("type", "text");
            input5.setAttribute("min", "4");
            input5.setAttribute("max", "100");
            input5.setAttribute("required");
            input5.setAttribute("class", "form-control");
            input5.setAttribute("id", "nombre");
            document.getElementById('formGroup5').appendChild(input5);

            let modalFooter = document.createElement("div");
            modalFooter.setAttribute("class", "modal-footer");
            modalFooter.setAttribute("id", "modalFooter");
            document.getElementById('modalContent').appendChild(modalFooter);

            let buttonFooter1 = document.createElement('button');
            buttonFooter1.setAttribute("type", "button");
            buttonFooter1.setAttribute("class", "btn btn-default");
            buttonFooter1.setAttribute("data-dismiss", "modal");
            let textButton1 = document.createTextNode("Close");
            buttonFooter1.appendChild(textButton1);
            document.getElementById('modalFooter').appendChild(buttonFooter1);
            buttonFooter1.onclick = () => this._navigationController.navigateToUrl("comidas");

            let buttonFooter2 = document.createElement('button');
            buttonFooter2.setAttribute("type", "button");
            buttonFooter2.setAttribute("class", "btn btn-primary");
            let textButton2 = document.createTextNode("Save");
            buttonFooter2.appendChild(textButton2);
            document.getElementById('modalFooter').appendChild(buttonFooter2);

            buttonFooter2.addEventListener("click", () => {
                // debugger;
                let tipo = document.getElementById("tipo").value;
                let precio = document.getElementById("precio").value;
                let calorias = document.getElementById("calorias").value;
                let existencias = document.getElementById("existencias").value;
                let nombre = document.getElementById("nombre").value;
                this._comidaApi.postComida(tipo, precio, calorias, existencias, nombre);
                // debugger;
            });
      }

      pintarUser(user) {
            let tbodyInner = document.getElementById("tbody");
            for (let i = 0; i < user.length; i++) {
                let users = user[i];
                // console.log(users);
                let funcionVer = () => {
                    console.log("ver");
                };
                let funcionEditar = (user) => {
                    this.editarUser(user);
                };
                let funcionBorrar = () => {
                    this.borrarUser(users);
                };
                tbodyInner.appendChild(users.getRowForTable(funcionVer, funcionEditar, funcionBorrar))
            }
        }
  }

class comidaApi {
    constructor() {
        this._urlBase = "http://formacion-indra-franlindebl.com/api/comidas";
        this._apiClient = new APIClient();
    }

    showPage() {
      document.getElementById("loader").style.display = "none";
    }

    getComidas() {
        let promise = this._apiClient.get(this._urlBase).then((data) => {
            var arrayDeComidas = [];
            for (let i = 0; i < data.length; i++) {
                let elem = data[i];
                let comida = new Comida(elem._id, elem.tipo, elem.precio, elem.calorias, elem.existencias, elem.nombre);
                arrayDeComidas.push(comida);
                this.showPage();
            }
            // console.log(arrayDeComidas);
            return arrayDeComidas;
        });
        return promise;
    }

    getComida(id) {
        debugger;
        let promise = this._apiClient.get(this._urlBase + "/" + id).then((data) => {
            let arrayDeComidas = [];
            for (let i = 0; i < data.length; i++) {
                let elem = data[i];
                let comida = new Comida(elem._id, elem.tipo, elem.precio, elem.calorias, elem.existencias, elem.nombre);
                arrayDeComidas.push(comida);

            }
            return arrayDeComidas;
        });
        return promise;
    }

    postComida(tipo, precio, calorias, existencias, nombre) {
        let obj = {
            tipo: tipo,
            precio: precio,
            calorias: calorias,
            existencias: existencias,
            nombre: nombre
        };
        let urlCompleta = this._urlBase;
        let promise = this._apiClient.post(urlCompleta, obj).then(
            (data) => {
                console.log(data.message);
                return data.message;
            });

        return promise;
    }

    deleteComida(comida) {
        let urlCompleta = this._urlBase + '/' + comida._id;
        let promise = this._apiClient.delete(urlCompleta).then(
            (data) => {
                console.log(data.message);
                return data;
            }
        )

        return promise;
    }

    editComida(id, tipo, precio, calorias, existencias, nombre) {
        let obj = {
            tipo: tipo,
            precio: precio,
            calorias: calorias,
            existencias: existencias,
            nombre: nombre
        };
        let urlCompleta = this._urlBase;
        let promise = this._apiClient.put(urlCompleta + "/" + id, obj).then(
            (data) => {
                console.log(data.message);
                return data.message;
            }
        )
        return promise;
    }
}

class bebidaApi {
    constructor() {
        this._urlBase = "http://formacion-indra-franlindebl.com/api/bebidas";
        this._apiClient = new APIClient();
    }

    showPage() {
        document.getElementById("loader").style.display = "none";
    }

    getBebidas() {

        let promise = this._apiClient.get(this._urlBase).then((data) => {
            var arrayDeBebidas = [];
            for (let i = 0; i < data.length; i++) {
                let elem = data[i];
                let bebida = new Bebida(elem._id, elem.grados, elem.esAlcoholica, elem.precio, elem.calorias, elem.existencias, elem.nombre);
                arrayDeBebidas.push(bebida);
                this.showPage();
            }
            // console.log(arrayDeBebidas);
            return arrayDeBebidas;
        });
        return promise;
    }

    postBebida(grados, esAlcoholica, precio, calorias, existencias, nombre) {
        let obj = {
            grados: grados,
            esAlcoholica: esAlcoholica,
            precio: precio,
            calorias: calorias,
            existencias: existencias,
            nombre: nombre
        };
        let urlCompleta = this._urlBase;
        let promise = this._apiClient.post(urlCompleta, obj).then(
            (data) => {
                return data.message;
            });
        return promise;
    }

    deleteBebida(bebida) {
        let urlCompleta = this._urlBase + '/' + bebida._id;
        let promise = this._apiClient.delete(urlCompleta).then(
            (data) => {
                return data;
            }
        )

        return promise;
    }

    editBebida(id, grados, esAlcoholica, precio, calorias, existencias, nombre) {
        let obj = {
            grados: grados,
            esAlcoholica: esAlcoholica,
            precio: precio,
            calorias: calorias,
            existencias: existencias,
            nombre: nombre
        };
        let urlCompleta = this._urlBase + "/" + id
        let promise = this._apiClient.put(urlCompleta, obj).then(
            (data) => {
                return data.message;
            }
        )
        return promise;
    }
}

class APIClient {
    constructor() {}

    get(url) {
        var misCabeceras = new Headers();

        var miInit = {
            method: 'GET',
            headers: misCabeceras
        };

        var promise = fetch(url, miInit).then(
            (response) => {
                // alert("Espera un momento estamos cargando la página...");
                return response.json();
            }
        );
        return promise;
    }

    post(uri, data) {
        let url = uri;
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let init = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        }

        let promise = fetch(url, init).then(
            (response) => {
                return response.json();
            }
        ).catch(
            (error) => {
                console.log(error);
                return error;
            }
        )

        return promise;
    }

    delete(url) {
        var misCabeceras = new Headers();

        var miInit = {
            method: 'DELETE',
            headers: misCabeceras
        };

        var promise = fetch(url, miInit).then(
            (response) => {
                return response.json();
            }
        );
        return promise;
    }

    put(uri, data) {
        let url = uri;
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let init = {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(data)
        }

        let promise = fetch(url, init).then(
            (response) => {
                return response.json(); // Revisar porque json() regresa una promesa... no un valor??? O_o
            }
        ).catch(
            (error) => {
                console.log(error);
                return error;
            }
        )

        return promise;
    }
}

class Login extends Page {
    constructor() {
        super();
        this.checkLogin();
    }

    setLogin() {
        let button = document.getElementById("login");
        button.addEventListener("click", () => {
            let name = document.getElementById("name").value;
            let pass = document.getElementById("pass").value;
            if (name !== "" && pass !== "") {

                //Evalua si el checkbox esta seleccionado
                if (document.getElementById("remember").checked) {
                    setCredentialsInLocalStorage(new User(name, pass));

                    this._navigationController.navigateToHome();
                } else {
                    this._navigationController.navigateToHome();
                }
            } else {
                console.log("Introduce todos los campos");
            }
        });
    }

    checkLogin() {
        if (!getCredentials()) {
            this.pintarLogin();
            this.setLogin();
        } else {
            this._navigationController.navigateToHome();
        }
    }

    pintarLogin() {

        let container = document.createElement('DIV');
        container.setAttribute("id", "container");
        document.getElementById('main').appendChild(container);
        // document.getElementById('container').appendChild(newDiv);
        let estructura = "";
        // estructura = estructura + '<div class="container">';
        estructura = estructura + '<div class="row text-center">';
        estructura = estructura + '<form>';
        estructura = estructura + '<div class="form-group">';
        estructura = estructura + '<label>Usuario: </label>';
        estructura = estructura + '<input type="text" id="name">';
        estructura = estructura + '</div>';
        estructura = estructura + '<div class="form-group">';
        estructura = estructura + '<label>Contraseña: </label>';
        estructura = estructura + '<input type="password" id="pass">';
        estructura = estructura + '</div>';
        estructura = estructura + '<div class="form-group">';
        estructura = estructura + '<label>Recordar Contraseña: </label>';
        estructura = estructura + '<input type="checkbox" id="remember">';
        estructura = estructura + '</div>';
        estructura = estructura + '</form>';
        estructura = estructura + '<div>';
        estructura = estructura + '<button class="btn btn-primary" id="login">Iniciar sesión</button>';
        estructura = estructura + '</div>';
        // estructura = estructura + '</div>'

        return document.getElementById("container").innerHTML = estructura;
    }
}

class innerPage extends Page {
    constructor() {
        super();
        this._name = name;
    }
    pintar() {

        this.pintarHeader();
        this.pintarBody();
        this.pintarFooter();

        homeButton.onclick = () => this._navigationController.navigateToHome();
        comidasButton.onclick = () => this._navigationController.navigateToUrl("comidas");
        bebidasButton.onclick = () => this._navigationController.navigateToUrl("bebidas");
        faqButton.onclick = () => this._navigationController.navigateToUrl("faq");
    }

    pintarHeader() {
        let header = document.createElement('nav');
        header.setAttribute("id", "header");
        header.setAttribute("class", "navbar navbar-default navbar-fixed-top");
        document.getElementById('main').appendChild(header);

        let containerHeader = document.createElement('DIV');
        containerHeader.setAttribute("id", "containerHeader");
        containerHeader.setAttribute("class", "container text-center");
        document.getElementById('header').appendChild(containerHeader);

        let navbarHeader = document.createElement('DIV');
        navbarHeader.setAttribute("id", "navbarHeader");
        navbarHeader.setAttribute("class", "navbar-header");
        document.getElementById('containerHeader').appendChild(navbarHeader);

        let navbar = document.createElement('DIV');
        navbar.setAttribute("id", "navbar");
        navbar.setAttribute("class", "navbar-collapse collapse");
        document.getElementById('containerHeader').appendChild(navbar);

        let ulNavbar = document.createElement('ul');
        ulNavbar.setAttribute("id", "ulNavbar");
        ulNavbar.setAttribute("class", "nav navbar-nav");
        document.getElementById('navbar').appendChild(ulNavbar);

        let home = document.createElement('li');
        home.setAttribute("id", "home");
        home.setAttribute("class", "home button");
        document.getElementById('ulNavbar').appendChild(home);

        let homeButton = document.createElement('button');
        homeButton.setAttribute("id", "homeButton");
        homeButton.setAttribute("class", "btn btn-primary");
        let texthome = document.createTextNode("Home");
        homeButton.appendChild(texthome);
        document.getElementById('home').appendChild(homeButton);

        let comidas = document.createElement('li');
        comidas.setAttribute("id", "comidas");
        comidas.setAttribute("class", "comidas button");
        document.getElementById('ulNavbar').appendChild(comidas);

        let comidasButton = document.createElement('button');
        comidasButton.setAttribute("id", "comidasButton");
        comidasButton.setAttribute("class", "btn btn-success");
        let textcomidas = document.createTextNode("Gestión Comidas");
        comidasButton.appendChild(textcomidas);
        document.getElementById('comidas').appendChild(comidasButton);

        let bebidas = document.createElement('li');
        bebidas.setAttribute("id", "bebidas");
        bebidas.setAttribute("class", "bebidas button");
        document.getElementById('ulNavbar').appendChild(bebidas);

        let bebidasButton = document.createElement('button');
        bebidasButton.setAttribute("id", "bebidasButton");
        bebidasButton.setAttribute("class", "btn btn-info");
        let textbebidasButton = document.createTextNode("Gestión Bebidas");
        bebidasButton.appendChild(textbebidasButton);
        document.getElementById('bebidas').appendChild(bebidasButton);

        let faq = document.createElement('li');
        faq.setAttribute("id", "faq");
        faq.setAttribute("class", "FAQ button");
        document.getElementById('ulNavbar').appendChild(faq);

        let faqButton = document.createElement('button');
        faqButton.setAttribute("id", "faqButton");
        faqButton.setAttribute("class", "btn btn-warning");
        let textfaqButton = document.createTextNode("FAQ");
        faqButton.appendChild(textfaqButton);
        document.getElementById('faq').appendChild(faqButton);
    }

    pintarFooter() {
        let estructura = "";
        estructura = estructura + '<footer id="footer" class="footer">';
        estructura = estructura + '<div class="container">';
        estructura = estructura + '<h4>ESTE ES EL FOOTER</h4>';
        estructura = estructura + '</div>';
        estructura = estructura + '</footer>';
        document.getElementById("main").innerHTML += estructura;
    }
}

class Home extends innerPage {
    constructor() {
        super();
        this._route = "home";
    }

    pintarBody() {
        let container = document.createElement('DIV');
        container.setAttribute("id", "container");
        container.setAttribute("class", "container text-center");
        document.getElementById('main').appendChild(container);
         let estructura = "";
        estructura = estructura + '<div class="container">';
        estructura = estructura + '<h1>WELCOME TO MY RESTAURANT</h1>';
        estructura = estructura + '</div>';
        document.getElementById("container").innerHTML += estructura;
    }
}

class ComidaClient extends innerPage {
    constructor(name) {
        super(name);
        this._name = name;
        this._comidas = [];
        this._comidaApi = new comidaApi;
        this._route = "comidas"
    }

    pintar() {
        this.pintarBody();
        this.getComidas();
    }

    getComidas() {
        let miCallback = this._comidaApi.getComidas().then((data) => {
            this._comidas = data;
            this.pintarComidas(this._comidas);
        });
    }

    borrarComida(comida) {
        this._comidaApi.deleteComida(comida).then((data) => {
            this.pintar();
        });
    }

    editarComida(comida) {
        // debugger;
        let modalToEdit = document.createElement('div');
        modalToEdit.setAttribute("class", "modal fade in modalOpened");
        modalToEdit.setAttribute("id", "modalToEdit");
        modalToEdit.setAttribute("tabindex", "-1");
        modalToEdit.setAttribute("role", "dialog");
        modalToEdit.setAttribute("aria-labelledby", "modalToEditLabel");

        let modalDialog = document.createElement('div');
        modalDialog.setAttribute("class", "modal-dialog modal-sm");
        modalDialog.setAttribute("role", "document");
        modalDialog.setAttribute("id", "modalDialog");
        modalToEdit.appendChild(modalDialog);

        let modalContent = document.createElement('div');
        modalContent.setAttribute("class", "modal-content");
        modalContent.setAttribute("id", "modalContent");
        modalDialog.appendChild(modalContent);

        let modalHeader = document.createElement('div');
        modalHeader.setAttribute("class", "modal-header");
        modalHeader.setAttribute("id", "modalHeader");
        modalContent.appendChild(modalHeader);

        let button = document.createElement('button');
        button.setAttribute("type", "button");
        button.setAttribute("class", "close");
        button.setAttribute("data-dismiss", "modal");
        button.setAttribute("aria-label", "Close");
        button.setAttribute("id", "button");
        modalHeader.appendChild(button);

        let span = document.createElement('span');
        span.setAttribute("aria-hidden", "true");
        span.setAttribute("id", "span");
        button.appendChild(span);

        let titleModal = document.createElement('h4');
        titleModal.setAttribute("class", "modal-title");
        titleModal.setAttribute("id", "myModalLabel");
        let textTitle = document.createTextNode("Agregar Comida");
        titleModal.appendChild(textTitle);
        modalHeader.appendChild(titleModal);

        let modalBody = document.createElement('div');
        modalBody.setAttribute("class", "modal-body");
        modalBody.setAttribute("id", "modalBody");
        modalContent.appendChild(modalBody);

        let myForm = document.createElement('form');
        myForm.setAttribute("id", "myForm");
        modalBody.appendChild(myForm);

        let formGroup1 = document.createElement("div");
        formGroup1.setAttribute("id", "formGroup1");
        formGroup1.setAttribute("class", "form-group")
        myForm.appendChild(formGroup1);

        let label1 = document.createElement("label");
        label1.setAttribute("for", "tipo");
        label1.setAttribute("class", "control-label");
        let textLabel1 = document.createTextNode("Tipo");
        label1.appendChild(textLabel1);
        formGroup1.appendChild(label1);

        let input1 = document.createElement("input");
        input1.setAttribute("type", "text");
        input1.setAttribute("class", "form-control");
        input1.setAttribute("id", "tipo");
        input1.setAttribute("value", comida._tipo);
        formGroup1.appendChild(input1);

        let formGroup2 = document.createElement("div");
        formGroup2.setAttribute("id", "formGroup2");
        formGroup2.setAttribute("class", "form-group");
        myForm.appendChild(formGroup2);

        let label2 = document.createElement("label");
        label2.setAttribute("for", "precio");
        label2.setAttribute("class", "control-label");
        let textLabel2 = document.createTextNode("Precio");
        label2.appendChild(textLabel2);
        formGroup2.appendChild(label2);

        let input2 = document.createElement("input");
        input2.setAttribute("type", "text");
        input2.setAttribute("class", "form-control");
        input2.setAttribute("id", "precio");
        input2.setAttribute("value", comida._precio);
        formGroup2.appendChild(input2);

        let formGroup3 = document.createElement("div");
        formGroup3.setAttribute("id", "formGroup3");
        formGroup3.setAttribute("class", "form-group")
        myForm.appendChild(formGroup3);

        let label3 = document.createElement("label");
        label3.setAttribute("for", "calorias");
        label3.setAttribute("class", "control-label");
        let textLabel3 = document.createTextNode("Calorias");
        label3.appendChild(textLabel3);
        formGroup3.appendChild(label3);

        let input3 = document.createElement("input");
        input3.setAttribute("type", "text");
        input3.setAttribute("class", "form-control");
        input3.setAttribute("id", "calorias");
        input3.setAttribute("value", comida._calorias);
        formGroup3.appendChild(input3);

        let formGroup4 = document.createElement("div");
        formGroup4.setAttribute("id", "formGroup4");
        formGroup4.setAttribute("class", "form-group")
        myForm.appendChild(formGroup4);

        let label4 = document.createElement("label");
        label4.setAttribute("for", "existencias");
        label4.setAttribute("class", "control-label");
        let textLabel4 = document.createTextNode("Existencias");
        label4.appendChild(textLabel4);
        formGroup4.appendChild(label4);

        let input4 = document.createElement("input");
        input4.setAttribute("type", "text");
        input4.setAttribute("class", "form-control");
        input4.setAttribute("id", "existencias");
        input4.setAttribute("value", comida._existencias);
        formGroup4.appendChild(input4);

        let formGroup5 = document.createElement("div");
        formGroup5.setAttribute("id", "formGroup5");
        formGroup5.setAttribute("class", "form-group")
        myForm.appendChild(formGroup5);

        let label5 = document.createElement("label");
        label5.setAttribute("for", "nombre");
        label5.setAttribute("class", "control-label");
        let textLabel5 = document.createTextNode("Nombre");
        label5.appendChild(textLabel5);
        formGroup5.appendChild(label5);

        let input5 = document.createElement("input");
        input5.setAttribute("type", "text");
        input5.setAttribute("class", "form-control");
        input5.setAttribute("id", "nombre");
        input5.setAttribute("value", comida._nombre);
        formGroup5.appendChild(input5);

        let modalFooter = document.createElement("div");
        modalFooter.setAttribute("class", "modal-footer");
        modalFooter.setAttribute("id", "modalFooter");
        modalContent.appendChild(modalFooter);

        let buttonFooter1 = document.createElement('button');
        buttonFooter1.setAttribute("type", "button");
        buttonFooter1.setAttribute("class", "btn btn-default");
        buttonFooter1.setAttribute("data-dismiss", "modal");
        let textButton1 = document.createTextNode("Close");
        buttonFooter1.appendChild(textButton1);
        modalFooter.appendChild(buttonFooter1);
        buttonFooter1.onclick = () => this._navigationController.navigateToUrl("comidas");

        let buttonFooter2 = document.createElement('button');
        buttonFooter2.setAttribute("type", "button");
        buttonFooter2.setAttribute("class", "btn btn-primary");
        let textButton2 = document.createTextNode("Save");
        buttonFooter2.appendChild(textButton2);
        modalFooter.appendChild(buttonFooter2);

        buttonFooter2.addEventListener("click", () => {
            // debugger;
            let tipo = input1.value;
            let precio = input2.value;
            let calorias = input3.value;
            let existencias = input4.value;
            let nombre = input5.value;
            this._comidaApi.editComida(comida._id, tipo, precio, calorias, existencias, nombre);
            // debugger;
        });
        document.getElementById('container').appendChild(modalToEdit);
    }

    pintarBody() {

        document.getElementById("container").innerHTML = "";

        let divTable = document.createElement('DIV');
        divTable.setAttribute("id", "divTable");
        divTable.setAttribute("class", "table-responsive");
        document.getElementById('container').appendChild(divTable);

        let loader = document.createElement('DIV');
        loader.setAttribute("id", "loader");
        document.getElementById('container').appendChild(loader);

        let table = document.createElement('table');
        table.setAttribute("id", "table");
        table.setAttribute("class", "table table-hover table-striped table-bordered");
        document.getElementById('divTable').appendChild(table);

        let thead = document.createElement('thead');
        thead.setAttribute("id", "thead");
        document.getElementById('table').appendChild(thead);

        let tbody = document.createElement('tbody');
        tbody.setAttribute("id", "tbody");
        document.getElementById('table').appendChild(tbody);

        let tr = document.createElement('tr');
        tr.setAttribute("id", "tr");
        document.getElementById('thead').appendChild(tr);

        let tdId = document.createElement('td');
        tdId.setAttribute("id", "tdId");
        let texttdId = document.createTextNode("ID");
        tdId.appendChild(texttdId);
        document.getElementById('tr').appendChild(tdId);

        let tdTipo = document.createElement('td');
        tdTipo.setAttribute("id", "tdTipo");
        let texttdTipo = document.createTextNode("Tipo");
        tdTipo.appendChild(texttdTipo);
        document.getElementById('tr').appendChild(tdTipo);

        let tdPrecio = document.createElement('td');
        tdPrecio.setAttribute("id", "tdPrecio");
        let texttdPrecio = document.createTextNode("Precio");
        tdPrecio.appendChild(texttdPrecio);
        document.getElementById('tr').appendChild(tdPrecio);

        let tdCalorias = document.createElement('td');
        tdCalorias.setAttribute("id", "tdCalorias");
        let texttdCalorias = document.createTextNode("Calorias");
        tdCalorias.appendChild(texttdCalorias);
        document.getElementById('tr').appendChild(tdCalorias);

        let tdExistencias = document.createElement('td');
        tdExistencias.setAttribute("id", "tdExistencias");
        let texttdExistencias = document.createTextNode("Existencias");
        tdExistencias.appendChild(texttdExistencias);
        document.getElementById('tr').appendChild(tdExistencias);

        let tdNombre = document.createElement('td');
        tdNombre.setAttribute("id", "tdNombre");
        let texttdNombre = document.createTextNode("Nombre");
        tdNombre.appendChild(texttdNombre);
        document.getElementById('tr').appendChild(tdNombre);

        let tdAcciones = document.createElement('td');
        tdAcciones.setAttribute("id", "tdAcciones");
        let texttdAcciones = document.createTextNode("Acción");
        tdAcciones.appendChild(texttdAcciones);
        document.getElementById('tr').appendChild(tdAcciones);

        let myModal = document.createElement('div');
        myModal.setAttribute("class", "modal fade");
        myModal.setAttribute("id", "myModal");
        myModal.setAttribute("tabindex", "-1");
        myModal.setAttribute("role", "dialog");
        myModal.setAttribute("aria-labelledby", "myModalLabel");
        document.getElementById('container').appendChild(myModal);


        let modalDialog = document.createElement('div');
        modalDialog.setAttribute("class", "modal-dialog modal-sm");
        modalDialog.setAttribute("role", "document");
        modalDialog.setAttribute("id", "modalDialog");
        document.getElementById('myModal').appendChild(modalDialog);

        let modalContent = document.createElement('div');
        modalContent.setAttribute("class", "modal-content");
        modalContent.setAttribute("id", "modalContent");
        document.getElementById('modalDialog').appendChild(modalContent);

        let modalHeader = document.createElement('div');
        modalHeader.setAttribute("class", "modal-header");
        modalHeader.setAttribute("id", "modalHeader");
        document.getElementById('modalContent').appendChild(modalHeader);

        let button = document.createElement('button');
        button.setAttribute("type", "button");
        button.setAttribute("class", "close");
        button.setAttribute("data-dismiss", "modal");
        button.setAttribute("aria-label", "Close");
        button.setAttribute("id", "button");
        document.getElementById('modalHeader').appendChild(button);

        let span = document.createElement('span');
        span.setAttribute("aria-hidden", "true");
        span.setAttribute("id", "span");
        document.getElementById('button').appendChild(span);

        let titleModal = document.createElement('h4');
        titleModal.setAttribute("class", "modal-title");
        titleModal.setAttribute("id", "myModalLabel");
        let textTitle = document.createTextNode("Agregar Comida");
        titleModal.appendChild(textTitle);
        document.getElementById('modalHeader').appendChild(titleModal);

        let modalBody = document.createElement('div');
        modalBody.setAttribute("class", "modal-body");
        modalBody.setAttribute("id", "modalBody");
        document.getElementById('modalContent').appendChild(modalBody);

        let myForm = document.createElement('form');
        myForm.setAttribute("id", "myForm");
        document.getElementById('modalBody').appendChild(myForm);

        let formGroup1 = document.createElement("div");
        formGroup1.setAttribute("id", "formGroup1");
        formGroup1.setAttribute("class", "form-group")
        document.getElementById('myForm').appendChild(formGroup1);

        let label1 = document.createElement("label");
        label1.setAttribute("for", "tipo");
        label1.setAttribute("class", "control-label");
        let textLabel1 = document.createTextNode("Tipo");
        label1.appendChild(textLabel1);
        document.getElementById('formGroup1').appendChild(label1);

        let select1 = document.createElement("select");
        // select1.setAttribute("type", "text");
        select1.setAttribute("class", "form-control");
        select1.setAttribute("id", "tipo");
        // select1.setAttribute("value", bebidas);
        document.getElementById('formGroup1').appendChild(select1);

        let option0 = document.createElement("option");
        option0.setAttribute("value", "");
        document.getElementById('tipo').appendChild(option0);

        let option1 = document.createElement("option");
        option1.setAttribute("value", "Entrante");
        let textOption1 = document.createTextNode("Entrante");
        option1.appendChild(textOption1);
        document.getElementById('tipo').appendChild(option1);

        let option2 = document.createElement("option");
        option2.setAttribute("value", "Principal");
        let textOption2 = document.createTextNode("Principal");
        option2.appendChild(textOption2);
        document.getElementById('tipo').appendChild(option2);

        let option3 = document.createElement("option");
        option3.setAttribute("value", "Postre");
        let textOption3 = document.createTextNode("Postre");
        option3.appendChild(textOption3);
        document.getElementById('tipo').appendChild(option3);

        let formGroup2 = document.createElement("div");
        formGroup2.setAttribute("id", "formGroup2");
        formGroup2.setAttribute("class", "form-group");
        document.getElementById('myForm').appendChild(formGroup2);

        let label2 = document.createElement("label");
        label2.setAttribute("for", "precio");
        label2.setAttribute("class", "control-label");
        let textLabel2 = document.createTextNode("Precio");
        label2.appendChild(textLabel2);
        document.getElementById('formGroup2').appendChild(label2);

        let input2 = document.createElement("input");
        input2.setAttribute("type", "number");
        input2.setAttribute("min", "0");
        input2.setAttribute("max", "10000");
        input2.setAttribute("class", "form-control");
        input2.setAttribute("id", "precio");
        input2.setAttribute("required", "required", "");
        document.getElementById('formGroup2').appendChild(input2);

        let formGroup3 = document.createElement("div");
        formGroup3.setAttribute("id", "formGroup3");
        formGroup3.setAttribute("class", "form-group")
        document.getElementById('myForm').appendChild(formGroup3);

        let label3 = document.createElement("label");
        label3.setAttribute("for", "calorias");
        label3.setAttribute("class", "control-label");
        let textLabel3 = document.createTextNode("Calorias");
        label3.appendChild(textLabel3);
        document.getElementById('formGroup3').appendChild(label3);

        let input3 = document.createElement("input");
        input3.setAttribute("type", "number");
        input2.setAttribute("min", "0");
        input2.setAttribute("max", "5000");
        input2.setAttribute("required", "required");
        input3.setAttribute("class", "form-control");
        input3.setAttribute("id", "calorias");
        document.getElementById('formGroup3').appendChild(input3);

        let formGroup4 = document.createElement("div");
        formGroup4.setAttribute("id", "formGroup4");
        formGroup4.setAttribute("class", "form-group")
        document.getElementById('myForm').appendChild(formGroup4);

        let label4 = document.createElement("label");
        label4.setAttribute("for", "existencias");
        label4.setAttribute("class", "control-label");
        let textLabel4 = document.createTextNode("Existencias");
        label4.appendChild(textLabel4);
        document.getElementById('formGroup4').appendChild(label4);

        let input4 = document.createElement("input");
        input4.setAttribute("type", "number");
        input4.setAttribute("min", "0");
        input4.setAttribute("max", "1000");
        input2.setAttribute("required", "required");
        input4.setAttribute("class", "form-control");
        input4.setAttribute("id", "existencias");
        document.getElementById('formGroup4').appendChild(input4);

        let formGroup5 = document.createElement("div");
        formGroup5.setAttribute("id", "formGroup5");
        formGroup5.setAttribute("class", "form-group")
        document.getElementById('myForm').appendChild(formGroup5);

        let label5 = document.createElement("label");
        label5.setAttribute("for", "nombre");
        label5.setAttribute("class", "control-label");
        let textLabel5 = document.createTextNode("Nombre");
        label5.appendChild(textLabel5);
        document.getElementById('formGroup5').appendChild(label5);

        let input5 = document.createElement("input");
        input5.setAttribute("type", "text");
        input5.setAttribute("min", "4");
        input5.setAttribute("max", "100");
        input2.setAttribute("required", "required");
        input5.setAttribute("class", "form-control");
        input5.setAttribute("id", "nombre");
        document.getElementById('formGroup5').appendChild(input5);

        let modalFooter = document.createElement("div");
        modalFooter.setAttribute("class", "modal-footer");
        modalFooter.setAttribute("id", "modalFooter");
        document.getElementById('modalContent').appendChild(modalFooter);

        let buttonFooter1 = document.createElement('button');
        buttonFooter1.setAttribute("type", "button");
        buttonFooter1.setAttribute("class", "btn btn-default");
        buttonFooter1.setAttribute("data-dismiss", "modal");
        let textButton1 = document.createTextNode("Close");
        buttonFooter1.appendChild(textButton1);
        document.getElementById('modalFooter').appendChild(buttonFooter1);
        buttonFooter1.onclick = () => this._navigationController.navigateToUrl("comidas");

        let buttonFooter2 = document.createElement('button');
        buttonFooter2.setAttribute("type", "button");
        buttonFooter2.setAttribute("class", "btn btn-primary");
        let textButton2 = document.createTextNode("Save");
        buttonFooter2.appendChild(textButton2);
        document.getElementById('modalFooter').appendChild(buttonFooter2);

        buttonFooter2.addEventListener("click", () => {
            // debugger;
            let tipo = document.getElementById("tipo").value;
            let precio = document.getElementById("precio").value;
            let calorias = document.getElementById("calorias").value;
            let existencias = document.getElementById("existencias").value;
            let nombre = document.getElementById("nombre").value;
            this._comidaApi.postComida(tipo, precio, calorias, existencias, nombre);
            // debugger;
        });
    }

    pintarComidas(comida) {
        let tbodyInner = document.getElementById("tbody");
        for (let i = 0; i < comida.length; i++) {
            let comidas = comida[i];
            // console.log(comidas);
            let funcionVer = () => {
                console.log("ver");
            };
            let funcionEditar = (comida) => {
                this.editarComida(comida);
            };
            let funcionBorrar = () => {
                this.borrarComida(comidas);
            };
            tbodyInner.appendChild(comidas.getRowForTable(funcionVer, funcionEditar, funcionBorrar))
        }
    }
}

class BebidaClient extends innerPage {
    constructor(name) {
        super(name);
        this._name = name;
        this._bebidas = [];
        this._bebidaApi = new bebidaApi;
        this._route = "bebidas"
    }

    pintar() {
        this.pintarBody();
        this.getBebida();
    }

    getBebida() {
        this._bebidaApi.getBebidas().then((data) => {
            this._bebidas = data;
            this.pintarBebida(this._bebidas);
        });
    }

    borrarBebida(bebida) {
        this._bebidaApi.deleteBebida(bebida).then((data) => {
            this.pintar();
        });
    }

    editarBebida(bebida) {

        let modalToEditBebidas = document.createElement('div');
        modalToEditBebidas.setAttribute("class", "modal fade in modalOpened");
        modalToEditBebidas.setAttribute("id", "modalToEditBebidas ");
        modalToEditBebidas.setAttribute("tabindex", "-1");
        modalToEditBebidas.setAttribute("role", "dialog");
        modalToEditBebidas.setAttribute("aria-labelledby", "modalToEditBebidasLabel");


        let modalDialog = document.createElement('div');
        modalDialog.setAttribute("class", "modal-dialog modal-sm");
        modalDialog.setAttribute("role", "document");
        modalDialog.setAttribute("id", "modalDialog");
        modalToEditBebidas.appendChild(modalDialog);

        let modalContent = document.createElement('div');
        modalContent.setAttribute("class", "modal-content");
        modalContent.setAttribute("id", "modalContent");
        modalDialog.appendChild(modalContent);

        let modalHeader = document.createElement('div');
        modalHeader.setAttribute("class", "modal-header");
        modalHeader.setAttribute("id", "modalHeader");
        modalContent.appendChild(modalHeader);

        let button = document.createElement('button');
        button.setAttribute("type", "button");
        button.setAttribute("class", "close");
        button.setAttribute("data-dismiss", "modal");
        button.setAttribute("aria-label", "Close");
        button.setAttribute("id", "button");
        modalHeader.appendChild(button);

        let span = document.createElement('span');
        span.setAttribute("aria-hidden", "true");
        span.setAttribute("id", "span");
        button.appendChild(span);

        let titleModal = document.createElement('h4');
        titleModal.setAttribute("class", "modal-title");
        titleModal.setAttribute("id", "myModalLabel");
        let textTitle = document.createTextNode("Agregar Bebida");
        titleModal.appendChild(textTitle);
        modalHeader.appendChild(titleModal);

        let modalBody = document.createElement('div');
        modalBody.setAttribute("class", "modal-body");
        modalBody.setAttribute("id", "modalBody");
        modalContent.appendChild(modalBody);

        let myForm = document.createElement('form');
        myForm.setAttribute("id", "myForm");
        modalBody.appendChild(myForm);

        let formGroup1 = document.createElement("div");
        formGroup1.setAttribute("id", "formGroup1");
        formGroup1.setAttribute("class", "form-group")
        myForm.appendChild(formGroup1);

        let label1 = document.createElement("label");
        label1.setAttribute("for", "grados");
        label1.setAttribute("class", "control-label");
        let textLabel1 = document.createTextNode("Grados");
        label1.appendChild(textLabel1);
        formGroup1.appendChild(label1);

        let input1 = document.createElement("input");
        input1.setAttribute("type", "text");
        input1.setAttribute("class", "form-control");
        input1.setAttribute("id", "grados");
        input1.setAttribute("value", bebida._grados);
        formGroup1.appendChild(input1);

        let formGroup2 = document.createElement("div");
        formGroup2.setAttribute("id", "formGroup2");
        formGroup2.setAttribute("class", "form-group");
        myForm.appendChild(formGroup2);

        let label2 = document.createElement("label");
        label2.setAttribute("for", "alcoholica");
        label2.setAttribute("class", "control-label");
        let textLabel2 = document.createTextNode("Alcoholica");
        label2.appendChild(textLabel2);
        formGroup2.appendChild(label2);

        let input2 = document.createElement("input");
        input2.setAttribute("type", "text");
        input2.setAttribute("class", "form-control");
        input2.setAttribute("id", "alcoholica");
        input2.setAttribute("value", bebida._esAlcoholica);
        formGroup2.appendChild(input2);

        let formGroup3 = document.createElement("div");
        formGroup3.setAttribute("id", "formGroup3");
        formGroup3.setAttribute("class", "form-group")
        myForm.appendChild(formGroup3);

        let label3 = document.createElement("label");
        label3.setAttribute("for", "precio");
        label3.setAttribute("class", "control-label");
        let textLabel3 = document.createTextNode("Precio");
        label3.appendChild(textLabel3);
        formGroup3.appendChild(label3);

        let input3 = document.createElement("input");
        input3.setAttribute("type", "text");
        input3.setAttribute("class", "form-control");
        input3.setAttribute("id", "precio");
        input3.setAttribute("value", bebida._precio);
        formGroup3.appendChild(input3);

        let formGroup4 = document.createElement("div");
        formGroup4.setAttribute("id", "formGroup4");
        formGroup4.setAttribute("class", "form-group")
        myForm.appendChild(formGroup4);

        let label4 = document.createElement("label");
        label4.setAttribute("for", "calorias");
        label4.setAttribute("class", "control-label");
        let textLabel4 = document.createTextNode("Calorias");
        label4.appendChild(textLabel4);
        formGroup4.appendChild(label4);

        let input4 = document.createElement("input");
        input4.setAttribute("type", "text");
        input4.setAttribute("class", "form-control");
        input4.setAttribute("id", "calorias");
        input4.setAttribute("value", bebida._calorias);
        formGroup4.appendChild(input4);

        let formGroup5 = document.createElement("div");
        formGroup5.setAttribute("id", "formGroup5");
        formGroup5.setAttribute("class", "form-group")
        myForm.appendChild(formGroup5);

        let label5 = document.createElement("label");
        label5.setAttribute("for", "existencias");
        label5.setAttribute("class", "control-label");
        let textLabel5 = document.createTextNode("Existencias");
        label5.appendChild(textLabel5);
        formGroup5.appendChild(label5);

        let input5 = document.createElement("input");
        input5.setAttribute("type", "text");
        input5.setAttribute("class", "form-control");
        input5.setAttribute("id", "existencias");
        input5.setAttribute("value", bebida._existencias);
        formGroup5.appendChild(input5);

        let formGroup6 = document.createElement("div");
        formGroup6.setAttribute("id", "formGroup6");
        formGroup6.setAttribute("class", "form-group")
        myForm.appendChild(formGroup6);

        let label6 = document.createElement("label");
        label6.setAttribute("for", "nombre");
        label6.setAttribute("class", "control-label");
        let textLabel6 = document.createTextNode("Nombre");
        label6.appendChild(textLabel6);
        formGroup6.appendChild(label6);

        let input6 = document.createElement("input");
        input6.setAttribute("type", "text");
        input6.setAttribute("class", "form-control");
        input6.setAttribute("id", "nombre");
        input6.setAttribute("value", bebida._nombre);
        formGroup6.appendChild(input6);

        let modalFooter = document.createElement("div");
        modalFooter.setAttribute("class", "modal-footer");
        modalFooter.setAttribute("id", "modalFooter");
        modalContent.appendChild(modalFooter);

        let buttonFooter1 = document.createElement('button');
        buttonFooter1.setAttribute("type", "button");
        buttonFooter1.setAttribute("class", "btn btn-default");
        buttonFooter1.setAttribute("data-dismiss", "modal");
        let textButton1 = document.createTextNode("Close");
        buttonFooter1.appendChild(textButton1);
        modalFooter.appendChild(buttonFooter1);
        buttonFooter1.onclick = () => this._navigationController.navigateToUrl("bebidas");

        let buttonFooter2 = document.createElement('button');
        buttonFooter2.setAttribute("type", "button");
        buttonFooter2.setAttribute("class", "btn btn-primary");
        let textButton2 = document.createTextNode("Save");
        buttonFooter2.appendChild(textButton2);
        modalFooter.appendChild(buttonFooter2);

        buttonFooter2.addEventListener("click", () => {
            // debugger;
            let grados = input1.value;
            let esAlcoholica = input2.value;
            let precio = input3.value;
            let calorias = input4.value;
            let existencias = input5.value;
            let nombre = input6.value;
            this._bebidaApi.editBebida(bebida._id, grados, esAlcoholica, precio, calorias, existencias, nombre);
            // this._navigationController.navigateToUrl("bebidas");
        });
        document.getElementById('container').appendChild(modalToEditBebidas);
    }

    pintarBody() {

        document.getElementById("container").innerHTML = "";

        let divTable = document.createElement('DIV');
        divTable.setAttribute("id", "divTable");
        divTable.setAttribute("class", "table-responsive");
        document.getElementById('container').appendChild(divTable);

        let loader = document.createElement('DIV');
        loader.setAttribute("id", "loader");
        document.getElementById('container').appendChild(loader);

        let table = document.createElement('table');
        table.setAttribute("id", "table");
        table.setAttribute("class", "table table-hover table-striped table-bordered");
        document.getElementById('divTable').appendChild(table);

        let thead = document.createElement('thead');
        thead.setAttribute("id", "thead");
        document.getElementById('table').appendChild(thead);

        let tbody = document.createElement('tbody');
        tbody.setAttribute("id", "tbody");
        document.getElementById('table').appendChild(tbody);

        let tr = document.createElement('tr');
        tr.setAttribute("id", "tr");
        document.getElementById('thead').appendChild(tr);

        let tdId = document.createElement('td');
        tdId.setAttribute("id", "tdId");
        let texttdId = document.createTextNode("ID");
        tdId.appendChild(texttdId);
        document.getElementById('tr').appendChild(tdId);

        let tdGrados = document.createElement('td');
        tdGrados.setAttribute("id", "tdGrados");
        let texttdGrados = document.createTextNode("Grados");
        tdGrados.appendChild(texttdGrados);
        document.getElementById('tr').appendChild(tdGrados);

        let tdAlcohol = document.createElement('td');
        tdAlcohol.setAttribute("id", "tdAlcohol");
        let texttdAlcohol = document.createTextNode("Es alcoholica");
        tdAlcohol.appendChild(texttdAlcohol);
        document.getElementById('tr').appendChild(tdAlcohol);

        let tdPrecio = document.createElement('td');
        tdPrecio.setAttribute("id", "tdPrecio");
        let texttdPrecio = document.createTextNode("Precio");
        tdPrecio.appendChild(texttdPrecio);
        document.getElementById('tr').appendChild(tdPrecio);

        let tdCalorias = document.createElement('td');
        tdCalorias.setAttribute("id", "tdCalorias");
        let texttdCalorias = document.createTextNode("Calorias");
        tdCalorias.appendChild(texttdCalorias);
        document.getElementById('tr').appendChild(tdCalorias);

        let tdExistencias = document.createElement('td');
        tdExistencias.setAttribute("id", "tdExistencias");
        let texttdExistencias = document.createTextNode("Existencias");
        tdExistencias.appendChild(texttdExistencias);
        document.getElementById('tr').appendChild(tdExistencias);

        let tdNombre = document.createElement('td');
        tdNombre.setAttribute("id", "tdNombre");
        let texttdNombre = document.createTextNode("Nombre");
        tdNombre.appendChild(texttdNombre);
        document.getElementById('tr').appendChild(tdNombre);

        let tdAcciones = document.createElement('td');
        tdAcciones.setAttribute("id", "tdAcciones");
        let texttdAcciones = document.createTextNode("Acción");
        tdAcciones.appendChild(texttdAcciones);
        document.getElementById('tr').appendChild(tdAcciones);

        let myModal = document.createElement('div');
        myModal.setAttribute("class", "modal fade");
        myModal.setAttribute("id", "myModal");
        myModal.setAttribute("tabindex", "-1");
        myModal.setAttribute("role", "dialog");
        myModal.setAttribute("aria-labelledby", "myModalLabel");
        document.getElementById('container').appendChild(myModal);


        let modalDialog = document.createElement('div');
        modalDialog.setAttribute("class", "modal-dialog modal-sm");
        modalDialog.setAttribute("role", "document");
        modalDialog.setAttribute("id", "modalDialog");
        document.getElementById('myModal').appendChild(modalDialog);

        let modalContent = document.createElement('div');
        modalContent.setAttribute("class", "modal-content");
        modalContent.setAttribute("id", "modalContent");
        document.getElementById('modalDialog').appendChild(modalContent);

        let modalHeader = document.createElement('div');
        modalHeader.setAttribute("class", "modal-header");
        modalHeader.setAttribute("id", "modalHeader");
        document.getElementById('modalContent').appendChild(modalHeader);

        let button = document.createElement('button');
        button.setAttribute("type", "button");
        button.setAttribute("class", "close");
        button.setAttribute("data-dismiss", "modal");
        button.setAttribute("aria-label", "Close");
        button.setAttribute("id", "button");
        document.getElementById('modalHeader').appendChild(button);

        let span = document.createElement('span');
        span.setAttribute("aria-hidden", "true");
        span.setAttribute("id", "span");
        document.getElementById('button').appendChild(span);

        let titleModal = document.createElement('h4');
        titleModal.setAttribute("class", "modal-title");
        titleModal.setAttribute("id", "myModalLabel");
        let textTitle = document.createTextNode("Titulo del moal");
        titleModal.appendChild(textTitle);
        document.getElementById('modalHeader').appendChild(titleModal);

        let modalBody = document.createElement('div');
        modalBody.setAttribute("class", "modal-body");
        modalBody.setAttribute("id", "modalBody");
        document.getElementById('modalContent').appendChild(modalBody);

        let myForm = document.createElement('form');
        myForm.setAttribute("id", "myForm");
        document.getElementById('modalBody').appendChild(myForm);

        let formGroup1 = document.createElement("div");
        formGroup1.setAttribute("id", "formGroup1");
        formGroup1.setAttribute("class", "form-group")
        document.getElementById('myForm').appendChild(formGroup1);

        let label1 = document.createElement("label");
        label1.setAttribute("for", "grados");
        label1.setAttribute("class", "control-label");
        let textLabel1 = document.createTextNode("Grados");
        label1.appendChild(textLabel1);
        document.getElementById('formGroup1').appendChild(label1);

        let input1 = document.createElement("input");
        input1.setAttribute("type", "numero");
        input1.setAttribute("min", "0");
        input1.setAttribute("max", "100");
        input1.setAttribute("class", "form-control");
        input1.setAttribute("id", "grados");
        input1.setAttribute("required", "required");
        document.getElementById('formGroup1').appendChild(input1);

        let formGroup2 = document.createElement("div");
        formGroup2.setAttribute("id", "formGroup2");
        formGroup2.setAttribute("class", "form-group");
        document.getElementById('myForm').appendChild(formGroup2);

        let label2 = document.createElement("label");
        label2.setAttribute("for", "alcoholica");
        label2.setAttribute("class", "control-label");
        let textLabel2 = document.createTextNode("Alcoholica");
        label2.appendChild(textLabel2);
        document.getElementById('formGroup2').appendChild(label2);

        let input2 = document.createElement("input");
        input2.setAttribute("type", "text");
        input2.setAttribute("class", "form-control");
        input2.setAttribute("id", "alcoholica");
        document.getElementById('formGroup2').appendChild(input2);

        let formGroup3 = document.createElement("div");
        formGroup3.setAttribute("id", "formGroup3");
        formGroup3.setAttribute("class", "form-group")
        document.getElementById('myForm').appendChild(formGroup3);

        let label3 = document.createElement("label");
        label3.setAttribute("for", "precio");
        label3.setAttribute("class", "control-label");
        let textLabel3 = document.createTextNode("Precio");
        label3.appendChild(textLabel3);
        document.getElementById('formGroup3').appendChild(label3);

        let input3 = document.createElement("input");
        input3.setAttribute("type", "number");
        input3.setAttribute("class", "form-control");
        input3.setAttribute("id", "precio");
        input3.setAttribute("min", "0");
        input3.setAttribute("max", "10000");
        input3.setAttribute("required", "required");
        document.getElementById('formGroup3').appendChild(input3);

        let formGroup4 = document.createElement("div");
        formGroup4.setAttribute("id", "formGroup4");
        formGroup4.setAttribute("class", "form-group")
        document.getElementById('myForm').appendChild(formGroup4);

        let label4 = document.createElement("label");
        label4.setAttribute("for", "calorias");
        label4.setAttribute("class", "control-label");
        let textLabel4 = document.createTextNode("Calorias");
        label4.appendChild(textLabel4);
        document.getElementById('formGroup4').appendChild(label4);

        let input4 = document.createElement("input");
        input4.setAttribute("type", "number");
        input4.setAttribute("class", "form-control");
        input4.setAttribute("max", "5000");
        input4.setAttribute("min", "0");
        input4.setAttribute("id", "calorias");
        input4.setAttribute("required", "required");
        document.getElementById('formGroup4').appendChild(input4);

        let formGroup5 = document.createElement("div");
        formGroup5.setAttribute("id", "formGroup5");
        formGroup5.setAttribute("class", "form-group")
        document.getElementById('myForm').appendChild(formGroup5);

        let label5 = document.createElement("label");
        label5.setAttribute("for", "existencias");
        label5.setAttribute("class", "control-label");
        let textLabel5 = document.createTextNode("Existencias");
        label5.appendChild(textLabel5);
        document.getElementById('formGroup5').appendChild(label5);

        let input5 = document.createElement("input");
        input5.setAttribute("type", "number");
        input5.setAttribute("class", "form-control");
        input5.setAttribute("id", "existencias");
        input5.setAttribute("max", "1000");
        input5.setAttribute("min", "0");
        input5.setAttribute("required", "required");
        document.getElementById('formGroup5').appendChild(input5);

        let formGroup6 = document.createElement("div");
        formGroup6.setAttribute("id", "formGroup6");
        formGroup6.setAttribute("class", "form-group")
        document.getElementById('myForm').appendChild(formGroup6);

        let label6 = document.createElement("label");
        label6.setAttribute("for", "nombre");
        label6.setAttribute("class", "control-label");
        let textLabel6 = document.createTextNode("Nombre");
        label6.appendChild(textLabel6);
        document.getElementById('formGroup6').appendChild(label6);

        let input6 = document.createElement("input");
        input6.setAttribute("type", "text");
        input6.setAttribute("class", "form-control");
        input6.setAttribute("id", "nombre");
        input6.setAttribute("max", "100");
        input6.setAttribute("min", "4");
        input6.setAttribute("required", "required");
        document.getElementById('formGroup6').appendChild(input6);

        let modalFooter = document.createElement("div");
        modalFooter.setAttribute("class", "modal-footer");
        modalFooter.setAttribute("id", "modalFooter");
        document.getElementById('modalContent').appendChild(modalFooter);

        let buttonFooter1 = document.createElement('button');
        buttonFooter1.setAttribute("type", "button");
        buttonFooter1.setAttribute("class", "btn btn-default");
        buttonFooter1.setAttribute("data-dismiss", "modal");
        let textButton1 = document.createTextNode("Close");
        buttonFooter1.appendChild(textButton1);
        document.getElementById('modalFooter').appendChild(buttonFooter1);
        buttonFooter1.onclick = () => this._navigationController.navigateToUrl("bebidas");

        let buttonFooter2 = document.createElement('button');
        buttonFooter2.setAttribute("type", "button");
        buttonFooter2.setAttribute("class", "btn btn-primary");
        let textButton2 = document.createTextNode("Save");
        buttonFooter2.appendChild(textButton2);
        document.getElementById('modalFooter').appendChild(buttonFooter2);

        buttonFooter2.addEventListener("click", () => {
            // debugger;
            let grados = document.getElementById("grados").value;
            let esAlcoholica = document.getElementById("alcoholica").value;
            let precio = document.getElementById("precio").value;
            let calorias = document.getElementById("calorias").value;
            let existencias = document.getElementById("existencias").value;
            let nombre = document.getElementById("nombre").value;
            this._bebidaApi.postBebida(grados, esAlcoholica, precio, calorias, existencias, nombre);
            // this._navigationController.navigateToUrl("bebidas");
        });
    }

    pintarBebida(bebida) {
        // console.log("bebida", bebida);
        let tbodyInner = document.getElementById("tbody");
        for (let i = 0; i < bebida.length; i++) {
            let bebidas = bebida[i];
            let funcionVer = () => {
                console.log("ver");
            };
            let funcionEditar = (bebida) => {
                this.editarBebida(bebida);
            };
            let funcionBorrar = () => {
                this.borrarBebida(bebidas);
            };
            tbodyInner.appendChild(bebidas.getRowForTable(funcionVer, funcionEditar, funcionBorrar));
        }
    }
}

class Faq extends innerPage {
    constructor() {
        super();
        this._route = "faq";
    }
    pintar() {
        this.pintarBody();
    }
    pintarBody() {
        document.getElementById("container").innerHTML = "";

        let faq = document.createElement('h1');
        faq.setAttribute("id", "faq");
        faq.setAttribute("class", "table-responsive");
        let textFAQ = document.createTextNode("FAQ");
        faq.appendChild(textFAQ);
        document.getElementById('container').appendChild(faq);
    }
}

// Guardar credenciales en LocalSotrage
function setCredentialsInLocalStorage(user) {
    let userAsString = JSON.stringify(user);
    localStorage.setItem("user", userAsString);
}
//Recuperar credenciales
function getCredentials() {
    let userAsString = localStorage.getItem("user")
    // let user = User.userAsUser(JSON.parse(userAsString));
    let user = JSON.parse(userAsString);
    return user;
}

// Iniciar APP
window.onload = function() {
    var myApp = new App();
    window.history.pushState("", "", "/");
}