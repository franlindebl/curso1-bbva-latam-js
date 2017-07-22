class ComidaPage extends InnerPage {
    constructor() {
        super('Comida', '/comida.html', 'Gestión de Comidas');

        this._comidas = [];

        this._apiComida = new ComidaApi();
    }

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
        this.pintarEstructura(navBar, this._name);

        // Pintamos pagina completa
        let divContent = document.querySelector('.divContent');
        this.pintarSection(divContent);

        let divMensajes = document.createElement("DIV");
        divMensajes.id = "divMensajes";

        let divTable = document.querySelector('.divTable');
        let nameCols = ["Tipo", "Precio", "Calorias", "Existencias", "Nombre", "Acciones"];

        divTable.appendChild(divMensajes);
        UtilTable._pintarTable(divTable, 'divLista', nameCols, "tbodyLista");

        document.querySelector("#btnActualizar").addEventListener("click", this.pintaLista.bind(this));
        document.querySelector("#btnNuevo").addEventListener("click", this._setModalNuevo.bind(this, this.agregarComida.bind(this)));

        this._pintaModal();
        this._pintaModalVer();

        this.pintaLista();
    }

    pintaLista() {
        this._apiComida.getComidas().then(
            (data) => {
                this._comidas = data;
                let tbodyLista = document.querySelector("#tbodyLista");
                tbodyLista.innerHTML = "";

                this._comidas.forEach((comida) => {
                    comida._pintarRowComida(tbodyLista);
                });

                let btnVer = document.querySelectorAll('#btnVer');
                let btnEditar = document.querySelectorAll('#btnEditar');
                let btnBorrar = document.querySelectorAll('#btnBorrar');
                for (let b = 0; b < btnEditar.length; b++) {
                    btnVer[b].addEventListener("click", this._setModalVer.bind(this, this._comidas[b]._id));
                    btnEditar[b].addEventListener("click", this._setModalModificacion.bind(this, this._comidas[b], this.modificarComida.bind(this)));
                    btnBorrar[b].addEventListener("click", this.borrarComida.bind(this, this._comidas[b]._id));
                }

                Utils._quitarModalLoading();
            }
        );
    }

    agregarComida() {
        let jsonComida = {};

        jsonComida.tipo = document.querySelector("#tipo").value;
        jsonComida.precio = document.querySelector("#precio").value;
        jsonComida.calorias = document.querySelector("#calorias").value;
        jsonComida.existencias = document.querySelector("#existencias").value;
        jsonComida.nombre = document.querySelector("#nombre").value;

        this._apiComida.postComida(jsonComida).then(
            (dato) => {
                this.pintaLista();

                if (dato.hasOwnProperty('message')) {
                    let divMesg = document.querySelector('#divmensajes');
                    let mensaje = dato.message;
                    Utils._msg('Warning', mensaje, divMesg);
                } else {
                    let divMesg = document.querySelector('#divmensajes');
                    let mensaje = 'Alta exitosa.';
                    Utils._msg('Success', mensaje, divMesg);
                }

                Utils._quitarModalLoading();
            }
        );
    }

    modificarComida() {
        let jsonComida = {};

        jsonComida.tipo = document.querySelector("#tipo").value;
        jsonComida.precio = document.querySelector("#precio").value;
        jsonComida.calorias = document.querySelector("#calorias").value;
        jsonComida.existencias = document.querySelector("#existencias").value;
        jsonComida.nombre = document.querySelector("#nombre").value;

        let idComida = document.querySelector("#idComida").value;

        this._apiComida.putComida(idComida, jsonComida).then(
            (dato) => {
                this.pintaLista();

                if (dato.hasOwnProperty('message')) {
                    let divMesg = document.querySelector('#divmensajes');
                    let mensaje = dato.message;
                    Utils._msg('Warning', mensaje, divMesg);
                } else {
                    let divMesg = document.querySelector('#divmensajes');
                    let mensaje = 'Alta exitosa.';
                    Utils._msg('Success', mensaje, divMesg);
                }

                Utils._quitarModalLoading();
            }
        );
    }

    borrarComida(id) {
        this._apiComida.deleteComida(id).then(
            (dato) => {
                this.pintaLista();

                if (dato.hasOwnProperty('message')) {
                    let divMesg = document.querySelector('#divmensajes');
                    let mensaje = dato.message;
                    Utils._msg('Warning', mensaje, divMesg);
                } else {
                    let divMesg = document.querySelector('#divmensajes');
                    let mensaje = 'Alta exitosa.';
                    Utils._msg('Success', mensaje, divMesg);
                }

                Utils._quitarModalLoading();
            }
        );
    }

    _pintaModal() {
        let divModal = '';
        divModal += '<div id="modalModifica" class="modal fade" role="dialog">';
        divModal += '<div class="modal-dialog">';
        divModal += '<div class="modal-content">';
        divModal += '<div class="modal-header">';
        divModal += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
        divModal += '<h4 class="modal-title">Indique los datos a modificar.</h4>';
        divModal += '</div>';
        divModal += '<div class="modal-body">';
        divModal += '<form>';
        divModal += '<input type="hidden" class="form-control" id="idComida">';

        divModal += '<div class="form-group">';
        divModal += '<label for="tipo">Tipo:</label>';
        divModal += '<select class="form-control" id="tipo">';
        divModal += '<option>Entrante</option><option>Principal</option><option>Postre</option>';
        divModal += '</select>';
        divModal += '</div>';

        divModal += '<div class="form-group">';
        divModal += '<label for="precio">Precio:</label>';
        divModal += '<input type="number" class="form-control" id="precio" step=0.01>';
        divModal += '</div>';

        divModal += '<div class="form-group">';
        divModal += '<label for="calorias">Calorias:</label>';
        divModal += '<input type="number" class="form-control" id="calorias" step=1>';
        divModal += '</div>';

        divModal += '<div class="form-group">';
        divModal += '<label for="existencias">Existencias:</label>';
        divModal += '<input type="number" class="form-control" id="existencias" step=0.01>';
        divModal += '</div>';

        divModal += '<div class="form-group">';
        divModal += '<label for="nombre">Nombre:</label>';
        divModal += '<input type="text" class="form-control" id="nombre">';
        divModal += '</div>';

        divModal += '</form>';
        divModal += '</div>';
        divModal += '<div id="divBtnModal" class="modal-footer">';
        divModal += '</div>';
        divModal += '</div>';
        divModal += '</div>';
        divModal += '</div>';

        let div = document.createElement("DIV");
        div.innerHTML = divModal;

        document.querySelector('body').appendChild(div);
    }

    _pintaModalVer() {
        let divModal = '';
        divModal += '<div id="modalVer" class="modal fade" role="dialog">';
        divModal += '<div class="modal-dialog">';
        divModal += '<div class="modal-content">';
        divModal += '<div class="modal-header">';
        divModal += '<button type="button" class="close" data-dismiss="modal">&times;</button>';
        divModal += '<h4 class="modal-title">Información del Producto.</h4>';
        divModal += '</div>';
        divModal += '<div class="modal-body">';
        divModal += '<form>';

        divModal += '<div class="media">';
        divModal += '<div class="media-left">';
        divModal += '<img src="./app/img/paste.jpg" class="media-object" style="width:200px">';
        divModal += '</div>';
        divModal += '<div class="media-body">';
        divModal += '<h4 class="media-heading" id="nombreVer"></h4>';
        divModal += '<p id="tipoVer"></p>';
        divModal += '<p id="caloriasVer"></p>';
        divModal += '<p id="precioVer"></p>';
        divModal += '<p></p>';
        divModal += '<p id="existenciasVer"></p>';
        divModal += '</div>';
        divModal += '</div>';

        divModal += '</form>';
        divModal += '</div>';
        divModal += '<div id="divBtnModal" class="modal-footer">';
        divModal += '</div>';
        divModal += '</div>';
        divModal += '</div>';
        divModal += '</div>';

        let div = document.createElement("DIV");
        div.innerHTML = divModal;

        document.querySelector('body').appendChild(div);
    }

    _setModalVer(id) {
        this._apiComida.getComidaID(id).then(
            (data) => {
                if (data.hasOwnProperty('message')) {
                    let divMesg = document.querySelector('#divmensajes');
                    let mensaje = data.message;
                    Utils._msg('Warning', mensaje, divMesg);
                } else {
                    document.querySelector("#tipoVer").innerHTML = '<strong>Tipo: </strong>' + data._tipo;
                    document.querySelector("#precioVer").innerHTML = '<strong>Precio: </strong>' + data._precio;
                    document.querySelector("#caloriasVer").innerHTML = '<strong>Calorias: </strong>' + data._calorias;
                    document.querySelector("#existenciasVer").innerHTML = '<strong>Existencias: </strong>' + data._existencias;
                    document.querySelector("#nombreVer").innerHTML = '<strong>Nombre: </strong>' + data._nombre;
                }

                Utils._quitarModalLoading();
            }
        );

    }

    _setModalModificacion(arrInfo, funcion) {
        let divBtnModal = document.querySelector("#divBtnModal");
        let htmlBtnGuardar = '<button type="button" class="btn btn-primary" data-dismiss="modal" id="btnGuardar"><span class="glyphicon glyphicon-floppy-saved"></span> Guardar</button>';
        divBtnModal.innerHTML = htmlBtnGuardar;

        document.querySelector("#idComida").value = arrInfo._id;
        document.querySelector("#tipo").value = arrInfo._tipo;
        document.querySelector("#precio").value = arrInfo._precio;
        document.querySelector("#calorias").value = arrInfo._calorias;
        document.querySelector("#existencias").value = arrInfo._existencias;
        document.querySelector("#nombre").value = arrInfo._nombre;

        let btnGuardar = document.querySelector("#btnGuardar");
        btnGuardar.addEventListener("click", funcion);
    }

    _setModalNuevo(funcion) {
        let divBtnModal = document.querySelector("#divBtnModal");
        let htmlBtnGuardar = '<button type="button" class="btn btn-primary" data-dismiss="modal" id="btnGuardar"><span class="glyphicon glyphicon-floppy-saved"></span> Guardar</button>';
        divBtnModal.innerHTML = htmlBtnGuardar;

        document.querySelector("#idComida").value = null;
        document.querySelector("#tipo").value = null;
        document.querySelector("#precio").value = null;
        document.querySelector("#calorias").value = null;
        document.querySelector("#existencias").value = null;
        document.querySelector("#nombre").value = null;

        let btnGuardar = document.querySelector("#btnGuardar");
        btnGuardar.addEventListener("click", funcion);
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
    }

    _getRowForTable() {
        let fila = '';
        fila += `<td>${this._tipo}</td>`;
        fila += `<td>${this._precio}</td>`;
        fila += `<td>${this._calorias}</td>`;
        fila += `<td>${this._existencias}</td>`;
        fila += `<td>${this._nombre}</td>`;
        fila += `<td><button type="button" class="btn btn-success" id="btnVer" data-toggle="modal" data-target="#modalVer"><span class="glyphicon glyphicon-eye-open"></span></button>`;
        fila += `<button type="button" class="btn btn-info" id="btnEditar" data-toggle="modal" data-target="#modalModifica"><span class="glyphicon glyphicon-edit"></span></button>`;
        fila += `<button type="button" class="btn btn-danger" id="btnBorrar"><span class="glyphicon glyphicon-remove"></span></button></td>`;

        return fila;
    }

    _pintarRowComida(tbodyLista) {
        UtilTable._pintarTR(tbodyLista, this._getRowForTable());
    }
}

