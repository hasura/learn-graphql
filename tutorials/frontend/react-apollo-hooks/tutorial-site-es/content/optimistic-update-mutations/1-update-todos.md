---
title: "Actualizar las tareas pendientes - mutación"
metaTitle: "Mutación para actualizar las tareas pendientes | Tutorial de hooks Apollo con React en GraphQL"
metaDescription: "Mutaciones GraphQL para actualizar las tareas pendientes existentes. Pruebe la mutación en GraphiQL, pasando el token de Autorización para marcar una tarea pendiente como completada"
---

En esta parte del tutorial, aprenderá a marcar una tarea pendiente existente como completada, utilizando mutaciones GraphQL.

Vamos a definir una consulta Graphql para hacer una mutación en las tareas pendientes.

```graphql
  mutation toggleTodo ($id: Int!, $isCompleted: Boolean!) {
    update_todos(where: {id: {_eq: $id}}, _set: {is_completed: $isCompleted}) {
      affected_rows
    }
  }
```
También necesitará pasar los valores para las variables.

[Pruebe](https://hasura.io/learn/graphql/graphiql) esta mutación en GraphiQL contra la base de datos de la aplicación para ver qué aspecto tiene la respuesta.

A continuación, vamos a incorporar esta mutación Graphql a nuestra aplicación React.
