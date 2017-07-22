class Comida {
    constructor(calorias, existencias, nombre, precio, tipo, id) {
        this._calorias = calorias;
        this._existencias = existencias;
        this._nombre = nombre;
        this._precio = precio;
        this._tipo = tipo;
        this._id = id;
    }

    getRowForTable () {
        let fila = "";
        fila = '<tr>';
        fila += '<td>' + this._nombre + '</td>';
        fila += '<td>' + this._precio + '</td>';
        fila += '<td>' + this._tipo + '</td>';
        fila += '<td>' + this._calorias + '</td>';
        fila += '<td>' + this._existencias + '</td>';
        fila += '<td><button class="btn btn-info" id="edi' + this._id + '">Editar</button></td>';
        fila += '<td><button class="btn btn-danger" id="eli' + this._id + '">Borrar</button></td>';
        fila += '</tr>';
        return fila;
    }
}

class ComidaClient {
    constructor() {
        this._urlBase = "http://tuabogadodeaccidentes.es/api/comidas";
        this._apiClient = new APIClient();
    }

    getComida() {
        let urlCompleta = this._urlBase;

        let promise = this._apiClient.get(urlCompleta).then(
            (data) => {
                let arrayComidas = [];
                for (let i = 0; i < data.length; i++) {
                    let elem = data[i];
                    let comida = new Comida(elem.calorias, elem.existencias, elem.nombre, elem.precio, elem.tipo, elem._id);
                    arrayComidas.push(comida);
                }
                return arrayComidas;
            }
        );
        return promise;
    }

    postComida(data) {
        let urlCompleta = this._urlBase;

        let promise = this._apiClient.post(urlCompleta, data);
        return promise;
    }

    deleteComida(id) {
        let urlCompleta = this._urlBase + '/' + id;

        let promise = this._apiClient.delete(urlCompleta);
        return promise;
    }
    putComida(id, data) {
        let urlCompleta = this._urlBase + '/' + id;

        let promise = this._apiClient.put(urlCompleta, data);
        return promise;
    }
}

class BodyComida {
    constructor() {
        this._comidas = [];
        this._comidaClient = new ComidaClient();
    }
    addComidas(){
        let promise = this._comidaClient.getComida().then(
            (data) => {
                    this._comidas = data;
                    this.initComida();
                }
        );
    }
    initComida() {
        this.pintarComidas();
        this.buttonCrear();
        this.limpiarForm();
        this.buttonEliminar();
        this.buttonRowEditar();
        this.buttonCancelar();
    }
    getDatosDelForm() {
        let nombre = document.getElementById('nombre').value;
        let calorias = document.getElementById('calorias').value;
        let existencias = document.getElementById('existencias').value;
        let precio = document.getElementById('precio').value;
        let tipo = document.getElementById('tipo').value;

        let comida = {
            calorias: calorias,
            existencias: existencias,
            nombre: nombre,
            precio: precio,
            tipo: tipo
        }
        return comida;
    }
    postComidaDelForm () {
        let comida = this.getDatosDelForm();
        let promise = this._comidaClient.postComida(comida).then(
            (data) => {
                    this.addComidas();
                }
        );
    }
    deleteComidaDelForm(id) {
        let promise = this._comidaClient.deleteComida(id).then(
            (data) => {
                    this.addComidas();
                }
        );
    }
    putComidaDelForm(id) {
        let comida = this.getDatosDelForm();
        let promise = this._comidaClient.putComida(id, comida).then(
            (data) => {
                    this.addComidas();
                }
        );
    }
    pintarEstructura() {
        let bodyComida = '<div class="panel-group"> <div class="panel panel-warning"> <div class="panel-heading"> <h3>Comidas:</h3> </div> <div class="panel-body"> <div class="row"> <div class="col-xs-4"> <div class="form-group"> <label>Nombre:</label> <input type="text" class="form-control" id="nombre"> </div> <div class="form-group"> <label>Precio:</label> <input type="text" class="form-control" id="precio"> </div> <div class="form-group"> <label>Tipo:</label> <input type="text" class="form-control" id="tipo"> </div> </div> <div class="col-xs-4"> <div class="form-group"> <label>Calorias:</label> <input type="text" class="form-control" id="calorias"> </div> <div class="form-group"> <label>Existencias:</label> <input type="text" class="form-control" id="existencias"> </div> <button class="btn btn-primary" id="crearComida">Crear</button> <button class="btn btn-success btn-deactive" id="editarComida">Editar</button> <button class="btn btn-deactive" id="cancelar">Cancelar</button> </div> </div> </div> </div> <div class="panel panel-default"> <div class="panel-heading"> <h4>Listado de comidas:</h4> </div> <div class="panel-body"> <div class="row"> <table class="table table-striped"> <thead> <tr> <th>Nombre</th> <th>Precio</th> <th>Tipo</th> <th>Calorias</th> <th>Existencias</th> <th> </th> <th> </th> </tr> </thead> <tbody id="bodycomidas"> </tbody> </table> </div> </div> </div> </div>';
        
        this.addComidas();
        return bodyComida;
    }

