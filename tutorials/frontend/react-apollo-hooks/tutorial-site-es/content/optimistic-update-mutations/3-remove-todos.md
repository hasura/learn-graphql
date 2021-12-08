---
title: "Eliminar todos - mutación"
metaTitle: "Mutación para eliminar todos | Tutorial de Ganchos de Apolo de Reacción de GraphQL"
metaDescription: "GraphQL Mutation para eliminar todos personales existentes. Prueba la mutación en GraphiQL, pasando el token de Autorización para eliminar un todo"
---

En esta parte del tutorial, aprenderá cómo eliminar todos existentes mediante el uso de Mutaciones GraphQL.

Definamos una consulta de graphql para hacer una mutación en todos.

```graphql
mutation removeTodo ($id: Int!) {
  delete_todos(where: {id: {_eq: $id}}) {
    affected_rows
  }
}
```

[Prueba](https://hasura.io/learn/graphql/graphiql) esta mutación en GraphiQL contra la base de datos de aplicaciones para ver cómo se ve la respuesta. También tendrá que pasar los valores de las variables.

Ahora integremos esta mutación de graphql en nuestra aplicación de reacción.