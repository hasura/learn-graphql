---
title: "Pruebe las consultas de relaciones"
metaTitle: "Prueba las consultas de relación | Hasura"
metaDescription: "Explore las API de GraphQL para todos de la tabla con consultas y datos anidados mediante el motor Hasura GraphQL"
---

Exploremos las API de GraphQL para la relación creada.

```graphql
query {
  todos {
    id
    title
    user {
      id
      name
    }
  }
}
```

Puede ver la respuesta en el siguiente formato:

![consulta de relación](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphiql-relationship-query.png)

Como puede ver, en la misma respuesta, está obteniendo los resultados de la información del usuario, exactamente como se preguntó. Este es un ejemplo de una relación de una consulta o objeto uno-a-uno.
