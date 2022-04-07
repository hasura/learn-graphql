---
title: "Introducción a GraphQL"
metaTitle: "Introducción a GraphQL | Tutorial de Hooks Apollo con React en GraphQL"
metaDescription: "¿Qué es GraphQL? GraphQL es una especificación de cómo hablar con una API. Esta parte también cubre GraphQL frente a REST con un ejemplo y repasa las ventajas de GraphQL"
---

## ¿Qué es GraphQL?
GraphQL es una especificación de cómo hablar con una API. Se utiliza normalmente sobre HTTP donde la idea principal es `POST` una «consulta» a un punto de conexión HTTP, en lugar de dirigirse a diferentes puntos de conexión HTTP para buscar diferentes recursos.

GraphQL ha sido diseñada para que los desarrolladores de aplicaciones web/móviles (clientes HTTP) puedan hacer llamadas de API para obtener los datos exactos que necesiten de sus API de backend.

## GraphQL frente a REST: un ejemplo
Supongamos que tiene una API para buscar el perfil de un usuario y su dirección. En un escenario típico de REST, este sería el aspecto de la solicitud/respuesta:

![Ejemplo de la API de GraphQL](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/rest-api.png)

Si el servidor de la API fuera un servidor de GraphQL, las llamadas de la API se verían así:

![Ejemplo de la API de GraphQL](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphql-api.gif)

Puede ver que la respuesta de JSON es diferente para las distintas «consultas» que envía el cliente.

```
Request1:         |  Response1:

query {           |  {
  user (id: 1) {  |    "user": {
    id            |       "id": 1
  }               |     }
}                 |  }

----------------------------------------

Request2:         |   Response2:

query {           |   {
  user (id: 1) {  |     "user": {
    id            |       "id": 1
    name          |       "name": "Elmo"
  }               |     }
}                 |   }
```

## Pensar en GraphQL

Estamos cambiando la forma en que pensamos sobre las llamadas de API. En lugar de hacer diferentes llamadas de API
 a distintas direcciones URL para obtener datos, estamos haciendo consultas ad-hoc a un «punto de conexión
 URL único» que nos devuelve datos basados en la consulta.
- En lugar de obtener (GET) un recurso, publicamos (POST) una consulta que describe los datos que
    queremos.
- Consideramos los datos que nos devuelve nuestra API como un «gráfico», y esto nos permite hacer
    consultas para obtener datos «relacionados» con una sola acción. En el ejemplo
    anterior, obtenemos el usuario y la dirección del usuario (como objeto JSON anidado)
    en la misma llamada de API, en lugar de hacer 2 llamadas de API.
- La «consulta» (query) que enviamos en forma de datos en la solicitud POST tiene una estructura y una sintaxis.
    Este «idioma» se llama GraphQL.

Como puede ver en el ejemplo anterior, las consultas de GraphQL aparecen ordenadas y fáciles de
 leer. Esto se debe a que la consulta es la «forma» de los datos JSON finales deseados.
 Esta es una de las principales razones por las que trabajar con GraphQL es un placer.

## Ventajas de GraphQL

- **Evitar el exceso de obtención**: evitará obtener más datos de los que necesite porque
    podrá especificar los **campos** necesarios exactos.
- **Evitar las llamadas múltiples a la API**: en caso de que necesite más datos, podrá también evitar
    realizar llamadas múltiples a su API. En el caso anterior, no necesitará realizar
    2 llamadas de API para obtener `user` y `address` por separado.
- **Menos comunicación con los desarrolladores de API**: de vez en cuando, para obtener los datos exactos
    que necesita, especialmente en caso de que quiera obtener más datos evitando realizar múltiples llamadas a la API,
    necesitará pedirles a los desarrolladores de su API que generen una API nueva. Con GraphQL,
    su trabajo es *independiente* del equipo de la API. Esto le permite trabajar más rápido en su
    aplicación.
- **Autodocumentación**: cada API de GraphQL se adapta a un «esquema», el modelo gráfico
    de datos, y al tipo de consultas que pueda realizar un cliente. Esto permite a la comunidad
    generar montones de herramientas interesantes para explorar y visualizar su API o crear complementos IDE
    que completen automáticamente sus consultas GraphQL e incluso hagan «codegen». Veremos esto en
    mayor detalle más adelante.

Aquí hay un gráfico rápido para mostrarle los análogos GraphQL de los típicos términos tipo REST:

| Requisito | REST | GraphQL |
| :-- | :-- | :-- |
| Búsqueda de objetos de datos | GET | query |
| Escritura de datos | POST | mutation |
| Actualización/eliminación de datos | PUT/PATCH/DELETE | mutation |
| Observación/suscripción a los datos | - | subscription |
