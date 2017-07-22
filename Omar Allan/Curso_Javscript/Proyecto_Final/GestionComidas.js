class Comida {
    constructor(calorias, existencias, nombre, precio, tipo, v, id) {

        this.calorias = calorias;
        this.existencias = existencias;
        this.nombre = nombre;
        this.precio = precio;
        this.tipo = tipo;
        this.__v = v;
        this._id = id;

    }

    _getRowForTable() {
        let fila = '';

        fila += '<tr>';
        //fila += '<td>' + this.calorias + '</td>';
        //fila += '<td>' + this.esAlcoholica + '</td>';
        fila += '<td>' + this.existencias + '</td>';
        //fila += '<td>' + this.grados + '</td>';
        fila += '<td>' + this.nombre + '</td>';
        fila += '<td>' + this.precio + '</td>';
        //fila += '<td>' + this._id + '</td>';
        fila += '<button id="btDetalle' + this._id + '" class="btn btn-primary btn1" data-toggle="modal" data-target="#myModal">Detalle</button>';
        fila += '<button id="btModificar' + this._id + '" class="btn btn-primary btn1" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal1">Modificar</button>';
        fila += '<button id="btBorrar' + this._id + '" class="btn btn-primary btn1">Borrar</button></td>';

        return fila;
    }

}

class PageComidas extends InnerPages {
    constructor(urlname, urlPage) {
        super(urlname, urlPage);
        this._comidas = [];
        this._comidaClient = new ComidaClient();
        //this.pintarEstructura();
        //this.pintarHeader();
        //this.pintarFooter();
        //this.pintarPaginaBebidas();
    }

    getEstructuraTablaComidas() {
        let divfila = "";
        divfila += '<div class="col-sm-12 col-md-12 col-lg-12 bloque minferior">';
        divfila += '<h2>Listado de Comidas</h2>';
        divfila += '<table>';
        divfila += '<thead>';
        divfila += '<tr>';
        //divfila += '<td>Calorias</td>';
        //divfila += '<td>EsAlcoholica</td>';
        divfila += '<td>Existencias</td>';
        //divfila += '<td>Grados</td>';
        divfila += '<td>Nombre</td>';
        divfila += '<td>Precio</td>';
        //divfila += '<td>Id</td>';
        divfila += '<td>Accion</td>';
        divfila += '</tr>';
        divfila += '</thead>';
        divfila += '<tbody id="tbodycomidas">';
        divfila += '</tbody>';
        divfila += '</table>';
        divfila += '</div>';

        return divfila;
    }

    pintarPaginaComidas(miDiv) {
        let main = '<p><strong>Administrador Comidas</strong></p>';
        main += '<div class="datosForm"><label for="calorias">Calorias: </label><input id="calorias" type="text" placeholder="calorias"/></div>';
        main += '<div class="datosForm"><label for="existencias">Existencias: </label><input id="existencias" type="text" placeholder="existencias"/></div>';
        main += '<div class="datosForm"><label for="nombre">Nombre: </label><input id="nombre" type="text" placeholder="nombre"/></div>';
        main += '<div class="datosForm"><label for="precio">Precio: </label><input id="precio" type="text" placeholder="precio"/></div>';
        main += '<div class="datosForm"><label for="tipo">Tipo: </label><input id="tipo" type="text" placeholder="tipo"/></div>';
        //main += '<div class="datosForm"><label for="esAlcoholica">EsAlcoholica: </label><select id="esAlcoholica"><option selected>TRUE</option><option>FALSE</option></select></div>';

        main += '<div class="datosForm"><button id="btCreate" class="btn btn-primary btn1">Crear</button></div>';
        main += this.getEstructuraTablaComidas();

        miDiv.querySelector(".divMain").innerHTML = main;
        // Agregar evento click
        miDiv.querySelector("#btCreate").addEventListener("click", this.getComidaAndInsert.bind(this));
        return miDiv;

    }

    pintarListaComidas(arrayComidas) {
        this._comidas = arrayComidas;
        let tbodycomidas = document.querySelector("#tbodycomidas");
        tbodycomidas.innerHTML = "";
        this._comidas.forEach((comida) => {
            let tr = document.createElement("TR");
            tr.innerHTML = comida._getRowForTable();
            tbodycomidas.appendChild(tr);
            document.querySelector("#btBorrar" + comida._id).addEventListener("click", this.borrarComida.bind(this, comida._id));
            document.querySelector("#btModificar" + comida._id).addEventListener("click", this.modificarComida.bind(this, comida._id));
            document.querySelector("#btDetalle" + comida._id).addEventListener("click", this.detalleComida.bind(this, comida._id));
        });

    }

