---
title: "Tiempos de espera"
metaTitle: "Tiempos de espera | Tutorial avanzado de Hasura GraphQL"
metaDescription: "El otro vector de ataque sería realizar una consulta que tarde mucho tiempo en ejecutarse. A grandes rasgos, existen dos tipos de tiempos de espera: los tiempos de espera de la base de datos y los tiempos de espera HTTP"
---

El otro vector de ataque sería realizar una consulta que tarde mucho tiempo en ejecutarse. A grandes rasgos, existen dos tipos de tiempos de espera:

*Tiempo de espera de la base de datos*: en caso de que una conexión a la base de datos o una consulta tarden mucho tiempo en responder, Hasura puede devolver un error de tiempo de espera. Existe un ajuste statement_timeout en Postgres para abortar la ejecución de cualquier sentencia si tarda más tiempo de los milisegundos especificados. Esta no es más que una configuración en la capa de la base de datos (Postgres, en este caso).

*Tiempo de espera HTTP*: en caso de utilizar Acciones/Esquemas remotos/Eventos, habrá configurado los puntos de conexión http para las solicitudes respectivas. También puede configurarse un ajuste de tiempo de espera para abortar la ejecución de la consulta. Los puntos de conexión Http realizan diferentes consultas en su lógica subyacente y se recomienda configurar un tiempo de espera para abortar las conexiones y responder rápidamente al cliente.
