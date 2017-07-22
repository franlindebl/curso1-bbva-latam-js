var prhase = ["Esta es una frase", "Esta frase es aun mas larga", "corta"];

var calcultateLength = function(prhase) {
    var longitudMax = 0;
    for (var i = 1; i < prhase.length; i++) {
        //console.log(prhase[i].length);
        var frase = prhase[i].length;
        if (frase > longitudMax) {
            longitudMax = frase;
        }
        return longitudMax
    }
}

calcultateLength(prhase);
