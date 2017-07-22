class Persona {
    constructor() {
        this._nombre = generarAleatorio(nombres);
        this._edad = getRandomInteger(20, 60);
    }
}

class Cliente extends Persona {
    constructor() {
        super();
        this._dinero = getRandomInteger(0, 1500);
    }
}

class Camarero extends Persona {
    constructor() {
        super();
        this._cargo = generarAleatorio(cargos);
    }
}

class Mesa {
    constructor(id, sentadas = 0) {
        this._id = id;
        this._capacidad = getRandomInteger(2, 10);
        this._sentadas = sentadas;
        if (this._sentadas > 0) {
            this._disponible = false;
        } else {
            this._disponible = true;
        }

        if (this._sentadas > 0) {
            this._ordenes = getRandomInteger(2, 10);
        } else {
            this._ordenes = 0;;
        }
    }

    getMesa() {
        let lugares = '';
        lugares = lugares + '<ul class="mesa ' + this._disponible + ' "  id = "' + this._id + '">';
        lugares = lugares + '<li class="idMesa"> Mesa ' + (this._id + 1) + ' </li>';
        lugares = lugares + '<li>Capacidad ' + this._capacidad + ' </li>';
        lugares = lugares + '<li>Personas: ' + this._sentadas + ' </li>';
        lugares = lugares + '<li>Ordenes: ' + this._ordenes + ' </li>';
        lugares = lugares + '</ul>';

        return lugares;
    }
}

class Producto {
    constructor() {
        this._existencias = getRandomInteger(0, 200);
        this._calorias = getRandomInteger(100, 1200);
        this._precio = getRandomInteger(100, 500);
    }
}

class Bebida extends Producto {
    constructor(existencias, calorias, precio) {
        super();
        this._esAlcoholica = getRandomInteger(0, 1);
        if (this._esAlcoholica) {
            this._gradosDeAlcohol = getRandomInteger(5, 30)
        } else {
            this._gradosDeAlcohol = 0;
        }
    }

    getBebida() {
        let bebidas = '';
        bebidas = bebidas + '<ul class="bebida">';
        bebidas = bebidas + '<li>Calorias ' + this._calorias + ' </li>';
        bebidas = bebidas + '<li>Precio ' + this._precio + ' </li>';
        bebidas = bebidas + '<li>Existencias ' + this._existencias + ' </li>';
        bebidas = bebidas + '<li>Es alcoholica ' + this._esAlcoholica + ' </li>';
        bebidas = bebidas + '<li>Grados de Alcohol ' + this._gradosDeAlcohol + ' </li>';
        bebidas = bebidas + '</ul>';

        return bebidas;
    }
}

class Comida extends Producto {
    constructor() {
        super();
        this._tipo = generarAleatorio(tiposComida);
    }

    getComida() {
        let comidas = '';
        comidas = comidas + '<ul class="comida">';
        comidas = comidas + '<li>Tipo: ' + this._tipo + ' </li>';
        comidas = comidas + '<li>Calorias ' + this._calorias + ' </li>';
        comidas = comidas + '<li>Precio ' + this._precio + ' </li>';
        comidas = comidas + '<li>Existencias ' + this._existencias + ' </li>';
        comidas = comidas + '</ul>';

        return comidas;
    }

}

class Carta {
    constructor() {
        this._comidas = [];
        this._bebidas = [];
        this.addComidas(getRandomInteger(3, 8));
        this.addBebidas(getRandomInteger(2, 5));
    }

    addComidas(numeroComidas) {
        for (var i = 0; i < numeroComidas; i++) {
            this._comidas.push(new Comida());
        }
        this.pintarComidas();
    }

    addBebidas(numeroBebidas) {
        for (var i = 0; i < numeroBebidas; i++) {
            this._bebidas.push(new Bebida());
        }
        this.pintarBebidas();
    }

