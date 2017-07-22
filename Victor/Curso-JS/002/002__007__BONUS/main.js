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

Mensaje.prototype.crearMensaje = function (mensaje, origen, destinatarios) {
    this._mensaje = mensaje;
    this._origen = origen;
    this._destinatarios = destinatarios;
}

var Dispositivo = function (numeroTelefonico) {
    this._idDispositivo = numeroTelefonico;
}

Dispositivo.prototype.enviarMensaje = function () {
    var mensaje = getMensaje(this._idDispositivo);
    console.info("Mensaje enviado por: " + this._idDispositivo + " mensaje: " + mensaje);

    var destinatarios = [];
    if (mensaje.destinatario == 'TODOS') {
        for (var d = 0; d < miCompania._usuarios.length; d++) {
            if (miCompania._usuarios[d]._dispositivos[0]._idDispositivo != this._idDispositivo) {
                destinatarios.push(miCompania._usuarios[d]._dispositivos[0]._idDispositivo);
            }
        }
    } else {
        destinatarios.push(mensaje.destinatario);
    }

    var objMensaje = new Mensaje();
    objMensaje.crearMensaje(mensaje.mensaje, this._idDispositivo, destinatarios);
    console.info('objMensaje: ', objMensaje);
    for (var d = 0; d < destinatarios.length; d++) {
        pubsub.pub(destinatarios[d], objMensaje);
    }
}

Dispositivo.prototype.registrarCanal = function () {
    pubsub.sub(this._idDispositivo,
        function (objMensaje) {
            console.info('objMensaje._destinatarios: ', objMensaje._destinatarios);
            pintarMensaje(objMensaje._origen, objMensaje._mensaje, true, this._idDispositivo);
            for (var d = 0; objMensaje._destinatarios.length; d++) {
                // console.info('destino: ',destino);
                pintarMensaje(objMensaje._destinatarios[d], objMensaje._mensaje, false, objMensaje._origen);
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
    this._dispositivos = [];
}

Usuario.prototype = new Persona();

Usuario.prototype.agregarDispositivo = function (numeroTelefonico) {
    this._dispositivos.push(new Dispositivo(numeroTelefonico));
}

var CompaniaTelefonica = function (id, nombre) {
    this._ID = id;
    this._nombre = nombre;
    this._usuarios = [];
}

var miCompania = new CompaniaTelefonica('ID_XANXO', 'xanxo');

miCompania._usuarios.push(new Usuario());
miCompania._usuarios[0].agregarDispositivo('iphone1');
miCompania._usuarios[0]._dispositivos[0].registrarCanal();

miCompania._usuarios.push(new Usuario());
miCompania._usuarios[1].agregarDispositivo('iphone2');
miCompania._usuarios[1]._dispositivos[0].registrarCanal();

miCompania._usuarios.push(new Usuario());
miCompania._usuarios[2].agregarDispositivo('iphone3');
miCompania._usuarios[2]._dispositivos[0].registrarCanal();

miCompania._usuarios.push(new Usuario());
miCompania._usuarios[3].agregarDispositivo('iphone4');
miCompania._usuarios[3]._dispositivos[0].registrarCanal();