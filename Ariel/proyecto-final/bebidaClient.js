class Bebida {
    constructor(calorias, existencias, nombre, precio, esAlcoholica, grados, id) {
        this._calorias = calorias;
        this._existencias = existencias;
        this._nombre = nombre;
        this._precio = precio;
        this._esAlcoholica = esAlcoholica;
        this._grados = grados;
        this._id = id;
    }
    esAlcoholica() {
        if (this._esAlcoholica == true) {
            return "Si"
        } else {
            return "No"
        }
    }
    getRowForTable () {
        let fila = "";
        fila = '<tr>';
        fila += '<td>' + this._nombre + '</td>';
        fila += '<td>' + this._precio + '</td>';
        fila += '<td>' + this.esAlcoholica(); + '</td>';
        fila += '<td>' + this._grados + '</td>';
        fila += '<td>' + this._calorias + '</td>';
        fila += '<td>' + this._existencias + '</td>';
        fila += '<td><button class="btn btn-info" id="edi' + this._id + '">Editar</button></td>';
        fila += '<td><button class="btn btn-danger" id="eli' + this._id + '">Borrar</button></td>';
        fila += '</tr>';
        return fila;
    }
}

class BebidaClient {
    constructor() {
        this._urlBase = "http://tuabogadodeaccidentes.es/api/bebidas";
        this._apiClient = new APIClient();
    }

    getBebida() {

        let urlCompleta = this._urlBase;

        let promise = this._apiClient.get(urlCompleta).then(
            (data) => {
                let arrayBebidas = [];
                for (let i = 0; i < data.length; i++) {
                    let elem = data[i];
                    let bebida = new Bebida(elem.calorias, elem.existencias, elem.nombre, elem.precio, elem.esAlcoholica, elem.grados, elem._id);
                    arrayBebidas.push(bebida);
                }
                return arrayBebidas;
            }
        );
        return promise;
    }

    postBebida(data) {
        let urlCompleta = this._urlBase;

        let promise = this._apiClient.post(urlCompleta, data);
        return promise;
    }
    deleteBebida(id) {
        let urlCompleta = this._urlBase + '/' + id;

        let promise = this._apiClient.delete(urlCompleta);
        return promise;
    }
    putBebida(id, data) {
        let urlCompleta = this._urlBase + '/' + id;

        let promise = this._apiClient.put(urlCompleta, data);
        return promise;
    }
}

class BodyBebida {
    constructor() {
        this._bebidas = [];
        this._bebidaClient = new BebidaClient();
    }
    addBebidas(){
        let promise = this._bebidaClient.getBebida().then(
            (data) => {
                    this._bebidas = data;
                    this.initBebida();
                }
        );
    }
    initBebida() {
        this.pintarBebidas();
        this.buttonCrear();
        this.limpiarForm();
        this.buttonEliminar();
        this.buttonRowEditar();
        this.buttonCancelar();
    }
    getDatosDelForm () {
        let nombre = document.getElementById('nombre').value;
        let calorias = document.getElementById('calorias').value;
        let existencias = document.getElementById('existencias').value;
        let precio = document.getElementById('precio').value;
        let esAlcoholica = document.getElementById('alcoholica').checked;
        let grados = document.getElementById('grados').value;

        let bebida = {
            calorias: calorias,
            existencias: existencias,
            nombre: nombre,
            precio: precio,
            esAlcoholica: esAlcoholica,
            grados: grados
        }
        return bebida;
    }
    postBebidaDelForm () {
        let bebida = this.getDatosDelForm();
        let promise = this._bebidaClient.postBebida(bebida).then(
            (data) => {
                    this.addBebidas();
                }
        );
    }
    deleteBebidaDelForm(id) {
        let promise = this._bebidaClient.deleteBebida(id).then(
            (data) => {
                    this.addBebidas();
                }
        );
    }
    putBebidaDelForm(id) {
        let bebida = this.getDatosDelForm();
        let promise = this._bebidaClient.putBebida(id, bebida).then(
            (data) => {
                    this.addBebidas();
                }
        );
    }
    pintarEstructura() {
        let bodyBebida = '<div class="panel-group"> <div class="panel panel-danger"> <div class="panel-heading"> <h3>Bebidas:</h3> </div> <div class="panel-body"> <div class="row"> <div class="col-xs-4"> <div class="form-group"> <label>Nombre:</label> <input type="text" class="form-control" id="nombre"> </div> <div class="form-group"> <label>Precio:</label> <input type="text" class="form-control" id="precio"> </div> <div class="form-group"> <label>Es Alcoholica:</label></div> <div class="checkbox"> <label> <input type="checkbox" value="" id="alcoholica"> Si </label> </div>  <button class="btn btn-primary" id="crearBebida">Crear</button> <button class="btn btn-success btn-deactive" id="editarBebida">Editar</button> <button class="btn btn-deactive" id="cancelar">Cancelar</button> </div> <div class="col-xs-4"> <div class="form-group"> <label>Grados:</label> <input type="text" class="form-control" id="grados"> </div> <div class="form-group"> <label>Calorias:</label> <input type="text" class="form-control" id="calorias"> </div> <div class="form-group"> <label>Existencias:</label> <input type="text" class="form-control" id="existencias"> </div> </div> </div> </div> </div> <div class="panel panel-default"> <div class="panel-heading"> <h4>Listado de bebidas:</h4> </div> <div class="panel-body"> <div class="row"> <table class="table table-striped"> <thead> <tr> <th>Nombre</th> <th>Precio</th> <th>Es alcoholica</th> <th>Gados</th> <th>Calorias</th> <th>Existencias</th> <th> </th> <th> </th> </tr> </thead> <tbody id="bodybebida"> </tbody> </table> </div> </div> </div> </div>';
        this.addBebidas();
        return bodyBebida;
    }

