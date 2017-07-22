1) Añade un sensor de fuego a uno de cada 15 árboles de forma aleatoria.

En caso de quemarse un árbol con sensor, deberá emitir una notificación al pubsub (mediante evento) 

El parque de bomberos escuchará las notificación y mandará a todos los bomberos al área



2) Cada ciclo que pase un bombero en un área con árboles encendidos, podrá apagar el fuego de 2 árboles.

Cuando se apaguen todos los árboles de un área los bomberos regresarán al parque.



3) Cada ciclo que pase un árbol apagado, pero con quemaduras, este se deberá recuperar un 10% cada ciclo.



4) Añade cierta lógica en el parque de bomberos de manera que si hay más de un fuego, 

los bomberos se dividan entre las áreas afectadas. Para ello el parque tendrá que llevar control

del número de incendios que hay. Para registrarlos lo hará mediante la notificación emitida por los 

sensores. Para saber cuándo se han apagado, recibirán una señal del área indicando que ya está todo apagado.