class Restaurante{
    constructor(){
        this.id = generarIdAleatorio();
        this.generarMesasAleatorio();
        this.generarCamarerosAleatorio();
        this.generarCartaAleatorio();
        this.pintarEstructuraPrincipalConBotones();
    }

    iniciarIntervalo(){
        window.setInterval( () => this.ejecutarCiclo(), 2000);
    }

    ejecutarCiclo(){
        this.pintar();
    }

    pintar(){
        this._carta.pintar();
        this._mesas.forEach( (mesa) => mesa.pintar());
        this._recepcion.pintar();
    }

    pintarEstructuraPrincipalConBotones(){
        
    }
}

let miRestaurante = null;

window.onload = () => {
    miRestaurante = new Restaurante();
    miRestaurante.iniciarIntervalo();
};

// NI UNA SOLA REFERENCIA MÁS A miRestaurante