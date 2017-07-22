// enviarMensaje = function(idIphone) {

//     // CAMBIARLO
//     var mensaje = getMensaje(idIphone);
//     console.log("Mensaje enviado por: " + idIphone);
//     console.log(mensaje);
// }


// var test = function() {

//     pintarMensaje("iphone1", "mensaje de test", true);
//     pintarMensaje("iphone1", "mensaje de test", true);
//     pintarMensaje("iphone1", "mensaje de test", true);
//     pintarMensaje("iphone1", "mensaje de test", false);
//     pintarMensaje("iphone1", "mensaje de test", true);

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
    
    if (e == "iphone1") {
        console.log("Enviado a iphone2");
        this.tel1.recibirMensaje(e);
    }
    if (e == "iphone2") {
        console.log("Enviado a iphone1");
        this.tel2.recibirMensaje(e);
    }
});

enviarMensaje = function(idIphone) {

    // CAMBIARLO
    var id = idIphone
    var mensaje = getMensaje(idIphone);
    console.log("Mensaje enviado por: " + idIphone);
    
    if (id == "iphone1") {
        this.tel1.telefonoId = id;
        this.tel1.mensaje = mensaje;
    }
    if (id == "iphone2") {
        this.tel2.telefonoId = id;
        this.tel2.mensaje = mensaje;
    }

    pubsub.pub('enviarMensajeAOtro',id);

}

var Telefono = function () {
    this.telefonoId = "";
    this.mensaje = "";
}

Telefono.prototype.recibirMensaje = function (e) {
    if (e == "iphone1") {
        pintarMensaje("iphone1", tel1.mensaje, true);
        pintarMensaje("iphone2", tel1.mensaje, false);
    }
    if (e == "iphone2") {
        pintarMensaje("iphone2", tel2.mensaje, true);
        pintarMensaje("iphone1", tel2.mensaje, false);
    } 
}

var tel1 = new Telefono();
var tel2 = new Telefono();






// var Usuario = function (idIphone) {
//     this.telefonoId = idIphone;
// }
// Mensaje.prototype.enviarMensajeAOtro = function () {
// }
//Mensaje.prototype = new Usuario();
