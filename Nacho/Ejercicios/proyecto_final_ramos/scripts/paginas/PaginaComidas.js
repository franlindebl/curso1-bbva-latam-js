class PaginaComidas extends Pagina{
	constructor() {
		super('/comidas');

        this._comidaCliente = new ComidaCliente();
	}

	pintar() {
		console.log("comidas pagina");
		this.pintarCabecera();
		this.generarAddModal();

		var texto = "";

		var divBoton = document.createElement("div");
        divBoton.setAttribute("class", "divBoton");
        divBoton.setAttribute("id", "divBoton");

		var botonAdd = document.createElement('button');
		botonAdd.setAttribute("class", "btn-success");
		botonAdd.setAttribute("id", "botonAdd");
		botonAdd.setAttribute("data-toggle", "modal");
		botonAdd.setAttribute("data-target", "#divAddComidaModal");
		divBoton.appendChild(botonAdd);

		texto = document.createTextNode("Agregar comida");
        botonAdd.appendChild(texto);

		document.getElementById('idBody').appendChild(divBoton);
		//

		var divComidas = document.createElement("div");
        divComidas.setAttribute("class", "container");
        divComidas.setAttribute("id", "divComidas");

        var h2 = document.createElement("h2");
        h2.setAttribute("class", "h2Comidas");
        h2.setAttribute("id", "h2Comidas");

        texto = document.createTextNode("Menú de comidas");
        h2.appendChild(texto);

        divComidas.appendChild(h2);

        document.getElementById('idBody').appendChild(divComidas);

        //tabla
        var tablaComidas = document.createElement("table");
        tablaComidas.setAttribute("class", "table table-striped");
        tablaComidas.setAttribute("id", "tablaComidas");

        var theadComidas = document.createElement("thead");
        theadComidas.setAttribute("class", "theadComidas");
        theadComidas.setAttribute("id", "theadComidas");

        var trComidas = document.createElement("tr");
        trComidas.setAttribute("class", "trComidas");
        trComidas.setAttribute("id", "trComidas");

        var td1Comidas = document.createElement("td");
        td1Comidas.setAttribute("class", "td1Comidas");
        td1Comidas.setAttribute("id", "td1Comidas");

        texto = document.createTextNode("Nombre");
        td1Comidas.appendChild(texto);

        var td2Comidas = document.createElement("td");
        td2Comidas.setAttribute("class", "td2Comidas");
        td2Comidas.setAttribute("id", "td2Comidas");

        texto = document.createTextNode("Precio");
        td2Comidas.appendChild(texto);

        var td3Comidas = document.createElement("td");
        td3Comidas.setAttribute("class", "td3Comidas");
        td3Comidas.setAttribute("id", "td3Comidas");

        texto = document.createTextNode("Calorias");
        td3Comidas.appendChild(texto);

        var td4Comidas = document.createElement("td");
        td4Comidas.setAttribute("class", "td4Comidas");
        td4Comidas.setAttribute("id", "td4Comidas");

        texto = document.createTextNode("Tipo");
        td4Comidas.appendChild(texto);

        var td5Comidas = document.createElement("td");
        td5Comidas.setAttribute("class", "td5Comidas");
        td5Comidas.setAttribute("id", "td5Comidas");

        texto = document.createTextNode("Existencias");
        td5Comidas.appendChild(texto);

        var td6Comidas = document.createElement("td");
        td6Comidas.setAttribute("class", "td6Comidas");
        td6Comidas.setAttribute("id", "td6Comidas");

        texto = document.createTextNode("Acciones");
        td6Comidas.appendChild(texto);

        divComidas.appendChild(tablaComidas);
        tablaComidas.appendChild(theadComidas);
        theadComidas.appendChild(trComidas);

        trComidas.appendChild(td1Comidas);
        trComidas.appendChild(td2Comidas);
        trComidas.appendChild(td3Comidas);
        trComidas.appendChild(td4Comidas);
        trComidas.appendChild(td5Comidas);
        trComidas.appendChild(td6Comidas);

        var tbody = document.createElement("tbody");
        tbody.setAttribute("id", "tbodyComidas");

        tablaComidas.appendChild(tbody);

        this.obtenerProductos();
       
	}

	obtenerProductos() {
		this._comidaCliente.geMenu().then(
			(data) => {
    			let productos = data;
    			
    			var texto= "";
		        for (var i = 0; i < productos.length; i++) {

		        	var tr2Comidas = document.createElement("tr");
        			tr2Comidas.setAttribute("class", "tr2Comidas");
        			tr2Comidas.setAttribute("id", "tr2Comidas");


		        	var td1Comida = document.createElement("td");
			        td1Comida.setAttribute("class", "td1Comida");
			        td1Comida.setAttribute("id", "td1Comida");
			        tr2Comidas.appendChild(td1Comida);

			        texto = document.createTextNode(productos[i]._nombre);
		        	td1Comida.appendChild(texto);

		        	var td2Comida = document.createElement("td");
			        td2Comida.setAttribute("class", "td2Comida");
			        td2Comida.setAttribute("id", "td2Comida");
			        tr2Comidas.appendChild(td2Comida);

			        texto = document.createTextNode(productos[i]._precio);
		        	td2Comida.appendChild(texto);

		        	var td3Comida = document.createElement("td");
			        td3Comida.setAttribute("class", "td3Comida");
			        td3Comida.setAttribute("id", "td3Comida");
			        tr2Comidas.appendChild(td3Comida);

			        texto = document.createTextNode(productos[i]._calorias);
		        	td3Comida.appendChild(texto);

		        	var td4Comida = document.createElement("td");
			        td4Comida.setAttribute("class", "td4Comida");
			        td4Comida.setAttribute("id", "td4Comida");
			        tr2Comidas.appendChild(td4Comida);

			        texto = document.createTextNode(productos[i]._tipo);
		        	td4Comida.appendChild(texto);

		        	var td5Comida = document.createElement("td");
			        td5Comida.setAttribute("class", "td5Comida");
			        td5Comida.setAttribute("id", "td5Comida");
			        tr2Comidas.appendChild(td5Comida);

			        texto = document.createTextNode(productos[i]._existencias);
		        	td5Comida.appendChild(texto);

		        	var td6Comida = document.createElement("td");
			        td6Comida.setAttribute("class", "td6Comida");
			        td6Comida.setAttribute("id", "td6Comida");
			        tr2Comidas.appendChild(td6Comida);

			        var eliminar = document.createElement("button");
			        eliminar.setAttribute("class","btn btn-warning");
			        eliminar.setAttribute("id","delete"+productos[i]._id);
			        
			        let idProducto = productos[i]._id;
			        let nombre = productos[i]._nombre;
			        let precio = productos[i]._precio;
			        let calorias = productos[i]._calorias;
			        let existencias = productos[i]._existencias;
			        let tipo = productos[i]._tipo;  

			        eliminar.addEventListener('click', (event) => { this.eliminar( idProducto ) });
			        td6Comida.appendChild(eliminar);

			        texto = document.createTextNode("Eliminar ");
		        	eliminar.appendChild(texto);

		        	//editar
		        	var editar = document.createElement("button");
			        editar.setAttribute("class","btn btn-primary");
			        editar.setAttribute("id","edit"+productos[i]._id);
			        editar.setAttribute("data-toggle", "modal");
					editar.setAttribute("data-target", "#divEditComidaModal");

			        editar.addEventListener('click', (event) => { this.editar(idProducto, nombre, precio, calorias, existencias, tipo) });
			        td6Comida.appendChild(editar);

			        texto = document.createTextNode("Editar ");
		        	editar.appendChild(texto);

		        	document.getElementById('tbodyComidas').appendChild(tr2Comidas);
		        }

    		}
		);
	}
	eliminar(idProducto) {
		event.preventDefault();
		let promise = this._comidaCliente.eliminar(idProducto).then(
                    ()=> {
                        console.log("3333");
                        this._navigatorController.NavigateToUrl('/comidas');
                });

        return promise;
	}

	editar(idProducto, nombre, precio, calorias, existencias, tipo) {
		console.log("editar");
		////id, nombre, precio, calorias, tipo, existencias
		var datos = {
			"idProducto": idProducto,
			"nombre": nombre,
			"precio": precio,
			"calorias": calorias,
			"existencias": existencias,
			"tipo": tipo
		}
		this.generarEditComidaModal(datos);

	}

	generarEditComidaModal(datos){
		var texto = "";
		let datosModal = Modal.pintarCabecera('divEditComidaModal','Editar comida');
		let divContentModal = datosModal.divContentModal;
		let divAddModal = datosModal.divAddModal;

		let datosBodyModal = Modal.pintarBodyFormModal();
		let divBodyModal = datosBodyModal.divBodyModal;
		let formModal = datosBodyModal.formModal;

		/////////

		var formDiv = document.createElement('div');
        formDiv.setAttribute("class", "form-group");
        formModal.appendChild(formDiv);

        var nombreLabel = document.createElement('label');
        nombreLabel.setAttribute("for", "nombreInput");
        nombreLabel.setAttribute("class", "nombreLabel");
        formDiv.appendChild(nombreLabel);

        texto = document.createTextNode("Nombre:");
		nombreLabel.appendChild(texto);

		var nombreInput = document.createElement('input');
		nombreInput.setAttribute("type", "text");
        nombreInput.setAttribute("class", "nombreInput");
        nombreInput.setAttribute("id", "nombreInput");
        nombreInput.setAttribute("value", datos.nombre);
        var ahora = new Date().getTime();
        nombreInput.setAttribute("ahora", ahora);
        formDiv.appendChild(nombreInput);

        ////
        var formDiv2 = document.createElement('div');
        formDiv2.setAttribute("class", "form-group");
        formModal.appendChild(formDiv2);

        var precioLabel = document.createElement('label');
        precioLabel.setAttribute("for", "precioInput");
        precioLabel.setAttribute("class", "precioLabel");
        formDiv2.appendChild(precioLabel);

        texto = document.createTextNode("Precio:");
		precioLabel.appendChild(texto);

		var precioInput = document.createElement('input');
		precioInput.setAttribute("type", "text");
        precioInput.setAttribute("class", "precioInput");
        precioInput.setAttribute("id", "precioInput");
        precioInput.setAttribute("value", datos.precio);
        formDiv2.appendChild(precioInput);
        ///
        var formDiv3 = document.createElement('div');
        formDiv3.setAttribute("class", "form-group");
        formModal.appendChild(formDiv3);

        var caloriasLabel = document.createElement('label');
        caloriasLabel.setAttribute("for", "caloriasInput");
        caloriasLabel.setAttribute("class", "caloriasLabel");
        formDiv3.appendChild(caloriasLabel);

        texto = document.createTextNode("Calorias:");
		caloriasLabel.appendChild(texto);

		var caloriasInput = document.createElement('input');
		caloriasInput.setAttribute("type", "text");
        caloriasInput.setAttribute("class", "caloriasInput");
        caloriasInput.setAttribute("id", "caloriasInput");
        caloriasInput.setAttribute("value", datos.calorias);
        formDiv3.appendChild(caloriasInput);
        ///
        var formDiv4 = document.createElement('div');
        formDiv4.setAttribute("class", "form-group");
        formModal.appendChild(formDiv4);

        var existenciasLabel = document.createElement('label');
        existenciasLabel.setAttribute("for", "existenciasInput");
        existenciasLabel.setAttribute("class", "existenciasLabel");
        formDiv4.appendChild(existenciasLabel);

        texto = document.createTextNode("Existencias:");
		existenciasLabel.appendChild(texto);

		var existenciasInput = document.createElement('input');
		existenciasInput.setAttribute("type", "text");
        existenciasInput.setAttribute("class", "existenciasInput");
        existenciasInput.setAttribute("id", "existenciasInput");
        existenciasInput.setAttribute("value", datos.existencias);
        formDiv4.appendChild(existenciasInput);
        ///
        
        var formDiv5 = document.createElement('div');
        formDiv5.setAttribute("class", "form-group");
        formModal.appendChild(formDiv5);

        var tipoLabel = document.createElement('label');
        tipoLabel.setAttribute("for", "tipoInput");
        tipoLabel.setAttribute("class", "tipoLabel");
        formDiv5.appendChild(tipoLabel);

        texto = document.createTextNode("Tipo:");
		tipoLabel.appendChild(texto);

		var tipoInput = document.createElement('input');
		tipoInput.setAttribute("type", "text");
        tipoInput.setAttribute("class", "tipoInput");
        tipoInput.setAttribute("id", "tipoInput");
        tipoInput.setAttribute("value", datos.tipo);
        formDiv5.appendChild(tipoInput);
        ///

   		Modal.pintarBoton("Actualizar", formModal);
        
        divContentModal.appendChild(divBodyModal);

        let divPadre2 = document.getElementById("divPadre2");

        if(!divPadre2){
        	divPadre2 = document.createElement("div");
        }

        divPadre.innerHTML = "";
		divPadre.setAttribute("id", "divPadre");

        document.getElementById('idBody').appendChild(divPadre);
        document.getElementById('divPadre').appendChild(divAddModal);

        this.escucharBoton("editar",datos.idProducto);
	}

	generarAddModal() {
		var texto = "";
		let datosModal = Modal.pintarCabecera('divAddComidaModal','Agregar comida');
		let divContentModal = datosModal.divContentModal;
		let divAddModal = datosModal.divAddModal;

		let datosBodyModal = Modal.pintarBodyFormModal();
		let divBodyModal = datosBodyModal.divBodyModal;
		let formModal = datosBodyModal.formModal;
	
        //form-group
        var formDiv = document.createElement('div');
        formDiv.setAttribute("class", "form-group");
        formModal.appendChild(formDiv);

        var nombreLabel = document.createElement('label');
        nombreLabel.setAttribute("for", "nombreInput");
        nombreLabel.setAttribute("class", "nombreLabel");
        formDiv.appendChild(nombreLabel);

        texto = document.createTextNode("Nombre:");
		nombreLabel.appendChild(texto);

		var nombreInput = document.createElement('input');
		nombreInput.setAttribute("type", "text");
        nombreInput.setAttribute("class", "nombreInput");
        nombreInput.setAttribute("id", "nombreInput");
        formDiv.appendChild(nombreInput);

        ////
        var formDiv2 = document.createElement('div');
        formDiv2.setAttribute("class", "form-group");
        formModal.appendChild(formDiv2);

        var precioLabel = document.createElement('label');
        precioLabel.setAttribute("for", "precioInput");
        precioLabel.setAttribute("class", "precioLabel");
        formDiv2.appendChild(precioLabel);

        texto = document.createTextNode("Precio:");
		precioLabel.appendChild(texto);

		var precioInput = document.createElement('input');
		precioInput.setAttribute("type", "text");
        precioInput.setAttribute("class", "precioInput");
        precioInput.setAttribute("id", "precioInput")
        formDiv2.appendChild(precioInput);
        ///
        var formDiv3 = document.createElement('div');
        formDiv3.setAttribute("class", "form-group");
        formModal.appendChild(formDiv3);

        var caloriasLabel = document.createElement('label');
        caloriasLabel.setAttribute("for", "caloriasInput");
        caloriasLabel.setAttribute("class", "caloriasLabel");
        formDiv3.appendChild(caloriasLabel);

        texto = document.createTextNode("Calorias:");
		caloriasLabel.appendChild(texto);

		var caloriasInput = document.createElement('input');
		caloriasInput.setAttribute("type", "text");
        caloriasInput.setAttribute("class", "caloriasInput");
        caloriasInput.setAttribute("id", "caloriasInput");
        formDiv3.appendChild(caloriasInput);
        ///
        var formDiv4 = document.createElement('div');
        formDiv4.setAttribute("class", "form-group");
        formModal.appendChild(formDiv4);

        var existenciasLabel = document.createElement('label');
        existenciasLabel.setAttribute("for", "existenciasInput");
        existenciasLabel.setAttribute("class", "existenciasLabel");
        formDiv4.appendChild(existenciasLabel);

        texto = document.createTextNode("Existencias:");
		existenciasLabel.appendChild(texto);

		var existenciasInput = document.createElement('input');
		existenciasInput.setAttribute("type", "text");
        existenciasInput.setAttribute("class", "existenciasInput");
        existenciasInput.setAttribute("id", "existenciasInput");
        formDiv4.appendChild(existenciasInput);


        var formDiv5 = document.createElement('div');
        formDiv5.setAttribute("class", "form-group");
        formModal.appendChild(formDiv5);

        var tipoLabel = document.createElement('label');
        tipoLabel.setAttribute("for", "tipoInput");
        tipoLabel.setAttribute("class", "tipoLabel");
        formDiv5.appendChild(tipoLabel);

        texto = document.createTextNode("Tipo:");
		tipoLabel.appendChild(texto);

		var tipoInput = document.createElement('input');
		tipoInput.setAttribute("type", "text");
        tipoInput.setAttribute("class", "tipoInput");
        tipoInput.setAttribute("id", "tipoInput");
        formDiv5.appendChild(tipoInput);

   		Modal.pintarBoton("Guardar", formModal);
        
        divContentModal.appendChild(divBodyModal);

        let divPadre = document.createElement("div");
		divPadre.setAttribute("id", "divPadre");

        document.getElementById('idBody').appendChild(divPadre);
        document.getElementById('divPadre').appendChild(divAddModal);

        this.escucharBoton("guardar","");
	}

	escucharBoton(accion, idProducto) {
		this._botonSave = document.getElementById('botonSave');
		this._botonSave.addEventListener('click',(event) => {
			event.preventDefault();

			let id = idProducto;
			let nombre =  document.getElementById('nombreInput').value;
			let precio =  document.getElementById('precioInput').value;
			let calorias = document.getElementById('caloriasInput').value;
			let tipo =  document.getElementById('tipoInput').value;
			let existencias =  document.getElementById('existenciasInput').value;
			
			let comida = new Comida(id, nombre,precio, calorias, tipo,existencias);

			if(accion == "guardar") {
				let promise = this._comidaCliente.guardar(comida).then(
                    ()=> {
                        this._navigatorController.NavigateToUrl('/comidas');
                });
			} else if("editar"){
				let promise = this._comidaCliente.actualizar(comida,id).then(
                    ()=> {
                        this._navigatorController.NavigateToUrl('/comidas');
                });

			}
			//return promise;
		});
	}

}