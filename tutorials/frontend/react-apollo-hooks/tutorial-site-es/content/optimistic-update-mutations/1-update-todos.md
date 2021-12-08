---
title: "Actualizar todos - mutation"
metaTitle: "Mutación para actualizar todos | Tutorial de Ganchos de Apolo Reacción de GraphQL"
metaDescription: "GraphQL Mutation para actualizar todos personales existentes. Pruebe la mutación en GraphiQL, pasando el token de Autorización para marcar un todo como se ha completado"
---

En esta parte del tutorial, aprenderá cómo marcar un todo existente como se ha completado mediante el uso de Mutaciones GraphQL.

Definamos una consulta de graphql para hacer una mutación en todos.

```graphql
  mutation toggleTodo ($id: Int!, $isCompleted: Boolean!) {
    update_todos(where: {id: {_eq: $id}}, _set: {is_completed: $isCompleted}) {
      affected_rows
    }
  }
```
También tendrá que pasar los valores de las variables.

[Prueba](https://hasura.io/learn/graphql/graphiql) esta mutación en GraphiQL contra la base de datos de aplicaciones para ver cómo se ve la respuesta.

Ahora integremos esta mutación de graphql en nuestra aplicación de reacción.
