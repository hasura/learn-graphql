---
title: "Crear todos - mutación"
metaTitle: "Mutación para crear todos | Tutorial de Ganchos de Apolo de Reacción GraphQL"
metaDescription: "GraphQL Mutation para crear nuevos todos. Prueba la mutación en GraphiQL, pasando el token de Autorización para obtener resultados autenticados."
---

En esta parte del tutorial, aprenderás a crear nuevos todos usando GraphQL Mutations.

Definamos una mutación graphql para realizar inserción en todos.

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

También tendrá que pasar los valores de las variables.

[Prueba](https://hasura.io/learn/graphql/graphiql) esta mutación en GraphiQL contra la base de datos de aplicaciones para ver cómo se ve la respuesta.

Ahora integremos esta mutación de graphql en nuestra aplicación de reacción.

