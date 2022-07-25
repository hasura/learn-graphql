---
title: "Eliminar tareas pendientes - mutación"
metaTitle: "Mutación para borrar tareas pendientes | Tutorial de hooks Apollo con React en GraphQL"
metaDescription: "Mutación GraphQL para borrar tareas pendientes personales existentes. Pruebe la mutación en GraphiQL, pasando el token de Autorización para borrar una tarea pendiente"
---

En esta parte del tutorial, aprenderá a eliminar tareas pendientes existentes con mutaciones GraphQL.

Vamos a definir una consulta Graphql para hacer una mutación en tareas pendientes.

```graphql
mutation removeTodo ($id: Int!) {
  delete_todos(where: {id: {_eq: $id}}) {
    affected_rows
  }
}
```

[Pruebe](https://hasura.io/learn/graphql/graphiql) esta mutación en GraphiQL contra la base de datos de la aplicación para ver qué aspecto tiene la respuesta. También necesitará pasar los valores para las variables.

A continuación, vamos a incorporar esta mutación Graphql en nuestra aplicación React.