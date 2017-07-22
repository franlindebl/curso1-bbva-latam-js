var Gestion = function() {
}
Gestion.prototype.gestionLlamadas = (function() {
    var suscriptores = {};

    function suscribe(event, callback) {

        if (!suscriptores[event]) {
            var suscriptorArray = [callback];
            suscriptores[event] = suscriptorArray;
        } else {

            suscriptores[event].push(callback);
        }
    }

    function publish(event, data) {

        if (suscriptores[event]) {
            suscriptores[event].forEach(function(callback) {
                callback(data);

            });
        }
    }
    return {
        pub: publish,
        sub: suscribe
    };
})();

var Mensaje = function(origen, mensaje, destino) {
    this.origen = origen;
    this.destino = destino;
    this.mensaje = mensaje;
    this.estado = "";
}
Mensaje.prototype.recibeMensaje = function(recibirMensaje) {
        //console.log("mensaje : ", recibirMensaje);
        pintarMensaje(recibirMensaje.origen, recibirMensaje.mensaje, true);
        pintarMensaje(recibirMensaje.destino, recibirMensaje.mensaje, false);
};

var llamada = new Gestion();
var mensaje = new Mensaje();

llamada.gestionLlamadas.sub("recibir", function(data){mensaje.recibeMensaje(data);});



function enviarMensaje(origen, destino) {
    var mensaje = getMensaje(origen);
    llamada.gestionLlamadas.pub("recibir", new Mensaje(origen, mensaje, destino));
}
