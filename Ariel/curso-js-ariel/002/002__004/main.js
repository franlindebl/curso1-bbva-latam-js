// -------- 1 --------
// function loadScript ( src,callback) {
//     var elem = document.createElement('script');
//     elem.setAttribute('type','text/javascript');
//     elem.setAttribute('src',src);
//     elem.onload = function () {
//         callback(src);
//     };
//     document.documentElement.insertBefore(elem,null);
// }

// -------- 2 --------
// function miCallBack(src) {
//     console.log("Hemos cargado " + src);
//     console.log(jQuery);
// }

// function testCallBack() {
//     loadScript('http://code.jquery.com/jquery-3.2.1.slim.min.js', miCallBack);
// }

// -------- 3 --------
// function loadScript ( src,callback) {
//     var elem = document.createElement('script');
//     elem.setAttribute('type','text/javascript');
//     elem.setAttribute('src',src);
//     document.documentElement.insertBefore(elem,null);
//     console.log("Hemos cargado " + src);
//     console.log(jQuery);
// }

// function testCallBack() {
//     loadScript('http://code.jquery.com/jquery-3.2.1.slim.min.js');
// }

// -------- 4 --------
// function loadScript ( src,callback) {
//     var elem = document.createElement('script');
//     elem.setAttribute('type','text/javascript');
//     elem.setAttribute('src',src);
//     elem.onload = function () {
//         callback(src);
//     };
//     elem.onerror = function () {
//         callback("Error al cargar" + src, null);
//     };
//     document.documentElement.insertBefore(elem,null);
// }

// function miCallBack(error, data) {
//     if (error){
//         console.log(error);
//     } else {
//         console.log("Hemos cargado " + data);
//         console.log(jQuery);
//     }
// }

// function testCallBack() {
//     loadScript('https://code.jquery.com/jquery-3.2.1.slim.min.js', miCallBack);
// }

// function testCallBackConError() {
//     loadScript('https://urlque.noexiste', miCallBack);
// }

// -------- 5 --------
// function loadScript ( src ) {
//     var promesa = new Promise ( function (resolve, reject) {
//         var elem = document.createElement('script');
//         elem.setAttribute('type','text/javascript');
//         elem.setAttribute('src',src);
//         elem.onload = function () {
//             resolve(src);
//         };
//         elem.onerror = function () {
//             reject("Error al cargar " + src, null);
//         };
//         document.documentElement.insertBefore(elem,null);
//     });
//     return promesa;
// }

// function testPromesa() {
//     loadScript('https://code.jquery.com/jquery-3.2.1.slim.min.js').then(
//         function (result) {
//             console.log("Hemos cargado " + result);
//             console.log(jQuery);
//         }
//         ).catch(
//         function (error) {
//             console.error(error);
//         }
//         );
// }

// function testPromesaConError() {
//     loadScript('https://urlque.noexiste').then(
//         function (result) {
//             console.log("Hemos cargado " + result);
//         }
//         ).catch(
//         function (error) {
//             console.error(error);
//         }
//         );
// }

// -------- 6 --------
// function loadScript ( src ) {
//     var promesa = new Promise ( function (resolve, reject) {
//         var elem = document.createElement('script');
//         elem.setAttribute('type','text/javascript');
//         elem.setAttribute('src',src);
//         elem.onload = function () {
//             resolve(src);
//         };
//         elem.onerror = function () {
//             reject("Error al cargar " + src, null);
//         };
//         document.documentElement.insertBefore(elem,null);
//     });
//     return promesa;
// }

// function testMultiPromesa() {
//     var promesa1 = loadScript('https://code.jquery.com/jquery-3.2.1.slim.min.js');

//     var promesa2 = loadScript('https://cdn.jsdelivr.net/g/lodash@4(lodash.min.js+lodash.fp.min.js)');

//     var promesa3 = loadScript('https://nofunciona1.com');

//     var promesa4 = loadScript('https://nofunciona2.com');

//     Promise.all([promesa1,promesa2,promesa3,promesa4]).then(
//         function (result) {
//             console.log("Se han cargado correctamente");
//             console.log(result);
//         },
//         function (error) {
//             console.error(error);
//         }
//         );
// }

