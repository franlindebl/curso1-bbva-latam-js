// var Producto = function (nom,url,pre,des) {
// 	this.nombreProducto = nom; 
// 	this.precioProducto = pre ;
// 	this.descripcionProducto = des;
// 	this.urlImgProducto = url;
// }

// var Tienda = function () {
// 	this.productosTienda = [];
// 	this.nombreTienda = "ArielStore";
// 	this.urlTienda = "www.arielstore.com"; 
// }

// Tienda.prototype.addProducto = function () {
// 	var nom = document.getElementById('nomprod').value;
//     var url = document.getElementById('urlimg').value;
//     var pre = Number(document.getElementById('precio').value);
//     var des = document.getElementById('des').value;

//     console.log(nom,url,pre,des);
//     this.productosTienda.push(new Producto(nom,url,pre,des))
//     console.log(tienda);

//     tienda.pintarTienda();
// }

// Tienda.prototype.pintarTienda = function () {
// 	var cont = document.getElementById('tabla');

// 	var newEle = document.createElement('div');

//     newEle.id = "prod" + this.productosTienda.length;
//     newEle.className = "row";

//     for (var i = 0; i < 4; i++) {
    	
//     }
//     var newContent = document.createElement('div');

//     newContent.className = "celda-content";

//     newContentText = document.createTextNode(tienda.productosTienda[0].nombreProducto);
    
//     newEle.appendChild(newContent);

//     newContent.appendChild(newContentText);
//     // añade el elemento creado y su contenido al DOM

//     var padre = cont.parentNode;

//     padre.insertBefore(newEle,cont);

// }


// var tienda = new Tienda();

const URLIMGCAMISA = "http://www.gasoilonline.com/images/CAMI%20ROJA.jpg"

class ProductoPoh {
    constructor (nom,pre,des,url) {
        this._nombreProducto = nom; 
        this._precioProducto = pre ;
        this._descripcionProducto = des;
        this._urlImgProducto = url;
        this.idProducto = "";
    }

    getRowForTable () {
        let fila = "";
        fila = fila + '<tr>';
        fila = fila + '<td>'; 
        fila = fila + '<img class ="img-small" src="' + this._urlImgProducto + '">';
        fila = fila + '</td>';
        fila = fila + '<td>' + this._nombreProducto + '</td>';
        fila = fila + '<td>' + this._precioProducto + '</td>';
        fila = fila + '<td>' + this._descripcionProducto + '</td>';
        fila = fila + '<td>';
        fila = fila + '<button class="button-main" onclick="miTienda.removeProductoById(' + this.idProducto + ')">Borrar</button>';
        fila = fila + '</td>';
        fila = fila + '</tr>';

        return fila;
    }
    
}

class Tienda {
    constructor (nom,dir,url) {
        this._contadorProducto = 0;
        this._nombreTienda = nom;
        this._dirreccionTienda = dir;
        this._urlTienda = url;
        this._productosTienda = [];
    }

    addProducto (prod) {
        prod.idProducto = this._contadorProducto;
        this._contadorProducto ++;
        this._productosTienda.push(prod);
        this.pintarProducto();
    }

    removeProducto (index) {
        this._productosTienda.splice(index,1);
        this.pintarProducto();
    }

    removeProductoById (id) {
        let producto = null;

        for (var i = 0; i < this._productosTienda.length; i++) {
            producto = this._productosTienda[i];
            if (this._productosTienda[i] == id) {
                producto = this._productosTienda[i];
            }
        }
        let indice = this._productosTienda.indexOf(producto);
        this.removeProducto(indice);
    }

    getPoductData () {
        let producto = null;

        let nombre = document.getElementById('nombre').value;
        let url = document.getElementById('url').value;
        let precio = document.getElementById('precio').value;
        let descripcion = document.getElementById('descripcion').value;

        producto = new ProductoPoh(nombre,precio,descripcion,url);

        return producto;
    }

    getPoductAndInsert (e) {
        e.preventDefault();
        e.stopPropagation();
        var producto = this.getPoductData();
        this.addProducto(producto);
        console.log(miTienda);
    }

    pintarProducto () {
        //<tr> <td> <img class ="img-small" src="http://www.gasoilonline.com/images/CAMI%20ROJA.jpg"> </td> <td>Camiseta roja</td> <td>10€</td> <td>Camiseta de algodón</td> <td> <button class="button-main">Borrar</button> </td> </tr> 
        document.getElementById('tbodyproductos').innerHTML = "";

        let tbodyinner = "";

        for (let i=0;i<this._productosTienda.length;i++) {
            let producto = this._productosTienda[i];

            tbodyinner = tbodyinner + producto.getRowForTable();

        }

        document.getElementById('tbodyproductos').innerHTML = tbodyinner;
    }
}

let miTienda = new Tienda("Tienda de Ariel","Calle General ...", "www.arielstore.com");

let miProducto1 = new ProductoPoh("Camiseta","10$","De Algodon",URLIMGCAMISA);
let miProducto2 = new ProductoPoh("Camiseta mas roja","20$","De Algodon",URLIMGCAMISA);

// miTienda.addProducto(miProducto1);
// miTienda.addProducto(miProducto2);































