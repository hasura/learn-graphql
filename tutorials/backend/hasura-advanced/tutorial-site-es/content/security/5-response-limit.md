---
title: "Limitación de respuestas"
metaTitle: "Limitación de respuestas | Tutorial avanzado de Hasura GraphQL"
metaDescription: "Podemos restringir la cantidad de datos a los que puede accederse con una única petición, mediante la limitación de respuestas. Además de la limitación de frecuencia, la limitación de respuestas también es importante para no generar cuellos de botella en la base de datos"
---

Una vez haya configurado los límites de la API, también contará con el privilegio de limitar el número de filas devueltas, y el acceso, además, a las consultas de agregación.

Supongamos que tiene un límite de frecuencia de 100 peticiones/minuto. Pero, ¿qué pasa si con cada petición se obtienen datos equivalentes a miles de filas de la base de datos? Esto se convertiría en un cuello de botella para la base de datos.

Podemos restringir la cantidad de datos a la que puede accederse con una única petición mediante la limitación de respuestas.
 Esto puede configurarse en la capa de los permisos basados en roles.

En nuestro modelo de slack de ejemplo, si quisiéramos restringir `channel_thread` para que solo devuelva un máximo de 100 filas en cualquier momento dado, lo que haríamos entonces sería configurar un límite de permisos como a continuación:

Diríjase a la tabla `channel_thread` y a la pestaña `Permissions` en la consola Hasura.

![Limitación de respuestas en los hilos del canal](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/channel-thread-response-limit.png)

En `Row Select Permissions`, configure la `Limit` para que sea 100 o cualquier valor deseado.

Por defecto, no pueden hacerse consultas de agregación. Es necesario habilitarlo de forma explícita en los permisos de los roles. Esto sirve para garantizar que los datos, como `count`, no queden expuestos con facilidad al usuario que realiza la petición.
