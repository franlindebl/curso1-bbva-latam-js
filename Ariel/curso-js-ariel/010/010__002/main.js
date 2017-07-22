/* Aleatorios */
var nombrePersonas = ["Victor", "Omar", "karen", "Ariel", "Omar", "David", "Esteban", "Matias", "Vlairner", "Lucy", "Ignacio", "Humberto", "Nestor", "Daniel", "Raymundo", "Fran"];

function generaNombrePersonas() {
    return nombrePersonas[Math.floor(Math.random() * nombrePersonas.length)];
}

function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var cargo = ["Encargado","Mozo"];

function generaCargoAleatorio() {
    return cargo[Math.floor(Math.random() * cargo.length)];
}

var producto = ["Creveza","Vino","Pozole","Quesadilla"];

function generaProductoAleatorio() {
    return producto[Math.floor(Math.random() * producto.length)];
}

function generarEsAlcoholicaAleatorio() {
    var numeroAleatorio = Math.round(Math.random() * 1);
    if (numeroAleatorio == 1) {
        return true;
    } else {
        return false;
    }
}

var comida =["Entrante","Principal","Postre"];

function generaComidaAleatorio() {
    return comida[Math.floor(Math.random() * comida.length)];
}


class Persona {
    constructor() {
        this._nombre = generaNombrePersonas();
        //(Generar aleatorio)
        this._edad = generarNumeroAleatorio(20,60);
        //(Aleatorio entre 20 y 60)
    }

}

class Camarero extends Persona {
    constructor() {
        super();
        this._cargo = generaCargoAleatorio();
        //(Aleatorio: encargado/mozo)
    }
}

class Cliente extends Persona {
    constructor() {
        super();
        this._dinero = generarNumeroAleatorio(0,1500);
        //(Aleatorio: entre 0 y 1500)
    }
}

class Mesa {
    constructor(id) {
        this._capacidad = generarNumeroAleatorio(2,10);
        //(aleatorio entre 2 y 10)
        this._id = id;
        //Un ID
        this._ocupada = false;
        //true/false
        this._personas = [];
        //Un array de personas que estén sentadas
        this._ordenes = [];
        //órdenes realizadas (ya crearemos las órdenes después
        this._ordenesPendientes = [];
    }

    crearOrden() {
        if (this._ocupada == true) {
            if (this._ordenes.length == 0) {
                for (var i = 0; i < this._personas.length; i++) {
                    this._ordenes.push(new Orden());
                }
            }
            
        }

    }

    pintarMesa() {

        //document.getElementById('mesas').innerHTML = "";

        var newItemPi = document.createElement('p');
        var textnodeId = document.createTextNode('Id: '+ this._id);
        newItemPi.className = "p-id"
        newItemPi.appendChild(textnodeId);

        var newItemPc = document.createElement('p');
        var textnodeC = document.createTextNode('Capacidad: '+ this._capacidad);
        newItemPc.appendChild(textnodeC);

        var newItemPp = document.createElement('p');
        var textnodeP = document.createTextNode('Personas: '+ this._personas.length);
        newItemPp.appendChild(textnodeP);

        var newItemPo = document.createElement('p');
        var textnodeO = document.createTextNode('Ordenes: '+ this._ordenes.length);
        newItemPo.appendChild(textnodeO);

        var newItemDiv = document.createElement('div');

        if (this._ocupada == false) {
            newItemDiv.className = "mesa libre"; 
        } else {
            newItemDiv.className = "mesa ocupado"; 
        } 
        
        newItemDiv.appendChild(newItemPi);
        newItemDiv.appendChild(newItemPc); 
        newItemDiv.appendChild(newItemPp); 
        newItemDiv.appendChild(newItemPo); 

        var mesa = document.getElementById('mesas');
        //mesa.innerHTML = "";
        mesa.insertBefore(newItemDiv, mesa.childNodes[this._id-1]);
    }
}

class Producto {
    constructor() {
        this._nombre = generaProductoAleatorio();
        this._numExistencias = generarNumeroAleatorio(0,50);; //Número de existencias
        this._calorias = generarNumeroAleatorio(50,500);; //Calorías
        this._precio = generarNumeroAleatorio(80,200);; //Precio
    }
}

class Bebida extends Producto {
    constructor() {
        super();
        this._esAlcoholica = generarEsAlcoholicaAleatorio(); //Booleano esAlcoholica: true/false
        this._graAlcohol = generarNumeroAleatorio(3,8);; //Grados de alcohol
    }
}

class Comida extends Producto {
    constructor() {
        super();
        this._tipo = generaComidaAleatorio(); //Entrante/Principal/Postre
    }
}

class CartaProductos {
    constructor() {
        this._bebidas = [];
        this._comidas = [];

        for (let i=0; i<5; i++) {
            this._bebidas.push(new Bebida());
            this._comidas.push(new Comida());
        }
    }

    pintarCarta() {
        document.getElementById('carta').innerHTML = "";

        var carta = '<h2>Carta</h2>';
        carta += '<h3>Comida:</h3>';
        carta += '<table>';
        carta += '<tbody>';
        carta += this.getComida();
        carta += '</tbody>'
        carta += '</table>'
        carta += '<h3>Bebida:</h3>';
        carta += '<table>';
        carta += this.getBebida();;
        carta += '</table>'

        document.getElementById('carta').innerHTML = carta;
    }