    pintarComidas() {
        let promise = this._comidaClient.getDeComidas().then(
            (arrayComidas) => {
                console.log("hola", arrayComidas);
                this.pintarListaComidas(arrayComidas);

            });
    }

    pintar() {

        //borrar
        /*this.pintarEstructura();
        this.pintarHeader();
        this.pintarPaginaComidas();
        this.pintarComidas();
*/

        let miDiv = this.pintarEstructura();
        miDiv = this.pintarHeader(miDiv);
        miDiv = this.pintarPaginaComidas(miDiv);
        miDiv = this.pintarFooter(miDiv);
        document.body.innerHTML = "";
        document.body.appendChild(miDiv);
        // traer bebidas
        this.pintarComidas();

    }

    getComidajeDataAndCreate() {
        let comida = null;
        let calorias = document.getElementById("calorias").value;
        //let esAlcoholica = document.getElementById("esAlcoholica").value;
        let existencias = document.getElementById("existencias").value;
        let nombre = document.getElementById("nombre").value;
        let precio = document.getElementById("precio").value;
        let tipo = document.getElementById("tipo").value;
        //let id = document.getElementById("id").value;
        comida = new Comida(calorias, existencias, nombre, precio, tipo);
        console.log(comida);

        return comida;
    }

    //funcion que se trae el producto del formulario y lo añade
    getComidaAndInsert(event) {
        event.preventDefault();
        event.stopPropagation();
        var comida = this.getComidajeDataAndCreate();
        console.log("comida añadida", comida);
        this._comidaClient.postDeComidas(comida, this.pintar.bind(this));

    }

    borrarComida(id) {
        console.log("entro a borrar");
        this._comidaClient.deleteComida(id, this.pintar.bind(this));
    }

    detalleComida(id) {

        console.log("entro al detalle");

        for (let i = 0; i < this._comidas.length; i++) {
            if (id == this._comidas[i]._id) {
                var id = this._comidas[i]._id;
                var calorias = this._comidas[i].calorias;
                var existencias = this._comidas[i].existencias;
                var nombre = this._comidas[i].nombre;
                var precio = this._comidas[i].precio;
                var tipo = this._comidas[i].tipo;
            }
        }
        this.estructuraModalDetalle(id, calorias, existencias, nombre, precio, tipo);

    }

