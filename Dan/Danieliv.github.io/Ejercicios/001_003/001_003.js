var prhase = ["Es", "1234567890", "corta"];

var calcultateLength = function(prhase) {
  var longitudMax = 0;
  for (var i = 0; i < prhase.length; i++) {
    var frase = prhase[i].length;
    if (frase > longitudMax) {
      longitudMax = frase;
    }
  }
  return longitudMax
}

calcultateLength(prhase);
