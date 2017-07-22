/*
Vamos a hacer una tienda On-Line:
1) (2 Puntos) - Realiza una clase Tienda y una clase Producto que tenga las propiedades que consideres. 

Como mínimo deberán tener:

Tienda:

	- Un array de productos

	- Nombre

	- URL 

Producto:

	- Nombre 

	- Precio

	- Descripción

	- Url de imagen

2) (2 Puntos) - Realiza el HTML de una página que tenga en su lado izquierdo un formulario para introducir productos.
EL formulario deberá tener todos los campos necesarios para crear un producto. Y un botón de "Añadir". Realiza solo la maqueta HTML y CSS (sin funcionalidad).
3) (2 Puntos)  - Haz que al pulsar en el botón "Añadir" se recojan los datos del formulario y se cree un nuevo producto. El producto deberá ser añadido al array de productos de la tienda. (Sólo programación JavaScript, sin pintado de productos)
4) (2 Puntos) - Haz una función pintarTienda en Tienda que pinte el HTMl de todos los productos de la tienda. Cada vez que se cree o se elimine un producto deberás pintar todos los productos.
5) (2 puntos) - Añade en cada producto un botón de borrado, que elimine el producto de la tienda y vuelva a pintar todo el listado de productos.
*/



const URLIMAGENCAMISETA = "http://www.gasoilonline.com/images/CAMI%20ROJA.jpg";

class Producto{
    constructor(nombre, precio, descripcion, urlImagen){
        this._nombre = nombre;
        this._precio = precio;
        this._descripcion = descripcion;
        this._urlImagen = urlImagen;
        this._idProducto = 0;
    }

    getRowForTable() {
        let fila = '';
        fila = fila + '<tr>';
        fila = fila + '<td>';
        fila = fila + '<img class ="img-small" src="' + this._urlImagen + '">';
        fila = fila + '</td>';
        fila = fila + '<td>' + this._nombre + '</td>';
        fila = fila + '<td>' + this._precio + '</td>';
        fila = fila + '<td>' + this._descripcion + '</td>';
        fila = fila + '<td>';
        fila = fila + '<button class="button-main" onclick="miTienda.removeProductoById(' + this._idProducto + ')">Borrar</button>';
        fila = fila + '</td>';
        fila = fila + '</tr>';

        return fila;
    }
}

class Tienda{
    constructor(nombre, direccion, urlTienda){
        this._contadorProductos = 0; 
        this._nombre = nombre;
        this._direccion = direccion;
        this._urlTienda = urlTienda;
        this._productos = [];
    }

    addProducto(producto){
        //SKU
        producto.idProducto = this._contadorProductos;
        this._contadorProductos ++;
        this._productos.push(producto);
        this.pintarProductos();
    }

    addAndCreateProducto(nombre, precio, descripcion, urlImagen){
        let producto = new Producto(nombre, precio, descripcion, urlImagen);
        this._productos.push(producto);
    }


    removeProductoAtIndex(index){
        this._productos.splice(index, 1)
        this.pintarProductos();
    }

    getProductoDataAndCreate(){
        let producto = null;
        let nombre = document.getElementById("nombre").value;
        let precio = document.getElementById("precio").value;
        let descripcion = document.getElementById("descripcion").value;
        let urlImagen = document.getElementById("urlImagen").value;

        producto = new Producto(nombre, precio, descripcion, urlImagen);

        return producto;
    }

    getProductoAndInsert(event){
        event.preventDefault();
        event.stopPropagation();
        let producto = this.getProductoDataAndCreate();
        this.addProducto(producto);
    }

    pintarProductos() {
        document.getElementById("tbodyproductos").innerHTML = "";
        let tbodyInner = "";
        for (let i = 0; i < this._productos.length; i++) {
            let producto = this._productos[i];
            tbodyInner = tbodyInner + producto.getRowForTable(i);
        }

        document.getElementById("tbodyproductos").innerHTML = tbodyInner;
    }

    removeProductoByIndex(index) {
        this._productos.splice(index, 1);
        this.pintarProductos();
    }

     removeProductoById(idProducto) {
        let producto = null;
        for (var i = 0; i < this._productos.length; i++) {
            if (this._productos[i]._idProducto == idProducto) {
                producto = this._productos[i];
            }
        }
        let indice = this._productos.indexOf(producto)
        this.removeProductoByIndex(indice);
    }   
}

let miTienda = new Tienda("ee", "ee", "e");

console.log(miTienda);