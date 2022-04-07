---
title: "Crear tareas pendientes - mutación"
metaTitle: "Mutación para crear tareas pendientes | Tutorial de hooks Apollo con React en GraphQL"
metaDescription: "Mutación GraphQL para crear nuevas tareas pendientes personales. Pruebe la mutación en GraphiQL, pasando el token de Autorización para obtener resultados autenticados."
---

En esta parte del tutorial, aprenderá a crear nuevas tareas pendientes utilizando mutaciones GraphQL.

Vamos a definir una mutación Graphql para realizar inserciones en las tareas pendientes.

```graphql
mutation ($todo: String!, $isPublic: Boolean!) {
  insert_todos(objects: {title: $todo, is_public: $isPublic}) {
    affected_rows
    returning {
      id
      title
      created_at
      is_completed
    }
  }
}
```

También necesitará pasar los valores para las variables.

[Pruebe](https://hasura.io/learn/graphql/graphiql) esta mutación en GraphiQL contra la base de datos de la aplicación para ver el aspecto de la respuesta.

A continuación, vamos a incorporar esta mutación Graphql a nuestra aplicación React.