    pintarComidas() {
        let divDeComidas = document.createElement('DIV');
        divDeComidas.setAttribute("id", "cartaComida");
        document.getElementById("carta").appendChild(divDeComidas);

        let node = document.createElement("H4");
        let textnode = document.createTextNode("Comidas");
        node.appendChild(textnode);

        document.getElementById("cartaComida").innerHTML = "";

        let divInner = "";
        for (let i = 0; i < this._comidas.length; i++) {
            let mesa = this._comidas[i];
            divInner = divInner + mesa.getComida(i);
        }
        document.getElementById("cartaComida").innerHTML = divInner;
        document.getElementById("cartaComida").appendChild(node);
    }

    pintarBebidas() {
        let divDeBebidas = document.createElement('DIV');
        divDeBebidas.setAttribute("id", "cartaBebida");
        document.getElementById("carta").appendChild(divDeBebidas);

        let node = document.createElement("H4");
        let textnode = document.createTextNode("Bebidas");
        node.appendChild(textnode);

        document.getElementById("cartaBebida").innerHTML = "";

        let divInner = "";
        for (let i = 0; i < this._bebidas.length; i++) {
            let mesa = this._bebidas[i];
            divInner = divInner + mesa.getBebida(i);
        }
        document.getElementById("cartaBebida").innerHTML = divInner;
        document.getElementById("cartaBebida").appendChild(node);
    }
}

class Restaurante {
    constructor(nombre) {
        this._nombre = nombre;
        this._mesas = [];
        this._camareros = [];
        this._carta = new Carta();
        this._recepcion = new Recepcion();
        this.addMesas(getRandomInteger(4, 8));
        this.addCamareros(getRandomInteger(1, 5));
        this.pintarEstructuraPrincipal();
    }

    addMesas(numeroMesas) {
        for (var i = 0; i < numeroMesas; i++) {
            this._mesas.push(new Mesa(i));
        }

        this.pintarMesa();
    }

    addCamareros(numeroCamareros) {
        for (var i = 0; i < numeroCamareros; i++) {
            this._camareros.push(new Camarero());
        }
    }

    pintarMesa() {
        document.getElementById("restaurante").innerHTML = "";
        let divInner = "";
        for (let i = 0; i < this._mesas.length; i++) {
            let mesa = this._mesas[i];
            divInner = divInner + mesa.getMesa(i);
        }
        document.getElementById("restaurante").innerHTML = divInner;
    }

    agregarGrupoAMesa() {
            for (let j = 0; j < this._recepcion._grupos.length; j++) {
              
                let grupo = this._recepcion._grupos[j];
                // console.log(grupo._clientes);
                if (!(grupo._clientes.length > this._mesas[j]._capacidad) && this._mesas[j]._disponible == true) {
                    this._mesas[j]._capacidad = this._mesas[j]._capacidad -  grupo._clientes.length;
                    this._mesas[j]._disponible = false;
                    this._mesas[j]._sentadas  = grupo._clientes.length;
                    this._recepcion._grupos.splice(0,1);
                    this._mesas.splice(j,1);
                    j--;
            // console.log(this._recepcion._grupos[j]._clientes);
;                } else {
                    
                }
            }

        // for (let i = 0; i < this._mesas.length; i++) {
        //     let mesa = this._mesas[i];
        //     this._mesas[i]._sentadas = this._recepcion._grupos[i]._clientes.length;
        //     this._mesas[i]._disponible = false;

        //     // console.log(this._recepcion._grupos[i]._clientes.length);
        //     // this._recepcion.pintarRecepcion();
        //     // this.pintarMesa();
        // }
    }

