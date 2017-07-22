var pubsub = (function () {
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
            suscriptores[event].forEach(function (callback) {
                // console.info('Que llego: ',data);
                callback(data);
            });
        }
    }

    return {
        pub: publish,
        sub: subscribe
    }
}());