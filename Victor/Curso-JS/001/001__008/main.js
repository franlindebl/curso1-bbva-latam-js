function calculaMedia(cadena){
    var suma = 0;
    var array = cadena.split(':');
    console.log(array);
    array = quitarRepetidos(array);
    console.log(array);
    for(var i=0; i<array.length; i++){
       suma = suma + (array[i]*1); 
    }

    return suma / array.length;
}

function quitarRepetidos(array){
    var arrayFinal = [];

    arrayFinal.push(array[0]);

    for(var i=1; i<array.length; i++){
        if(!buscarDuplicados(arrayFinal,array[i])){
           arrayFinal.push(array[i]); 
        }
    }

    return arrayFinal;
}

function buscarDuplicados(arrayFin,valor){
    for(var i=0; i<arrayFin.length; i++){
        if( arrayFin[i]==valor ){
            console.log(arrayFin[i]);
            return true;
        }
    }

    return false;
}

//var stringDeNumeros = '80:70:90:100';
//console.log(calculaMedia(stringDeNumeros));

//Bonus
//La misma funcionalidad pero eliminando los repetidos
var stringDeNumeros = '80:70:90:100:100:100';
console.log(calculaMedia(stringDeNumeros));
// también deberá devolver 85