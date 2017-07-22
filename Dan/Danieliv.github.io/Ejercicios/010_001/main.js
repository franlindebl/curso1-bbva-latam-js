const URLIMAGEN = "https://dummyimage.com/200x200/000/fff";

class Producto {
    constructor(nombre, precio, descripcion, urlImagen) {
        this._nombre = nombre;
        this._precio = precio;
        this._descripcion = descripcion;
        this._urlImagen = urlImagen;
        this._idProducto = 0;
    }

    getIdProducto() {
        this.removeProductoById(this._idProducto);
        return this._idProducto;
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
        // fila = fila + '<button class="button-main" onclick="miTienda.removeProductoById(' + this._idProducto + ')">Borrar</button>';
        fila = fila + '<button class="button-main" onclick="this.getIdProducto()">Borrar</button>';
        fila = fila + '</td>';
        fila = fila + '</tr>';

        return fila;
    }
}

class Tienda {
    constructor(nombre, direccion, urlTienda) {
        this._contador = 0;
        this._nombre = nombre;
        this._direccion = direccion;
        this._urlTienda = urlTienda;
        this._productos = [];
        this.getProduct();
    }

    addProducto(producto) {
        producto._idProducto = this._contador;
        this._contador++;
        this._productos.push(producto);
        this.pintarProductos();
    }

    createProduct() {
        let producto = null;

        let nombre = document.getElementById("nombre").value;
        let precio = document.getElementById("precio").value;
        let descripcion = document.getElementById("descripcion").value;
        let urlImagen = document.getElementById("url").value;
        producto = new Producto(nombre, precio, descripcion, urlImagen)
        return producto;
    }

    removeProductoByIndex(index) {
        this._productos.splice(index, 1);
        this.pintarProductos();
    }


    getProduct() {
        document.getElementById('button').addEventListener("click", () => {
            let producto = this.createProduct();
            this.addProducto(producto);
        })
    }

    pintarProductos() {

        document.getElementById("tbodyproductos").innerHTML = "";

        let tbodyInner = "";

        for (let i = 0; i < this._productos.length; i++) {
            let producto = this._productos[i];
            let productoID = this._productos[i]._idProducto;
            tbodyInner = tbodyInner + producto.getRowForTable(i);
        // console.log(producto.getIdProducto());
        console.log(productoID);
        }

        document.getElementById("tbodyproductos").innerHTML = tbodyInner;
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

window.onload = function() {
    let miTienda = new Tienda("Daniel\'s Store", "Calle Imaginación", "google.com");
    console.log(miTienda);

}

// let miProducto1 = new Producto("Cosa", "20", "Sin descripción", URLIMAGEN);
// let miProducto2 = new Producto("Nada", "50", "Con descripción", URLIMAGEN);

// miTienda.addProducto(miProducto1);
// miTienda.addProducto(miProducto2);