    getComida() {
        var comida = '';
        for (var i = 0; i < this._comidas.length; i++) {
            var aux = this._comidas[i];
            comida = comida + '<tr><td>' + aux._nombre + '</td><td>' + aux._numExistencias + '</td></tr>';
        }

        return comida;
    }

    getBebida() {
        var bebida = '';
        for (var i = 0; i < this._bebidas.length; i++) {
            var aux = this._bebidas[i];
            bebida = bebida + '<tr><td>' + aux._nombre + '</td><td>' + aux._numExistencias + '</td></tr>';
        }

        return bebida;
    }

}

class Recepcion {
    constructor() {
        this._grupoPersona = [];
    }

    addRecepcion() {
        this._grupoPersona.push(new GrupoPersona());
    }

    pintarRecepcion() {
        document.getElementById('recepcion').innerHTML = "";
        this._grupoPersona.forEach( (grupo) => grupo.pintarGrupo());
        //<div class="grupo">Grupo de: 6 personas</div>
        
    }

    getGrupo() {
        return this._grupoPersona.splice(0,1);
    }
}

class GrupoPersona {
    constructor() {
        this._clientes = [];
        this.addCleintes();
    }

    addCleintes() {
        for (var i = 0; i < generarNumeroAleatorio(1,20); i++) {
            this._clientes.push(new Cliente());
        }
    }

    pintarGrupo() {
        //<div class="grupo">Grupo de: 6 personas</div>
        var newItemDiv = document.createElement('div');
        var textnode = document.createTextNode('Grupo de: ' + this._clientes.length + ' personas');
        newItemDiv.className = "grupo";
        newItemDiv.appendChild(textnode);

        var recepcion = document.getElementById('recepcion');
        //mesa.innerHTML = "";
        recepcion.insertBefore(newItemDiv, recepcion.childNodes[0]);
    }
}

class Orden {
    constructor() {
        this._comidas = [];
        this._bebidas = [];

        for (let i=0; i<generarNumeroAleatorio(1,2); i++) {
            this._bebidas.push(restaurante._carta._bebidas[generarNumeroAleatorio(1,5)]);
            this._comidas.push(restaurante._carta._comidas[generarNumeroAleatorio(1,5)]);
        }
    }
}

class Restaurante {
    constructor() {
        this._nombre = "La Ratatouille"; //Nombre
        this._mesas = []; //Array de mesas (30 mesas)
        this._camareros = []; //Array de camareros (5 camareros)
        this._carta = new CartaProductos(); //Carta de productos (Al menos 5 bebidas y 5 Comidas)
        this._recepcion = new Recepcion();

        for (let i=0; i<30; i++) {
            this._mesas.push(new Mesa(i + 1));
        }

        for (let i=0; i<5; i++) {
            this._camareros.push(new Camarero());
        }
    }

    iniciarIntervalo(){
        window.setInterval( () => this.ejecutarCiclo(), 2000);

        //this.ejecutarCiclo()
    }

    ejecutarCiclo(){
        this.pintar();
        console.log("Se refresca");
    }

    pintarBotones() {

        let newItem1 = document.createElement('button');
        newItem1.textContent = 'Traer personas';
        newItem1.className = "button-main";
        let click1 = () => this._recepcion.addRecepcion();
        newItem1.addEventListener("click", click1);

        let newItem2 = document.createElement('button');
        newItem2.textContent = 'Recibir';
        newItem2.className = "button-main";
        let click2 = () => this.recibirClintes();
        newItem2.addEventListener("click", click2);

        let newItem3 = document.createElement('button');
        newItem3.textContent = 'Atender ordenes';
        newItem3.className = "button-main";
        // let click3 = () => this._recepcion.addRecepcion();
        // newItem3.addEventListener("click", click3);


        let boton = document.getElementById('botones');
        //mesa.innerHTML = "";
        boton.insertBefore(newItem1, boton.childNodes[0]);
        boton.insertBefore(newItem2, boton.childNodes[1]);
        boton.insertBefore(newItem3, boton.childNodes[2]);

    }

    pintar() {
        document.getElementById('mesas').innerHTML = "";
        document.getElementById('botones').innerHTML = "";
        this._carta.pintarCarta();
        this._mesas.forEach( (mesa) => {
            mesa.crearOrden();
            mesa.pintarMesa();
        });
        this._recepcion.pintarRecepcion();
        this.pintarBotones();
    }

    recibirClintes() {
        var grupo = this._recepcion.getGrupo();
        for (var j = 0; j < this._mesas.length; j++) {
            var mesa = this._mesas[j];

            if (mesa._ocupada == false) {

                if (grupo[0]){

                    if (grupo[0]._clientes.length <= mesa._capacidad) {
                        mesa._personas = grupo[0]._clientes;
                        mesa._ocupada = true;
                        break;
                    }
                }
            }
        }
    }

    tomarOrden() {
        for (var j = 0; j < this._mesas.length; j++) {
            var mesa = this._mesas[j];

            if (mesa._ocupada == true) {
                for (var i = 0; i < mesa._ordenes.length; i++) {
                    var orden = mesa._ordenes[i];

                    for (var a = 0; a < orden._bebidas.length; a++) {
                        var bebida = orden._bebidas[a];
                    }

                    for (var b = 0; b < orden._comidas.length; b++) {
                        var bebida = orden._comidas[b];
                    }

                }
            }
        }
    }
}

let restaurante = null;

window.onload = () => {
    restaurante = new Restaurante();
    restaurante.iniciarIntervalo();
};



