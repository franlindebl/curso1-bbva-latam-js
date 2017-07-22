class GestionComida extends InnerPagina {
    constructor(nombre, ruta, navega, contexto, modalController) {
        super(nombre, ruta, navega, contexto);
        this._comidaApi = new ComidasApi();
        this._modalController = modalController;
    }

    pinta() {
    	this.pintaEstructuraBasePagina();
        this.pintaContexto();
        this.pintarEstructuraComida();
        this.obtenerComida();
        this.pintaOpcionNuevaComida();
    }

    pintarEstructuraComida() {
        let presentaComida = "";
        let presentaDetalleModal = "";
        
        let innerBodyNuevo = "";
        presentaComida = this.obtenerDivCajaPresentaComida();
        innerBodyNuevo = innerBodyNuevo + presentaComida + presentaDetalleModal;
        document.getElementsByClassName("text-left")[0].innerHTML = innerBodyNuevo;
    }

    obtenerDivCajaPresentaComida() {
        let fila = "";
        fila = fila + '<div class="row">';
        fila = fila + '<div class="col-sm-2 InsertaComida" id="CajasInsertaComida">';
        fila = fila + '</div>';

        fila = fila + '<div class="col-sm-10 presentaComida" id="CajasPresentaComida">';
        fila = fila + '<table class="table">';
        fila = fila + '<tbody class="presentaComidaTabla"  id="tableCajasPresentaComida">';
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

    pintaOpcionNuevaComida(){
    	let containerNuevoProd=document.getElementById('CajasInsertaComida');
    	let botonNuevo= document.createElement('button');
    	containerNuevoProd.appendChild(botonNuevo);
    	let nuevoBtnTexto= document.createTextNode("Nueva Comida");
    	botonNuevo.appendChild(nuevoBtnTexto);
    	botonNuevo.setAttribute("class", "btn btn-primary btn-sm");
    	botonNuevo.addEventListener('click', ()=>this.agregaNuevaComida());
    }

    agregaNuevaComida(){
    	this.construyeModalInsertarComida("","","","","","");
    	
   	

    }
    guardarNuevosDatosModalComida(){
    	let cambioNombre = document.getElementById('nombrePut').value;
        let cambioExistencia = document.getElementById('existenciaPut').value;
        let cambioCalorias = document.getElementById('caloriasPut').value;
        let cambioTipo = document.getElementById('tipoPut').value;
        let cambioPrecio = document.getElementById('precioPut').value;
        let datosNuevaComida = {};

        datosNuevaComida.tipo = cambioTipo;
        datosNuevaComida.precio = parseInt(cambioPrecio);
        datosNuevaComida.calorias = parseInt(cambioCalorias);
        datosNuevaComida.existencias = parseInt(cambioExistencia);
        datosNuevaComida.nombre = cambioNombre;


        this._comidaApi.pushComidaById(datosNuevaComida).then((data) => {
            this._modalController.removeModale();
            this._navega.navegarPrimerPagina(this._ruta);



        })
    }

    obtenerComida() {
        this._comidaApi.getComidaByUrl().then((data) => {
           
            for (let dat = 0; dat < data.length; dat++) {
                this.pintarHTMLComida(data[dat]._nombre, data[dat]._existencias, data[dat]._calorias, data[dat]._tipo, data[dat]._precio, data[dat]._id);
                console.log(data[dat])
            }
        })
    }

    borrarComidaById(id) {

        this._comidaApi.deleteComidaById(id).then((data) => {

            this._navega.navegarPrimerPagina(this._ruta);
        })
    }

    pintarHTMLComida(nombre, existencia, calorias, tipo, precio, id) {
        let body = document.getElementById("tableCajasPresentaComida");
        var fila = document.createElement("tr");

        var celdaN = document.createElement("td");
        var textoNombre = document.createTextNode(nombre);

        var celdaP = document.createElement("td");
        var textoPr = document.createTextNode(precio);

        var celdaA = document.createElement("td");
        var botonA = document.createElement("button");
        var textoBotonAccion = document.createTextNode("Detalle");
        botonA.setAttribute("class", 'btn btn-primary btn-sm');
        celdaA.setAttribute("class", 'campoComidaAcciones');
        //var celdaBorra = document.createElement("td");
        var botonBorrar = document.createElement("button");
        var textoBotonBorrar = document.createTextNode("Borrar");
        botonBorrar.setAttribute("class", 'btn btn-primary btn-sm');
        botonBorrar.addEventListener('click', () => this.borrarComidaById(id));
        //var celdaModifica = document.createElement("td");
        var botonModificar = document.createElement("button");
        var textoBotonModifica = document.createTextNode("Modificar");
        botonModificar.setAttribute("class", 'btn btn-primary btn-sm');
        botonModificar.addEventListener('click', () => this.construyeModalInsertarComida(nombre, existencia, calorias, tipo, precio, id));
        botonA.addEventListener('click', () => this.pintaModalComida(nombre, existencia, calorias, tipo, precio, id));

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

    pintaModalComida(nombre, existencia, calorias, tipo, precio, _id) {
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

        let texModalBodyID = document.createTextNode("ID--> " + _id);
        parrafModalBodyID.appendChild(texModalBodyID);

        let texModalBodyNombre = document.createTextNode("Nombre--> " + nombre);
        parrafModalBodyNombre.appendChild(texModalBodyNombre);

        let texModalBodyExistencia = document.createTextNode("Existencia-->  " + existencia);
        parrafModalBodyExistencia.appendChild(texModalBodyExistencia);

        let texModalBodyCaloria = document.createTextNode("Calorias--> " + calorias);
        parrafModalBodyCalorias.appendChild(texModalBodyCaloria);

        let texModalBodyTipo = document.createTextNode("Tipo--> " + tipo);
        parrafModalBodyTipo.appendChild(texModalBodyTipo);

        let texModalBodyPrecio = document.createTextNode("Precio-->  " + precio);
        parrafModalBodyPrecio.appendChild(texModalBodyPrecio);

        let title = "Detalle Comida " + nombre;

        this._modalController.openModalWithChild(divModalBody, title);
    }

    construyeModalInsertarComida(nombre, existencia, calorias, tipo, precio, id) {

        let divModalBody = document.createElement('div');
        divModalBody.setAttribute("class", "md-form")

        let inputModalBodyNombre = document.createElement('input');
        let inputModalBodyExistencia = document.createElement('input');
        let inputModalBodyCalorias = document.createElement('input');
        let inputModalBodyTipo = document.createElement('input');
        let inputModalBodyPrecio = document.createElement('input');

        inputModalBodyNombre.setAttribute("type", "text");
        inputModalBodyExistencia.setAttribute("type", "text");
        inputModalBodyCalorias.setAttribute("type", "text");
        inputModalBodyTipo.setAttribute("type", "text");
        inputModalBodyPrecio.setAttribute("type", "text");

        inputModalBodyNombre.setAttribute("value", nombre);
        inputModalBodyExistencia.setAttribute("value", existencia);
        inputModalBodyCalorias.setAttribute("value", calorias);
        inputModalBodyTipo.setAttribute("value", tipo);
        inputModalBodyPrecio.setAttribute("value", precio);

        inputModalBodyNombre.setAttribute("class", "form-control");
        inputModalBodyExistencia.setAttribute("class", "form-control");
        inputModalBodyCalorias.setAttribute("class", "form-control");
        inputModalBodyTipo.setAttribute("class", "form-control");
        inputModalBodyPrecio.setAttribute("class", "form-control");

        inputModalBodyNombre.setAttribute("id", "nombrePut");
        inputModalBodyExistencia.setAttribute("id", "existenciaPut");
        inputModalBodyCalorias.setAttribute("id", "caloriasPut");
        inputModalBodyTipo.setAttribute("id", "tipoPut");
        inputModalBodyPrecio.setAttribute("id", "precioPut");


        let pModalBodyNombre = document.createElement('label');
        let pModalBodyExistencia = document.createElement('label');
        let pModalBodyCalorias = document.createElement('label');
        let pModalBodyTipo = document.createElement('label');
        let pModalBodyPrecio = document.createElement('label');

        pModalBodyNombre.setAttribute("id", "form41");
        pModalBodyExistencia.setAttribute("id", "form41");
        pModalBodyCalorias.setAttribute("id", "form41");
        pModalBodyTipo.setAttribute("id", "form41");
        pModalBodyPrecio.setAttribute("id", "form41");

        divModalBody.appendChild(pModalBodyNombre);
        divModalBody.appendChild(inputModalBodyNombre);
        divModalBody.appendChild(pModalBodyExistencia);
        divModalBody.appendChild(inputModalBodyExistencia);
        divModalBody.appendChild(pModalBodyCalorias);
        divModalBody.appendChild(inputModalBodyCalorias);
        divModalBody.appendChild(pModalBodyTipo);
        divModalBody.appendChild(inputModalBodyTipo);
        divModalBody.appendChild(pModalBodyPrecio);

        divModalBody.appendChild(inputModalBodyPrecio);


        let texModalBodyNombre = document.createTextNode("Nombre: ");
        pModalBodyNombre.appendChild(texModalBodyNombre);

        let texModalBodyExistencia = document.createTextNode("Existencia:  ");
        pModalBodyExistencia.appendChild(texModalBodyExistencia);

        let texModalBodyCaloria = document.createTextNode("Calorias: ");
        pModalBodyCalorias.appendChild(texModalBodyCaloria);

        let texModalBodyTipo = document.createTextNode("Tipo: ");
        pModalBodyTipo.appendChild(texModalBodyTipo);

        let texModalBodyPrecio = document.createTextNode("Precio:  ");
        pModalBodyPrecio.appendChild(texModalBodyPrecio);

        let botonGuardarInfoModal = document.createElement('button');
        divModalBody.appendChild(botonGuardarInfoModal);
        botonGuardarInfoModal.setAttribute("type", "button");
        botonGuardarInfoModal.setAttribute("class", "btn btn-default");
        botonGuardarInfoModal.setAttribute("data-dismiss", "modal");
        let textoGuardar = document.createTextNode("Guardar");
        botonGuardarInfoModal.appendChild(textoGuardar);
        let title = "Modifica Comida";
        if(nombre){
        botonGuardarInfoModal.addEventListener('click', () => this.guardaInformacionComida(id));
    	}else{
    		botonGuardarInfoModal.addEventListener('click', () => this.guardarNuevosDatosModalComida());
        let title = "Modifica Comida de ID " + id;
    	}

        this._modalController.openModalWithChild(divModalBody, title);


    }

    guardaInformacionComida(id) {
        let cambioNombre = document.getElementById('nombrePut').value;
        let cambioExistencia = document.getElementById('existenciaPut').value;
        let cambioCalorias = document.getElementById('caloriasPut').value;
        let cambioTipo = document.getElementById('tipoPut').value;
        let cambioPrecio = document.getElementById('precioPut').value;
        let datosCambio = {};

        datosCambio.tipo = cambioTipo;
        datosCambio.precio = parseInt(cambioPrecio);
        datosCambio.calorias = parseInt(cambioCalorias);
        datosCambio.existencias = parseInt(cambioExistencia);
        datosCambio.nombre = cambioNombre;


        this._comidaApi.putComidaById(datosCambio, id).then((data) => {
            this._modalController.removeModale();
            this._navega.navegarPrimerPagina(this._ruta);



        })

    }
}


class ComidasApi {
    constructor() {
        this._urlBase = "http://tuabogadodeaccidentes.es/api/comidas";
        this._apiClient = new APIClient();
    }

    getComidaByUrl() {
        let urlCompleta = this._urlBase;
        //el metodo get se encuentra en el fichero api.js
        return this._apiClient.get(urlCompleta).then((data) => {
            let arrayComida = [];
            for (let i = 0; i < data.length; i++) {
                let elem = data[i];
                arrayComida.push(new Comida(elem.calorias, elem.existencias, elem.nombre, elem.precio, elem.tipo, elem._id));
            }
            return arrayComida;
        });
    }
    deleteComidaById(idBorrar) {
        let urlCompleta = this._urlBase + "/"+ idBorrar;
        return this._apiClient.delete(urlCompleta).then((data) => {
            console.log(data);
        });

    }

    putComidaById(datos, idModificar) {

        let urlCompleta = this._urlBase +"/"+ idModificar;
        return this._apiClient.put(datos, urlCompleta).then((data) => {
            console.log(data);
        });
    }

    pushComidaById(datos){
    	let urlCompleta = this._urlBase;
    	debugger;
        return this._apiClient.post(datos, urlCompleta).then((data) => {
            console.log(data);
        });
    }
}

class Comida {
    constructor(calorias, existencia, nombre, precio, tipo, id) {
        this._calorias = calorias;
        this._existencias = existencia;
        this._nombre = nombre;
        this._precio = precio;
        this._tipo = tipo;
        this._id = id;
    }
}
