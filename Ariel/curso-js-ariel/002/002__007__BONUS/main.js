// enviarMensaje = function(idIphone) {
//     // CAMBIARLO
//     var mensaje = getMensaje(idIphone);
//     console.log("Mensaje enviado por: " + idIphone);
//     console.log(mensaje);
// }


// var test = function(){
// 	pintarMensaje("iphone1", "hola xanxooooos", true, null);
// 	pintarMensaje("iphone1", "hola tío", false, "xanxo 1");
// 	pintarMensaje("iphone1", "hola ke ase", false, "xanxo 2");
// 	pintarMensaje("iphone1", "hellooooo !!", false, "xanxo 3");
// 	pintarMensaje("iphone1", "que tal están?", true, null);
// }

var pubsub = (function() {
    var suscriptores = {};
    function subscribe(event, callback) {
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
        sub: subscribe
    }
}());

pubsub.sub("enviarMensajeAOtro", function (e) {
    if (!(e.mensaje.destinatario == "TODOS")) {
        if (e.telefonoId == "iphone1") {
            pintarMensaje("iphone1", e.mensaje.mensaje, true, "xanxo 1");
            pintarMensaje(e.mensaje.destinatario, e.mensaje.mensaje, false, "xanxo 1");
        }
        if (e.telefonoId == "iphone2") {
            pintarMensaje("iphone2", e.mensaje.mensaje, true, "xanxo 2");
            pintarMensaje(e.mensaje.destinatario, e.mensaje.mensaje, false, "xanxo 2");
        }
        if (e.telefonoId == "iphone3") {
            pintarMensaje("iphone3", e.mensaje.mensaje, true, "xanxo 3");
            pintarMensaje(e.mensaje.destinatario, e.mensaje.mensaje, false, "xanxo 3");
        }
        if (e.telefonoId == "iphone4") {
            pintarMensaje("iphone4", e.mensaje.mensaje, true, "xanxo 4");
            pintarMensaje(e.mensaje.destinatario, e.mensaje.mensaje, false, "xanxo 4");
        }
    } else {
        if (e.telefonoId == "iphone1") {
            pintarMensaje("iphone1", e.mensaje.mensaje, true, "xanxo 1");
            pintarMensaje("iphone2", e.mensaje.mensaje, false, "xanxo 1");
            pintarMensaje("iphone3", e.mensaje.mensaje, false, "xanxo 1");
            pintarMensaje("iphone4", e.mensaje.mensaje, false, "xanxo 1");
        }
        if (e.telefonoId == "iphone2") {
            pintarMensaje("iphone1", e.mensaje.mensaje, false, "xanxo 2");
            pintarMensaje("iphone2", e.mensaje.mensaje, true, "xanxo 2");
            pintarMensaje("iphone3", e.mensaje.mensaje, false, "xanxo 2");
            pintarMensaje("iphone4", e.mensaje.mensaje, false, "xanxo 2");
        }
        if (e.telefonoId == "iphone3") {
            pintarMensaje("iphone1", e.mensaje.mensaje, false, "xanxo 3");
            pintarMensaje("iphone2", e.mensaje.mensaje, false, "xanxo 3");
            pintarMensaje("iphone3", e.mensaje.mensaje, true, "xanxo 3");
            pintarMensaje("iphone4", e.mensaje.mensaje, false, "xanxo 3");
        }
        if (e.telefonoId == "iphone4") {
            pintarMensaje("iphone1", e.mensaje.mensaje, false, "xanxo 4");
            pintarMensaje("iphone2", e.mensaje.mensaje, false, "xanxo 4");
            pintarMensaje("iphone3", e.mensaje.mensaje, false, "xanxo 4");
            pintarMensaje("iphone4", e.mensaje.mensaje, true, "xanxo 4");
        }
    }
});

enviarMensaje = function(idIphone) {

    // CAMBIARLO
    var id = idIphone
    var mensaje = getMensaje(idIphone);
    console.log("Mensaje enviado por: " + idIphone);
    var conver ={
        telefonoId: idIphone,
        mensaje: mensaje
    }
    console.log(conver);
    pubsub.pub('enviarMensajeAOtro',conver);

}