    pintarEstructuraPrincipal() {
        let newDiv = document.createElement('DIV');
        newDiv.setAttribute("id", "menu");
        let body = document.getElementById("carta");
        let parentBody = body.parentNode;
        parentBody.insertBefore(newDiv, body);


        let recepcion = document.createElement('div');
        recepcion.setAttribute("id", "recepcion");
        document.getElementById("body").appendChild(recepcion);

        // //Insertar boton para agregar grupos
        let button = document.createElement("BUTTON");
        let text = document.createTextNode("Agregar Grupo De Clientes");
        button.appendChild(text);
        button.addEventListener("click", () => {
            this._recepcion._grupos.push(new GrupoDePersonas());
            this._recepcion.pintarRecepcion();
        });
        document.getElementById("menu").appendChild(button);

        //Insertar boton para agregar grupos
        let button2 = document.createElement("BUTTON");
        let recibir = document.createTextNode("Recibir Grupo");
        button2.appendChild(recibir);
        button2.addEventListener("click", () => {
          this.agregarGrupoAMesa();
            this.pintarMesa();
                // console.log("Cantidad de grupos: " + this._recepcion._grupos.length);
                // console.log("Cantidad de personas en el grupo: " + primerGrupo._clientes.length);
                // console.log( this._mesas[0]._capacidad);
        });
        document.getElementById("menu").appendChild(button2);

        //Insertar boton para agregar grupos
        let button3 = document.createElement("BUTTON");
        let orden = document.createTextNode("Tomar Orden");
        button3.appendChild(orden);
        button3.addEventListener("click", () => {
            this._recepcion._grupos.push(new GrupoDePersonas());
        });
        document.getElementById("menu").appendChild(button3);

    }

    iniciarIntevalo() {
        window.setInterval(() => this.ejecutarCiclo(), 2000);
    }

    ejecutarCiclo() {
        this.pintar();
    }

    pintar() {
        // this._carta.pintar();
        // this.pintarMesa();
        // this._recepcion._grupos.push(new GrupoDePersonas());
        // this._recepcion.pintarRecepcion();
        // this.agregarGrupoAMesa();
        // this._recepcion.pintar();
    }
}

class Recepcion {
    constructor() {
        this._grupos = [];
    }
    pintarRecepcion() {
        document.getElementById("recepcion").innerHTML = "";
        let divInner = "";
        for (let i = 0; i < this._grupos.length; i++) {
            let grupo = this._grupos[i];
            divInner = divInner + grupo.getHTML();
        }
        document.getElementById("recepcion").innerHTML = divInner;
    }

    getGrupoDeClientes() {
        let grupoDeClientes = null;
        for (let i = 0; i < this._grupos.length; i++) {
            let grupo = this._grupos[i]._clientes;
            console.log(this._grupos[i]._clientes[i]);
        }
        return grupoDeClientes;
    }
}

class GrupoDePersonas {
    constructor() {
        this._clientes = [];
        this.addClienteAGrupoDePersonas(getRandomInteger(1, 5));
    }

    addClienteAGrupoDePersonas(numeroClientes) {
        for (let i = 0; i < numeroClientes; i++) {
            this._clientes.push(new Cliente());
        }
    }

    getHTML() {
        let clientes = '';
        clientes = clientes + '<ul class="grupoDePersonas">';
        clientes = clientes + '<li> Total de Personas ' + this._clientes.length + ' </li>';
        for (let i = 0; i < this._clientes.length; i++) {
            clientes = clientes + '<ul class="cliente">';
            clientes = clientes + '<li> Nombre ' + this._clientes[i]._nombre + ' </li>';
            clientes = clientes + '<li>Edad ' + this._clientes[i]._edad + ' </li>';
            clientes = clientes + '<li>Dinero ' + this._clientes[i]._dinero + ' </li>';
            clientes = clientes + '</ul>';
        }
        clientes = clientes + '</ul>';
        return clientes;
    }
}

let nombres = ["Victor", "Omar", "Karen", "Ariel", "Omar", "David", "Esteban", "Matías", "Vlairner", "Lucy", "Ignacio", "Humberto", "Néstor", "Daniel", "Raymundo", "Fran"];
let cargos = ["encargado", "mozo"];
let tiposComida = ["Entrante", "Principal", "Postre"];
let miRestaurante = null;

//Numero aleatorio 
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Nombre aleatorio
function generarAleatorio(value) {
    var numeroAleatorio = Math.floor(Math.random() * value.length);
    return value[numeroAleatorio];
}

window.onload = function() {
    miRestaurante = new Restaurante("Daniel\´s Restaurant")
    miRestaurante.iniciarIntevalo();
};