    pintarComidas () {
        document.getElementById('bodycomidas').innerHTML = "";
        let tbodyinner = "";
        for (let i=0;i<this._comidas.length;i++) {
            let comida = this._comidas[i];
            tbodyinner = tbodyinner + comida.getRowForTable();
        }
        document.getElementById('bodycomidas').innerHTML = tbodyinner;
    }

    buttonCrear() {
        let button = document.getElementById('crearComida');

        let click = () => {
            this.postComidaDelForm();
        }
        button.addEventListener("click", click);
    }
    buttonEliminar() {
        for (var i = 0; i < this._comidas.length; i++) {
            let comida = this._comidas[i];
            let button = document.getElementById('eli'+comida._id);
            let click = () => {
                this.deleteComidaDelForm(comida._id);
            }
            button.addEventListener("click", click);
        }
    }
    buttonRowEditar() {
        for (var i = 0; i < this._comidas.length; i++) {
            let comida = this._comidas[i];
            let button = document.getElementById('edi' + comida._id);
            let click = () => {
                this.limpiarForm();
                document.getElementById('nombre').value = comida._nombre;
                document.getElementById('calorias').value = comida._calorias;
                document.getElementById('existencias').value = comida._existencias;
                document.getElementById('precio').value = comida._precio;           
                document.getElementById('tipo').value = comida._tipo;
                let buttonCrear = document.getElementById('crearComida');
                buttonCrear.classList.add('btn-deactive');
                let buttonEditar = document.getElementById('editarComida');
                buttonEditar.classList.remove('btn-deactive');
                let buttonCancelar = document.getElementById('cancelar');
                buttonCancelar.classList.remove('btn-deactive');
                this.buttonEditar(comida._id);
            }
            button.addEventListener("click", click);
        }
    }
    buttonEditar(id) {
        let button = document.getElementById('editarComida');
        let padre = button.parentElement;
        padre.removeChild(button);
        let nuevoBoton = document.createElement("button");
        nuevoBoton.className = "btn btn-success";
        nuevoBoton.id = "editarComida";
        nuevoBoton.innerHTML = "Editar";
        let click = () => {
            this.putComidaDelForm(id);
            this.limpiarForm();
            let buttonCrear = document.getElementById('crearComida');
            buttonCrear.classList.remove('btn-deactive');
            let buttonEditar = document.getElementById('editarComida');
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
            let buttonCrear = document.getElementById('crearComida');
            buttonCrear.classList.remove('btn-deactive');
            let buttonEditar = document.getElementById('editarComida');
            buttonEditar.classList.add('btn-deactive');
            let buttonCancelar = document.getElementById('cancelar');
            buttonCancelar.classList.add('btn-deactive');
            
        }
        button.addEventListener("click", click);
    }
    initGrafComida() {
        let grafComida = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Comida'
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
                name: 'Comidas',
                colorByPoint: true,
                data: []
            }]
        }
        let newArrayComida = [];
        
        for (var i = 0; i < this._comidas.length; i++) {
            let comida = this._comidas[i];
            let aux = {
                name: "",
                y: 0
            };
            aux.name = comida._nombre;
            aux.y = comida._existencias;
            newArrayComida.push(aux);
        }

        grafComida.series[0].data = newArrayComida;

        Highcharts.chart('grafComida', grafComida);

    }
    grafComida(){
        let promise = this._comidaClient.getComida().then(
            (data) => {
                    this._comidas = data;
                    this.initGrafComida();
                }
        );
    } 
    limpiarForm() {
        document.getElementById('nombre').value = "";
        document.getElementById('calorias').value = "";
        document.getElementById('existencias').value = "";
        document.getElementById('precio').value = "";           
        document.getElementById('tipo').value = "";
    }
}
