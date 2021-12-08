---
title: "Fetch todos - query"
metaTitle: "Consulta para obtener todo | Tutorial de Ganchos de Apolo Reaccionar con GraphQL"
metaDescription: "GraphQL Query para buscar todos personales. Prueba la consulta en GraphiQL, pasando el token de Autorización para obtener resultados autenticados"
---

La primera consulta de graphql que escribirá será para buscar a todos personales. Deberá cargar los datos todo desde la base de datos que pertenece al usuario que ha iniciado sesión. Definamos una consulta de graphql para obtener los datos requeridos.

```graphql
query getMyTodos {
  todos(where: { is_public: { _eq: false} }, order_by: { created_at: desc }) {
    id
    title
    created_at
    is_completed
  }
}
```

[Prueba](https://hasura.io/learn/graphql/graphiql) esta consulta en GraphiQL contra la base de datos de aplicaciones para ver cómo se ve la respuesta.

**Nota**: Debe pasar el `Authorization: Bearer <token>`encabezado antes de consultar para obtener los resultados. El token se rellena automáticamente en la interfaz de usuario después de iniciar sesión vía Auth0.

Esta consulta es la consulta gráfica real que vamos a utilizar en nuestra aplicación de reaccionar y por lo tanto probarlo para asegurarse de que funcione como se esperaba.

Ahora integremos esta consulta de graphql en nuestra aplicación de react.