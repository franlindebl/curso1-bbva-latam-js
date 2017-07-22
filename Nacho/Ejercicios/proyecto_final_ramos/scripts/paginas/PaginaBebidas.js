class PaginaBebidas extends Pagina{
	constructor() {
		super('/bebidas');
		this._bebidaCliente = new BebidaCliente();
		this._botonSave = null;
	}

	generarEditModal(datos) {
		var texto = "";
		let datosModal = Modal.pintarCabecera('divEditModal','Editar bebida');
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

        var alcoholLabel = document.createElement('label');
        alcoholLabel.setAttribute("for", "alcoholInput");
        alcoholLabel.setAttribute("class", "alcoholLabel");
        formDiv5.appendChild(alcoholLabel);

        texto = document.createTextNode("Alcohol:");
		alcoholLabel.appendChild(texto);

		var alcoholInput = document.createElement('input');
		alcoholInput.setAttribute("type", "text");
        alcoholInput.setAttribute("class", "alcoholInput");
        alcoholInput.setAttribute("id", "alcoholInput");
        alcoholInput.setAttribute("value", datos.esAlcoholica);
        formDiv5.appendChild(alcoholInput);
        ///

        var formDiv6 = document.createElement('div');
        formDiv6.setAttribute("class", "form-group");
        formModal.appendChild(formDiv6);

        var gradosLabel = document.createElement('label');
        gradosLabel.setAttribute("for", "gradosInput");
        gradosLabel.setAttribute("class", "gradosLabel");
        formDiv6.appendChild(gradosLabel);

        texto = document.createTextNode("Grados:");
		gradosLabel.appendChild(texto);

		var gradosInput = document.createElement('input');
		gradosInput.setAttribute("type", "text");
        gradosInput.setAttribute("class", "gradosInput");
        gradosInput.setAttribute("id", "gradosInput");
        gradosInput.setAttribute("value", datos.grados);
        formDiv6.appendChild(gradosInput);

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
		let datosModal = Modal.pintarCabecera('divAddModal','Agregar bebida');
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
        ///
        var formDiv5 = document.createElement('div');
        formDiv5.setAttribute("class", "form-group");
        formModal.appendChild(formDiv5);

        var alcoholLabel = document.createElement('label');
        alcoholLabel.setAttribute("for", "alcoholInput");
        alcoholLabel.setAttribute("class", "alcoholLabel");
        formDiv5.appendChild(alcoholLabel);

        texto = document.createTextNode("Alhcohol:");
		alcoholLabel.appendChild(texto);

		var alcoholInput = document.createElement('input');
		alcoholInput.setAttribute("type", "text");
        alcoholInput.setAttribute("class", "alcoholInput");
        alcoholInput.setAttribute("id", "alcoholInput");
        formDiv5.appendChild(alcoholInput);
        ///

        var formDiv6 = document.createElement('div');
        formDiv6.setAttribute("class", "form-group");
        formModal.appendChild(formDiv6);

        var gradosLabel = document.createElement('label');
        gradosLabel.setAttribute("for", "gradosInput");
        gradosLabel.setAttribute("class", "gradosLabel");
        formDiv6.appendChild(gradosLabel);

        texto = document.createTextNode("Grados:");
		gradosLabel.appendChild(texto);

		var gradosInput = document.createElement('input');
		gradosInput.setAttribute("type", "text");
        gradosInput.setAttribute("class", "gradosInput");
        gradosInput.setAttribute("id", "gradosInput");
        formDiv6.appendChild(gradosInput);

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

			let nombre =  document.getElementById('nombreInput').value;
			let precio =  document.getElementById('precioInput').value;
			let calorias = document.getElementById('caloriasInput').value;
			let alcohol =  document.getElementById('alcoholInput').value;
			let grados =  document.getElementById('gradosInput').value;
			let existencias =  document.getElementById('existenciasInput').value;

			let bebida = new Bebida("", nombre,precio, calorias, alcohol,existencias, grados);

			if(accion == "guardar") {
				this._bebidaCliente.guardar(bebida);
                this._navigatorController.NavigateToUrl('/bebidas');

                var promise = this._bebidaCliente.guardar(bebida).then(
                        () => {
                            this._navigatorController.NavigateToUrl('/bebidas');
                            //return data;
                        }
                );
			} else if("editar"){
				//this._bebidaCliente.actualizar(bebida, idProducto);
                var promise = this._bebidaCliente.actualizar(bebida, idProducto).then(
                        () => {
                            console.log("es.");
                            this._navigatorController.NavigateToUrl('/bebidas');
                            //return data;
                        }
                    );
			}

            return promise;
		});
	}

	pintar() {
        document.getElementById("idBody").innerHTML = "";
		console.log("bebidas");
		this.pintarCabecera();
		this.generarAddModal();

		var texto = "";

		var divBoton = document.createElement("div");
        divBoton.setAttribute("class", "divBoton");
        divBoton.setAttribute("id", "divBoton");
        //data-toggle="modal" data-target="#myModal"
		var botonAdd = document.createElement('button');
		botonAdd.setAttribute("class", "btn-success");
		botonAdd.setAttribute("id", "botonAdd");
		botonAdd.setAttribute("data-toggle", "modal");
		botonAdd.setAttribute("data-target", "#divAddModal");
		divBoton.appendChild(botonAdd);

		texto = document.createTextNode("Agregar bebida");
        botonAdd.appendChild(texto);

		document.getElementById('idBody').appendChild(divBoton);

		var divBebidas = document.createElement("div");
        divBebidas.setAttribute("class", "container");
        divBebidas.setAttribute("id", "divBebidas");

        var h2 = document.createElement("h2");
        h2.setAttribute("class", "h2Bebidas");
        h2.setAttribute("id", "h2Bebidas");

        texto = document.createTextNode("Menú de bebidas");
        h2.appendChild(texto);

        divBebidas.appendChild(h2);

        document.getElementById('idBody').appendChild(divBebidas);

        //tabla
        var tablaBebidas = document.createElement("table");
        tablaBebidas.setAttribute("class", "table table-striped");
        tablaBebidas.setAttribute("id", "tablaBebidas");

        var theadBebidas = document.createElement("thead");
        theadBebidas.setAttribute("class", "theadBebidas");
        theadBebidas.setAttribute("id", "theadBebidas");

        var trBebidas = document.createElement("tr");
        trBebidas.setAttribute("class", "trBebidas");
        trBebidas.setAttribute("id", "trBebidas");

        var td1Bebidas = document.createElement("td");
        td1Bebidas.setAttribute("class", "td1Bebidas");
        td1Bebidas.setAttribute("id", "td1Bebidas");

        texto = document.createTextNode("Nombre");
        td1Bebidas.appendChild(texto);

        var td2Bebidas = document.createElement("td");
        td2Bebidas.setAttribute("class", "td2Bebidas");
        td2Bebidas.setAttribute("id", "td2Bebidas");

        texto = document.createTextNode("Precio");
        td2Bebidas.appendChild(texto);

        var td3Bebidas = document.createElement("td");
        td3Bebidas.setAttribute("class", "td3Bebidas");
        td3Bebidas.setAttribute("id", "td3Bebidas");

        texto = document.createTextNode("Calorias");
        td3Bebidas.appendChild(texto);

        var td4Bebidas = document.createElement("td");
        td4Bebidas.setAttribute("class", "td4Bebidas");
        td4Bebidas.setAttribute("id", "td4Bebidas");

        texto = document.createTextNode("Existencias");
        td4Bebidas.appendChild(texto);
        //--
        var td5Bebidas = document.createElement("td");
        td5Bebidas.setAttribute("class", "td5Bebidas");
        td5Bebidas.setAttribute("id", "td5Bebidas");

        texto = document.createTextNode("Con  alcoholol");
        td5Bebidas.appendChild(texto);

        var td6Bebidas = document.createElement("td");
        td6Bebidas.setAttribute("class", "td6Bebidas");
        td6Bebidas.setAttribute("id", "td6Bebidas");

        texto = document.createTextNode("Grados");
        td6Bebidas.appendChild(texto);

        var td7Bebidas = document.createElement("td");
        td7Bebidas.setAttribute("class", "td7Bebidas");
        td7Bebidas.setAttribute("id", "td7Bebidas");

        texto = document.createTextNode("Acciones");
        td7Bebidas.appendChild(texto);

        divBebidas.appendChild(tablaBebidas);
        tablaBebidas.appendChild(theadBebidas);
        theadBebidas.appendChild(trBebidas);

        trBebidas.appendChild(td1Bebidas);
        trBebidas.appendChild(td2Bebidas);
        trBebidas.appendChild(td3Bebidas);
        trBebidas.appendChild(td4Bebidas);
        trBebidas.appendChild(td5Bebidas);
        trBebidas.appendChild(td6Bebidas);
        trBebidas.appendChild(td7Bebidas);

        var tbody = document.createElement("tbody");
        tbody.setAttribute("id", "tbodyComidas");

        tablaBebidas.appendChild(tbody);

        this.obtenerProductos();
	}

	obtenerProductos() {
		this._bebidaCliente.geMenuBebida().then(
			(data) => { 
				let productos = data;
    			var texto = "";
    			
    			for (var i = 0; i < productos.length; i++) {

		        	var tr2Bebidas = document.createElement("tr");
        			tr2Bebidas.setAttribute("class", "tr2Bebidas");
        			tr2Bebidas.setAttribute("id", "tr2Bebidas");

		        	var td1Bebida = document.createElement("td");
			        td1Bebida.setAttribute("class", "td1Bebida");
			        td1Bebida.setAttribute("id", "td1Bebida");
			        tr2Bebidas.appendChild(td1Bebida);

			        texto = document.createTextNode(productos[i]._nombre);
		        	td1Bebida.appendChild(texto);

		        	var td2Bebida = document.createElement("td");
			        td2Bebida.setAttribute("class", "td2Bebida");
			        td2Bebida.setAttribute("id", "td2Bebida");
			        tr2Bebidas.appendChild(td2Bebida);

			        texto = document.createTextNode(productos[i]._precio);
		        	td2Bebida.appendChild(texto);

		        	var td3Bebida = document.createElement("td");
			        td3Bebida.setAttribute("class", "td3Bebida");
			        td3Bebida.setAttribute("id", "td3Bebida");
			        tr2Bebidas.appendChild(td3Bebida);

			        texto = document.createTextNode(productos[i]._calorias);
		        	td3Bebida.appendChild(texto);

		        	var td4Bebida = document.createElement("td");
			        td4Bebida.setAttribute("class", "td4Bebida");
			        td4Bebida.setAttribute("id", "td4Bebida");
			        tr2Bebidas.appendChild(td4Bebida);

			        texto = document.createTextNode(productos[i]._existencias);
		        	td4Bebida.appendChild(texto);

		        	var td5Bebida = document.createElement("td");
			        td5Bebida.setAttribute("class", "td5Bebida");
			        td5Bebida.setAttribute("id", "td5Bebida");
			        tr2Bebidas.appendChild(td5Bebida);

			        texto = document.createTextNode(productos[i]._esAlcoholica);
		        	td5Bebida.appendChild(texto);

		        	var td6Bebida = document.createElement("td");
			        td6Bebida.setAttribute("class", "td6Bebida");
			        td6Bebida.setAttribute("id", "td6Bebida");
			        tr2Bebidas.appendChild(td6Bebida);

			        texto = document.createTextNode(productos[i]._grados);
		        	td6Bebida.appendChild(texto);

		        	var td7Bebida = document.createElement("td");
			        td7Bebida.setAttribute("class", "td7Bebida");
			        td7Bebida.setAttribute("id", "td7Bebida");
			        tr2Bebidas.appendChild(td7Bebida);

			        let idProducto = productos[i]._id;
			        let nombre = productos[i]._nombre;
			        let precio = productos[i]._precio;
			        let calorias = productos[i]._calorias;
			        let existencias = productos[i]._existencias;
			        let esAlcoholica = productos[i]._esAlcoholica;
			        let grados = productos[i]._grados;

			        var eliminar = document.createElement("button");
			        eliminar.setAttribute("class","btn btn-warning");
			        eliminar.setAttribute("id","delete"+productos[i]._id);
			               
			        eliminar.addEventListener('click', (event) => { this.eliminar( idProducto ) });
			        td7Bebida.appendChild(eliminar);

			        texto = document.createTextNode("Eliminar ");
		        	eliminar.appendChild(texto);

		        	//editar
		        	var editar = document.createElement("button");
			        editar.setAttribute("class","btn btn-primary");
			        editar.setAttribute("id","edit"+productos[i]._id);
			        editar.setAttribute("data-toggle", "modal");
					editar.setAttribute("data-target", "#divEditModal");

			        editar.addEventListener('click', (event) => { this.editar(idProducto,nombre,precio,calorias, existencias, esAlcoholica, grados) });
			        td7Bebida.appendChild(editar);

			        texto = document.createTextNode("Editar ");
		        	editar.appendChild(texto);

		        	document.getElementById('tbodyComidas').appendChild(tr2Bebidas);

		        }
		});
	}

	eliminar(id) {
		event.preventDefault();
		var promise = this._bebidaCliente.eliminar(id).then(
            () => {
                this._navigatorController.NavigateToUrl('/bebidas');
                //return data;
            }
        );

        return promise;
	}
	editar(idProducto,nombre,precio,calorias, existencias, esAlcoholica, grados) {
		event.preventDefault();
		var datos = {
			"idProducto": idProducto,
			"nombre": nombre,
			"precio": precio,
			"calorias": calorias,
			"existencias": existencias,
			"esAlcoholica": esAlcoholica,
			"grados": grados
		}

		this.generarEditModal(datos)
	}
}