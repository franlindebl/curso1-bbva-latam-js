class Calculadora {
    constructor() {

    }

    sumar(a, b) {
        return a + b;
    }

    restar(a, b) {
        return a - b;
    }
}

// We export Calculadora class so it can
// be require()'d in other files.
module.exports = Calculadora;