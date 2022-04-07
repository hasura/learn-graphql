---
title: "Obtener tareas pendientes - consulta"
metaTitle: "Consulta para obtener las tareas pendientes | Tutorial de hooks Apollo con React en GraphQL"
metaDescription: "Consulta GraphQL para obtener las tareas pendientes personales. Pruebe la consulta en GraphiQL, pasando el token de Autorización para obtener resultados autenticados"
---

El objetivo de la primera consulta Graphql que escriba será obtener las tareas pendientes personales. Necesitará cargar los datos de las tareas pendientes desde la base de datos, que pertenece al usuario que haya iniciado sesión. Vamos a definir una consulta graphql para obtener los datos necesarios.

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

[Pruebe](https://hasura.io/learn/graphql/graphiql) esta consulta en GraphiQL contra la base de datos de la aplicación para ver el aspecto de la respuesta.

**Nota**: necesitará pasar el encabezado `Authorization: Bearer <token>` antes de realizar la consulta para obtener los resultados. El token se rellena automáticamente en la interfaz de usuario tras iniciar sesión mediante Auth0.

Esta consulta es la consulta Graphql real que utilizaremos en nuestra aplicación React y, por lo tanto, debería probarla para asegurarse de que funciona según lo esperado.

A continuación, vamos a incorporar esta consulta GraphQL en nuestra aplicación React.