    pintarBebidas () {
        document.getElementById('bodybebida').innerHTML = "";
        let tbodyinner = "";
        for (let i=0;i<this._bebidas.length;i++) {
            let bebida = this._bebidas[i];
            tbodyinner = tbodyinner + bebida.getRowForTable();
        }
        document.getElementById('bodybebida').innerHTML = tbodyinner;
    }
    buttonEliminar() {
        for (var i = 0; i < this._bebidas.length; i++) {
            let bebida = this._bebidas[i];
            let button = document.getElementById('eli'+bebida._id);
            let click = () => {
                this.deleteBebidaDelForm(bebida._id);
            }
            button.addEventListener("click", click);
        }
    }
    buttonRowEditar() {
        for (var i = 0; i < this._bebidas.length; i++) {
            let bebida = this._bebidas[i];
            let button = document.getElementById('edi' + bebida._id);
            let click = () => {
                this.limpiarForm();
                document.getElementById('nombre').value = bebida._nombre;
                document.getElementById('calorias').value = bebida._calorias;
                document.getElementById('existencias').value = bebida._existencias;
                document.getElementById('precio').value = bebida._precio;           
                document.getElementById('alcoholica').checked = bebida._esAlcoholica;
                document.getElementById('grados').value = bebida._grados;
                let buttonCrear = document.getElementById('crearBebida');
                buttonCrear.classList.add('btn-deactive');
                let buttonEditar = document.getElementById('editarBebida');
                buttonEditar.classList.remove('btn-deactive');
                let buttonCancelar = document.getElementById('cancelar');
                buttonCancelar.classList.remove('btn-deactive');
                this.buttonEditar(bebida._id);
            }
            button.addEventListener("click", click);
        }
    }

    buttonEditar(id) {
        let button = document.getElementById('editarBebida');
        let padre = button.parentElement;
        padre.removeChild(button);
        let nuevoBoton = document.createElement("button");
        nuevoBoton.className = "btn btn-success";
        nuevoBoton.id = "editarBebida";
        nuevoBoton.innerHTML = "Editar";
        let click = () => {
            this.putBebidaDelForm(id);
            this.limpiarForm();
            let buttonCrear = document.getElementById('crearBebida');
            buttonCrear.classList.remove('btn-deactive');
            let buttonEditar = document.getElementById('editarBebida');
            buttonEditar.classList.add('btn-deactive');
            let buttonCancelar = document.getElementById('cancelar');
            buttonCancelar.classList.add('btn-deactive');
        }
        nuevoBoton.addEventListener("click", click);

        // Lo inserto en el padre de antes
        padre.appendChild(nuevoBoton);
    }
    buttonCancelar() {

        let button = document.getElementById('cancelar');

        let click = () => {
            this.limpiarForm();
            let buttonCrear = document.getElementById('crearBebida');
            buttonCrear.classList.remove('btn-deactive');
            let buttonEditar = document.getElementById('editarBebida');
            buttonEditar.classList.add('btn-deactive');
            let buttonCancelar = document.getElementById('cancelar');
            buttonCancelar.classList.add('btn-deactive');
            
        }
        button.addEventListener("click", click);
    }
    buttonCrear() {
        let button = document.getElementById('crearBebida');

        let click = () => {
            this.getBebidaDelForm();
        }
        button.addEventListener("click", click);
    }
    initGrafBebida() {
        let grafBebida = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Bebidas'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Bebidas',
                colorByPoint: true,
                data: []
            }]
        }
        let newArrayComida = [];
        
        for (var i = 0; i < this._bebidas.length; i++) {
            let comida = this._bebidas[i];
            let aux = {
            name: "",
            y: 0
        };
            aux.name = comida._nombre;
            aux.y = comida._existencias;
            newArrayComida.push(aux);
        }

        grafBebida.series[0].data = newArrayComida;

        Highcharts.chart('grafBebida', grafBebida);

    }
    grafBebida(){
        let promise = this._bebidaClient.getBebida().then(
            (data) => {
                    this._bebidas = data;
                    this.initGrafBebida();
                }
        );
    } 
    limpiarForm() {
        document.getElementById('nombre').value = "";
        document.getElementById('calorias').value = "";
        document.getElementById('existencias').value = "";
        document.getElementById('precio').value = "";           
        document.getElementById('alcoholica').checked = false;
        document.getElementById('grados').value = "";
    }
}
