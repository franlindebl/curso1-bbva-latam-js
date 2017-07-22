var nombresPersonas = ["Victor", "Omar", "Karen", "Ariel", "Omar", "David", "Esteban", "Matías", "Vlairner", "Lucy", "Ignacio", "Humberto", "Néstor", "Daniel", "Raymundo", "Fran"];
var nacionalidadPersonas = ["Mexico", "España", "Chile", "Brasil", "Peru", "Alemania"];

var Persona = function () {
    this._nombre = "";
    this._edad = 0;
    this._nacionalidad = "";
    this._altura = 0;
    this._peso = 0;
}

var Mensaje = function (mensaje, origen, destinatarios) {
    this._mensaje = "";
    this._origen = "";
    this._destinatarios = [];
}

Mensaje.prototype.crearMensaje = function (mensaje, origen, destinatarios){
    this._mensaje = mensaje;
    this._origen = origen;
    this._destinatarios = destinatarios;
}

var Dispositivo = function (imei, numeroTelefonico) {
    this._imei = imei;
    this._numeroLinea = numeroTelefonico;
}

Dispositivo.prototype.enviarMensaje = function (destinatarios) {
    if (destinatarios != null) {
        // console.log(this._numeroLinea);
        var mensaje = getMensaje(this._numeroLinea);
        console.info("Mensaje enviado por: " + this._numeroLinea + " mensaje: " + mensaje);
        console.info("destinatarios: ",destinatarios);

        var objMensaje = new Mensaje();
        objMensaje.crearMensaje(mensaje, this._numeroLinea, destinatarios);
        // console.info('objMensaje: ',objMensaje);
        for (var d = 0; d < destinatarios.length; d++) {
            pubsub.pub(destinatarios[d], objMensaje);
        }
    }
}

Dispositivo.prototype.registrarCanal = function () {
    pubsub.sub(this._numeroLinea,
        function (objMensaje) {
            // console.info('objMensaje._destinatarios: ', objMensaje._destinatarios);
            pintarMensaje(objMensaje._origen, objMensaje._mensaje, true);
            for (var d = 0; objMensaje._destinatarios.length; d++) {
                // console.info('destino: ',destino);
                pintarMensaje(objMensaje._destinatarios[d], objMensaje._mensaje, false);
            }
        });
}

var Usuario = function () {
    this._nombre = getNombreAleatorio(nombresPersonas);
    this._edad = getRandomInteger(1, 50);
    this._nacionalidad = getNombreAleatorio(nacionalidadPersonas);
    this._altura = getRandomInteger(150, 210);
    this._peso = getRandomInteger(50, 95);

    this._ID = getRandomInteger(1, 1000000);
    this._numeroTelefonico = null;
    this._dispositivo = [];
}

Usuario.prototype = new Persona();

Usuario.prototype.agregarDispositivo = function (imei, numeroTelefonico) {
    this._dispositivo.push(new Dispositivo(imei, numeroTelefonico));
}

var CompaniaTelefonica = function (id, nombre) {
    this._ID = id;
    this._nombre = nombre;
    this._usuarios = [];
}

var miCompania = new CompaniaTelefonica('ID_XANXO', 'xanxo');

//for (var u = 0; u < 2; u++) {
miCompania._usuarios.push(new Usuario());
//this._usuarios[u].agregarDispositivo(getRandomInteger(100000000, 999999999), getRandomInteger(5500000000, 5599999999));
miCompania._usuarios[0].agregarDispositivo(getRandomInteger(100000000, 999999999), 'iphone1');
miCompania._usuarios[0]._dispositivo[0].registrarCanal();

miCompania._usuarios.push(new Usuario());
miCompania._usuarios[1].agregarDispositivo(getRandomInteger(100000000, 999999999), 'iphone2');
miCompania._usuarios[1]._dispositivo[0].registrarCanal();
    //}

// console.info(miCompania._usuarios[0]._dispositivo[0]);

// miCompania._usuarios[0]._dispositivo[0].enviarMensaje(['d5555555502']);



/*
enviarMensaje = function(idIphone) {
    // CAMBIARLO
    var mensaje = getMensaje(idIphone);
    console.log("Mensaje enviado por: " + idIphone);
    console.log(mensaje);
    pubsub.pub("incendioApagado", a);
}

var test = function() {

    pintarMensaje("iphone1", "mensaje de test", true);
    pintarMensaje("iphone1", "mensaje de test", true);
    pintarMensaje("iphone1", "mensaje de test", true);
    pintarMensaje("iphone1", "mensaje de test", false);
    pintarMensaje("iphone1", "mensaje de test", true);

}

pubsub.pub("incendioApagado", a);
pubsub.sub("alertaIncendio", function (e) { miParque.moverBomberos(e); });
*/