    estructuraModalDetalle(id, calorias, existencias, nombre, precio, tipo) {

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
        let t1 = document.createTextNode("DETALLE COMIDA");
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
        let info2 = document.createTextNode("Nombre: ");
        let valor2 = document.createTextNode(nombre);
        l2.appendChild(info2);
        l2.appendChild(valor2);

        let l3 = document.createElement("LI");
        let info3 = document.createTextNode("Calorias: ");
        let valor3 = document.createTextNode(calorias);
        l3.appendChild(info3);
        l3.appendChild(valor3);

        let l4 = document.createElement("LI");
        let info4 = document.createTextNode("Tipo: ");
        let valor4 = document.createTextNode(tipo);
        l4.appendChild(info4);
        l4.appendChild(valor4);

        let l5 = document.createElement("LI");
        let info5 = document.createTextNode("Existencias: ");
        let valor5 = document.createTextNode(existencias);
        l5.appendChild(info5);
        l5.appendChild(valor5);

        let l6 = document.createElement("LI");
        let info6 = document.createTextNode("Precio: ");
        let valor6 = document.createTextNode(precio);
        l6.appendChild(info6);
        l6.appendChild(valor6);

        ul1.appendChild(l1);
        ul1.appendChild(l2);
        ul1.appendChild(l3);

        ul1.appendChild(l5);
        ul1.appendChild(l6);
        ul1.appendChild(l4);

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

    getComidaModValidacion(id) {
        var comidaMod = null;

        var calorias1 = document.getElementById("calorias1").value;
        var existencias1 = document.getElementById("existencias1").value;
        var nombre1 = document.getElementById("nombre1").value;
        var precio1 = document.getElementById("precio1").value;
        var tipo1 = document.getElementById("tipo1").value;
        //var esAlcoholica1 = document.getElementById("esAlcoholica1").value;

        console.log(calorias1, existencias1, tipo1, nombre1, precio1);

        for (let i = 0; i < this._comidas.length; i++) {
            if (id == this._comidas[i]._id) {
                this._comidas[i].calorias = calorias1;
                this._comidas[i].existencias = existencias1;
                this._comidas[i].nombre = nombre1;
                this._comidas[i].precio = precio1;
                this._comidas[i].tipo = tipo1;
                //this._comidas[i].esAlcoholica = esAlcoholica1;

                comidaMod = this._comidas[i];
            }
        }
        console.log("valor de comida modificada", comidaMod);

        return comidaMod;
    }

    getComidaModificacion(id) {
        //event.preventDefault(); 
        //event.stopPropagation();
        console.log(id);
        var comidaMod = this.getComidaModValidacion(id);
        console.log("comida añadida", comidaMod);

        this._comidaClient.putDeComida(id, comidaMod, this.pintar.bind(this));

    }

    modificarComida(id) {

        console.log("id", id);
        console.log("this.comidas", this._comidas.length);

        for (let i = 0; i < this._comidas.length; i++) {
            if (id == this._comidas[i]._id) {
                var id = this._comidas[i]._id;
                var calorias = this._comidas[i].calorias;
                //var esAlcoholica = this._comidas[i].esAlcoholica;
                var existencias = this._comidas[i].existencias;
                var nombre = this._comidas[i].nombre;
                var precio = this._comidas[i].precio;
                var tipo = this._comidas[i].tipo;
            }
        }

        console.log("entro a Modificar");
        this.estructuraModalModificacion(id, calorias, existencias, nombre, precio, tipo);
    }

    estructuraModalModificacion(id, calorias, existencias, nombre, precio, tipo) {

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
        l1.setAttribute("for", 'calorias1');
        let sp2 = document.createElement("SPAN");
        let t2 = document.createTextNode("Calorias:");
        sp2.setAttribute("class", 'glyphicon');
        sp2.appendChild(t2);
        l1.appendChild(sp2);
        let input1 = document.createElement("input");
        input1.setAttribute("type", 'text');
        input1.setAttribute("class", 'form-control');
        input1.setAttribute("id", 'calorias1');
        input1.setAttribute("value", calorias);
        input1.setAttribute("placeholder", calorias);
        div6.appendChild(l1);
        div6.appendChild(input1);

        let div7 = document.createElement("DIV");
        div7.setAttribute("class", 'form-group');
        let l2 = document.createElement("label");
        l2.setAttribute("for", 'existencias1');
        let sp3 = document.createElement("SPAN");
        let t3 = document.createTextNode("Existencias:");
        sp3.setAttribute("class", 'glyphicon');
        sp3.appendChild(t3);
        l2.appendChild(sp3);
        let input2 = document.createElement("input");
        input2.setAttribute("type", 'text');
        input2.setAttribute("class", 'form-control');
        input2.setAttribute("id", 'existencias1');
        input2.setAttribute("value", existencias);
        input2.setAttribute("placeholder", existencias);
        div7.appendChild(l2);
        div7.appendChild(input2);

        let div8 = document.createElement("DIV");
        div8.setAttribute("class", 'form-group');
        let l3 = document.createElement("label");
        l3.setAttribute("for", 'tipo1');
        let sp4 = document.createElement("SPAN");
        let t4 = document.createTextNode("Tipo:");
        sp4.setAttribute("class", 'glyphicon');
        sp4.appendChild(t4);
        l3.appendChild(sp4);
        let input3 = document.createElement("input");
        input3.setAttribute("type", 'text');
        input3.setAttribute("class", 'form-control');
        input3.setAttribute("id", 'tipo1');
        input3.setAttribute("value", tipo);
        input3.setAttribute("placeholder", tipo);
        div8.appendChild(l3);
        div8.appendChild(input3);

        ///NOMBRE
        let div9 = document.createElement("DIV");
        div9.setAttribute("class", 'form-group');
        let l4 = document.createElement("label");
        l4.setAttribute("for", 'nombre1');
        let sp5 = document.createElement("SPAN");
        let t5 = document.createTextNode("Nombre:");
        sp5.setAttribute("class", 'glyphicon');
        sp5.appendChild(t5);
        l4.appendChild(sp5);
        let input4 = document.createElement("input");
        input4.setAttribute("type", 'text');
        input4.setAttribute("class", 'form-control');
        input4.setAttribute("id", 'nombre1');
        input4.setAttribute("value", nombre);
        input4.setAttribute("placeholder", nombre);
        div9.appendChild(l4);
        div9.appendChild(input4);

        ///PRECIO
        let div10 = document.createElement("DIV");
        div10.setAttribute("class", 'form-group');
        let l5 = document.createElement("label");
        l5.setAttribute("for", 'precio1');
        let sp6 = document.createElement("SPAN");
        let t6 = document.createTextNode("Precio:");
        sp6.setAttribute("class", 'glyphicon');
        sp6.appendChild(t6);
        l5.appendChild(sp6);
        let input5 = document.createElement("input");
        input5.setAttribute("type", 'text');
        input5.setAttribute("class", 'form-control');
        input5.setAttribute("id", 'precio1');
        input5.setAttribute("value", precio);
        input5.setAttribute("placeholder", precio);
        div10.appendChild(l5);
        div10.appendChild(input5);

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
        form1.appendChild(div10);

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
        botonAceptar.setAttribute("class", 'btn btn-success btn-sm');
        botonAceptar.setAttribute("id", 'btnAceptar');
        botonAceptar.setAttribute("data-dismiss", 'modal');
        botonAceptar.addEventListener('click', () => this.getComidaModificacion(id));
        botonAceptar.appendChild(textoBotonace);

        div20.appendChild(boton20);
        div20.appendChild(botonAceptar);
        div2.appendChild(div20);

    }

}

class ComidaClient {
    constructor() {
        this._urlBase = "http://formacion-indra-franlindebl.com/api/comidas/";
        this._apiClient = new APIClient();
    }

