/*

Ejercicio: 001_005

slip


*/



var cuentastring = function(cadena){
     var objetostring = {data : {},error:null};

    if (typeof cadena == 'string'){ 
         var objeto = {};
         var objeto = cadena.split("");
         for (var i=0; i < objeto.length; i++){
               if (objetostring.data[objeto[i]]){
                   objetostring.data[objeto[i]]++;
               }else{
                    objetostring.data[objeto[i]]=1;
               }
          }
     }else{
          objetostring.error= "No has enviado un String";
     } 



    return objetostring;
}


console.log(cuentastring("davamo"));

