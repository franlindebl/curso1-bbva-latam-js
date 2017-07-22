class GestionBebida extends InnerPagina {
    constructor(nombre, ruta, navega, contexto, modalController) {
        super(nombre, ruta, navega, contexto);
        this._bebidaApi = new BebidasApi();
        this._modalController = modalController;

    }

    pinta() {
        this.pintaEstructuraBasePagina();
        this.pintarEstructuraBebida();
        this.pintaContexto();
        this.obtenerBebida();
        this.pintaOpcionNuevaBebida();
    }

    pintarEstructuraBebida() {
        let presentaBebida = "";
        let innerBodyNuevo = "";
        presentaBebida = this.obtenerDivCajaPresentaBebida();

        innerBodyNuevo = innerBodyNuevo + presentaBebida;
        document.getElementsByClassName("text-left")[0].innerHTML = innerBodyNuevo;
    }

    obtenerDivCajaPresentaBebida() {
        let fila = "";
        fila = fila + '<div class="row">';
        fila = fila + '<div class="col-sm-2 InsertaBebida" id="CajasInsertaBebida">';
        fila = fila + '</div>';

        fila = fila + '<div class="col-sm-10 presentaBebida" id="CajasPresentaBebida">';
        //fila = fila + '<button class="button-main" onclick="this.ingresaNuevoGrupo()">Traer Clientes </button>';
        fila = fila + '<table class="table">';
        fila = fila + '<tbody class="presentaBebidaTabla"  id="tableCajasPresentaBebida">';
        fila = fila + '<tr>';
        fila = fila + '<th> Nombre';
        fila = fila + '</th>';
        fila = fila + '<th> Precio';
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
    pintaOpcionNuevaBebida() {
        let containerNuevoProd = document.getElementById('CajasInsertaBebida');
        let botonNuevo = document.createElement('button');
        containerNuevoProd.appendChild(botonNuevo);
        let nuevoBtnTexto = document.createTextNode("Nueva bebida");
        botonNuevo.appendChild(nuevoBtnTexto);
        botonNuevo.setAttribute("class", "btn btn-primary btn-sm");
        botonNuevo.addEventListener('click', () => this.agregaNuevaBebida());
    }

    agregaNuevaBebida() {
        this.construyeModalInsertarBebida("", "", "", "", "", "");
    }
    obtenerBebida() {
        this._bebidaApi.getBebidaByUrl().then((data) => {
            //this._arrayPokemoActual = data;
            for (let dat = 0; dat < data.length; dat++) {
                this.pintarHTMLBebida(data[dat]._nombre, data[dat]._existencias, data[dat]._grados, data[dat]._esAlcoholica, data[dat]._precio, data[dat]._id, data[dat]._calorias);
                console.log(data[dat])
            }

        })
    }

    guardarNuevosDatosModalBebida() {
        let cambioNombre = document.getElementById('nombrePut').value;
        let cambioExistencia = document.getElementById('existenciaPut').value;
        let cambioCalorias = document.getElementById('caloriasPut').value;
        let cambioGrados = document.getElementById('gradosPut').value;
        let cambioPrecio = document.getElementById('precioPut').value;
        let cambioEsAlcoholica = document.getElementById('esAlcoholicaPut').value;
        let datosNuevaBebida = {};

        datosNuevaBebida.grados = cambioGrados;
        datosNuevaBebida.precio = parseInt(cambioPrecio);
        datosNuevaBebida.calorias = parseInt(cambioCalorias);
        datosNuevaBebida.existencias = parseInt(cambioExistencia);
        datosNuevaBebida.esAlcoholica = cambioEsAlcoholica;
        datosNuevaBebida.nombre = cambioNombre;


        this._bebidaApi.pushBebidaById(datosNuevaBebida).then((data) => {
            this._modalController.removeModale();
            this._navega.navegarPrimerPagina(this._ruta);
        })
    }

    borrarBebidaById(id) {
        this._bebidaApi.deleteBebidaById(id).then((data) => {
            this._navega.navegarPrimerPagina(this._ruta);
        })
    }

    pintarHTMLBebida(nombre, existencia, grados, esAlcoholica, precio, id, calorias) {

        let body = document.getElementById("tableCajasPresentaBebida");
        var fila = document.createElement("tr");

        var celdaN = document.createElement("td");
        var textoNombre = document.createTextNode(nombre);

        var celdaP = document.createElement("td");
        var textoPr = document.createTextNode(precio);

        var celdaA = document.createElement("td");
        var botonA = document.createElement("button");
        var textoBotonAccion = document.createTextNode("Detalle");
        botonA.setAttribute("class", 'btn btn-primary btn-sm');
        celdaA.setAttribute("class", 'campoBebidaAcciones');
        botonA.addEventListener('click', () => this.pintaModalBebida(nombre, existencia, grados, esAlcoholica, precio, id, calorias));


        var botonBorrar = document.createElement("button");
        var textoBotonBorrar = document.createTextNode("Borrar");
        botonBorrar.setAttribute("class", 'btn btn-primary btn-sm');
        botonBorrar.addEventListener('click', () => this.borrarBebidaById(id));

        var botonModificar = document.createElement("button");
        var textoBotonModifica = document.createTextNode("Modificar");
        botonModificar.addEventListener('click', () => this.construyeModalInsertarBebida(nombre, existencia, grados, esAlcoholica, precio, id, calorias));
        botonModificar.setAttribute("class", 'btn btn-primary btn-sm');


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

    pintaModalBebida(nombre, existencia, grados, esAlcoholica, precio, id, calorias) {
        let divModalBody = document.createElement('div');

        let parrafModalBodyID = document.createElement('p');
        let parrafModalBodyNombre = document.createElement('p');
        let parrafModalBodyExistencia = document.createElement('p');
        let parrafModalBodyGrados = document.createElement('p');
        let parrafModalBodyEsAlcoholica = document.createElement('p');
        let parrafModalBodyPrecio = document.createElement('p');
        let parrafModalBodyCalorias = document.createElement('p');

        divModalBody.appendChild(parrafModalBodyID);
        divModalBody.appendChild(parrafModalBodyNombre);
        divModalBody.appendChild(parrafModalBodyExistencia);
        divModalBody.appendChild(parrafModalBodyGrados);
        divModalBody.appendChild(parrafModalBodyEsAlcoholica);
        divModalBody.appendChild(parrafModalBodyPrecio);

        let texModalBodyID = document.createTextNode("ID--> " + id);
        parrafModalBodyID.appendChild(texModalBodyID);

        let texModalBodyNombre = document.createTextNode("Nombre--> " + nombre);
        parrafModalBodyNombre.appendChild(texModalBodyNombre);

        let texModalBodyExistencia = document.createTextNode("Existencia-->  " + existencia);
        parrafModalBodyExistencia.appendChild(texModalBodyExistencia);

        let texModalBodyGrados = document.createTextNode("Grados--> " + grados);
        parrafModalBodyGrados.appendChild(texModalBodyGrados);

        let texModalBodyCalorias = document.createTextNode("Calorias--> " + calorias);
        parrafModalBodyCalorias.appendChild(texModalBodyCalorias);


        let texModalBodyEsAlcoholica = document.createTextNode("EsAlcoholica--> " + esAlcoholica);
        parrafModalBodyEsAlcoholica.appendChild(texModalBodyEsAlcoholica);

        let texModalBodyPrecio = document.createTextNode("Precio-->  " + precio);
        parrafModalBodyPrecio.appendChild(texModalBodyPrecio);

        let title = "Detalle Bebida " + nombre;

        this._modalController.openModalWithChild(divModalBody, title);
    }

    construyeModalInsertarBebida(nombre, existencia, grados, esAlcoholica, precio, id, calorias) {

        let divModalBody = document.createElement('div');
        divModalBody.setAttribute("class", "md-form")

        let inputModalBodyNombre = document.createElement('input');
        let inputModalBodyExistencia = document.createElement('input');
        let inputModalBodyCalorias = document.createElement('input');
        let inputModalBodyGrados = document.createElement('input');
        let inputModalBodyPrecio = document.createElement('input');
        let inputModalBodyEsAlcoholica = document.createElement('input');

        inputModalBodyNombre.setAttribute("type", "text");
        inputModalBodyExistencia.setAttribute("type", "text");
        inputModalBodyCalorias.setAttribute("type", "text");
        inputModalBodyGrados.setAttribute("type", "text");
        inputModalBodyPrecio.setAttribute("type", "text");
        inputModalBodyEsAlcoholica.setAttribute("type", "text");

        inputModalBodyNombre.setAttribute("value", nombre);
        inputModalBodyExistencia.setAttribute("value", existencia);
        inputModalBodyCalorias.setAttribute("value", calorias);
        inputModalBodyGrados.setAttribute("value", grados);
        inputModalBodyPrecio.setAttribute("value", precio);
        inputModalBodyEsAlcoholica.setAttribute("value", esAlcoholica);

        inputModalBodyNombre.setAttribute("class", "form-control");
        inputModalBodyExistencia.setAttribute("class", "form-control");
        inputModalBodyCalorias.setAttribute("class", "form-control");
        inputModalBodyGrados.setAttribute("class", "form-control");
        inputModalBodyPrecio.setAttribute("class", "form-control");
        inputModalBodyEsAlcoholica.setAttribute("class", "form-control");

        inputModalBodyNombre.setAttribute("id", "nombrePut");
        inputModalBodyExistencia.setAttribute("id", "existenciaPut");
        inputModalBodyCalorias.setAttribute("id", "caloriasPut");
        inputModalBodyGrados.setAttribute("id", "gradosPut");
        inputModalBodyPrecio.setAttribute("id", "precioPut");
        inputModalBodyEsAlcoholica.setAttribute("id", "esAlcoholicaPut");


        let pModalBodyNombre = document.createElement('label');
        let pModalBodyExistencia = document.createElement('label');
        let pModalBodyCalorias = document.createElement('label');
        let pModalBodyGrados = document.createElement('label');
        let pModalBodyPrecio = document.createElement('label');
        let pModalBodyEsAlcoholica = document.createElement('label');

        pModalBodyNombre.setAttribute("id", "form41");
        pModalBodyExistencia.setAttribute("id", "form41");
        pModalBodyCalorias.setAttribute("id", "form41");
        pModalBodyGrados.setAttribute("id", "form41");
        pModalBodyPrecio.setAttribute("id", "form41");
        pModalBodyEsAlcoholica.setAttribute("id", "form41");

        divModalBody.appendChild(pModalBodyNombre);
        divModalBody.appendChild(inputModalBodyNombre);
        divModalBody.appendChild(pModalBodyExistencia);
        divModalBody.appendChild(inputModalBodyExistencia);
        divModalBody.appendChild(pModalBodyCalorias);
        divModalBody.appendChild(inputModalBodyCalorias);
        divModalBody.appendChild(pModalBodyGrados);
        divModalBody.appendChild(inputModalBodyGrados);
        divModalBody.appendChild(pModalBodyPrecio);
        divModalBody.appendChild(inputModalBodyPrecio);
        divModalBody.appendChild(pModalBodyEsAlcoholica);
        divModalBody.appendChild(inputModalBodyEsAlcoholica);


        let texModalBodyNombre = document.createTextNode("Nombre: ");
        pModalBodyNombre.appendChild(texModalBodyNombre);

        let texModalBodyExistencia = document.createTextNode("Existencia:  ");
        pModalBodyExistencia.appendChild(texModalBodyExistencia);

        let texModalBodyCaloria = document.createTextNode("Calorias: ");
        pModalBodyCalorias.appendChild(texModalBodyCaloria);

        let texModalBodyGrados = document.createTextNode("Grados: ");
        pModalBodyGrados.appendChild(texModalBodyGrados);

        let texModalBodyPrecio = document.createTextNode("Precio:  ");
        pModalBodyPrecio.appendChild(texModalBodyPrecio);

        let texModalBodyEsAlcoholica = document.createTextNode("EsAlcoholica:  ");
        pModalBodyEsAlcoholica.appendChild(texModalBodyEsAlcoholica);

        let botonGuardarInfoModal = document.createElement('button');
        divModalBody.appendChild(botonGuardarInfoModal);
        botonGuardarInfoModal.setAttribute("type", "button");
        botonGuardarInfoModal.setAttribute("class", "btn btn-default");
        botonGuardarInfoModal.setAttribute("data-dismiss", "modal");
        let textoGuardar = document.createTextNode("Guardar");
        botonGuardarInfoModal.appendChild(textoGuardar);



        let title = "Modifica Bebida";
        if (nombre) {
            botonGuardarInfoModal.addEventListener('click', () => this.guardaInformacionBebida(id));
        } else {
            botonGuardarInfoModal.addEventListener('click', () => this.guardarNuevosDatosModalBebida());
            let title = "Modifica bebida de ID " + id;
        }

        this._modalController.openModalWithChild(divModalBody, title);
    }

    guardaInformacionBebida(id) {
        let cambioNombre = document.getElementById('nombrePut').value;
        let cambioExistencia = document.getElementById('existenciaPut').value;
        let cambioCalorias = document.getElementById('caloriasPut').value;
        let cambioGrados = document.getElementById('gradosPut').value;
        let cambioPrecio = document.getElementById('precioPut').value;
        let esAlcoholica = document.getElementById('esAlcoholicaPut').value;
        let datosCambio = {};

        datosCambio.grados = cambioGrados;
        datosCambio.precio = parseInt(cambioPrecio);
        datosCambio.calorias = parseInt(cambioCalorias);
        datosCambio.existencias = parseInt(cambioExistencia);
        datosCambio.nombre = cambioNombre;
        datosCambio.esAlcoholica = esAlcoholica;


        this._bebidaApi.putBebidaById(datosCambio, id).then((data) => {
            this._modalController.removeModale();
            this._navega.navegarPrimerPagina(this._ruta);



        })

    }

}

class BebidasApi {
    constructor() {
        this._urlBase = "http://tuabogadodeaccidentes.es/api/bebidas";
        this._apiClient = new APIClient();
    }


    getBebidaByUrl() {
        let urlCompleta = this._urlBase;
        return this._apiClient.get(urlCompleta).then((data) => {
            let arrayBebida = [];
            for (let i = 0; i < data.length; i++) {
                let elem = data[i];
                arrayBebida.push(new Bebida(elem.grados, elem.existencias, elem.nombre, elem.precio, elem.esAlcoholica, elem._id, elem.calorias));
            }
            return arrayBebida;
        });
    }

    deleteBebidaById(idBorrar) {
        let urlCompleta = this._urlBase + "/"+ idBorrar;
        return this._apiClient.delete(urlCompleta).then((data) => {
            console.log(data);
            return data;
        });

    }
    putBebidaById(datos, idModificar) {

        let urlCompleta = this._urlBase +"/"+ idModificar;
        return this._apiClient.put(datos, urlCompleta).then((data) => {
            console.log(data);
            return data;
        });
    }

    pushBebidaById(datos) {
        let urlCompleta = this._urlBase;
        debugger;
        return this._apiClient.post(datos, urlCompleta).then((data) => {
            console.log(data);
            return data;
        });
    }
}

class Bebida {
    constructor(grados, existencia, nombre, precio, esAlcoholica, id, calorias) {
        this._grados = grados;
        this._existencias = existencia;
        this._nombre = nombre;
        this._precio = precio;
        this._esAlcoholica = esAlcoholica;
        this._id = id;
        this._calorias = calorias;
    }
}
