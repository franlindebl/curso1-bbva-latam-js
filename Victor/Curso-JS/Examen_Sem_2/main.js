var Producto = function () {
    this._idProducto = null;
    this._nombre = null;
    this._urlImagen = null;
    this._precio = null;
    this._descripcion = null;
};

Producto.prototype.iniciarProducto = function (nombre, url, precio, descripcion) {
    this._idProducto = nombre + getRandomInteger(0, 10000);
    this._nombre = nombre;
    this._urlImagen = url;
    this._precio = precio;
    this._descripcion = descripcion;
}

var Tienda = function () {
    this._nombre = null;
    this._url = null;
    this._productos = [];
}

Tienda.prototype.addProducto = function () {
    var producto = new Producto();

    // for (var p = 0; p < this._productos.length; p++) {
    //     document.getElementById("tableProductos").deleteRow(1);
    //}

    producto.iniciarProducto(obtenValueInputClean("txtNombre"),
        obtenValueInputClean("txtUrlImagen"),
        obtenValueInputClean("txtPrecio"),
        obtenValueInputClean("txtDescripcion"));

    this._productos.push(producto);
    console.log(this._productos);

    this.pintarTienda();
}

Tienda.prototype.delProducto = function (id) {
    /*for (var p = 0; p < this._productos.length; p++) {
        if (this._productos[p]._idProducto == id) {
            this._productos.splice(p, 1);
            console.warn("Producto[", id, "] a sido borrado.");
            break;
        }
    }*/

    // this.pintarTienda();

    console.error('Errorrrrr');
    // document.getElementById(id).re;
}

Tienda.prototype.pintarTienda = function () {
    // for (var p = 0; p < this._productos.length; p++) {
        // document.getElementById("tableProductos").deleteRow(0);
    //}

    //creaEncabezadosTabla("tableProductos");

    for (var p = 0; p < this._productos.length; p++) {
        var x = document.createElement("TR");
        x.setAttribute("id", this._productos[p]._idProducto);
        document.getElementById("tableProductos").appendChild(x);

        creaCeldaImagen("tableProductos", this._productos[p]._urlImagen);

        creaCeldaTexto("tableProductos", this._productos[p]._nombre);
        creaCeldaTexto("tableProductos", this._productos[p]._precio);
        creaCeldaTexto("tableProductos", this._productos[p]._descripcion);

        creaCeldaButton("tableProductos", this._productos[p]._idProducto);
    }
}

var miTienda = new Tienda();