// -------- 7 --------
// function loadScript ( src ) {
//     var promesa = new Promise ( function (resolve, reject) {
//         var elem = document.createElement('script');
//         elem.setAttribute('type','text/javascript');
//         elem.setAttribute('src',src);
//         elem.onload = function () {
//             resolve(src);
//         };
//         elem.onerror = function () {
//             reject("Error al cargar " + src, null);
//         };
//         document.documentElement.insertBefore(elem,null);
//     });
//     return promesa;
// }

// function testMultiPromesa() {
//     var promesa1 = loadScript('https://code.jquery.com/jquery-3.2.1.slim.min.js').catch(
//         function (error) {
//             console.log("Ha ocurrido un error en promesa 1");
//             throw (error);
//         }
//         );

//     var promesa2 = loadScript('https://cdn.jsdelivr.net/g/lodash@4(lodash.min.js+lodash.fp.min.js)').catch(
//         function (error) {
//             console.log("Ha ocurrido un error en promesa 2");
//             throw (error);
//         }
//         );

//     var promesa3 = loadScript('https://nofunciona1.com').catch(
//         function (error) {
//             console.log("Ha ocurrido un error en promesa 3");
//             throw (error);
//         }
//         );

//     var promesa4 = loadScript('https://nofunciona2.com').catch(
//         function (error) {
//             console.log("Ha ocurrido un error en promesa 4");
//             throw (error);
//         }
//         );

//     Promise.all([promesa1,promesa2,promesa3,promesa4]).then(
//         function (result) {
//             console.log("Se han cargado correctamente");
//             console.log(result);
//         },
//         function (error) {
//             console.error(error);
//         }
//         );
// }

// window.onload = function(){
//     var header =document.querySelector('header');
//     header.addEventListener('click', function(e){
//         console.log('HEADER: Has clickado en ' + e.target.nodeName);
//         e.stopPropagation();
//     });

//     var body =document.querySelector('body');
//     body.addEventListener('click', function(e){
//         console.log('BODY: Has clickado en ' + e.target.nodeName);
//     });
// }
// var pubsub = null;
// window.onload = function(){
//     pubsub = (function() {
//         var subscriptores = {};
//         function subscribe(event,callback) {
//             if (!subscriptores[event]) {
//                 var subscriptoresArray = [callback];
//                 subscriptores[event] = subscriptoresArray;
//             } else {
//                 subscriptores[event].push(callback);
//             }
//         }
//         function publish(event) {
//             if (subscriptores[event]) {
//                 subscriptores[event].forEach(function (callback) {
//                     callback();
//                 });
//             }
//         }
//         return {
//             pub: publish,
//             sub: subscribe
//         };
//     }());
// }

// pubsub.sub('miEvento', function(e){
//     console.log("Mi evento a sido lanzado");
// });

// pubsub.pub('miEvento');

// var pubsub;
// window.onload = function(){
//     pubsub = (function(){
//         var suscriptores = {};
//         function subscribe(event, callback){
//             if(!suscriptores[event]){
//                 var suscriptorArray = [callback];
//                 suscriptores[event] = suscriptorArray;
//             } else {
//                 suscriptores[event].push(callback);
//             }
//         }
//         function publish(event, data){
//             if(suscriptores[event]){
//                 suscriptores[event].forEach(function(callback){
//                     callback(data);
//                 });
//             }
//         }
//         return {
//             pub: publish,
//             sub: subscribe
//         }
//     }());
//     pubsub.sub('miEvento', function(e){
//         console.log('Mi evento ha sido lanzado!')
//     });
//     var data = "Un texto!!";
//     pubsub.pub('miEvento', data);
// }

// var pubsub;
// window.onload = function(){
//     pubsub = (function(){
//         var suscriptores = {};
//         function subscribe(event, callback){
//             if(!suscriptores[event]){
//                 var suscriptorArray = [callback];
//                 suscriptores[event] = suscriptorArray;
//             } else {
//                 suscriptores[event].push(callback);
//             }
//         }
//         function publish(event, data){
//             if(suscriptores[event]){
//                 suscriptores[event].forEach(function(callback){
//                     callback(data);
//                 });
//             }
//         }
//         return {
//             pub: publish,
//             sub: subscribe
//         }
//     }());

//     var functionALaQueMeVanALlamar = function (info) {
        
//     }

//     pubsub.sub('miEvento', function(e){
//         console.log('Mi evento ha sido lanzado!')
//     });
//     var data = "Un texto!!";
//     pubsub.pub('miEvento', data);
// }
