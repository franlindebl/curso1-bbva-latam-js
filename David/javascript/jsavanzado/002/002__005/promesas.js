promesas.js
var promiseCount = 0;

function testPromise() {
  var thisPromiseCount = ++promiseCount;

  console.log(thisPromiseCount + " Comenzó la ejecución del código principal");
  var p1 = new Promise(
    function(resolve, reject) {
      console.log(thisPromiseCount + " Comenzó la promesa a ejecutarse");

      setTimeout(
        function() {
          resolve(thisPromiseCount);
        }, Math.random() * 3000 + 2000
      );
    }
  );
  p1.then(
    function(val) {
      console.log(val + " La promesa se ha resuelto");
    })
  .catch(
    function(reason) {
      console.log(" La promesa ha sido rechazada (" + reason + ") aquí.");
    }
  );
  console.log(thisPromiseCount + " Fin del código principal");
}

testPromise();testPromise();testPromise();testPromise();testPromise();testPromise();​

