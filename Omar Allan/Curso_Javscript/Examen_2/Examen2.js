
const URLIMAGENCAMISETA = "http://icon-icons.com/icons2/1082/PNG/512/tshirt_78128.png";


class Producto {
    constructor(nombre, precio, descripcion, urlImagen) {
        this._nombre = nombre;
        this._precio = precio;
        this._descripcion = descripcion;
        this._urlImagen = urlImagen;
    }

    getRowForTable(index){

    	let fila = "";
    	fila = fila + '<tr>';
    	fila = fila + '<td>';
    	fila = fila + '<img class ="img-small" src="' + this._urlImagen + '">';
    	fila = fila + '</td>';
    	fila = fila + '<td>' + this._nombre + '</td>';
    	fila = fila + '<td>' + this._precio + '</td>';
    	fila = fila + '<td>' + this._descripcion + '</td>';
    	fila = fila + '<td>';
    	fila = fila + '<button class="button-main" onclick="miTienda.removeProductoAtIndex('+ index + ')">Borrar</button>';
    	fila = fila + '</td>';
    	fila = fila + '</tr>';

    	return fila;

    }
}

class Tienda {
    constructor(nombre, direccion, urlTienda) {
        this._nombre = nombre;
        this._direccion = direccion;
        this._urlTienda = urlTienda;
        this._productos = [];
    }

    addProducto(producto){
    	this._productos.push(producto);
    	this.pintarProductos();
    }

    addAndCreateProducto(nombre, precio, descripcion, urlImagen){
    	var producto = new Producto(nombre, precio, descripcion, urlImagen);
    	this._productos.push(producto);
    }

    removeProductoAtIndex(index){
    	this._productos.splice(index, 1);
    	this.pintarProductos();
    }

    //Recupera los valores del form y los devuelve a un producto
    getProductDataAndCreate(){
    	let producto = null;
    	let nombre = document.getElementById("nombre").value;
    	let precio = document.getElementById("precio").value;
    	let descripcion = document.getElementById("descripcion").value;
    	let urlImagen = document.getElementById("urlImagen").value;

    	producto = new Producto(nombre,precio,descripcion, urlImagen);

    	return producto;
    }

    //funcion que se trae el producto del formulario y lo añade
    getProductAndInsert(event){
    	event.preventDefault(); 
    	event.stopPropagation();
    	var producto = this.getProductDataAndCreate();
    	this.addProducto(producto);
    }

    //funcion para pintar la tabla

    pintarProductos(){
    	document.getElementById("tbodyproductos").innerHTML = "";


    	let tbodyInner = "";

    	for(var i=0; i<this._productos.length; i++){
    		let producto = this._productos[i];
    		tbodyInner = tbodyInner + producto.getRowForTable(i);
    	}

    	document.getElementById("tbodyproductos").innerHTML = tbodyInner;


    }


}



let miTienda = new Tienda("Tienda de Fran", "calle Gral. Mariano Escobedo", "goole.com");

console.log(miTienda);