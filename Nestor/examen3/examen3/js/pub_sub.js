var pubsub = null;

    console.log("On load");
    pubsub = (function() {

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
    }());


   

    