class ComidaApi {
    constructor() {
        this._urlBase = "http://tuabogadodeaccidentes.es/api/comidas";
    }

    getComidaID(id) {
        let promise = APIClient._get(this._urlBase + `/${id}`).then(
            (data) => {
                if (data.hasOwnProperty('message')) {
                    return data;
                } else {
                    let infoDato = {};

                    infoDato = new Comida(data._id, data.tipo, data.precio, data.calorias, data.existencias, data.nombre);

                    return infoDato;
                }
            }
        );

        return promise;
    }

    getComidas() {
        let promise = APIClient._get(this._urlBase).then(
            (data) => {
                let arrayData = [];

                data.forEach((dato) => {
                    arrayData.push(new Comida(dato._id, dato.tipo, dato.precio, dato.calorias, dato.existencias, dato.nombre));
                });

                return arrayData;
            }
        );

        return promise;
    }

    getComidasSinModal() {
        let promise = APIClient._getSinModal(this._urlBase).then(
            (data) => {
                let arrayData = [];

                data.forEach((dato) => {
                    arrayData.push(new Comida(dato._id, dato.tipo, dato.precio, dato.calorias, dato.existencias, dato.nombre));
                });

                return arrayData;
            }
        );

        return promise;
    }

    postComida(datos) {
        let promise = APIClient._post(this._urlBase, datos).then(
            (data) => {
                return data;
            }
        );

        return promise;
    }

    putComida(id, datos) {
        let promise = APIClient._put(this._urlBase + `/${id}`, datos).then(
            (data) => {
                return data;
            }
        );

        return promise;
    }

    deleteComida(id) {
        let promise = APIClient._delete(this._urlBase + `/${id}`).then(
            (data) => {
                return data;
            }
        );

        return promise;
    }
}