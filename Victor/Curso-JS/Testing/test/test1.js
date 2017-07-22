var assert = require('chai').assert;
var Calculadora = require('../app/calculadora');

describe("Conjunto de Tests de la calculadora: ", function () {
    it("Comprobación de suma mediante assert.equal: ",
        function () {
            let miCalculadora = new Calculadora();
            
            let resultado = miCalculadora.sumar(10, 5);

            assert.equal(resultado, 15);
        }
    );

    it("Comprueba que si al pasarle un string lanzar un error",
        function(){
            let miCalculadora = new Calculadora();

            var test = function(){
                let resultado = miCalculadora.sumar("Fran", 23125);
            };

            assert.throws(test, "Debes mandar numeros");
        }
    );

}
);