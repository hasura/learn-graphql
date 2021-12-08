---
title: "Introducción a GraphQL"
metaTitle: "Introducción a la aplicación de los ganchos de Apolo de la reacción de GraphQL |"
metaDescription: "¿Qué es GraphQL? GraphQL es una especificación para cómo hablar con una API. Esta parte también cubre GraphQL vs REST con un ejemplo y te toma las ventajas de GraphQL"
---

## ¿Qué es GraphQL?
GraphQL es una especificación para cómo hablar con una API. Se usa normalmente sobre HTTP donde la idea clave es `POST`una "consulta" a un punto final HTTP, en lugar de golpear diferentes puntos finales HTTP para diferentes recursos.

GraphQL está diseñado para que los desarrolladores de aplicaciones web/móviles (clientes HTTP) puedan hacer llamadas a la API para obtener los datos que necesitan de sus API de backend convenientemente.

## GraphQL vs REST: un ejemplo
Supongamos que tiene una API para buscar el perfil de un usuario y su dirección. En un escenario típico de REST, esto es lo que la solicitud / respuesta sería como:

![Ejemplo de API de GraphQL](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/rest-api.png)

Si su servidor API era un servidor GraphQL en su lugar, esto es lo que sus llamadas API se verían:

![Ejemplo de API de GraphQL](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphql-api.gif)

Puede ver que la respuesta JSON es diferente para diferentes "consultas" enviadas por el cliente.

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

## Pensando en GraphQL

Estamos cambiando la forma en que pensamos sobre las llamadas API. En lugar de hacer diferentes API llamadas a diferentes URLs para obtener datos, estamos haciendo consultas ad hoc a un "single URL endpoint" que devuelve datos basados en la consulta.
- En lugar de 'obtener un recurso que 'POST' una consulta que describe qué datos usted - quiera.
- Piensa en los datos que devuelve tu API como un "gráfico", esto le permite hacer consultas para obtener datos "relacionados" en una sola toma. En el ejemplo arriba, obtendrá el usuario y la dirección del usuario (como un objeto JSON anidado) en la misma llamada API, en lugar de hacer 2 llamadas API.
- La "consulta" que envía como datos en la solicitud POST tiene una estructura y una sintaxis. Este "idioma" se llama GraphQL.

Como puede ver en el ejemplo anterior, las consultas GraphQL se ven muy ordenadas y fáciles de ¡Leer! Esto se debe a que la consulta es la "forma" de los datos JSON finales que desea. ¡Esta es una de las razones clave que hace de GraphQL una alegría para trabajar!

## Beneficios de GraphQL

- **Evite el exceso** de trabado: evite obtener más datos de los que necesita porque puede especificar los **campos** exactos que necesita.
- **Evitar varias llamadas de API**: En caso de que necesite más datos, también puede evitar hacer múltiples llamadas a su API. En el caso anterior, no es necesario hacer 2 llamadas API para buscar `user`y por `address`separado.
- **Comunicación menor con los desarrolladores de API**: A veces para obtener los datos exactos necesitas, especialmente si necesitas obtener más datos y quieres evitar múltiples API llamadas, necesitará pedir a sus desarrolladores de API que creen una nueva API. Con GraphQL, ¡tu trabajo es *independiente* del equipo de API! Esto le permite trabajar más rápido en su app.
- **Self-documenting**: Cada API GraphQL se ajusta a un "esquema" que es el gráfico modelo de datos y qué tipo de consultas puede hacer un cliente. Esto permite a la comunidad para crear un montón de herramientas interesantes para explorar y visualizar su API o crear plugins IDE que autocomplete sus consultas GraphQL e incluso haga "codegen". Lo entenderemos ¡en más detalle más tarde!

Aquí hay una tabla rápida para mostrarle los análogos GraphQL de términos típicos REST-ish:

| Requisito | DESCANSO | GraphQL |
| :-- | :-- | :-- |
| Objetos de datos de búsqueda | - GET | Consulta |
| Escribir datos | POST | mutación |
| Actualización/eliminación de datos | PUT/PATCH/ELIMINAR | mutación |
| Avistamiento / suscripción a los datos | - | Suscripción |