    getDeComidas() {
        let urlCompleta = this._urlBase;
        let promise = this._apiClient.get(urlCompleta).then((data) => {
            let arrayComidas = [];
            console.log("como", data);

            for (let i = 0; i < data.length; i++) {
                let elem = data[i];
                let comida = new Comida(elem.calorias, elem.existencias, elem.nombre, elem.precio, elem.tipo, elem.__v, elem._id);
                arrayComidas.push(comida);
            }
            return arrayComidas;

        });
        return promise;
    }

    deleteComida(id, callback) {
        console.log("entro a borrar2");
        let urlCompleta = this._urlBase + id;
        this._apiClient.delete(urlCompleta, callback);
    }

    postDeComidas(comida, callback) {

        let urlCompleta = this._urlBase;
        this._apiClient.post(urlCompleta, comida, callback);
    }

    putDeComida(id, comida, callback) {
        console.log("entro a ACTUALIZAR");

        let urlCompleta = this._urlBase + id;
        this._apiClient.put(urlCompleta, comida, callback);
    }

}

/*
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
                return response.json();
            }
        );
        return promise;
    }


    delete(url, callback) {
        let peticion = new XMLHttpRequest();
        peticion.open("DELETE", url);
        peticion.onreadystatechange = function(response) {
            if (peticion.readyState === 4) {
                callback();
            }
        }
        peticion.send();

        return true;
    }



    post(url, datos, callback) {

        let peticion = new XMLHttpRequest();
        peticion.open("POST", url);
        peticion.setRequestHeader("Content-Type", "application/json");
        peticion.onreadystatechange = function(response) {

            if (peticion.readyState == 4) {
                console.log(peticion.responseText);
                callback();
            }
        }
        var params = JSON.stringify(datos);
        peticion.send(params);

    }

    put(url, datos, callback) {

        let peticion = new XMLHttpRequest();
        peticion.open("PUT", url);
        peticion.setRequestHeader("Content-Type", "application/json");
        peticion.onreadystatechange = function(response) {

            if (peticion.readyState == 4) {
                console.log(peticion.responseText);
                callback();
            }
        }
        var params = JSON.stringify(datos);
        peticion.send(params);

    }

}

*/

/*
var com = new PageComidas();
com.pintar();
*/

/*
let innerPages = null;
window.onload = () => {
var innerPages = new InnerPages();
innerPages.pintarEstructura();
};

*/
