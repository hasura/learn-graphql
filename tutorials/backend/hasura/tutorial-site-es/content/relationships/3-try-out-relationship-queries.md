---
title: "Prueba de las consultas de relaciones"
metaTitle: "Prueba de las consultas de relaciones | Tutorial de GraphQL de Hasura"
metaDescription: "Explore las API de GraphQL para las tareas pendientes de la tabla con consultas y datos anidados mediante el uso del motor de GraphQL de Hasura"
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

![consulta de relaciones](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/graphiql-relationship-query.png)

Como puede ver, en la misma respuesta obtiene los resultados para la información del usuario, exactamente como lo consultó. Este es un ejemplo de una relación de objeto/consulta de uno a uno.
