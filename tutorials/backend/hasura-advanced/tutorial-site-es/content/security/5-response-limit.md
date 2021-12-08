---
title: "Limitación de respuesta"
metaTitle: "Limit Tutorial avanzado de Hasura GraphQL."
metaDescription: "Podemos restringir la cantidad de datos que se puede acceder en una sola solicitud a través de los límites de respuesta. Además de limitar la tarifa, la limitación de la respuesta es importante para no crear un cuello de botella de la base de datos"
---

Una vez que haya configurado límites de API, también tiene el lujo de limitar el número de filas devueltas, y el acceso a consultas de agregación encima de esto.

Supongamos que tienes un límite de tasa de 100 req/min. Pero ¿qué pasa si cada solicitud obtiene datos que valen miles de filas de la base de datos. Esto se convertiría en un cuello de botella para la base de datos.

Podemos restringir la cantidad de datos que se puede acceder en una sola solicitud a través de los límites de respuesta. Esto se puede configurar en la capa de permisos basada en rol.

`channel_thread`En nuestro ejemplo de modelo de slack, si queremos restringir devolver solo un máximo de 100 filas en cualquier momento, entonces podemos configurar eso usando Limit en permisos como a continuación:

Dirígete a la `channel_thread`mesa y a la `Permissions`pestaña de la Consola Hasura.

![Límite de respuesta de hilo de canal](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/channel-thread-response-limit.png)

En `Row Select Permissions`, configure el `Limit`para ser 100 o a cualquier valor deseado.

De forma predeterminada, no se pueden realizar consultas de agregación. Debe habilitarse explicablemente bajo permisos de rol. Esto es para garantizar que los datos como no se `count`expongan fácilmente al usuario que realiza la solicitud.
