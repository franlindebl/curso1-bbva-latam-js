const URLIMAGENCAMISETA = "http://www.gasoilonline.com/images/CAMI%20ROJA.jpg";

class Producto {
	constructor(nombre, precio, descripcion, urlImagen) {
		this._nombre = nombre;
		this._precio = precio;
		this._descripcion = descripcion;
		this._urlImagen = urlImagen;
		this._idProducto = null;
	}

	getRowForTable(index) {
		let fila = '';
		fila += '<tr>'
		fila += '<td>';
		// fila += '<img class ="img-small" src="' + this._urlImagen + '">';
		fila += '<img class ="img-small" src="' + URLIMAGENCAMISETA + '">';
		fila += '</td>';
		fila += '<td>' + this._nombre + '</td>';
		fila += '<td>' + this._precio + '</td>';
		fila += '<td>' + this._descripcion + '</td>';
		fila += '<td>';
		fila += '<button class="button-main" onclick="miTienda.removeProductoById('+this._idProducto+')">Borrar</button>';
		fila += '</td>';
		fila += '</tr>'

		return fila;
	}
}

class Tienda {
	constructor(nombre, direccion, urlTienda) {
		this._contadorProductos = 0;
		this._nombre = nombre;
		this._direccion = direccion;
		this._urlTienda = urlTienda;
		this._productos = [];
	}

	addProducto(producto) {
		// SKU
		producto._idProducto = this._contadorProductos;
		this._contadorProductos ++;
		this._productos.push(producto);
		this.pintarProductos();
	}

	addAndCreateProducto(nombre, precio, descripcion, urlImagen) {
		let producto = new Producto(nombre, precio, descripcion, urlImagen);
		this._productos.push(producto);
	}

	// Para que Vlai no se enfade
	removeProductoByIndex(index) {
		this.removeProductoAtIndex(index);
	}

	removeProductoAtIndex(index) {
		this._productos.splice(index, 1);
		this.pintarProductos();
	}

	// REcoge los datos del form, crea y devuelve un new Producto
	getProductDataAndCreate() {
		let producto = null;

		let nombre = document.getElementById("nombre").value;
		let precio = document.getElementById("precio").value;
		let descripcion = document.getElementById("descripcion").value;
		let urlImagen = document.getElementById("urlImagen").value;

		producto = new Producto(nombre, precio, descripcion, urlImagen);

		return producto;
	}

	getProductAndInsert() {
		event.preventDefault();
		event.stopPropagation();

		let producto = this.getProductDataAndCreate();
		this.addProducto(producto);
	}

	pintarProductos() {
		// <tr><td><img class ="img-small" src="http://www.gasoilonline.com/images/CAMI%20ROJA.jpg"></td><td>Camiseta roja</td><td>10€</td><td>Camiseta de algodón</td><td><button class="button-main">Borrar</button></td></tr>
		document.getElementById("tbodyproductos").innerHTML = "";

		let tbodyInner = "";

		for(let i=0; i<this._productos.length; i++){
			let producto = this._productos[i];
			tbodyInner += producto.getRowForTable(i);
		}

		document.getElementById("tbodyproductos").innerHTML = tbodyInner;
	}

	removeProductoById(idProducto){
		let producto = null;
		for(let i=0; i<this._productos.length; i++){
			if(this._productos[i]._idProducto == idProducto){
				producto = this._productos[i];
			}
		}

		let indice = this._productos.indexOf(producto);
		this.removeProductoByIndex(indice);
	}
}

let miTienda = new Tienda("Tienda de Fran", "Calle Gral..", "google.es");
// let prod1 = new Producto("Camiseta", "10€", "De algodón", URLIMAGENCAMISETA);
// let prod2 = new Producto("Camiseta 2", "12€", "De lino", URLIMAGENCAMISETA);


// miTienda.addProducto(prod1);
// miTienda.addProducto(prod2);

console.log(miTienda);