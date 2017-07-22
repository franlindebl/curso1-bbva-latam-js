Vamos a hacer un restaurante:

1) Modela la clase persona (haz uso de clases de ES6). Haz que las clases Cliente y Camarero hereden de Persona.
Una Persona deberá tener:

- Nombre (Generar aleatorio)
- Edad (Aleatorio entre 20 y 60)

Un Camarero deberá tener:

- Cargo (Aleatorio: encargado/mozo)

Un Cliente deberá tener: 

- Dinero (Aleatorio: entre 0 y 1500)

2) Modela la clase Mesa que deberá tener:

- Capacidad (aleatorio entre 2 y 10)
- Un ID
- Un booleano ocupada: true/false
- Un array de personas que estén sentadas
- Un array de órdenes realizadas (ya crearemos las órdenes después)

3) Modela una clase Producto que tendrá:

- Número de existencias
- Calorías
- Precio

La clase Bebida y la clase Comida heredarán de Producto. 

Bebida tendrá:

- Booleano esAlcoholica: true/false
- Grados de alcohol

Comida tendrá:

Tipo: Entrante/Principal/Postre

4) Modela la clase Restaurante que deberá tener:

- Nombre
- Array de mesas (30 mesas)
- Array de camareros (5 camareros)
- Carta de productos (Al menos 5 bebidas y 5 Comidas)


5) Crea una instancia de Restaurante y comprueba que contiene todo lo necesario.

--------------------------------------------------------
--------------------------------------------------------

Partiendo del ejercicio anterior... Pinta el restaurante!


1) Realiza una función dentro de Mesa que devuelva el HTML de una mesa. Una mesa puede estar representada por un div con sus datos.

2) Realiza una función dentro de Restaurante que se encargue de pedir a todas las mesas el HTML y pintarlo.

3) Realiza una función dentro de Carta que devuelva un HTML con la tabla de productos y sus existencias.

4) Asocia las funciones anteriores al pintado completo del restaurante.​